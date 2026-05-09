import json
import re
import subprocess
from pathlib import Path
from xml.etree import ElementTree as ET

from .config import get_config
from .namespaces import NAMESPACES

CACHE_T = dict[str | bytes | None, str]

# Match sizes from height and width attributes
SIZE_REGEX = re.compile(r"([\d.]+)?(\w*)?")

CSS = """svg a{fill:blue;stroke:blue}
[data-mml-node="merror"]>g{fill:red;stroke:red}
[data-mml-node="merror"]>rect[data-background]{fill:yellow;stroke:none}
[data-frame],[data-line]{stroke-width:70px;fill:none}
.mjx-dashed{stroke-dasharray:140}
.mjx-dotted{stroke-linecap:round;stroke-dasharray:0,140}
use[data-c]{stroke-width:3px}
:root{--math-text-color: #44403c}
@media (prefers-color-scheme: dark) {:root{background-color: #ffffff}}
"""


def write_cache(cache: CACHE_T, cache_file: Path) -> None:
    if cache:
        cache_file.write_text(json.dumps(cache))


def load_cache(cache_file: Path) -> CACHE_T:
    if cache_file.exists():
        cache = json.loads(cache_file.read_text())
    else:
        cache = {}
    return cache


def get_math_content(elem: ET.Element, cache: CACHE_T) -> str:
    value = elem.text
    if value is None:
        value = elem[0].text
        if value is None:
            raise ValueError("Text of node cannot be 'None'", elem)
    if value in cache:
        content = cache[value]
    else:
        config = get_config()
        if config.math_cli is None:
            raise ValueError("must configure location for math cli")
        content = subprocess.run(
            [config.math_cli, "-i", "-", "-o", "-"],
            capture_output=True,
            check=True,
            input=value,
            text=True,
        ).stdout
        cache[value] = content
    return content


def replace_text(search_elem: ET.Element, cache: CACHE_T) -> None:
    for elem in search_elem.findall("text", NAMESPACES):
        if "math" not in elem.get("class", ""):
            continue
        content = get_math_content(elem, cache)
        math = ET.fromstring(content)

        x_loc = elem.get("x")
        y_loc = elem.get("y")
        if x_loc is None or y_loc is None:
            raise ValueError("Both x and y must be set")
        math.set("x", x_loc)
        math.set("y", y_loc)

        scale = float(elem.get("renderscale", 0.0))
        if scale:
            width = math.get("width", "auto")
            height = math.get("height", "auto")
            width_size = SIZE_REGEX.match(width)
            height_size = SIZE_REGEX.match(height)
            if width_size is not None and width_size.group(1):
                width = str(scale * float(width_size.group(1))) + width_size.group(2)
                math.set("width", width)
            if height_size is not None and height_size.group(1):
                height = str(scale * float(height_size.group(1))) + height_size.group(2)
                math.set("height", height)
        search_elem.append(math)
        search_elem.remove(elem)


def doit(
    svg_tree: "ET.ElementTree[ET.Element[str]]", cache: CACHE_T
) -> "ET.ElementTree[ET.Element[str]]":
    svg_element = svg_tree.getroot()
    if svg_element is None:
        raise ValueError("Could not find root SVG element")
    if svg_element.get("height") is None or svg_element.get("width") is None:
        view_box = svg_element.get("viewBox")
        if view_box is None:
            raise ValueError("svg element must have height and width or viewBox")
        _, _, svg_width, svg_height = view_box.split()
        svg_element.set("width", svg_width + "px")
        svg_element.set("height", svg_height + "px")

    search_elements = [svg_element]
    g_elem = svg_element.find("g", NAMESPACES)
    if g_elem is not None:
        search_elements.append(g_elem)

    for elem in search_elements:
        replace_text(elem, cache)
    style = ET.SubElement(svg_element, "style")
    style.text = CSS

    return svg_tree
