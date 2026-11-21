#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Generate the hyperbolic trajectory HTML and SVG beside this script.

Run from any directory. Replaces this script's original Matplotlib animation
with precomputed positions and an SVG controlled by a true-anomaly slider.
"""

# SVG markup and embedded JavaScript intentionally use long lines.
# Greek nu is the true-anomaly symbol in figure labels.
# ruff: noqa: E501, RUF001

import json
import math
from pathlib import Path

E = 1.1
A = 1
B = A * math.sqrt(E**2 - 1)
NU_INF = math.acos(-1 / E)
FOCUS = -A * E


def position(nu):
    """Return Cartesian position, retaining signed radius on the virtual branch."""
    denominator = 1 + E * math.cos(nu)
    if abs(denominator) < 1e-12:
        return None
    radius = A * (E**2 - 1) / denominator
    return [FOCUS + radius * math.cos(nu), radius * math.sin(nu)]


def screen(x, y):
    """Map orbital coordinates to SVG with equal horizontal and vertical scales."""
    return f"{450 + 200 * x:.6f},{250 - 200 * y:.6f}"


def drawing():
    """Draw the fixed hyperbola and an initial body at periapsis."""
    paths = []
    for branch, color in [(-1, "#d97732"), (1, "#377bb5")]:
        points = []
        for i in range(1001):
            # Parameterizing by y samples the vertices smoothly.
            y = -1 + 2 * i / 1000
            x = branch * A * math.sqrt(1 + (y / B) ** 2)
            points.append(screen(x, y))
        paths.append(
            f'<polyline points="{" ".join(points)}" fill="none" stroke="{color}" stroke-width="3"/>'
        )
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="35 20 830 465" role="img" aria-labelledby="title description">
<title id="title">Hyperbolic trajectory and true anomaly</title>
<desc id="description">An occupied hyperbola on the left and a virtual branch on the right, with the attracting mass at the left focus. Move the true-anomaly slider to locate the orbiting body.</desc>
<defs><clipPath id="plot"><rect x="50" y="50" width="800" height="400"/></clipPath></defs>
<rect x="35" y="20" width="830" height="465" fill="white"/>
<g font-family="sans-serif" font-size="19" fill="#292524">
<path d="M50 250H850 M450 50V450" stroke="#a8a29e"/>
<g clip-path="url(#plot)">
{"".join(paths)}
<circle cx="{450 + 200 * FOCUS}" cy="250" r="6" fill="#292524"/>
<g id="moving-body" transform="translate(250 250)">
<circle id="body" r="7" fill="#292524"/>
<text id="body-label" x="12" y="-12">m₂</text>
</g>
</g>
<text x="{450 + 200 * FOCUS}" y="278" text-anchor="middle">m₁</text>
<text x="280" y="420" text-anchor="middle" fill="#b65e24">Real Trajectory</text>
<text x="630" y="420" text-anchor="middle" fill="#28689e">Virtual Trajectory</text>
<g text-anchor="middle">
<text x="280" y="80">ν∞ = {math.degrees(NU_INF):.2f}°</text>
<text x="280" y="107">e = {E}</text><text x="280" y="134">a = {A}</text>
<text id="anomaly" x="630" y="80">ν = 0.00°</text>
<text id="status" x="450" y="475" font-size="16"></text>
</g></g></svg>'''


def main():
    # Cover both branches with one continuous angular sweep; include periapsis
    # and apoapsis exactly, and represent the asymptote explicitly.
    angles = [-NU_INF + 1e-6 + 2 * math.pi * i / 1000 for i in range(1001)]
    angles += [0, NU_INF, math.pi]
    angles.sort()
    initial = angles.index(0)
    frames = [[math.degrees(nu), position(nu)] for nu in angles]
    svg = drawing()
    html = """<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="robots" content="noindex, nofollow, indexifembedded">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hyperbolic trajectory and true anomaly</title>
<style>
body { margin: 0; background: white; color: #292524; font-family: sans-serif; }
.animation { display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100vh; }
svg { width: 100%; flex: 1; min-height: 0; }
.controls { display: flex; align-items: center; flex-wrap: wrap; flex-shrink: 0; gap: 12px; padding: 4px; }
input { width: min(350px, 50vw); }
</style></head><body><div class="animation">
SVG
<div class="controls"><label for="anomaly-slider">True anomaly ν</label>
<input id="anomaly-slider" type="range" min="0" max="LAST" value="INITIAL" step="1">
</div></div><script>
const frames = FRAMES;
const slider = document.querySelector('#anomaly-slider');
const body = document.querySelector('#moving-body');
const anomaly = document.querySelector('#anomaly');
const status = document.querySelector('#status');
function render() {
  const [degrees, point] = frames[Number(slider.value)];
  anomaly.textContent = `ν = ${degrees.toFixed(2)}°`;
  slider.setAttribute('aria-valuetext', `${degrees.toFixed(2)} degrees`);
  const visible = point !== null && Math.abs(point[0]) <= 2 && Math.abs(point[1]) <= 1;
  body.setAttribute('visibility', visible ? 'visible' : 'hidden');
  if (visible) {
    body.setAttribute('transform', `translate(${450 + 200 * point[0]} ${250 - 200 * point[1]})`);
    const label = document.querySelector('#body-label');
    label.setAttribute('x', point[0] > 1.8 ? -12 : 12);
    label.setAttribute('text-anchor', point[0] > 1.8 ? 'end' : 'start');
    label.setAttribute('y', point[1] > 0.85 ? 24 : -12);
  }
  status.textContent = point === null ? 'At the asymptote: radius tends to infinity'
    : visible ? '' : 'Body outside the plotted area';
}
slider.addEventListener('input', render);
render();
</script></body></html>
"""
    html = (
        html.replace("SVG", svg)
        .replace("LAST", str(len(frames) - 1))
        .replace("INITIAL", str(initial))
        .replace("FRAMES", json.dumps(frames, separators=(",", ":"), allow_nan=False))
    )
    output = Path(__file__).resolve().parent
    output.mkdir(exist_ok=True)
    (output / "hyperbolic-trajectory-animation.html").write_text(html, encoding="utf-8")
    (output / "hyperbolic-trajectory-animation.svg").write_text(svg, encoding="utf-8")


if __name__ == "__main__":
    main()
