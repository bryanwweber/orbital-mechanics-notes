---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: python3
---

# Time Since Periapsis, Mean Anomaly, and Eccentric Anomaly

In the last chapter, we derived equations for the position of an object in a two-body system as a function of the true anomaly. However, humans don't really think in terms of true anomaly, we think in terms of time. The only place time appeared in the last chapter was in the calculation of the orbital period.

As we'll find in this chapter, the equations to relate the orbital position to time are [**transcendental**](https://en.wikipedia.org/wiki/Transcendental_equation) for all but the circular orbit. This means we will need to use an approximation such as Newton's method to solve them. Initially, we will derive separate equations each for the elliptical, parabolic, and hyperbolic orbits. Then, we will combine these using a universal variable formulation.

## Time Since Periapsis

The goal of this chapter is to relate the time since periapsis, $t$, to an object's position in the orbit defined by the true anomaly, $\nu$. We know that the direct relationship between $t$ and $\nu$ is complex because the object speeds up near periapsis and slows down near apoapsis. This phenomenon is one of the insights from Kepler's second law, which states that equal areas are swept out in equal times.

Instead of trying to find this direct relationship between $t$ and $\nu$, we're going to take a different route that has three main steps:

1. Calculate an auxiliary angle from the true anomaly
2. Calculate another auxiliary angle from the orbital parameters such as the period, eccentricity, angular momentum, and time since periapsis
3. Relate these angle to each other so we can solve in either direction

### Mean and Eccentric Anomalies

Without providing any particular motivation yet for why these are useful, let's define the two auxiliary angles for any orbit. They will be called the:

1. **Mean anomaly**
2. **Eccentric anomaly**

:::{note}
Conceptually, it is easiest to understand the mean and eccentric anomalies in the context of an elliptical orbit. Just remember that they also apply to parabolic and hyperbolic trajectories as well.
:::

For an ellipse, we know that the angular speed of the spacecraft is a function of the true anomaly. This is a result of Kepler's second law, that equal areas are swept in equal times—the spacecraft must move faster near periapsis and slower near apoapsis to sweep the same area in a given time interval. Thus, the rate of change of the true anomaly is not constant!

:::{margin}
Such a circle is said to **circumscribe** the ellipse.
:::

The **mean anomaly** for an ellipse is defined such that it is a constant rate that gives the same period as the true anomaly. If we draw a circle that touches the ellipse at periapsis and apoapsis, then the rate of change of the mean anomaly is the rate at which a point must move around this circle to meet the spacecraft at periapsis and apoapsis.

The **eccentric anomaly** is defined slightly differently. Imagine the same circle that touches the ellipse at periapsis and apoapsis. Now draw a line perpendicular to the semimajor axis from the orbit to the circle, at the current true anomaly. The angle to the point defined in this way on the circle is the eccentric anomaly.

The three anomalies: true, mean, and eccentric, are shown in {numref}`fig:true-mean-eccentric-anomalies`.

