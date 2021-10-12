---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Example: Single Impulse Orbital Change

For the case of a single-impulse orbital maneuver, the initial and final orbits must intersect at some point. Then, the $\Delta \vector{v}$ that is needed to change from one orbit to the other is given by:

$$\Delta \vector{v} = \vector{v}_2 - \vector{v}_1$$

where the two velocities are determined at the point of intersection of the two orbits. The equation can be simplified to involve only velocity magnitudes when the velocity vectors are parallel at the point of intersection.

Let's consider a case where we want to deorbit a spacecraft from low Earth orbit. To deorbit a spacecraft, we need to place it in an orbit that will intersect the atmosphere. Once in the atmosphere, drag will take over and reduce the velocity to the terminal velocity. As a simplification, we will neglect the atmosphere. This means we will determine the true anomaly when the spacecraft reaches the surface of the earth, or when the orbital radius is equal to the earth's radius.

Initially, the spacecraft is in a circular orbit at 1000 km altitude. We define the apse line pointing to the right along the $x$ axis, as usual. When the spacecraft reaches the apse line, an impulsive thrust is provided to put the spacecraft on the deorbit trajectory, which will be an ellipse. We would like the spacecraft to impact at a point 145° from the impulse point. This situation is shown in {numref}`fig:single-impulse-example-orbit`.

```{code-cell} ipython3
:tags: [remove-cell]

import matplotlib.pyplot as plt
from matplotlib.patches import Circle, Arc
import numpy as np
from myst_nb import glue
# from sympy import symbols, Eq, solve
# h, e = symbols("h,e", real=True)

R_E = 6378  # km
orbit_radius = 1000  # km
mu = 398_600  # km**2/s**3
theta = np.radians(35)
earth = Circle((0, 0), R_E, facecolor="paleturquoise", edgecolor="None")
orbit = Circle((0, 0), R_E + orbit_radius, facecolor="None", edgecolor="black")

e_2 = orbit_radius / (R_E + orbit_radius + R_E * np.cos(theta))
h_2 = np.sqrt((R_E + orbit_radius) * mu * (1 - e_2))
# apoapsis = Eq((h**2 / mu / (1 - e)), R_E + orbit_radius)
# impact = Eq((h**2 / mu / (1 + e * np.cos(theta))), R_E)
# solution = solve((apoapsis, impact), (h, e))
# # If multiple solutions are found take the one with both values positive
# if len(solution[0]) > 1:
#     sol = solution[0]
#     if all(i > 0 for i in sol):
#         pass
#     else:
#         sol = solution[1]
#     h_2, e_2 = float(sol[0]), float(sol[1])

a = h_2**2 / mu / (1 - e_2**2)
b = a * np.sqrt(1 - e_2**2)
transfer = Arc((R_E + orbit_radius - a, 0), 2*a, 2*b, theta2=np.degrees(np.pi - theta),
               edgecolor="red", linestyle="--")
A = (R_E + orbit_radius, 0)
B = (R_E * np.cos(np.pi - theta), R_E * np.sin(np.pi - theta))

fig, ax = plt.subplots(figsize=(7, 7))
plt.rc("font", size=20)
ax.set_aspect("equal")
ax.set_axis_off()
ax.set_clip_on(False)
ax.set_xlim(-R_E - orbit_radius*2, R_E + orbit_radius*2)
ax.set_ylim(-R_E - orbit_radius*2, R_E + orbit_radius*2)
ax.add_patch(earth)
ax.add_patch(orbit)
ax.add_patch(transfer)
ax.plot(*A, "ko")
ax.plot(*B, "ko")
ax.annotate("Impulse", xy=A, xytext=(10, 10), textcoords="offset points", ha="left", va="center")
ax.annotate("Impact", xy=B, xytext=(10, 10), textcoords="offset points", ha="left", va="top")
ax.annotate("Earth", xy=(0, -4000), ha="center", va="center")
ax.plot([0, (R_E + orbit_radius + 500) * np.cos(np.pi - theta)], [0, (R_E + orbit_radius + 500) * np.sin(np.pi - theta)], color="black", lw=1)
ax.plot([0, R_E + orbit_radius + 500], [0, 0], color="black", lw=1)
ax.add_patch(Arc((0, 0), 2000, 2000, theta2=np.degrees(np.pi - theta)))
ann = (np.pi - theta) / 2
ax.annotate(f"{np.degrees(np.pi - theta):.0F}°", xy=(1250 * np.cos(ann), 1250*np.sin(ann)))
glue("single-impulse-example-orbit", fig, display=False)
```

:::{glue:figure} single-impulse-example-orbit
:name: fig:single-impulse-example-orbit

A deorbit maneuver conducted by a providing a single impulse to the spacecraft.
:::

We are interested in calculating the $\Delta v$ required to perform this maneuver. Since the impact orbit and the initial orbit intersect at one point, we can use a single impulse transfer to perform the maneuver. Therefore, the $\Delta v$ is given by the difference in velocities at the impulse point. Since the velocity vectors are parallel for the initial and impact orbits at the impulse point, we can work entirely in magnitudes.

To find $\Delta v$, we need to calculate two velocities:

1. The velocity on the circular orbit, $v_1$
2. The velocity on the impact orbit at the impulse point, $v_2$

Although the impact orbit is only a segment of the elliptical orbit, it nonetheless has the same properties as any other elliptical orbit. In particular, the apogee altitude is given by the altitude of the initial orbit, and the perigee altitude is actually inside the earth. This means that the apse line of the impact orbit actually points to the _left_ on the figure above. Thus, the velocity on the impact orbit at the impulse point is actually the apogee velocity, given by:

$$v_2 = v_a = \frac{h}{r_a}$$

where $h$ is the specific orbital angular momentum and $r_a$ is the radius of the earth plus the initial orbital altitude. Therefore this problem reduces to finding the specific orbital angular momentum of the impact orbit.

To find the specific angular momentum, we can use the equations for an elliptical orbit. We know at apogee, $\nu =$ 180°, such that the orbit equation is:

$$r_a = \frac{h^2}{\mu}\frac{1}{1 - e}$$

In addition, we know that at the impact point, $\nu =$ 180° - 145° and $r = R_E$. Thus:

$$R_E = \frac{h^2}{\mu}\frac{1}{1 + e\cos\nu}$$

Now we have two equations and two unknowns, $h$ and $e$. Solving these equations simultaneously, we can find $h$.

Finally, the velocity of the spacecraft on the circular orbit is:

$$v_1 = \sqrt{\frac{\mu}{r_a}}$$

```{code-cell} ipython3
import numpy as np

R_E = 6378  # km
mu = 398_600  # km**2/s**3

altitude = 1000 # km
impact_point = np.radians(145)
nu = np.pi - impact_point

r_a = R_E + altitude

v_1 = np.sqrt(mu / r_a)

# It turns out to be easier to solve for e first and then for h
e = altitude / (r_a + R_E * np.cos(nu))
h = np.sqrt((r_a) * mu * (1 - e))

v_2 = h / (r_a)

Δv = v_2 - v_1
```

```{code-cell} python3
:tags: [remove-cell]
glue("single-impulse-delta-v", Δv, display=False)
```

The required velocity change is $\Delta v =$ {glue:text}`single-impulse-delta-v:.4f` km/s, meaning the spacecraft must slow down by that amount to transfer to the impact orbit.
