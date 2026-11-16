#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = [
#     "numpy",
#     "scipy",
# ]
# ///
"""Generate the anomaly figure; run directly or from the chapter code cell."""

# SVG path attributes and embedded JavaScript intentionally use long lines.
# ruff: noqa: E501

import json
from pathlib import Path

import numpy as np
from scipy.optimize import newton

a = 175
e = 0.7
p = a * (1 - e**2)
b = a * np.sqrt(1 - e**2)
r_a = p / (1 - e)
r_p = 2 * a - r_a
M_e = np.linspace(0, 2 * np.pi, 361)[::-1]


def kepler(E, M_e, e):
    """Kepler's equation, to be used in a Newton solver."""
    return E - e * np.sin(E) - M_e


def d_kepler_d_E(E, M_e, e):
    """The derivative of Kepler's equation, to be used in a Newton solver.

    Note that the argument M_e is unused, but must be present so the function
    arguments are consistent with the kepler function.
    """
    return 1 - e * np.cos(E)


E = newton(
    func=kepler, fprime=d_kepler_d_E, x0=np.ones_like(M_e) * np.pi, args=(M_e, e)
)
nu = (2 * np.arctan(np.sqrt((1 + e) / (1 - e)) * np.tan(E / 2))) % (2 * np.pi)
# Preserve the completed revolution instead of wrapping its angle to zero.
nu[0] = 2 * np.pi
r = p / (1 + e * np.cos(nu))
# Scale and translate x, y coordinates to fit 400x400 SVG view
x = a * e + r * np.cos(nu)
y = r * np.sin(nu)
width = 450
height = 400

