#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Generate the ellipse stretching figure beside this script.

Artwork: drawing-scripts/time-since-periapsis-area.ipynb -> raw_svg/ ->
render_svg -> images/. Read raw coordinates before SVG path minification;
retain the rendered artwork and math labels in the generated SVG.
"""

import json
import re
from pathlib import Path
from xml.etree import ElementTree as ET

output = Path(__file__).resolve().parent
root = output.parents[2]
name = "time-since-periapsis-area-animate"
raw = ET.parse(root / "raw_svg" / f"{name}.svg")
geometry = next(node for node in raw.iter() if node.get("id") == "animated-ellipse")
# The source polyline contains absolute M/L coordinates, before minification.
coords = [float(value) for value in re.findall(r"-?\d+(?:\.\d+)?", geometry.get("d"))]
y = coords[1::2]
center_y = 325
scale_factor = 300 / ((max(y) - min(y)) / 2)
point = next(node for node in raw.iter() if node.get("id") == "axis-to-B")
point_y = float(point.get("d").split()[-1])
frames = []
for step in range(1001):
    scale = 1 + (scale_factor - 1) * step / 1000
    frames.append(
        {
            "stretch": (
                f"translate(0 {center_y}) scale(1 {scale:.8f}) "
                f"translate(0 {-center_y})"
            ),
            "point": f"translate(0 {(point_y - center_y) * (scale - 1):.8f})",
            "showQ": step >= 990,
        }
    )

# Keep SVG markup separate from the HTML; do not rewrite the original asset.
svg = (root / "images" / f"{name}.svg").read_text(encoding="utf-8")
(output / "ellipse-area-animate.svg").write_text(svg, encoding="utf-8")
html = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Stretching an ellipse into a circumscribing circle</title>
<style>
body { margin: 0; font-family: sans-serif; background: white; color: #44403c; }
.animation { display: flex; flex-direction: column; align-items: center; gap: 8px; }
#drawing { width: 100%; text-align: center; }
#drawing > svg { max-width: 100%; height: auto; max-height: 75vh; }
</style>
</head>
<body>
<div class="animation">
<div id="drawing" role="img" aria-label="Ellipse stretching into a circle"></div>
<label for="ellipse-slider">Stretch ellipse into circle</label>
<input id="ellipse-slider" type="range" min="0" max="1000" step="1" value="0" disabled>
<p id="error" role="alert" hidden></p>
</div>
<script>
const frames = FRAMES;
async function initialize() {
  const response = await fetch('ellipse-area-animate.svg');
  if (!response.ok) throw new Error(`SVG request failed: ${response.status}`);
  document.querySelector('#drawing').innerHTML = await response.text();
  const svg = document.querySelector('#drawing > svg');
  const slider = document.querySelector('#ellipse-slider');
  const paths = ['animated-ellipse', 'axis-to-B', 'm1-to-B', 'filled-area']
    .map(id => svg.querySelector(`#${id}`));
  const point = svg.querySelector('#B');
  const qLabel = svg.querySelector('g[data-latex="Q"]').closest('svg');
  function animate() {
    const frame = frames[slider.value];
    paths.forEach(path => path.setAttribute('transform', frame.stretch));
    point.setAttribute('transform', frame.point);
    qLabel.style.display = frame.showQ ? '' : 'none';
  }
  slider.addEventListener('input', animate);
  animate();
  slider.disabled = false;
}
initialize().catch(error => {
  const message = document.querySelector('#error');
  message.textContent = `Unable to load the figure: ${error.message}`;
  message.hidden = false;
});
</script>
</body>
</html>
"""
(output / "ellipse-area-animate.html").write_text(
    html.replace("FRAMES", json.dumps(frames, separators=(",", ":"))), encoding="utf-8"
)
