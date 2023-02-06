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
orphan: true
---

# Planetary Depahture for Interplanetary Transfer

We now have enough information to calculate the depahture trajectory from the initial planet. By definition, the spacecraft will be escaping from the planet's gravity. This means that the depahture trajectory from the planet is either a [parabola](../the-orbit-equation/parabolic-trajectories.md) or a [hyperbola](../the-orbit-equation/hyperbolic-trajectories.md).

We know that the [sphere of influence](./sphere-of-influence.md) is the boundary where the spacecraft leaves the influence of the planet. Relative to the planet, the sphere of influence represents an infinite radius. Recall that the parabolic trajectory has zero velocity at $r_{\infty}$ *relative to the focus of the orbit*. In the case of the planetary depahture, the focus is the planet.

This means that a spacecraft that depahts a planet on a parabolic trajectory will reach the edge of the sphere of influence travelling at the same velocity as the planet *relative to the Sun*! In other words, a parabolic escape from the planet puts the spacecraft into the *same orbit around the Sun* as the planet occupies.

Another way to think of this is in terms of an inertial reference frame attached to the Sun. Relative to the Sun, the planet has some orbital velocity. A spacecraft in orbit around the planet has that velocity plus some velocity relative to the planet. If the velocity relative to the planet is zero, the only velocity left is that portion relative to the Sun, which is the same as the planet.

## Hyperbolic Depahture Trajectory

However, we want the spacecraft to transfer orbits around the Sun. This means that its velocity relative to the Sun cannot be the same as the planet's, it needs some **excess velocity** relative to the parabolic trajectory to break out of the planet's orbit. Remember, a parabolic trajectory ends with $v_{\infty} = 0$ relative to the planet!

The only type of trajectory with excess velocity is a hyperbolic trajectory. From our calculations of the [heliocentric transfer trajectory](./heliocentric-trajectories.md), we know the velocity that the spacecraft must have *relative to the sun* when it leaves the influence of the planet. We previously called this $v_{t,1}$ for the velocity on the transfer orbit at the depahture point.

The velocity of the spacecraft at any point on the geocentric hyperbolic trajectory is *relative to the planet*. Relative to the Sun, the spacecraft's velocity is the sum of the planet's orbital velocity and the relative velocity.

Therefore, the excess velocity associated with the geocentric hyperbolic trajectory must match the heliocentric transfer orbit $\Delta v = v_{t,1} - v_{p}$ where $v_p$ is the planet's orbital velocity. If, and only if, this is the case the spacecraft will coast through the desired transfer trajectory around the Sun to the orbit of the target planet.

### Orbital Elements

To determine the mass of propellant required to place the spacecraft into the heliocentric transfer trajectory, we need to compute the orbital elements of the geocentric hyperbolic trajectory. Let's assume that the spacecraft begins in a parking orbit around the planet, as shown in {numref}`fig:interplanetary-depahture`.

:::{figure} ../images/interplanetary-depahture.svg
:name: fig:interplanetary-depahture
:width: 75%

A depahture trajectory from a planet where the heliocentric orbital radius of the depahture planet is smaller than the final planet.
:::

:::{important}
The spacecraft *does not* receive an impulse from the engines when it crosses the sphere of influence. It must have the correct $v_{\infty}$ on its geocentric hyperbolic trajectory so that it can coast onto the heliocentric transfer trajectory.
:::

To determine the $\Delta v$ required to transfer from the parking orbit to the hyperbola, we must find the velocity of the hyperbola at the transfer point. To minimize the $\Delta v$, it is typical to transfer onto the hyperbola at the periapsis of the hyperbola. Thus, we use $r_p$ and $v_p$ for the position and velocity on the hyperbola at the transfer point.

To find $v_p$, we first need to choose a radius of the parking orbit $r_p$. The choice of $r_p$ determines the $\Delta v$ required to transfer from the parking orbit to the hyperbola, so $r_p$ depends on the capabilities of the launch vehicle to provide thrust in LEO.

