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

# Planetary Arrival: Capture Example

These examples apply the [planetary arrival and capture equations](./planetary-arrival-capture.md) to reentry at Earth and capture into orbit around Venus.

## Reentry Corridor

To give an idea of the order of magnitude of the size of the reentry corridor, let's take the example of an Earth return trajectory from Mars. By convention, spacecraft enter Earth's atmosphere at the [**Kármán line**](https://en.wikipedia.org/wiki/K%C3%A1rm%C3%A1n_line), an imaginary line at an altitude of 100 km where the density of the atmosphere is significant. This gives $r_p$ values ranging from 6,378–6,478 km.

Next, let's compute $v_{\infty}$ for an arrival from Mars.

```{code-cell} ipython3
import math as m
mu = 1.32712E11  # km**3/s**2, Sun

r_i = 2.27939E8  # km, Mars
r_f = 1.49598E8  # km, Earth

v_f = m.sqrt(mu / r_f)  # km/s, Earth

a_t = (r_i + r_f) / 2  # km
E_t = - mu / (2 * a_t)  # km**2/s**2
v_t2 = m.sqrt(2 * (E_t + mu / r_f))  # km/s

Delta_vt = abs(v_f - v_t2)  # km/s
```

Here, $v_f$ is the orbital velocity of Earth relative to the Sun, {eval}`f"{v_f:.3f}"` km/s. $v_{t,2}$ is the velocity of the spacecraft on the Hohmann transfer ellipse relative to the Sun, {eval}`f"{v_t2:.3f}"` km/s. This gives $\Delta v = v_{\infty} =$ {eval}`f"{Delta_vt:.3f}"` km/s.

Now, we can calculate the eccentricity, semimajor axis, and offset distance of the geocentric hyperbola given the two $r_p$ values at the surface of the Earth and at the Kármán line.

```{code-cell} ipython3
v_infty = Delta_vt

r_1 = 6378  # km
r_2 = 6478  # km
mu_f = 3.986E5  # km**3/s**2

e_1 = 1 + r_1 * v_infty**2 / mu_f
e_2 = 1 + r_2 * v_infty**2 / mu_f

a = mu_f / v_infty**2  # km

y_1 = a * m.sqrt(e_1**2 - 1)  # km
y_2 = a * m.sqrt(e_2**2 - 1)  # km
radius = y_2 - y_1
```

The offset distance to have $r_p =$ 6,378 km is $y_1 =$ {eval}`f"{y_1:.1f}"` km and to hit the edge of the atmosphere, $y_2 =$ {eval}`f"{y_2:.1f}"` km. This gives an annulus of thickness {eval}`f"{radius:.1f}"` km that the spacecraft must be within to arrive in Earth's atmosphere. This is approximately the distance from Storrs, CT to the Statue of Liberty. If Earth was the size of a baseball, the reentry corridor would be about the thickness of a credit card.

## Capture Orbit

Let's continue the example of the Hohmann transfer from Neptune to Venus. At arrival at Venus, we want to enter a 300-km-altitude circular orbit to conduct atmospheric observations. What is the offset distance required to achieve this orbit? What is the required $\Delta v$?

To determine the $\Delta v$ for the spacecraft, we first need to determine the parameters of the heliocentric transfer trajectory.

```{code-cell} ipython3
import math as m
mu = 1.32712E11  # km**3/s**2, Sun

r_i = 4.53239E9  # km, Neptune
r_f = 1.08209E8  # km, Venus

v_f = m.sqrt(mu / r_f)  # km/s, Venus

a_t = (r_i + r_f) / 2  # km
E_t = - mu / (2 * a_t)  # km**2/s**2
v_t2 = m.sqrt(2 * (E_t + mu / r_f))  # km/s

Delta_vt = abs(v_f - v_t2)  # km/s
```

Here, `v_f` is the heliocentric orbital velocity of Venus, and `v_t2` is the spacecraft velocity on the heliocentric transfer orbit at Venus's orbital radius relative to the Sun. `Delta_vt` is the change in velocity needed between Venus's orbital velocity and the transfer orbit velocity. In other words, this is the spacecraft speed relative to Venus at the end of the heliocentric transfer orbit.

`Delta_vt` is equal to $v_{\infty}$ that the spacecraft has at the SOI for the Venus-centered hyperbolic arrival trajectory. In addition, we know that the capture orbit altitude, and therefore the altitude of the hyperbolic periapsis, is 300 km. Using this we can find the periapsis radius and velocity.

```{code-cell} ipython3
v_infty = Delta_vt

r_Venus = 6051.8  # km
mu_f = 3.24859E5  # km**3/s**2

r_p = r_Venus + 300  # km

e = 1 + r_p * v_infty**2 / mu_f
a = mu_f / v_infty**2  # km

y = a * m.sqrt(e**2 - 1)  # km
h = y * v_infty  # km**2/s
v_p = h / r_p  # km/s
```

The eccentricity of the arrival hyperbola is $e =$ {eval}`f"{e:.5f}"`, the offset distance is {eval}`f"{y:.2f}"` km, and the speed at periapsis is $v_p =$ {eval}`f"{v_p:.3f}"` km/s.

Next, we need to calculate the velocity on the circular capture orbit. Since the radius of the capture orbit is the same as the hyperbolic periapsis radius, calculating the speed can be done by @eq:circular-orbit-velocity. Then, we can calculate $\Delta v$.

```{code-cell} ipython3
v_p_capture = m.sqrt(mu_f / r_p)

Delta_v = abs(v_p - v_p_capture)
```

The velocity on the capture orbit is {eval}`f"{v_p_capture:.2f}"` km/s and the $\Delta v$ is {eval}`f"{Delta_v:.2f}"` km/s.

To extend the problem, we can plot the $\Delta v$ for several $r_p$ values, as a function of capture orbit eccentricity.

```{code-cell} ipython3
:tags:[remove-cell]
from bokeh.io import output_notebook
output_notebook(hide_banner=True)
```

```{code-cell} ipython3
import numpy as np
from bokeh.plotting import figure

r_p_array = np.linspace(r_Venus, r_Venus + 5000, 3)
e_array = np.linspace(0, 0.99, 100)
r_p_array, capture_e_array = np.meshgrid(r_p_array, e_array)

hyp_e_array = 1 + r_p_array * v_infty**2 / mu_f
hyp_a = mu_f / v_infty**2  # km

hyp_y = hyp_a * np.sqrt(hyp_e_array**2 - 1)  # km
hyp_h = hyp_y * v_infty  # km**2/s
v_p = hyp_h / r_p_array  # km/s

a_array = r_p_array / (1 - capture_e_array)
E_array = -mu_f / (2 * a_array)
v_p_capture = np.sqrt(2 * (E_array + mu_f / r_p_array))

Delta_v_array = np.abs(v_p - v_p_capture).T

p = figure(
    width=600,
    height=350,
    x_axis_label="Eccentricity [-]",
    y_axis_label="𝛥v [km/s]"
)
colors = ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f"]
for i, row in enumerate(Delta_v_array):
    p.line(
        capture_e_array[:, 0],
        row,
        legend_label=f"r_p = {r_p_array[0, i]:.0f} km",
        color=colors[i],
    )
```

```{code-cell} ipython3
:tags: [remove-cell]
:label: code:hohmann-arrival-r_p_e_plot
from bokeh.plotting import show

show(p)
```

:::{figure} #code:hohmann-arrival-r_p_e_plot
:name: fig:hohmann-arrival-r_p_e_plot

The required $\Delta v$ to enter a capture orbit of the given periapsis radius. The eccentricity is plotted on the x-axis of the chart. For this range of $r_p$ values, the $\Delta v$ increases at fixed $e$. For a fixed $r_p$, $\Delta v$ decreases as $e$ increases.
:::

@fig:hohmann-arrival-r_p_e_plot shows the required $\Delta v$ to enter a capture orbit as a function of the eccentricity. For each value of $r_p$, $\Delta v$ decreases as $e$ increases, as we discussed earlier. In addition, for a given value of $e$, $\Delta v$ increases as $r_p$ increases.

## Minimum Capture $\Delta v$

Using @eq:interplanetary-arrival-minimum-delta-v-r_a from the [capture theory](./planetary-arrival-capture.md), we can compare the optimal apoapsis distances for arrivals at Venus.

For the example here, we can calculate the optimal $r_a$:

```{code-cell} ipython3
r_a = 2 * mu_f / v_infty**2
```

The optimal apoapsis distance is {eval}`f"{r_a:.2f}"` km. This radius is inside the surface of Venus, so we cannot achieve the optimal $\Delta v$ with these parameters.

Notice that the optimal $r_a$ value is inversely proportional to the square of $v_{\infty}$. Thus, a decrease in $v_{\infty}$ will result in an increase in $r_a$. For instance, transferring from Mars instead of Neptune, we find:

```{code-cell} ipython3
r_i_mars = 2.27939E8  # km, Mars

a_t_mars = (r_i_mars + r_f) / 2  # km
E_t_mars = - mu / (2 * a_t_mars)  # km**2/s**2
v_t2_mars = m.sqrt(2 * (E_t_mars + mu / r_f))  # km/s

Delta_vt_mars = abs(v_f - v_t2_mars)  # km/s
r_a_mars = 2 * mu_f / Delta_vt_mars**2
```

The $v_{\infty}$ when transferring from Mars is {eval}`f"{Delta_vt_mars:.2f}"` km/s, giving an optimal apoapsis radius of {eval}`f"{r_a_mars:.2f}"` km. This is well outside Venus's radius, so would be achievable by the spacecraft.