```{code-cell} ipython3
:tags: [remove-cell]
import json
from pathlib import Path

import numpy as np
from IPython.display import HTML
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


E = newton(func=kepler, fprime=d_kepler_d_E, x0=np.ones_like(M_e) * np.pi, args=(M_e, e))
nu = (2 * np.arctan(np.sqrt((1 + e) / (1 - e)) * np.tan(E / 2))) % (2 * np.pi)
r = p / (1 + e * np.cos(nu))
# Scale and translate x, y coordinates to fit 400x400 SVG view
x = a * e + r * np.cos(nu)
y = r * np.sin(nu)
width = 450
height = 400

ellipse = np.vstack((x, y))
circle = np.vstack((a * np.cos(M_e), a * np.sin(M_e)))
eccentric = np.vstack((a * np.cos(E), a * np.sin(E)))
all_data_array = np.vstack((ellipse, circle, eccentric)).T + np.array([[width / 2, height / 2] * 3])
all_angles_array = np.vstack((nu[::-1], M_e[::-1], E[::-1])).T
all_data = json.dumps(np.hstack((all_data_array, all_angles_array)).tolist())
svg = f"""
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{width}" height="{height}" viewBox="0 0 {width} {height}" id="all-the-anomalies">
<path fill="white" stroke="none" d="M 0 0 L {width} 0 L {width} {height} L 0 {height}" />
<line stroke="black" stroke-width="1" x1="{width/2}" y1="5" x2="{width/2}" y2="{height-5}" />
<line stroke="black" stroke-width="1" x1="5" y1="{height/2}" x2="{width-5}" y2="{height/2}" />
<path stroke="black" fill="none" stroke-width="2" id="m1-to-E" d="M {width/2 + a - r_p} {height/2} L {width/2 + a - r_p} {height/2}" />
<g stroke="rgb(141,160,203)" fill="rgb(141,160,203)" stroke-width="2">
  <ellipse cx="{width/2}" cy="{height/2}" rx="{a}" ry="{b}" fill="none" />
  <circle id="m2" cx="{width/2 + a}" cy="{height/2}" r="4" stroke="none" />
  <path fill="none" id="true-anomaly" d="M {width/2 + a - r_p} {height/2} L {width/2 + a} {height/2}" />
  <path id="true-arc" fill="none" d="M {width/2 + a - r_p + 20} {height/2} A 20 20 0 0 0 {width/2 + a - r_p + 20} {height/2}" />
  <text x="0" y="10" font-size="16" text-anchor="start" dominant-baseline="hanging" stroke-width="1" id="true-text">True Anomaly</text>
</g>
<g stroke="rgb(252,141,98)" fill="rgb(252,141,98)" stroke-width="2">
  <circle cx="{width/2}" cy="{height/2}" r="{a}" fill="none" />
  <circle id="M" cx="{width/2 + a}" cy="{height/2}" r="4" stroke="none" />
  <path fill="none" id="mean-anomaly" d="M {width/2} {height/2} L {width/2 + a - r_p} {height/2}" />
  <path id="mean-arc" fill="none" d="M {width/2 + 50} {height/2} A 50 50 0 0 0 {width/2 + 50} {height/2}" />
  <text x="{width}" y="10" id="mean-text" font-size="16" stroke-width="1" dominant-baseline="hanging" text-anchor="end">Mean Anomaly</text>
</g>
<g stroke="rgb(102,194,165)" fill="rgb(102,194,165)" stroke-width="2">
  <circle id="E" cx="{width/2 + a}" cy="{height/2}" r="4" stroke="none"/>
  <path fill="none" id="eccentric-anomaly" d="M {width/2} {height/2} L {width/2 + a - r_p} {height/2}" />
  <path id="ecc-arc" fill="none" d="M {width/2 + 25} {height/2} A 25 25 0 0 0 {width/2 + 25} {height/2}" />
  <text x="0" y="{height - 5}" id="ecc-text" font-size="16" text-anchor="start" stroke-width="1" dominant-baseline="text-bottom">Eccentric Anomaly</text>
</g>
<circle cx="{width/2}" cy="{height/2}" r="4" fill="rgb(80%, 80%, 80%)" />
<circle cx="{width/2 + a - r_p}" cy="{height/2}" r="4" fill="rgb(80%, 80%, 80%)" />
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
const eccArcInitialPoint = [half_width + eccArcRadius, half_height];
const eccArcPathStart = `M ${{eccArcInitialPoint.join(' ')}} A ${{eccArcRadius}} ${{eccArcRadius}} 0`;

const trueArc = svg.querySelector('#true-arc');
const trueArcRadius = 20;
const trueArcInitialPoint = [half_width + a - r_p + trueArcRadius, half_height];
const trueArcPathStart = `M ${{trueArcInitialPoint.join(' ')}} A ${{trueArcRadius}} ${{trueArcRadius}} 0`;

const meanArc = svg.querySelector('#mean-arc');
const meanArcRadius = 50;
const meanArcInitialPoint = [half_width + meanArcRadius, half_height];
const meanArcPathStart = `M ${{meanArcInitialPoint.join(' ')}} A ${{meanArcRadius}} ${{meanArcRadius}} 0`;

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
  const newTrueAnomaly = `M {width/2 + a - r_p} {height/2} L ${{true_x}} ${{true_y}}`;
  const newMeanAnomaly = `M {width/2} {height/2} L ${{mean_x}} ${{mean_y}}`;
  const newEccentricAnomaly = `M {width/2} {height/2} L ${{ecc_x}} ${{ecc_y}}`;

  trueAnomaly.setAttribute('d', newTrueAnomaly);
  meanAnomaly.setAttribute('d', newMeanAnomaly);
  eccentricAnomaly.setAttribute('d', newEccentricAnomaly);
  m1ToE.setAttribute('d', `M ${{true_x}} ${{true_y}} L ${{ecc_x}} ${{ecc_y}}`);

  const largeArcFlag = E > Math.PI ? 1 : 0;
  const newEccArc = `${{eccArcPathStart}} ${{largeArcFlag}} 0 ${{half_width + eccArcRadius*Math.cos(E)}} ${{half_height - eccArcRadius*Math.sin(E)}}`;
  const newMeanArc = `${{meanArcPathStart}} ${{largeArcFlag}} 0 ${{half_width + meanArcRadius*Math.cos(M)}} ${{half_height - meanArcRadius*Math.sin(M)}}`;
  const newTrueArc = `${{trueArcPathStart}} ${{largeArcFlag}} 0 ${{half_width + a - r_p + trueArcRadius*Math.cos(nu)}} ${{half_height - trueArcRadius*Math.sin(nu)}}`;

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

</script>
"""
hh = HTML("""\
<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;" class="animation">
"""
    + svg
    + f"""\
<input id="ellipse-slider" type="range" min="1" max="{len(x)}" step="1" value="1" style="width: 200px;">
</div>"""
    + js
)
from myst_nb import glue
glue("true-mean-eccentric-anomalies", hh, display=False)
```

:::{glue:figure} true-mean-eccentric-anomalies
:name: fig:true-mean-eccentric-anomalies

The true, mean, and eccentric anomalies for an elliptical orbit. The true anomaly is shown in blue, the mean anomaly is shown in orange, and the eccentric anomaly is shown in green. The mean anomaly proceeds around the orange circle at a constant rate, while the rates of the true and eccentric anomalies vary with position. Nonetheless, they all meet at periapsis and apoapsis. Note the vertical line connecting the true and eccentric anomalies.
:::

(sec:time-since-periapsis-solution-procedures)=

## Solution Procedures

There are now two cases that we want to consider:

1. We know the current true anomaly and want to find the time since periapsis
2. We know the current time since periapsis and want to know the true anomaly

Each case is solved slightly differently, and the equations depend on the type of trajectory, so specific solutions for each type of trajectory will be shown in the following sections.

### Given True Anomaly, Find Time Since Periapsis

1. Use the true anomaly to find the eccentric anomaly
2. Use the eccentric anomaly to find the mean anomaly
3. Use the mean anomaly to find the time since periapsis

### Given Time Since Periapsis, Find True Anomaly

1. Use the time since periapsis to find the mean anomaly
2. Use the mean anomaly to find the eccentric anomaly
3. Use the eccentric anomaly to find the true anomaly

In the next sections, we will develop equations that relate the three anomalies and time since periapsis to each other.