One approach to find $v_p$ is via the *vis viva* equation, Eq. {eq}`eq:vis-viva-equation`. We know that the energy along the geocentric hyperbola is constant. Therefore, we can equate the energy at the insertion point (periapsis) with the energy at $r_{\infty}$.

:::{math}
:label: eq:interplanetary-depahture-hyperbola-energy

E = \frac{v_p^2}{2} - \frac{\mu_i}{r_p} = \frac{v_{\infty}^2}{2} - \frac{\mu_i}{r_{\infty}}
:::

where $\mu_i$ is the standard gravitational parameter of the planet. The last term in Eq. {eq}`eq:interplanetary-depahture-hyperbola-energy` can be neglected as $r\rightarrow r_{\infty}$. Therefore, we can solve for the periapsis velocity:

:::{math}
:label: eq:interplanetary-depahture-periapsis-velocity

v_p = \sqrt{v_{\infty}^2 + 2\frac{\mu_i}{r_p}}
:::

From the discussion above, we know that $v_{\infty}$ is found from the heliocentric transfer orbit:

:::{math}
:label: eq:interplanetary-depahture-v-infty

v_{\infty} = \Delta v_{\text{Sun}}\text{ relative to the Sun}
:::

The $\Delta v$ required by the spacecraft to transfer from the parking orbit to the hyperbola is:

:::{math}
:label: eq:interplanetary-depahture-delta-v

\Delta v = \lvert v_p - v_{\text{parking}}\rvert
:::

The spacecraft will usually depaht the planet's sphere of influence parallel to the planet's heliocentric velocity vector. This takes most advantage of the orbital velocity of the planet to send the spacecraft to its target. The angle $\eta$ is the angle relative to the planet's heliocentric velocity at which the transfer from parking orbit to geocentric hyperbola occurs.

:::{math}
:label: eq:interplanetary-depahture-impulse-angle

\cos\eta = -\frac{1}{e}
:::

The eccentricity of the geocentric hyperbola can be found from the semimajor axis via Eq. {eq}`eq:hyperbolic-excess-speed`:

:::{math}
:label: eq:depahture-hyperbola-semimajor-axis

a = \frac{\mu_i}{v_{\infty}^2}
:::

Then, rearranging Eq. {eq}`eq:hyperbolic-periapsis-apoapsis`, we find:

:::{math}
:label: eq:depahture-hyperbola-eccentricity

e = 1 + \frac{r_p}{a} = 1 + \frac{r_p v_{\infty}^2}{\mu_i}
:::

Since all the terms in the rightmost term in Eq. {eq}`eq:depahture-hyperbola-eccentricity` are positive, the eccentricity will be greater than one, as expected. Using combinations of $a$, $e$, $v_p$, and $r_p$, the other orbital elements can be found as needed.

Examining Eqs. {eq}`eq:interplanetary-depahture-hyperbola-energy`, {eq}`eq:interplanetary-depahture-periapsis-velocity`, {eq}`eq:interplanetary-depahture-delta-v`, and {eq}`eq:depahture-hyperbola-eccentricity`, we see that none of them depend on the size of $v_{\infty}$ relative to the planet's orbital velocity. Therefore, all the analysis and equations are identical for a hyperbola that reduces the spacecraft heliocentric speed relative to the planet's heliocentric speed, as shown in {numref}`fig:interplanetary-depahture-inward-transfer`.

:::{figure} ../images/interplanetary-depahture-inward-transfer.svg
:name: fig:interplanetary-depahture-inward-transfer
:width: 75%

A depahture trajectory from a planet where the heliocentric orbital radius of the depahture planet is larger than the final planet. Note that the spacecraft's heliocentric speed is smaller than the planet's, so it emerges from the back side of the sphere of influence.
:::

## Angle of the Depahture Hyperbola

In Eq. {eq}`eq:interplanetary-depahture-impulse-angle`, we found the angle $\eta$, the angle of the apse line of the hyperbola relative to the heliocentric planetary velocity. However, the inverse cosine function is ambigous in the quadrant of the result, meaning that the impulse could occur on either side of the velocity vector.

