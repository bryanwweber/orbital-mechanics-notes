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

In this section, we'll talk about the first two options, and discuss [flyby trajectories](./planetary-arrival-flyby.md) in a later section.

## Arrival Trajectory

When arriving at the target planet, the spacecraft will cross the sphere of influence *ahead of* or *behind* the planet on the planet's orbital path.

- **Inner to Outer Planet**: The spacecraft velocity is lower than the planet's orbital velocity. The spacecraft crosses the sphere of influence *in front* of the planet. This is shown in @fig:interplanetary-arrival.

  :::{figure} ../../images/interplanetary-arrival.svg
  :name: fig:interplanetary-arrival
  :width: 50%

  Arrival phase of a trajectory from an inner planet to an outer planet.
  :::

- **Outer to Inner Planet**: The spacecraft velocity is higher than the planet's orbital velocity. The spacecraft crosses the sphere of influence *behind* the planet. This is shown in @fig:interplanetary-arrival-inward-transfer.

  :::{figure} ../../images/interplanetary-arrival-inward-transfer.svg
  :name: fig:interplanetary-arrival-inward-transfer
  :width: 50%

  Arrival phase of a trajectory from an outer planet to an inner planet.
  :::

In @fig:interplanetary-arrival and @fig:interplanetary-arrival-inward-transfer, we see that the spacecraft crosses the sphere of influence at some **offset distance** or **aiming radius**, $y$, perpendicular to the planet's orbital path. The offset distance is determined by the desired periapsis radius of the arrival hyperbola, $r_p$.

## Orbital Elements of Arrival Trajectory

As with the [departure trajectory](./planetary-departure-trajectory.md), we must choose the value of $r_p$ that we want for the hyperbola. If we want to impact the planet, in the absence of an atmosphere, then we should choose the radius of the planet as $r_p$. If an atmosphere is present, then an altitude at the approximate edge of the atmosphere would be more appropriate.

On the other hand, we may want to enter an orbit around the planet, either to conduct a science mission or perform system checks before a deorbit burn. In this case, $r_p$ should be well above the atmosphere.

In either case, once $r_p$ is chosen, we can calculate the eccentricity of the arrival trajectory using @eq:interplanetary-hyperbola-eccentricity:

:::{math}
:label: eq:interplanetary-arrival-eccentricity

e = 1 + \frac{r_p v_{\infty}^2}{\mu_f}
:::

where $\mu_f$ is the gravitational parameter of the target planet and $v_{\infty}$ is the hyperbolic excess velocity relative to the planet:

:::{math}
:label: eq:interplanetary-arrival-v_infty

v_{\infty} = \lvert v_{t,f} - v_f \rvert
:::

With the eccentricity determined, we can calculate the semimajor axis of the hyperbola using @eq:interplanetary-hyperbola-semimajor-axis:

:::{math}
:label: eq:interplanetary-arrival-semimajor-axis

a = \frac{\mu_f}{v_{\infty}^2}
:::

Finally, it turns out that the offset distance is equal to the semiminor axis distance of the hyperbola, given by @eq:hyperbolic-semi-minor-axis:

:::{math}
:label: eq:interplanetary-arrival-offset-distance

y = a \sqrt{e^2 - 1}
:::

With the eccentricity and semimajor axis, we can determine any of the other orbital elements.

## Reentry Corridor

Depending on the mission design, we may want to impact the planetary atmosphere from the hyperbolic approach trajectory. In that case, the offset distance must be precisely determined so that the hyperbolic periapsis radius is within the atmosphere. There is a small range of values of the offset distance that will achieve this, depending on the height of the atmosphere.

In addition, since the plane of the hyperbolic arrival trajectory can be rotated around the center of the planet, there is a surface of possible arrival trajectories, much like the surface of departure trajectories. Combined with the range of offset distances, this gives a small annulus where the hyperbola will impact the atmosphere. This annulus is called the [**reentry corridor**](https://web.archive.org/web/20211115092141/https://www.faa.gov/about/office_org/headquarters_offices/avs/offices/aam/cami/library/online_libraries/aerospace_medicine/tutorial/media/iii.4.1.7_returning_from_space.pdf).

The size of the reentry corridor depends on:

- the hyperbolic excess speed, which in turn depends on where the spacecraft is coming from
- the height of the atmosphere of the planet
- the gravitational parameter of the planet

The [worked examples](./planetary-arrival-capture-example.md#reentry-corridor) calculate the size of the reentry corridor for a return from Mars to Earth.

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

## Minimum $\Delta v$ for Capture

As it happens, there is a minimum of $\Delta v$ with respect to $r_p$. Following [@Curtis2020, pp. 409, 4th ed], we can take derivatives of @eq:interplanetary-arrival-delta-v to find the optimal value of $r_p$ to minimize $\Delta v$. This turns out to be:

:::{math}
:label: eq:interplanetary-arrival-minimum-delta-v-r_p

r_{p,\text{optimal}} = \frac{2 \mu_f}{v_{\infty}^2}\frac{1 - e}{1 + e}
:::

Plugging this relationship into @eq:ellipse-periapsis-apoapsis-ratio, we can find the optimal apoapsis radius:

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

Notice that @eq:interplanetary-arrival-minimum-delta-v-r_p, @eq:interplanetary-arrival-optimal-delta-v, and @eq:interplanetary-arrival-optimal-offset-distance all depend on the eccentricity of the capture orbit.

See the [worked examples](./planetary-arrival-capture-example.md) for reentry at Earth and capture into orbit around Venus.
