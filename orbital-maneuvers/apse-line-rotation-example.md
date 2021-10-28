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

# Non-Hohmann Transfers: Apse Line Rotation Example

Another case of non-Hohmann orbital transfers are when the apse line of the orbit should be changed. To accomplish the transfer with one impulse, the initial and target orbits must intersect at at least one point. If the orbits do not intersect, then it will require at least two impulses to accomplish the total maneuver, using an intermediate transfer orbit. The case of multiple impulses is a generalization of the single-impulse case shown here.

In general, two orbits with different apse lines and a common focus will intersect in two locations, as shown in {numref}`fig:two-ellipses-intersecting`. We can choose either location to perform the maneuver that switches from one orbit to the other.

In this case, the orbital elements of both orbits are specified, as well as the desired rotation of the apse line. The problem is to find the true anomaly at which the maneuver takes place on the initial orbit, as well as the required $\Delta v$ to perform the maneuver.

Let $\eta$ be the rotation angle of the apse line. Then, in terms of the true anomalies on the initial and final orbits, we find that:

:::{math}
:label: eq:apse-line-rotation-angle

\eta = \nu_i - \nu_f
:::

Since the initial and final orbits both have their elements specified, we can use the orbit equation, Eq. {eq}`eq:scalar-orbit-equation` applied at the intersection point to solve for $\nu_i$ and $\nu_f$. We find:

:::{math}
:label: eq:apse-line-rotation-orbit-equation
e_i p_f \cos\nu_i - e_f p_i \cos\nu_f = p_i - p_f
:::

We can a trigonometric identity to further simplify Eq. {eq}`eq:apse-line-rotation-orbit-equation` to be in terms of $\nu_i$ only:

:::{math}
:label: eq:apse-line-rotation-in-nu_i
e_i p_f \cos\nu_i - e_f p_i \cos\nu_i \cos\eta - e_f p_i \sin\nu_i \sin\eta = p_i - p_f
:::

In Eq. {eq}`eq:apse-line-rotation-in-nu_i`, $e_i$, $e_f$, $p_i$, $p_f$, and $\eta$ are all known, so the equation can be solved for $\nu_i$. There are two roots of Eq. {eq}`eq:apse-line-rotation-in-nu_i`. Letting:

:::{math}
:label: eq:apse-line-rotation-a-b-c
\begin{aligned}
  a &= e_i p_f - e_f p_i \cos\eta & b &= -e_f p_i \sin\eta & c &= p_i - p_f
\end{aligned}
:::

the two roots of Eq. {eq}`eq:apse-line-rotation-in-nu_i` are given by:

:::{math}
:label: eq:apse-line-rotation-nu-roots
\nu_i = \alpha \pm \cos^{-1}\left(\frac{c}{a}\cos\alpha\right)
:::

where $a$, $b$, and $c$ are given by Eq. {eq}`eq:apse-line-rotation-a-b-c` and $\alpha$ is given by:

:::{math}
:label: eq:apse-line-rotation-alpha

\alpha = \tan^{-1}\frac{b}{a}
:::

Subsequently, $\nu_f$ can be found from Eq. {eq}`eq:apse-line-rotation-angle`.

## Example

An Earth satellite is in an 8000 km by 16,000 km orbit. Calculate the $\Delta v$ and the true anomaly $\nu_i$ required to obtain a 7000 km by 21,000 km orbit whose apse line is rotated 25° counterclockwise.

First, we need to determine the orbital parameters of the initial orbit. Then we can find the intersection point of the transfer, giving us $\nu_i$ and $\nu_f$. Finally, we will use the true anomalies of the intersection point on each orbit to determine the velocity components and the change of flight path angle, similar to the [common apse line example](./common-apse-line-example.md).

```{code-cell} ipython3
import math as m

mu = 3.986E5  # km**3/s**2
R_E = 6_378.1  # km

eta = m.radians(25)

r_p_i = 8_000 + R_E
r_a_i = 16_000 + R_E
a_i = (r_p_i + r_a_i) / 2
e_i = 1 - r_p_i / a_i
p_i = a_i * (1 - e_i**2)

r_p_f = 7_000 + R_E
r_a_f = 21_000 + R_E
a_f = (r_p_f + r_a_f) / 2
e_f = 1 - r_p_f / a_f
p_f = a_f * (1 - e_f**2)

a = e_i * p_f - e_f * p_i * m.cos(eta)
b = -e_f * p_i * m.sin(eta)
c = p_i - p_f

alpha = m.atan2(b, a)
nu_i = (alpha - m.acos(c / a * m.cos(alpha))) % (2*m.pi)
nu_f = (nu_i - eta) % (2*m.pi)
```

