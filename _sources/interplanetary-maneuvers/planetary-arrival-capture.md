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

# Planetary Arrival: Capture

In an interplanetary transfer, when we arrive at the target planet, we have three choices of trajectory:

1. Impact the planet
2. Go into orbit around the planet
3. Flyby the planet, using the planet's angular momentum to change the spacecraft's heliocentric trajectory

In this section, we'll talk about the first two options, and discuss flyby trajectories in the next section.

## Arrival Trajectory

When arriving at the target planet, the spacecraft will cross the sphere of influence *ahead of* or *behind* the planet on the planet's orbital path.

- **Inner to Outer Planet**: The spacecraft velocity is lower than the planet's orbital velocity. The spacecraft crosses the sphere of influence *in front* of the planet. This is shown in {numref}`fig:interplanetary-arrival`.
  :::{figure} ../images/interplanetary-arrival.svg
  :name: fig:interplanetary-arrival
  :width: 50%

  Arrival phase of a trajectory from an inner planet to an outer planet.
  :::

- **Outer to Inner Planet**: The spacecraft velocity is higher than the planet's orbital velocity. The spacecraft crosses the sphere of influence *behind* the planet. This is shown in {numref}`fig:interplanetary-arrival-inward-transfer`.

  :::{figure} ../images/interplanetary-arrival-inward-transfer.svg
  :name: fig:interplanetary-arrival-inward-transfer
  :width: 50%

  Arrival phase of a trajectory from an outer planet to an inner planet.
  :::

In {numref}`fig:interplanetary-arrival` and {numref}`fig:interplanetary-arrival-inward-transfer`, we see that the spacecraft crosses the sphere of influence at some **offset distance** or **aiming radius**, $y$, perpendicular to the planet's orbital path. The offset distance is determined by the desired periapsis radius of the arrival hyperbola, $r_p$.

## Orbital Elements of Arrival Trajectory

As with the [departure trajectory](./planetary-departure-trajectory.md), we must choose the value of $r_p$ that we want for the hyperbola. If we want to impact the planet, in the absence of an atomsphere, then we should choose the radius of the planet as $r_p$. If an atmosphere is present, then an altitude at the approximate edge of the atmosphere would be more appropriate.

On the other hand, we may want to enter an orbit around the planet, either to conduct a science mission or perform system checks before a deorbit burn. In this case, $r_p$ should be well above the atmosphere.

In either case, once $r_p$ is chosen, we can calculate the eccentricity of the arrival trajectory using Eq. {eq}`eq:interplanetary-hyperbola-eccentricity`:

:::{math}
:label: eq:interplanetary-arrival-eccentricity

e = 1 + \frac{r_p v_{\infty}^2}{\mu_f}
:::

where $\mu_f$ is the gravitational parameter of the target planet and $v_{\infty}$ is the hyperbolic excess velocity relative to the planet:

:::{math}
:label: eq:interplanetary-arrival-v_infty

v_{\infty} = \lvert v_{t,f} - v_f \rvert
:::

With the eccentricity determined, we can calculate the semimajor axis of the hyperbola using Eq. {eq}`eq:interplanetary-hyperbola-semimajor-axis`:

:::{math}
:label: eq:interplanetary-arrival-semimajor-axis

a = \frac{\mu_f}{v_{\infty}^2}
:::

Finally, it turns out that the offset distance is equal to the semiminor axis distance of the hyperbola, given by Eq. {eq}`eq:hyperbolic-semi-minor-axis`:

:::{math}
:label: eq:interplanetary-arrival-offset-distance

y = a \sqrt{e^2 - 1}
:::

With the eccentricity and semimajor axis, we can determine any of the other orbital elements.

## Reentry Corridor

Depending on the mission design, we may want to impact the planetary atmosphere from the hyperbolic approach trajectory. In that case, the offset distance must be precisely determined so that the hyperbolic periapsis radius is within the atmosphere. There is a small range of values of the offset distance that will achieve this, depending on the height of the atmosphere.

