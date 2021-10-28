---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.3-dev
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Non-Hohmann Transfers: Common Apse Line Example

A satellite is in a 3,500 km by 14,500 km orbit around Earth. At 150° of true anomaly, the satellite conducts an impulsive maneuver for reentry at the apse line. Determine the $\Delta v$ and the angle relative to local horizontal that the thrust vector makes.

Note that in this case there will only be a single impulse and we will assume that reentry occurs at the radius of Earth, 6378.1 km. The original and the transfer orbit have the same apse line and the same focus. We will use Eq. {eq}`eq:non-hohmann-delta-v-scalar` to determine $\Delta v$ and Eq. {eq}`eq:non-hohmann-thrust-direction` to determine $\gamma$. These equations both require the velocity vector at 150° true anomaly on the original orbit and the transfer orbit.

First we will find the orbital elements for the original orbit.

```{code-cell} ipython3
import math as m

mu = 3.986E5  # km**3/s**2
R_E = 6378.1  # km
nu_A = m.radians(150)  # rad
r_p_i = 3500 + R_E  # km
r_a_i = 14500 + R_E  # km

a_i = (r_p_i + r_a_i) / 2
e_i = (r_a_i - r_p_i) / (r_a_i + r_p_i)
p_i = a_i * (1 - e_i**2)
```

```{code-cell} ipython3
:tags: [remove-cell]
from myst_nb import glue as myst_glue
from functools import partial
glue = partial(myst_glue, display=False)

glue("common-apse-line-a_i", a_i)
glue("common-apse-line-e_i", e_i)
```

The semimajor axis is $a_i =$ {glue:text}`common-apse-line-a_i:.2f` km and the eccentricity is $e_i =$ {glue:text}`common-apse-line-e_i:.4f`. Next, we need to calculate $r_A$ and $r_B$ to determine the orbital parameters for the transfer orbit.

There is no target orbit; rather, the target is a point on the apse line at the radius of Earth. Thus, $r_B =$ 6378.1 km and $\nu_B =$ 0°. $r_A$ is found from the orbit equation on the initial orbit. Then, Eq. {eq}`eq:non-hohmann-orbital-elements` is used to find the orbital elements.

```{code-cell} ipython3
r_A = p_i / (1 + e_i * m.cos(nu_A))
r_B = R_E
nu_B = 0  # rad

e_t = (r_B - r_A) / (r_A * m.cos(nu_A) - r_B * m.cos(nu_B))
p_t = r_A * r_B * (m.cos(nu_A) - m.cos(nu_B)) / (r_A * m.cos(nu_A) - r_B * m.cos(nu_B))
a_t = p_t / (1 - e_t**2)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("common-apse-line-e_t", e_t)
glue("common-apse-line-a_t", a_t)
```

The semimajor axis is $a_t =$ {glue:text}`common-apse-line-a_t:.2f` km and the eccentricity is $e_t =$ {glue:text}`common-apse-line-e_t:.4f`. Now we have enough information to determine the velocity components and the flight path angles on the original orbit and the transfer orbit.

```{code-cell} ipython3
h_i = m.sqrt(p_i * mu)
h_t = m.sqrt(p_t * mu)

v_p_i = h_i / r_A
v_p_t = h_t / r_A

v_r_i = mu / h_i * e_i * m.sin(nu_A)
v_r_t = mu / h_t * e_t * m.sin(nu_A)

v_i = m.sqrt(v_p_i**2 + v_r_i**2)
v_t = m.sqrt(v_p_t**2 + v_r_t**2)

phi_i = m.degrees(m.atan2(v_r_i, v_p_i))
phi_t = m.degrees(m.atan2(v_r_t, v_p_t))
```

```{code-cell} ipython3
:tags: [remove-cell]
loc = locals()
for n in ("v_p", "v_r", "v", "phi"):
    name = n + "_i"
    glue("common-apse-line-" + name, loc[name])
    name = n + "_t"
    glue("common-apse-line-" + name, loc[name])
```

The velocities and flight angles are shown in {numref}`tab:common-apse-line`.

:::{table} Velocity components and flight path angles on the original and transfer orbits
:name: tab:common-apse-line
:align: center

|  | Initial | Transfer |
|:-|:--------|:---------|
| $v_{\perp}$ (km/s) | {glue:text}`common-apse-line-v_p_i:.2f` | {glue:text}`common-apse-line-v_p_t:.2f` |
| $v_{r}$ (km/s) | {glue:text}`common-apse-line-v_r_i:.2f` | {glue:text}`common-apse-line-v_r_t:.2f` |
| $v$ (km/s) | {glue:text}`common-apse-line-v_i:.2f` | {glue:text}`common-apse-line-v_t:.2f` |
| $\phi$ (deg.) | {glue:text}`common-apse-line-phi_i:.2f` | {glue:text}`common-apse-line-phi_t:.2f` |

:::

Finally, we can compute $\Delta v$ and $\gamma$.

```{code-cell} ipython3
Delta_v = m.sqrt(v_i**2 + v_t**2 - 2 * v_i * v_t * m.cos(m.radians(phi_t - phi_i)))
gamma = m.degrees(m.atan2(v_r_t - v_r_i, v_p_t - v_p_i))
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("common-apse-line-Delta_v", Delta_v)
glue("common-apse-line-gamma", gamma)
```

The required $\Delta v=$ {glue:text}`common-apse-line-Delta_v:.4f` km/s and the angle of the thrust vector is $\gamma =$ {glue:text}`common-apse-line-gamma:.2f`°.