```{code-cell} ipython3
:tags: [remove-cell]
from myst_nb import glue as myst_glue
from functools import partial
glue = partial(myst_glue, display=False)

glue("apse-line-rotation-a_i", a_i)
glue("apse-line-rotation-e_i", e_i)
glue("apse-line-rotation-a_f", a_f)
glue("apse-line-rotation-e_f", e_f)
glue("apse-line-rotation-nu_i", m.degrees(nu_i))
glue("apse-line-rotation-nu_f", m.degrees(nu_f))
```

The results are shown in {numref}`tab:apse-line-rotation-nu-results`. We chose the negative sign in Eq. {eq}`eq:apse-line-rotation-nu-roots` for convenience. Choosing the positive sign would give a different, although valid, result.

:::{table} Velocity components and flight path angles on the original and transfer orbits
:name: tab:apse-line-rotation-nu-results
:align: center

|  | Initial | Final |
|:-|:--------|:------|
| $a$ (km/s) | {glue:text}`apse-line-rotation-a_i:.2f` | {glue:text}`apse-line-rotation-a_f:.2f` |
| $e$ | {glue:text}`apse-line-rotation-e_i:.2f` | {glue:text}`apse-line-rotation-e_f:.2f` |
| $\nu$ (deg.) | {glue:text}`apse-line-rotation-nu_i:.2f` | {glue:text}`apse-line-rotation-nu_f:.2f` |
:::

With the orbital elements fully determined for both orbits, we can calculate the velocity components, $\Delta v$, and $\gamma$.

```{code-cell} ipython3
h_i = m.sqrt(p_i * mu)
h_f = m.sqrt(p_f * mu)

r = p_i / (1 + e_i * m.cos(nu_i))

v_p_i = h_i / r
v_p_f = h_f / r

v_r_i = mu / h_i * e_i * m.sin(nu_i)
v_r_f = mu / h_f * e_f * m.sin(nu_f)

v_i = m.sqrt(v_p_i**2 + v_r_i**2)
v_f = m.sqrt(v_p_f**2 + v_r_f**2)

phi_i = m.degrees(m.atan2(v_r_i, v_p_i))
phi_f = m.degrees(m.atan2(v_r_f, v_p_f))

Delta_v = m.sqrt(v_i**2 + v_f**2 - 2 * v_i * v_f * m.cos(m.radians(phi_f - phi_i)))
gamma = m.degrees(m.atan2(v_r_f - v_r_i, v_p_f - v_p_i))
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("apse-line-rotation-r", r)
glue("apse-line-rotation-delta-v", Delta_v)
glue("apse-line-rotation-gamma", gamma)
loc = locals()
for n in ("v_p", "v_r", "v", "phi"):
    name = n + "_i"
    glue("apse-line-rotation-" + name, loc[name])
    name = n + "_f"
    glue("apse-line-rotation-" + name, loc[name])
```

The radius at the impulse point is $r =$ {glue:text}`apse-line-rotation-r:.2f` km, the $\Delta v=$ {glue:text}`apse-line-rotation-delta-v:.2f` km/s, and the thrust vector angle is $\gamma =$ {glue:text}`apse-line-rotation-gamma:.2f`°. The velocity components and flight path angles are shown in {numref}`tab:apse-line-rotation`.

:::{table} Velocity components and flight path angles on the original and transfer orbits
:name: tab:apse-line-rotation
:align: center

|  | Initial | Transfer |
|:-|:--------|:---------|
| $v_{\perp}$ (km/s) | {glue:text}`apse-line-rotation-v_p_i:.2f` | {glue:text}`apse-line-rotation-v_p_f:.2f` |
| $v_{r}$ (km/s) | {glue:text}`apse-line-rotation-v_r_i:.2f` | {glue:text}`apse-line-rotation-v_r_f:.2f` |
| $v$ (km/s) | {glue:text}`apse-line-rotation-v_i:.2f` | {glue:text}`apse-line-rotation-v_f:.2f` |
| $\phi$ (deg.) | {glue:text}`apse-line-rotation-phi_i:.2f` | {glue:text}`apse-line-rotation-phi_f:.2f` |
:::
