#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Generate lagrange-points-animate.html and its static SVG placeholder.

Run directly from any directory. Geometry replaces the Matplotlib animation
formerly in lagrange-points.md; JavaScript only displays precomputed frames.
The mass ratio excludes the singular endpoints zero and one.
"""

# SVG markup and embedded JavaScript intentionally use long lines.
# ruff: noqa: E501

import json
import math
from pathlib import Path


def collinear_lagrange(x, mu):
    """Dimensionless equilibrium equation in the rotating frame."""
    return (
        x
        - (1 - mu) * (x + mu) / abs(x + mu) ** 3
        - mu * (x - 1 + mu) / abs(x - 1 + mu) ** 3
    )


def bisect(mu, left, right):
    """Solve within one interval separated by the two primary singularities.

    The equilibrium function is strictly increasing on each interval.
    """
    for _ in range(80):
        middle = (left + right) / 2
        if collinear_lagrange(middle, mu) < 0:
            left = middle
        else:
            right = middle
    return (left + right) / 2


def frame(mu):
    """Return mass ratio and L1, L2, L3 coordinates."""
    epsilon = 1e-12
    return [
        mu,
        bisect(mu, -mu + epsilon, 1 - mu - epsilon),
        bisect(mu, 1 - mu + epsilon, 2),
        bisect(mu, -2, -mu - epsilon),
    ]


def drawing(row):
    """Make a complete static figure with IDs for JavaScript updates."""
    mu, l1, l2, l3 = row
    top = math.sqrt(3) / 2
    parts = [
        """<svg xmlns="http://www.w3.org/2000/svg" viewBox="45 15 820 620" role="img" aria-labelledby="title description">
<title id="title">The five Lagrange points</title>
<desc id="description">Positions in rotating dimensionless coordinates as the mass ratio changes. Dashed lines connect the masses and equilateral points. Circles show the primary orbits about the center of mass.</desc>
<rect width="900" height="700" fill="white"/>
<g font-family="sans-serif" font-size="17" fill="#292524">
<path d="M60 350H840 M450 75V625" stroke="#a8a29e"/>
<text x="850" y="338" text-anchor="end">x*</text><text x="462" y="82">y*</text>"""
    ]
    for tick in [-1.5, -1, -0.5, 0.5, 1, 1.5]:
        x = 450 + 250 * tick
        parts.append(
            f'<path d="M{x} 345v10" stroke="#a8a29e"/><text x="{x}" y="379" text-anchor="middle">{tick:g}</text>'
        )
    for tick in [-1, -0.5, 0.5, 1]:
        y = 350 - 250 * tick
        parts.append(f'<text x="440" y="{y + 6}" text-anchor="end">{tick:g}</text>')
    for name, radius, color in [
        ("m1-orbit", mu, "#e07b39"),
        ("m2-orbit", 1 - mu, "#4c78a8"),
    ]:
        parts.append(
            f'<circle id="{name}" cx="450" cy="350" r="{250 * radius}" fill="none" stroke="{color}" stroke-width="2"/>'
        )
    vertices = [(-mu, 0), (0.5 - mu, top), (1 - mu, 0), (0.5 - mu, -top), (-mu, 0)]
    points = " ".join(f"{450 + 250 * x},{350 - 250 * y}" for x, y in vertices)
    parts.append(
        f'<polyline id="equilateral" points="{points}" fill="none" stroke="#57534e" stroke-dasharray="6 5"/>'
    )
    markers = {
        "L1": "M-8 -6H8L0 9Z",
        "L2": "M-8 6H8L0 -9Z",
        "L3": "M0 -9L9 -3L6 8H-6L-9 -3Z",
        "L4": "M-7 -7L7 7M-7 7L7 -7",
        "L5": "M-7 -7H7V7H-7Z",
    }
    entries = [
        ("L1", l1, 0),
        ("L2", l2, 0),
        ("L3", l3, 0),
        ("L4", 0.5 - mu, top),
        ("L5", 0.5 - mu, -top),
        ("m1", -mu, 0),
        ("m2", 1 - mu, 0),
    ]
    for index, (name, x, y) in enumerate(entries):
        color = (
            "#c62828"
            if name.startswith("L")
            else {"m1": "#2454b5", "m2": "#16803c"}[name]
        )
        marker = (
            f'<path d="{markers[name]}" stroke="{color}" stroke-width="3" fill="{color}"/>'
            if name in markers
            else f'<circle r="8" fill="{color}"/>'
        )
        parts.append(
            f'<g id="{name}" transform="translate({450 + 250 * x} {350 - 250 * y})">{marker}</g>'
        )
        parts.append(
            f'<g transform="translate({100 + index * 110} 35)">{marker}<text x="16" y="6">{name[0]}<tspan baseline-shift="sub" font-size="12">{name[1]}</tspan></text></g>'
        )
    parts.append(f"""<g aria-label="Center of mass" transform="translate(450 350)"><circle r="8" fill="white" stroke="black"/><path d="M0 0H8A8 8 0 0 0 0 -8ZM0 0H-8A8 8 0 0 0 0 8Z"/></g>