In addition, since the plane of the hyperbolic arrival trajectory can be rotated around the center of the planet, there is a surface of possible arrival trajectories (much like the surface of departure trajectories). Combined with the range of offset distances, this gives a small annulus where the hyperbola will impact the atmosphere. This annulus is called the [**reentry corridor**](https://web.archive.org/web/20211115092141/https://www.faa.gov/about/office_org/headquarters_offices/avs/offices/aam/cami/library/online_libraries/aerospace_medicine/tutorial/media/iii.4.1.7_returning_from_space.pdf).

The size of the reentry corridor depends on:

- the hyperbolic excess speed, which in turn depends on where the spacecraft is coming from
- the height of the atmosphere of the planet
- the gravitational parameter of the planet

### Example

To give an idea of the order of magnitude of the size of the reentry corridor, let's take the example of an Earth return trajectory from Mars. By convention, spacecraft enter Earth's atmosphere at the [**Kármán line**](https://en.wikipedia.org/wiki/K%C3%A1rm%C3%A1n_line), an imaginary line at an altitude of 100 km where the density of the atmosphere is signifcant. This gives $r_p$ values ranging from 6,378–6,478 km.

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

```{code-cell} ipython3
:tags: [remove-cell]
from functools import partial
from myst_nb import glue as mystglue
glue = partial(mystglue, display=False)
glue("reentry-corridor-v_f", v_f)
glue("reentry-corridor-v_t2", v_t2)
glue("reentry-corridor-Delta_vt", Delta_vt)
```

Here, $v_f$ is the orbital velocity of Earth relative to the sun, {glue:text}`reentry-corridor-v_f:.3f` km/s. $v_{t,2}$ is the velocity of the spacecraft on the Hohmann transfer ellipse relative to the sun, {glue:text}`reentry-corridor-v_t2:.3f` km/s. This gives $\Delta v = v_{\infty} =$ {glue:text}`reentry-corridor-Delta_vt:.3f` km/s.

Now, we can calculate the eccentricity, semimajor axis, and offset distance of the geocentric hyperbola given the two $r_p$ values at the surface of the earth and at the Kármán line.

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
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("reentry-corridor-e_1", e_1)
glue("reentry-corridor-e_2", e_2)
glue("reentry-corridor-a", a)
glue("reentry-corridor-y_1", y_1)
glue("reentry-corridor-y_2", y_2)
glue("reentry-corridor-radius", y_2 - y_1)
```

The offset distance to have $r_p =$ 6,378 km is $y_1 =$ {glue:text}`reentry-corridor-y_1:.1f` km and to hit the edge of the atmosphere, $y_2 =$ {glue:text}`reentry-corridor-y_2:.1f` km. This gives an annulus of thickness {glue:text}`reentry-corridor-radius:.1f` km that the spacecraft must be within to arrive in Earth's atmosphere. This is approximately the distance from Storrs, CT to the Statue of Liberty. If Earth was the size of a baseball, the reentry corridor would be about the thickness of a credit card.

## $\Delta v$ for a Capture Orbit

If the spacecraft is to impact the planet or its atmosphere, then we do not need to be worried about a $\Delta v$ maneuver, in general. However, if the spacecraft will enter a capture orbit, then it must conduct a burn to change from the hyperbolic trajectory to a circular or elliptical orbit.

As with other $\Delta v$ calculations, we need to determine the velocity of the spacecraft on the initial trajectory, the hyperbola in this case, where it intersects with the capture orbit. We also need the velocity of the spacecraft on the capture orbit at the intersection point.

Once the velocities are determined, $\Delta v$ is calculated by taking the absolute value of their difference:

:::{math}
:label: eq:interplanetary-arrival-delta-v

\Delta v = \lvert v_p - v_{p,\text{capture}}\rvert
:::

### Hyperbolic Trajectory

We will assume that the maneuver occurs at the periapsis of the hyperbolic trajectory. The velocity at the periapsis of the hyperbola can be found from the energy:

:::{math}
:label: eq:interplanetary-arrival-hyperbolic-periapsis-velocity

v_p = \sqrt{v_{\infty}^2 + \frac{2 \mu_f}{r_p}}
:::

Alternatively, the angular momentum of the hyperbola can be calculated because the offset distance is perpendicular to the excess velocity:

:::{math}
:label: eq:interplanetary-arrival-hyperbolic-angular-momentum

h = v_{\infty} y
:::

Then, the velocity and radius at periapsis are also perpendicular, and the angular momentum is constant:

:::{math}
:label: eq:interplanetary-arrival-hyperbolic-periapsis-velocity-2

v_p = \frac{h}{r_p} = \frac{v_{\infty}y}{r_p}
:::

### Capture Orbit

To determine the capture orbit, we need to decide on two factors:

1. Where in the capture orbit, relative to the capture orbit's periapsis, will the transfer occur
2. The eccentricity of the capture orbit

Usually we will assume that the transfer occurs at the periapsis of the capture orbit. This will give the minimum $\Delta v$ requirement, since it is the point where the velocity is highest on the capture orbit, and therefore the place where the velocity on the capture orbit is closest to the hyperbolic velocity.

Then, since the transfer must occur where the orbits intersect, the radial coordinate at the transfer point is $r_p$.

Next, we need to choose a capture orbit eccentricity. The choice of eccentricity of the capture orbit depends on what your mission objectives are. If you are going into a capture orbit to conduct system checks followed by a landing mission, or if your mission is to study the planet with on-board instruments, you may want to choose an orbit with small eccentricity to maximize the time close to the planet.

Another option might include a mission that involves transfers to moons or other bodies in the planetary system. Then, a higher eccentricity orbit might be more appropriate. Finally, if the mission is constrained by the available propellant, then this might also dictate your choice of eccentricity.

Regardless of how the eccentricity is determined, we can immediately state a few facts about the transfer:

1. The eccentricity must be between 0.0 and 1.0. If the eccentricity of the capture orbit is greater than or equal to 1.0, then it is not a capture orbit but a parabolic or hyperbolic escape trajectory.
2. The highest $\Delta v$ requirement is to enter a circular capture orbit. Intuitively, we expect that if the eccentricity does not change and the spacecraft does a hyperbolic flyby, the $\Delta v$ is zero. Thus, larger eccentricity changes require larger $\Delta v$. The largest possible eccentricity change is to reduce the eccentricity to zero, therefore requiring the largest $\Delta v$, assuming that the transfer happens at periapsis of the capture orbit.

Once the transfer point and eccentricity of the capture orbit are determined, we can use the methods from [](../the-orbit-equation/elliptical-orbits.md) to calculate the velocity at periapsis. One method would be to calculate the semimajor axis of the orbit:

:::{math}
:label: eq:interplanetary-arrival-capture-semimajor-axis
a = \frac{r_p}{1 - e}
:::

Then, we can calculate the capture orbit energy:

:::{math}
:label: eq:interplanetary-arrival-specific-energy
E_{\text{capture}} = -\frac{\mu_f}{2a}
:::

Finally, the velocity is:

:::{math}
:label: eq:interplanetary-arrival-periapsis-velocity
v_{p,\text{capture}} = \sqrt{2 \left(E_{\text{capture}} + \frac{\mu_f}{r_p}\right)}
:::

## Example

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

```{code-cell} ipython3
:tags: [remove-cell]
from functools import partial
from myst_nb import glue as mystglue
glue = partial(mystglue, display=False)
glue("hohmann-arrival-v_f", v_f)
glue("hohmann-arrival-v_t1", v_t2)
glue("hohmann-arrival-Delta_vt", Delta_vt)
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

```{code-cell} ipython3
:tags: [remove-cell]
glue("hohmann-arrival-e", e)
glue("hohmann-arrival-a", a)
glue("hohmann-arrival-y", y)
glue("hohmann-arrival-v_p", v_p)
```

The eccentricity of the arrival hyperbola is $e =$ {glue:text}`hohmann-arrival-e:.5f`, the offset distance is {glue:text}`hohmann-arrival-y:.2f` km, and the speed at periapsis is $v_p =$ {glue:text}`hohmann-arrival-v_p:.3f` km/s.

Next, we need to calculate the velocity on the circular capture orbit. Since the radius of the capture orbit is the same as the hyperbolic periapsis radius, calculating the speed can be done by Eq. {eq}`eq:circular-orbit-velocity`. Then, we can calculate $\Delta v$.

```{code-cell} ipython3
v_p_capture = m.sqrt(mu_f / r_p)

Delta_v = abs(v_p - v_p_capture)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("hohmann-arrival-v_p_capture", v_p_capture)
glue("hohmann-arrival-Delta_v", Delta_v)
```

The velocity on the capture orbit is {glue:text}`hohmann-arrival-v_p_capture:.2f` km/s and the $\Delta v$ is {glue:text}`hohmann-arrival-Delta_v:.2f` km/s.

To extend the problem, we can plot the $\Delta v$ for several $r_p$ values, as a function of capture orbit eccentricity.

```{code-cell} ipython3
from bokeh.plotting import figure
import numpy as np

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
      plot_width=600,
      plot_height=350,
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
:tags: [remove-input]
from myst_nb_bokeh import glue_bokeh
glue_bokeh("hohmann-arrival-r_p_e_plot", p)
```

:::{glue:figure} hohmann-arrival-r_p_e_plot
:name: fig:hohmann-arrival-r_p_e_plot

The required $\Delta v$ to enter a capture orbit of the given periapsis radius. The eccentricity is plotted on the x-axis of the chart. For this range of $r_p$ values, the $\Delta v$ increases at fixed $e$. For a fixed $r_p$, $\Delta v$ decreases as $e$ increases.
:::

{numref}`fig:hohmann-arrival-r_p_e_plot` shows the required $\Delta v$ to enter a capture orbit as a function of the eccentricity. For each value of $r_p$, $\Delta v$ decreases as $e$ increases, as we discussed earlier. In addition, for a given value of $e$, $\Delta v$ increases as $r_p$ increases.

:::{margin}
Page 409, 4th edition.
:::

As it happens, there is a minimum of $\Delta v$ with respect to $r_p$. Following {cite:t}`Curtis2020`, we can take derivatives of Eq. {eq}`eq:interplanetary-arrival-delta-v` to find the optimal value of $r_p$ to minimize $\Delta v$. This turns out to be:

:::{math}
:label: eq:interplanetary-arrival-minimum-delta-v-r_p

r_{p,\text{optimal}} = \frac{2 \mu_f}{v_{\infty}^2}\frac{1 - e}{1 + e}
:::

Plugging this relationship into Eq. {eq}`eq:ellipse-periapsis-apoapsis-ratio`, we can find the optimal apoapsis radius:

:::{math}
:label: eq:interplanetary-arrival-minimum-delta-v-r_a

r_{a,\text{optimal}} = \frac{2 \mu_f}{v_{\infty}^2}
:::

Thus, the optimal apoapsis radius is independent of the capture orbit eccentricity. Solving for the minimum $\Delta v$, we find:

:::{math}
:label: eq:interplanetary-arrival-optimal-delta-v

\Delta v_{\text{optimal}} = v_{\infty} \sqrt{\frac{1 - e}{2}}
:::

Finally, we can solve for the offset distance required to achieve the minimum $\Delta v$:

:::{math}
:label: eq:interplanetary-arrival-optimal-offset-distance

y_{\text{optimal}} = r_{p,\text{optimal}}\sqrt{\frac{2}{1 - e}}
:::

Notice that Eqs. {eq}`eq:interplanetary-arrival-minimum-delta-v-r_p`, {eq}`eq:interplanetary-arrival-optimal-delta-v`, and {eq}`eq:interplanetary-arrival-optimal-offset-distance` all depend on the eccentricity of the capture orbit.

---

For the example here, we can calculate the optimal $r_a$:

```{code-cell} ipython3
r_a = 2 * mu_f / v_infty**2
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("hohmann-arrival-r_a", r_a)
```

The optimal apoapsis distance is {glue:text}`hohmann-arrival-r_a:.2f` km. This radius is inside the surface of Venus, so we cannot achieve the optimal $\Delta v$ with these parameters.

Notice that the optimal $r_a$ value is inversely proportional to the square of $v_{\infty}$. Thus, a decrease in $v_{\infty}$ will result in an increase in $r_a$. For instance, transferring from Mars instead of Neptune, we find:

```{code-cell} ipython3
r_i_mars = 2.27939E8  # km, Mars

a_t_mars = (r_i_mars + r_f) / 2  # km
E_t_mars = - mu / (2 * a_t_mars)  # km**2/s**2
v_t2_mars = m.sqrt(2 * (E_t_mars + mu / r_f))  # km/s

Delta_vt_mars = abs(v_f - v_t2_mars)  # km/s
r_a_mars = 2 * mu_f / Delta_vt_mars**2
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("hohmann-arrival-mars-delta_vt", Delta_vt_mars)
glue("hohmann-arrival-mars-r_a", r_a_mars)
```

The $v_{\infty}$ when transferring from Mars is {glue:text}`hohmann-arrival-mars-delta_vt:.2f` km/s, giving an optimal apoapsis radius of {glue:text}`hohmann-arrival-mars-r_a:.2f` km. This is well outside Venus's radius, so would be achievable by the spacecraft.