ellipse = np.vstack((x, y))
circle = np.vstack((a * np.cos(M_e), a * np.sin(M_e)))
eccentric = np.vstack((a * np.cos(E), a * np.sin(E)))
all_data_array = np.vstack((ellipse, circle, eccentric)).T + np.array(
    [[width / 2, height / 2] * 3]
)
all_angles_array = np.vstack((nu[::-1], M_e[::-1], E[::-1])).T
all_data = json.dumps(np.hstack((all_data_array, all_angles_array)).tolist())
svg = f"""
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="0 0 {width} {height}" id="all-the-anomalies">
<path fill="white" stroke="none" d="M 0 0 L {width} 0 L {width} {height} L 0 {height}" />
<line stroke="black" stroke-width="1" x1="{width / 2}" y1="5" x2="{width / 2}" y2="{height - 5}" />
<line stroke="black" stroke-width="1" x1="5" y1="{height / 2}" x2="{width - 5}" y2="{height / 2}" />
<path stroke="black" fill="none" stroke-width="2" id="m1-to-E" d="M {width / 2 + a - r_p} {height / 2} L {width / 2 + a - r_p} {height / 2}" />
<g stroke="rgb(141,160,203)" fill="rgb(141,160,203)" stroke-width="2">
  <ellipse cx="{width / 2}" cy="{height / 2}" rx="{a}" ry="{b}" fill="none" />
  <circle id="m2" cx="{width / 2 + a}" cy="{height / 2}" r="4" stroke="none" />
  <path fill="none" id="true-anomaly" d="M {width / 2 + a - r_p} {height / 2} L {width / 2 + a} {height / 2}" />
  <path id="true-arc" fill="none" d="M {width / 2 + a - r_p + 20} {height / 2} A 20 20 0 0 0 {width / 2 + a - r_p + 20} {height / 2}" />
  <text x="0" y="10" font-size="16" text-anchor="start" dominant-baseline="hanging" stroke-width="1" id="true-text">True Anomaly</text>
</g>
<g stroke="rgb(252,141,98)" fill="rgb(252,141,98)" stroke-width="2">
  <circle cx="{width / 2}" cy="{height / 2}" r="{a}" fill="none" />
  <circle id="M" cx="{width / 2 + a}" cy="{height / 2}" r="4" stroke="none" />
  <path fill="none" id="mean-anomaly" d="M {width / 2} {height / 2} L {width / 2 + a - r_p} {height / 2}" />
  <path id="mean-arc" fill="none" d="M {width / 2 + 50} {height / 2} A 50 50 0 0 0 {width / 2 + 50} {height / 2}" />
  <text x="{width}" y="10" id="mean-text" font-size="16" stroke-width="1" dominant-baseline="hanging" text-anchor="end">Mean Anomaly</text>
</g>
<g stroke="rgb(102,194,165)" fill="rgb(102,194,165)" stroke-width="2">
  <circle id="E" cx="{width / 2 + a}" cy="{height / 2}" r="4" stroke="none"/>
  <path fill="none" id="eccentric-anomaly" d="M {width / 2} {height / 2} L {width / 2 + a - r_p} {height / 2}" />
  <path id="ecc-arc" fill="none" d="M {width / 2 + 25} {height / 2} A 25 25 0 0 0 {width / 2 + 25} {height / 2}" />
  <text x="0" y="{height - 5}" id="ecc-text" font-size="16" text-anchor="start" stroke-width="1" dominant-baseline="text-bottom">Eccentric Anomaly</text>
</g>
<circle cx="{width / 2}" cy="{height / 2}" r="4" fill="rgb(80%, 80%, 80%)" />
<circle cx="{width / 2 + a - r_p}" cy="{height / 2}" r="4" fill="rgb(80%, 80%, 80%)" />
</svg>
"""
js = f"""
<script>
const data = {all_data};
const slider = document.querySelector('#ellipse-slider');
const svg = document.querySelector('#all-the-anomalies');
const trueAnomaly = svg.querySelector('#true-anomaly');
const meanAnomaly = svg.querySelector('#mean-anomaly');
const eccentricAnomaly = svg.querySelector('#eccentric-anomaly');
const m1ToE = svg.querySelector('#m1-to-E');

const m2 = svg.querySelector('#m2');
const MPoint = svg.querySelector('#M');
const EPoint = svg.querySelector('#E');

const width = {width};
const half_width = {width / 2};
const height = {height};
const half_height = {height / 2};
const a = {a};
const r_p = {r_p};

const eccArc = svg.querySelector('#ecc-arc');
const eccArcRadius = 25;
const trueArc = svg.querySelector('#true-arc');
const trueArcRadius = 20;
const meanArc = svg.querySelector('#mean-arc');
const meanArcRadius = 50;

// Two arc segments also represent a full circle: one SVG arc with coincident
// start and end points is omitted by the renderer.
function arcPath(cx, cy, radius, angle) {{
  const midX = cx + radius * Math.cos(angle / 2);
  const midY = cy - radius * Math.sin(angle / 2);
  const endX = cx + radius * Math.cos(angle);
  const endY = cy - radius * Math.sin(angle);
  return `M ${{cx + radius}} ${{cy}} A ${{radius}} ${{radius}} 0 0 0 ${{midX}} ${{midY}} A ${{radius}} ${{radius}} 0 0 0 ${{endX}} ${{endY}}`;
}}

function animate() {{
  const row = data[slider.value - 1];
  const true_x = row[0];
  const true_y = row[1];
  const mean_x = row[2];
  const mean_y = row[3];
  const ecc_x = row[4];
  const ecc_y = row[5];
  const nu = row[6];
  const M = row[7];
  const E = row[8];
  const newTrueAnomaly = `M {width / 2 + a - r_p} {height / 2} L ${{true_x}} ${{true_y}}`;
  const newMeanAnomaly = `M {width / 2} {height / 2} L ${{mean_x}} ${{mean_y}}`;
  const newEccentricAnomaly = `M {width / 2} {height / 2} L ${{ecc_x}} ${{ecc_y}}`;

  trueAnomaly.setAttribute('d', newTrueAnomaly);
  meanAnomaly.setAttribute('d', newMeanAnomaly);
  eccentricAnomaly.setAttribute('d', newEccentricAnomaly);
  m1ToE.setAttribute('d', `M ${{true_x}} ${{true_y}} L ${{ecc_x}} ${{ecc_y}}`);

  const newEccArc = arcPath(half_width, half_height, eccArcRadius, E);
  const newMeanArc = arcPath(half_width, half_height, meanArcRadius, M);
  const newTrueArc = arcPath(half_width + a - r_p, half_height, trueArcRadius, nu);

  m2.setAttribute('cx', true_x);
  m2.setAttribute('cy', true_y);
  MPoint.setAttribute('cx', mean_x);
  MPoint.setAttribute('cy', mean_y);
  EPoint.setAttribute('cx', ecc_x);
  EPoint.setAttribute('cy', ecc_y);
  eccArc.setAttribute('d', newEccArc);
  meanArc.setAttribute('d', newMeanArc);
  trueArc.setAttribute('d', newTrueArc);
}}
slider.addEventListener('input', animate);
animate();

</script>
"""
html = (
    """\
<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;" class="animation">
"""
    + svg
    + f"""\
<label for="ellipse-slider">Time since periapsis</label>
<input id="ellipse-slider" type="range" min="1" max="{len(x)}" step="1" value="1" style="width: 200px;">
</div>"""
    + js
)

# Keep generated files beside this script, independent of the execution directory.
output = Path(__file__).resolve().parent
(output / "true-mean-eccentric-anomalies.html").write_text(
    '<!doctype html><html lang="en"><head><meta charset="utf-8">'
    '<meta name="robots" content="noindex, nofollow, indexifembedded">'
    '<meta name="viewport" content="width=device-width, initial-scale=1">'
    "<title>True, mean, and eccentric anomalies</title>"
    "<style>body { margin: 0; font-family: sans-serif; background: white; }"
    "svg { max-width: 100%; height: auto; max-height: 80vh; }</style>"
    "</head><body>" + html + "</body></html>",
    encoding="utf-8",
)
(output / "true-mean-eccentric-anomalies.svg").write_text(svg, encoding="utf-8")