<text id="mass-ratio" x="680" y="115" text-anchor="middle">π₂ = {mu:.4g}</text>
</g></svg>""")
    return "\n".join(parts)


def main():
    # Logarithmic sampling near each singular endpoint, linear in between.
    ratios = [10 ** (-5 + 4 * i / 49) for i in range(50)]
    ratios += [0.1 + 0.8 * i / 200 for i in range(1, 200)]
    ratios += [1 - value for value in reversed(ratios[:50])]
    frames = [frame(mu) for mu in ratios]
    svg = drawing(frames[0])
    html = """<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="robots" content="noindex, nofollow, indexifembedded">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Lagrange points and mass ratio</title>
<style>
body { margin: 0; font-family: sans-serif; color: #292524; background: white; }
.animation { display: flex; flex-direction: column; align-items: center; gap: 4px; height: 100vh; }
svg { width: 100%; flex: 1; min-height: 0; }
.controls { display: flex; align-items: center; flex-wrap: wrap; flex-shrink: 0; gap: 12px; padding: 4px; }
input { width: min(300px, 45vw); }
</style></head><body><div class="animation">
SVG
<div class="controls">
<label for="mass-slider">Mass ratio π₂</label>
<input id="mass-slider" type="range" min="0" max="LAST" step="1" value="0">
</div></div><script>
const frames = FRAMES;
const slider = document.querySelector('#mass-slider');
const svg = document.querySelector('svg');
const point = (x, y) => `${450 + 250 * x},${350 - 250 * y}`;
function render() {
  const [mu, l1, l2, l3] = frames[Number(slider.value)];
  const top = Math.sqrt(3) / 2;
  const positions = {L1: [l1, 0], L2: [l2, 0], L3: [l3, 0],
    L4: [0.5 - mu, top], L5: [0.5 - mu, -top], m1: [-mu, 0], m2: [1 - mu, 0]};
  for (const [id, [x, y]] of Object.entries(positions)) {
    svg.querySelector(`#${id}`).setAttribute('transform', `translate(${point(x, y)})`);
  }
  svg.querySelector('#m1-orbit').setAttribute('r', 250 * mu);
  svg.querySelector('#m2-orbit').setAttribute('r', 250 * (1 - mu));
  svg.querySelector('#equilateral').setAttribute('points',
    [positions.m1, positions.L4, positions.m2, positions.L5, positions.m1]
      .map(([x, y]) => point(x, y)).join(' '));
  const value = mu.toPrecision(5);
  svg.querySelector('#mass-ratio').textContent = `π₂ = ${value}`;
  slider.setAttribute('aria-valuetext', value);
}
slider.addEventListener('input', render);
render();
</script></body></html>
"""
    html = (
        html.replace("SVG", svg)
        .replace("LAST", str(len(frames) - 1))
        .replace("FRAMES", json.dumps(frames, separators=(",", ":")))
    )
    output = Path(__file__).resolve().parent
    (output / "lagrange-points-animate.svg").write_text(svg, encoding="utf-8")
    (output / "lagrange-points-animate.html").write_text(html, encoding="utf-8")


if __name__ == "__main__":
    main()
