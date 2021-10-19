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

# Example: Comparison of Bi-elliptic and Two-Impulse Hohmann Transfers

As we discussed, bi-elliptic transfers can save $\Delta v$ requirement when the initial and target orbits have very different radii. When the target orbit radius is more than about 15.5 times larger than the initial radius (or vice versa), the bi-elliptic transfer is more energy efficient than the standard, two-impulse, Hohmann transfer.

In this example, we will explore this with some numbers, and also discuss the tradeoffs of a bielliptic transfer.

Let's start the initial orbit at the radius of the moon, 385,000 km, and set the target as an LEO orbit of 500 km altitude. Assuming both orbits are circular, we can find the initial and target orbital velocities using Eq. {eq}`eq:circular-orbit-velocity`:

```{code-cell} ipython3
:tags: [remove-cell]
from functools import partial
from myst_nb import glue as mystglue
glue = partial(mystglue, display=False)
```

```{code-cell} ipython3
import numpy as np

mu = 398_600.4418  # km**3/s**2
R_E = 6378  # km
r_1 = 385_000  # km

v_1 = np.sqrt(mu / r_1)  # km/s

r_3 = 500 + R_E  # km
v_3 = np.sqrt(mu / r_3)  # km/s
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("moon_circle_velocity", v_1)
glue("leo_circle_velocity", v_3)
```

This gives velocities of $v_1 =$ {glue:text}`moon_circle_velocity:.3f` km/s and $v_3 =$ {glue:text}`leo_circle_velocity:.3f` km/s.

Now we will calculate the standard two-impulse Hohmann transfer. The total $\Delta v$ for the transfer is the sum of the $\Delta v$ from the initial orbit onto the transfer orbit at perigee of the transfer, and the $\Delta v$ from the transfer orbit onto the target orbit at the apogee of the transfer.

First, we calculate the eccentricity, specific orbital angular momentum, and semimajor axis of the transfer orbit:

:::{math}
e_t = \frac{r_1 - r_3}{r_3 + r_1}
:::

:::{math}
h_t = \sqrt{\mu r_1 (1 - e)} = \sqrt{\mu r_3 (1 + e)}
:::

:::{math}
a_t = \frac{r_3 + r_1}{2}
:::

```{code-cell} ipython3
e_t = (r_1 - r_3) / (r_1 + r_3)
h_t = np.sqrt(r_1 * (1 - e_t) * mu)
a_t = (r_3 + r_1) / 2
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("e_t", e_t)
glue("h_t", h_t)
glue("a_t", a_t)
```

This gives $e_t =$ {glue:text}`e_t:.4f`, $h_t =$ {glue:text}`h_t:.3f` km<sup>2</sup>/s, and $a_t =$ {glue:text}`a_t:.4g` km. Now, the velocity at the perigee and apogee of the transfer orbit are determined from the specific orbital angular momentum.

```{code-cell} ipython3
v_p_t = h_t / r_3
v_a_t = h_t / r_1
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("v_p_t", v_p_t)
glue("v_a_t", v_a_t)
```

The velocity at the apogee of the transfer orbit is $v_{a,t} =$ {glue:text}`v_a_t:.3f` km/s, but the orbital velocity at the moon's orbit is over 1 km/s, a factor of nearly five. Now, let's calculate $\Delta v$:

```{code-cell} ipython3
delta_v_t = abs(v_p_t - v_3) + abs(v_1 - v_a_t)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("delta_v_t", delta_v_t)
```

The $\Delta v$ for the two-impulse Hohmann transfer is $\Delta v =$ {glue:text}`delta_v_t:.3f` km/s.

Next, let's do the bielliptic transfer. We pick $r_2 =$ 770,000 km, that is, apogee of the transfer orbit is 770,000 km from the center of the Earth. Now, we can calculate the eccentricity, specific orbital angular momentum, and velocities for the two transfer ellipses.

