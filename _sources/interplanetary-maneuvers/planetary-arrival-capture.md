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

There is a very small corridor where the spacecraft will hit the atmosphere of the target planet. Let's use Earth as an example; Earth's atmosphere is, say, 100 km tall, giving a periapsis radius range of 6,378—6,478 km. For an arrival from Mars, the $v_{\infty}$ is XXXX. This gives an offset distance range of YYYY—ZZZZ.

## $\Delta v$ for a Capture Orbit

If the spacecraft is to impact the planet or its atmosphere, then we do not need to be worried about a $\Delta v$ maneuver, in general. However, if the spacecraft will enter a capture orbit, then it must conduct a burn to change from the hyperbolic trajectory to a circular or elliptical orbit.

As with other $\Delta v$ calculations, we need to determine the velocity of the spacecraft on the initial trajectory, the hyperbola in this case, where it intersects with the capture orbit. We also need the velocity of the spacecraft on the capture orbit at the intersection point.

We will assume that the maneuver occurs at the 
