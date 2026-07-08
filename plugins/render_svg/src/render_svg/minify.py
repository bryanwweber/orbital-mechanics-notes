import subprocess
from pathlib import Path


def minify(svg: bytes, config_loc: Path | None) -> bytes:
    args = ["bun", "run", "svgo", "--input", "-", "--output", "-"]
    if config_loc:
        args.append(f"--config={config_loc}")
    result = subprocess.run(
        args,
        capture_output=True,
        input=svg,
    )
    return result.stdout