```{code-cell} ipython3
r_2 = 770_000  # km
e_t1 = (r_2 - r_1) / (r_1 + r_2)
h_t1 = np.sqrt(r_2 * (1 - e_t1) * mu)
v_p_t1 = h_t1 / r_1
v_a_t1 = h_t1 / r_2

e_t2 = (r_2 - r_3) / (r_3 + r_2)
h_t2 = np.sqrt(r_2 * (1 - e_t2) * mu)
v_p_t2 = h_t2 / r_3
v_a_t2 = h_t2 / r_2
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("e_t1", e_t1)
glue("e_t2", e_t2)
glue("v_p_t1", v_p_t1)
glue("v_p_t2", v_p_t2)
glue("v_a_t1", v_a_t1)
glue("v_a_t2", v_a_t2)
```

These velocities are $v_{p,t1} =$ {glue:text}`v_p_t1:.3f` km/s, $v_{a,t1} =$ {glue:text}`v_a_t1:.3f` km/s, $v_{p,t2} =$ {glue:text}`v_p_t2:.3f` km/s, and $v_{a,t2} =$ {glue:text}`v_a_t2:.3f` km/s.

The difference in apogee velocities between the two transfer orbits is about 0.5 km/s, and now the velocity difference at lunar orbit is only about 0.18 km/s, much lower than before. The total $\Delta v$ for these three impulses is:

```{code-cell} ipython3
delta_v_b = abs(v_p_t1 - v_1) + abs(v_a_t2 - v_a_t1) + abs(v_p_t2 - v_3)
delta_v_diff = abs(delta_v_t - delta_v_b) * 1000  # m/s
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("delta_v_b", delta_v_b)
glue("delta_v_diff", delta_v_diff)
glue("delta_v_percent", delta_v_diff / delta_v_t / 10)
```

For the bi-elliptic transfer, $\Delta v =$ {glue:text}`delta_v_b:.3f` km/s, about {glue:text}`delta_v_diff:.0f` m/s, or {glue:text}`delta_v_percent:.2f`% less than the two-impulse Hohmann transfer.

Assuming a 1000 kg spacecraft with an $I_{sp}$ of 300 s, this results in a savings of propellant of:

```{code-cell} ipython3
delta_m_t = 1000 * (1 - np.exp(-delta_v_t / (300 * 9.81E-3)))
delta_m_b = 1000 * (1 - np.exp(- delta_v_b / (300 * 9.81E-3)))
delta_m_diff = abs(delta_m_t - delta_m_b)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("delta_m_diff", delta_m_diff)
```

The difference is {glue:text}`delta_m_diff:.1f` kg per 1000 kg of spacecraft mass.

Although those numbers seem small, let's put them in context. For the Falcon 9, the [Full Thrust](https://en.wikipedia.org/wiki/Falcon_9_Full_Thrust) variant has a mass of 549,000 kg. The savings from the bi-elliptic transfer means that about 7,000 kg of fuel can be diverted to another use. The total payload capacity to Low Earth Orbit is about [23,000 kg](https://www.spacex.com/vehicles/falcon-9/), so this is a significant savings. Although this is a simplistic model of the rocket, we can at least see the order of magnitude of savings that are possible.

On the other hand, the downside of the bielliptic transfer is the transit time. The period of an ellipse is given by Eq. {eq}`eq:ellipse-period-useful`.

```{code-cell} ipython3
t_h = np.pi / np.sqrt(mu) * a_t**(3/2)
a_be_1 = (r_2 + r_1) / 2
a_be_2 = (r_2 + r_3) / 2
t_be = np.pi / np.sqrt(mu) * (a_be_1**(3/2) + a_be_2**(3/2))
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("t_h", t_h / 86_400)
glue("t_be", t_be / 86_400)
glue("t_ratio", t_be / t_h)
```

The transfer time for the two-impulse Hohmann transfer is $t_h =$ {glue:text}`t_h:.3f` days, and for the bi-elliptic transfer it is $t_{be} =$ {glue:text}`t_be:.3f` days. The transfer time is almost {glue:text}`t_ratio:.0f`x longer for the bielliptic transfer!
