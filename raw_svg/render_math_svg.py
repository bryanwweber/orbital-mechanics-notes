from __future__ import annotations
import requests
from xml.etree import ElementTree as ET
from pathlib import Path
import json
from typing import Optional, Union, Dict
import sys
from datetime import datetime
import re

HERE = Path(__file__).parent
OUTPUT = HERE.parent / "images"
# HOST = "https://math.vercel.app"
HOST = "http://localhost:3000"
PARAMS: dict[str, Optional[Union[str, bytes]]] = {"from": None}
CACHE = HERE / "mathjax_cache.json"
CACHE_T = Dict[Optional[Union[str, bytes]], str]
SESSION = requests.Session()
NAMESPACES = {
    "": "http://www.w3.org/2000/svg",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "cc": "http://creativecommons.org/ns#",
    "dc": "http://purl.org/dc/elements/1.1/",
    "bx": "https://boxy-svg.com",
    "inkscape": "http://www.inkscape.org/namespaces/inkscape",
    "sodipodi": "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd",
    "xlink": "http://www.w3.org/1999/xlink",
    "{http://www.w3.org/XML/1998/namespace}space": "preserve",
}
CC_META = """
<root xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
<metadata>
  <rdf:RDF>
    <cc:Work rdf:about="">
      <cc:license rdf:resource="http://creativecommons.org/licenses/by-sa/4.0/" />
      <dc:title></dc:title>
      <dc:date></dc:date>
      <dc:format>image/svg+xml</dc:format>
      <dc:creator>
        <cc:Agent>
          <dc:title>Bryan Weber</dc:title>
        </cc:Agent>
      </dc:creator>
   </cc:Work>
   <cc:License
      rdf:about="http://creativecommons.org/licenses/by-sa/4.0/">
      <cc:permits
         rdf:resource="http://creativecommons.org/ns#Reproduction" />
      <cc:permits
         rdf:resource="http://creativecommons.org/ns#Distribution" />
      <cc:requires
         rdf:resource="http://creativecommons.org/ns#Notice" />
      <cc:requires
         rdf:resource="http://creativecommons.org/ns#Attribution" />
      <cc:permits
         rdf:resource="http://creativecommons.org/ns#DerivativeWorks" />
      <cc:requires
         rdf:resource="http://creativecommons.org/ns#ShareAlike" />
   </cc:License>
   </rdf:RDF>
</metadata>
</root>
"""
# Match sizes from height and width attributes
SIZE_REGEX = re.compile(r"([\d.]+)?(\w*)?")
# Match a scaling factor in the class attribute
SCALE_REGEX = re.compile(r"\bscale-(\d*)\b")


def load_cache() -> CACHE_T:
    if CACHE.exists():
        cache = json.loads(CACHE.read_text())
    else:
        cache = {}
    return cache


def write_cache(cache: CACHE_T) -> None:
    if cache:
        CACHE.write_text(json.dumps(cache))


def get_math_content(elem: ET.Element, cache: CACHE_T, s: requests.Session) -> str:
    value = elem.text
    if value is None:
        value = elem[0].text
        if value is None:
            raise ValueError("Text of node cannot be 'None'", elem)
    if value in cache:
        content = cache[value]
    else:
        PARAMS["inline"] = value
        r = s.get(HOST, params=PARAMS)
        r.raise_for_status()
        content = r.content.decode("utf-8")
        cache[value] = content
    return content


def clean_cache() -> None:
    if CACHE.exists():
        CACHE.unlink()


