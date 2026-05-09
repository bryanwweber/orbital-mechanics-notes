import json
from pathlib import Path
from typing import Annotated
from xml.etree import ElementTree as ET

from rich.progress import (
    BarColumn,
    MofNCompleteColumn,
    Progress,
    SpinnerColumn,
    TextColumn,
    TimeRemainingColumn,
    track,
)
from typer import Argument, Option, Typer

from .config import get_config
from .insert_metadata import METADATA_T
from .insert_metadata import main as meta_main
from .minify import minify
from .namespaces import NAMESPACES
from .render_math_svg import doit, load_cache, write_cache

app = Typer()


@app.command()
def main(
    input_location: Annotated[
        Path, Argument(exists=True, file_okay=True, dir_okay=True, writable=True)
    ],
    output_location: Annotated[
        Path, Option(exists=True, file_okay=False, dir_okay=True, writable=True)
    ],
    math_cli: Annotated[Path, Option(exists=True, file_okay=True, dir_okay=False)],
    metadata_file: Annotated[Path, Option()] = Path("metadata.json"),
    math_cache: Annotated[Path, Option()] = Path("mathjax_cache.json"),
    minify_config: Annotated[Path | None, Option()] = None,
) -> None:
    config = get_config()
    config.math_cli = math_cli
    input_location = input_location.resolve()
    output_location = output_location.resolve()
    if input_location.is_dir():
        svg_files = list(input_location.rglob("*.svg"))
        cache_input = input_location.joinpath(math_cache)
        metadata_input = input_location.joinpath(metadata_file)
    else:
        svg_files = [input_location]
        cache_input = input_location.parent.joinpath(math_cache)
        metadata_input = input_location.parent.joinpath(metadata_file)

    metadata_json: dict[str, METADATA_T] = json.loads(metadata_input.read_text())
    cache = load_cache(cache_input)

    for prefix, uri in NAMESPACES.items():
        ET.register_namespace(prefix, uri)

    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        BarColumn(),
        MofNCompleteColumn(),
        TimeRemainingColumn(),
    ) as progress:
        svg_task = progress.add_task("[green]Processing SVGs...", total=len(svg_files))
        for svg_file in svg_files:
            svg_root = ET.parse(svg_file.resolve())
            svg_root = meta_main(svg_root, metadata_json[svg_file.name])
            svg_root = doit(svg_root, cache)
            minified_svg = minify(ET.tostring(svg_root.getroot()), minify_config)
            output_location.joinpath(svg_file.name).write_bytes(minified_svg)
            progress.update(svg_task, advance=1)

    write_cache(cache, cache_input)


if __name__ == "__main__":
    app()