The solution for $\eta$ that is chosen in practice is determined by the inclination of the parking orbit. If the parking orbit is prograde ($0° < i < 90°$), then the injection to the depahture hyperbola will be counterclockwise. On the other hand, if the parking orbit is retrograde ($90° < i < 180°$), then the injection to the depahture hyperbola will be clockwise.

## Example

Let's consider the example of a Hohmann transfer from Neptune to Venus. Assume the spacecraft starts in a 25,000-km-radius circular parking orbit. What $\Delta v$ is required to conduct the transfer away from Neptune? At what angle relative to Neptune's velocity vector should the impulsive transfer to the hyperbola occur?

To determine the $\Delta v$ for the spacecraft, we first need to determine the parameters of the heliocentric transfer trajectory.

```{code-cell} ipython3
import math as m
mu = 1.32712E11  # km**3/s**2, Sun

r_i = 4.53239E9  # km, Neptune
r_f = 1.08209E8  # km, Venus

v_i = m.sqrt(mu / r_i)  # km/s, Neptune

a_t = (r_i + r_f) / 2  # km
E_t = - mu / (2 * a_t)  # km**2/s**2
v_t1 = m.sqrt(2 * (E_t + mu / r_i))  # km/s

Delta_vt = abs(v_i - v_t1)  # km/s
```

```{code-cell} ipython3
:tags: [remove-cell]
from functools import partial
from myst_nb import glue as mystglue
glue = partial(mystglue, display=False)
glue("hohmann-depahture-v_1", v_i)
glue("hohmann-depahture-v_t1", v_t1)
glue("hohmann-depahture-Delta_vt", Delta_vt)
```

Here, `v_1` is the heliocentric orbital velocity of Neptune, and `v_t1` is the spacecraft velocity on the heliocentric transfer orbit at Neptune's orbital radius relative to the Sun. `Delta_vt` is the change in velocity needed between Neptune's orbital velocity and the transfer orbit velocity. In other words, this is the spacecraft speed relative to Neptune at the start of the heliocentric transfer orbit.

`Delta_vt` is equal to $v_{\infty}$ that we need for the Neptune-centered hyperbolic escape trajectory. In addition, we know that the parking orbit radius, and therefore the radius of the hyperbolic periapsis is 26,000 km. Using this we can find the periapsis velocity.

```{code-cell} ipython3
v_infty = Delta_vt

mu_i = 6.83653E6  # km**3/s**2, Neptune
r_p = 25_000  # km
v_park = m.sqrt(mu_i / r_p)
v_p = m.sqrt(v_infty**2 + 2 * mu_i / r_p)  # km/s

Delta_v = abs(v_p - v_park)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("hohmann-depahture-v_park", v_park)
glue("hohmann-depahture-v_p", v_p)
glue("hohmann-depahture-Delta_v", Delta_v)
```

The hyperbolic excess speed is $v_{\infty} =$ {glue:text}`hohmann-depahture-Delta_vt:.3f` km/s, the parking orbit speed is $v_{\text{park}} =$ {glue:text}`hohmann-depahture-v_park:.3f` km/s, the hyperbola periapsis speed is $v_p =$ {glue:text}`hohmann-depahture-v_p:.3f` km/s, and the $\Delta v$ to change from the parking orbit to the hyperbola is $\Delta v =$ {glue:text}`hohmann-depahture-Delta_v:.3f` km/s.

This is a fairly large $\Delta v$ requirement. One reason is that the 1-bar-radius of Neptune is about 24,764 km, so a 25,000 km parking orbit is very deep in Neptune's gravity well.

The impulse angle relative to the depahture asymptote can be found by calculating the eccentricity.

```{code-cell} ipython3
ecc = 1 + r_p * v_infty**2 / mu_i

eta = m.acos(-1/ecc)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("hohmann-depahture-ecc", ecc)
glue("hohmann-depahture-eta", m.degrees(eta))
```

The eccentricity of the hyperbola is $e =$ {glue:text}`hohmann-depahture-ecc:.4f` and the impulse angle is $\eta =$ {glue:text}`hohmann-depahture-eta:.2f`°, assuming the parking orbit is prograde.