def replace_text(search_elem: ET.Element, cache: CACHE_T) -> None:
    for elem in search_elem.findall("text", NAMESPACES):
        if "math" not in elem.get("class", ""):
            continue
        content = get_math_content(elem, cache, SESSION)

        x_loc = elem.get("x")
        y_loc = elem.get("y")
        if x_loc is None or y_loc is None:
            raise ValueError("Both x and y must be set")
        scale = float(elem.get("renderscale", 0.0))
        if not scale:
            scale_attr = SCALE_REGEX.search(elem.get("class", ""))
            if scale_attr is not None:
                scale = float(scale_attr.group(1))

        math = ET.fromstring(content)
        width = math.get("width", "auto")
        height = math.get("height", "auto")
        if scale:
            width_size = SIZE_REGEX.match(width)
            height_size = SIZE_REGEX.match(height)
            if width_size is not None and width_size.group(1):
                width = str(scale * float(width_size.group(1))) + width_size.group(2)
            if height_size is not None and height_size.group(1):
                height = str(scale * float(height_size.group(1))) + height_size.group(2)
        href = (
            "data:image/svg+xml;utf8,"
            f"{ET.tostring(math, encoding='unicode', xml_declaration=False)}"
        )
        image_element = ET.Element(
            "image",
            attrib={
                "x": x_loc,
                "y": y_loc,
                "height": height,
                "width": width,
                "object-fit": "contain",
                "href": href,
            },
        )
        image_element.tail = "\n  "
        search_elem.append(image_element)
        search_elem.remove(elem)


def main(svg_file: Optional[Path] = None) -> None:
    if svg_file is None:
        for svg_f in HERE.glob("*.svg"):
            main(svg_f)

    # This is here for typing. Without this, mypy complains that svg_file might be None
    assert svg_file is not None, "svg_file cannot be None at this point"

    for prefix, uri in NAMESPACES.items():
        ET.register_namespace(prefix, uri)

    # The 'root' element is only needed to declare the namespaces for parsing,
    # so retrieve just the metadata element here.
    CC_XML = ET.fromstring(CC_META).find("metadata")
    if CC_XML is None:
        raise ValueError("Something went horribly wrong finding the metadata")

    RDF = CC_XML.find("rdf:RDF", NAMESPACES)
    if RDF is None:
        raise ValueError("Could not find RDF tag")
    Work = RDF.find("cc:Work", NAMESPACES)
    if Work is None:
        raise ValueError("Could not find Work tag")
    title = Work.find("dc:title", NAMESPACES)
    if title is None:
        ET.SubElement(Work, "dc:title", text=svg_file.name)
    else:
        title.text = svg_file.name
    date = Work.find("dc:date", NAMESPACES)
    today = datetime.today().isoformat()
    if date is None:
        ET.SubElement(Work, "dc:date", text=today)
    else:
        date.text = today

    cache = load_cache()
    assert OUTPUT.exists() and OUTPUT.is_dir(), "The 'images' directory must exist"

    svg_tree = ET.parse(svg_file)
    svg_element = svg_tree.getroot()
    if svg_element.get("height") is None or svg_element.get("width") is None:
        view_box = svg_element.get("viewBox")
        if view_box is None:
            raise ValueError("svg element must have height and width or viewBox")
        _, _, svg_width, svg_height = view_box.split()
        svg_element.set("width", svg_width + "px")
        svg_element.set("height", svg_height + "px")

    defs_elem = svg_element.find("defs", NAMESPACES)
    if defs_elem is not None:
        font_def = defs_elem.find("style", NAMESPACES)
        if font_def is not None:
            defs_elem.remove(font_def)

    svg_element.insert(1, CC_XML)

    search_elements = [svg_element]
    g_elem = svg_element.find("g", NAMESPACES)
    if g_elem is not None:
        search_elements.append(g_elem)

    for elem in search_elements:
        replace_text(elem, cache)
    svg_tree.write(
        OUTPUT.joinpath(svg_file.name), encoding="unicode", xml_declaration=True
    )

    write_cache(cache)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1]:
        svg_file = Path(sys.argv[1])
        if svg_file.exists():
            main(svg_file)
        else:
            print("The given file does not exist", file=sys.stderr)
            sys.exit(1)
    else:
        main()
