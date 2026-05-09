# Planetary Departure for Interplanetary Transfer

We now have enough information to calculate the departure trajectory from the initial planet. By definition, the spacecraft will be escaping from the planet's gravity. This means that the departure trajectory from the planet is either a [parabola](../the-orbit-equation/parabolic-trajectories.md) or a [hyperbola](../the-orbit-equation/hyperbolic-trajectories.md).

We know that the [sphere of influence](./sphere-of-influence.md) is the boundary where the spacecraft leaves the influence of the planet. Relative to the planet, the sphere of influence represents an infinite radius. Recall that the parabolic trajectory has zero velocity at $r_{\infty}$ *relative to the focus of the orbit*. In the case of the planetary departure, the focus is the planet.

This means that a spacecraft that departs a planet on a parabolic trajectory will reach the edge of the sphere of influence traveling at the same velocity as the planet *relative to the Sun*! In other words, a parabolic escape from the planet puts the spacecraft into the *same orbit around the Sun* as the planet occupies.

Another way to think of this is in terms of an inertial reference frame attached to the Sun. Relative to the Sun, the planet has some orbital velocity. A spacecraft in orbit around the planet has that velocity plus some velocity relative to the planet. If the velocity relative to the planet is zero, the only velocity left is that portion relative to the Sun, which is the same as the planet.

## Hyperbolic Departure Trajectory

However, we want the spacecraft to transfer orbits around the Sun. This means that its velocity relative to the Sun cannot be the same as the planet's, it needs some **excess velocity** relative to the parabolic trajectory to break out of the planet's orbit. Remember, a parabolic trajectory ends with $v_{\infty} = 0$ relative to the planet!

The only type of trajectory with excess velocity is a hyperbolic trajectory. From our calculations of the [heliocentric transfer trajectory](./heliocentric-trajectories.md), we know the velocity that the spacecraft must have *relative to the Sun* when it leaves the influence of the planet. We previously called this $v_{t,1}$ for the velocity on the transfer orbit at the departure point.

The velocity of the spacecraft at any point on the geocentric hyperbolic trajectory is *relative to the planet*. Relative to the Sun, the spacecraft's velocity is the sum of the planet's orbital velocity and the relative velocity.

Therefore, the excess velocity associated with the geocentric hyperbolic trajectory must match the heliocentric transfer orbit $\Delta v_{\text{Sun}} = v_{t,1} - v_{\text{Planet}}$ where $v_{\text{Planet}}$ is the planet's orbital velocity relative to the Sun. If, and only if, this is the case the spacecraft will coast through the desired transfer trajectory around the Sun to the orbit of the target planet.

### Orbital Elements

To determine the mass of propellant required to place the spacecraft into the heliocentric transfer trajectory, we need to compute the orbital elements of the geocentric hyperbolic trajectory. Let's assume that the spacecraft begins in a parking orbit around the planet, as shown in @fig:interplanetary-departure.

:::{figure} ../../images/interplanetary-departure.svg
:name: fig:interplanetary-departure
:width: 75%

A departure trajectory from a planet where the heliocentric orbital radius of the departure planet is smaller than the final planet.
:::

From the parking orbit, the spacecraft conducts an impulsive maneuver to put itself onto the geocentric hyperbolic escape trajectory. This occurs at an angle $\eta$ relative to the planet's heliocentric orbital velocity vector.

:::{important}
The spacecraft *does not* receive an impulse from the engines when it crosses the sphere of influence. It must have the correct $v_{\infty}$ on its geocentric hyperbolic trajectory so that it can coast onto the heliocentric transfer trajectory.
:::

To determine the $\Delta v$ required to transfer from the parking orbit to the hyperbola, we must find the velocity of the hyperbola at the transfer point. To minimize the $\Delta v$, it is typical to transfer onto the hyperbola at the periapsis of the hyperbola. Thus, we use $r_p$ and $v_p$ for the position and velocity on the hyperbola at the transfer point.

To find $v_p$, we first need to choose a radius of the parking orbit $r_p$. The choice of $r_p$ determines the $\Delta v$ required to transfer from the parking orbit to the hyperbola, so $r_p$ depends on the capabilities of the launch vehicle to provide thrust in LEO.

One approach to find $v_p$ is via the *vis viva* equation, @eq:vis-viva-equation. We know that the energy along the geocentric hyperbola is constant. Therefore, we can equate the energy at the insertion point (periapsis) with the energy at $r_{\infty}$.

:::{math}
:label: eq:interplanetary-departure-hyperbola-energy

E = \frac{v_p^2}{2} - \frac{\mu_i}{r_p} = \frac{v_{\infty}^2}{2} - \frac{\mu_i}{r_{\infty}}
:::

where $\mu_i$ is the standard gravitational parameter of the planet. The last term in @eq:interplanetary-departure-hyperbola-energy can be neglected as $r\rightarrow r_{\infty}$. Therefore, we can solve for the periapsis velocity:

:::{math}
:label: eq:interplanetary-departure-periapsis-velocity

v_p = \sqrt{v_{\infty}^2 + 2\frac{\mu_i}{r_p}}
:::

From the discussion above, we know that $v_{\infty}$ is found from the heliocentric transfer orbit:

:::{math}
:label: eq:interplanetary-departure-v-infty

v_{\infty} = \Delta v_{\text{Sun}}\text{ relative to the Sun}
:::

The $\Delta v$ required by the spacecraft to transfer from the parking orbit to the hyperbola is:

:::{math}
:label: eq:interplanetary-departure-delta-v

\Delta v = \lvert v_p - v_{\text{parking}}\rvert
:::

The spacecraft will usually depart the planet's sphere of influence parallel to the planet's heliocentric velocity vector. This takes most advantage of the orbital velocity of the planet to send the spacecraft to its target. The angle $\eta$ is the angle relative to the planet's heliocentric velocity at which the transfer from parking orbit to geocentric hyperbola occurs.

:::{math}
:label: eq:interplanetary-departure-impulse-angle

\cos\eta = -\frac{1}{e}
:::

The eccentricity of the geocentric hyperbola can be found from the semimajor axis via @eq:hyperbolic-excess-speed:

:::{math}
:label: eq:interplanetary-hyperbola-semimajor-axis

a = \frac{\mu_i}{v_{\infty}^2}
:::

Then, rearranging @eq:hyperbolic-periapsis-apoapsis, we find:

:::{math}
:label: eq:interplanetary-hyperbola-eccentricity

e = 1 + \frac{r_p}{a} = 1 + \frac{r_p v_{\infty}^2}{\mu_i}
:::

Since all the terms in the rightmost term in @eq:interplanetary-hyperbola-eccentricity are positive, the eccentricity will be greater than one, as expected. Using combinations of $a$, $e$, $v_p$, and $r_p$, the other orbital elements can be found as needed.

Examining Eqs. @eq:interplanetary-departure-hyperbola-energy, @eq:interplanetary-departure-periapsis-velocity, @eq:interplanetary-departure-delta-v, and @eq:interplanetary-hyperbola-eccentricity, we see that none of them depend on the size of $v_{\infty}$ relative to the planet's orbital velocity. Therefore, all the analysis and equations are identical for a hyperbola that reduces the spacecraft heliocentric speed relative to the planet's heliocentric speed, as shown in @fig:interplanetary-departure-inward-transfer.

:::{figure} ../../images/interplanetary-departure-inward-transfer.svg
:name: fig:interplanetary-departure-inward-transfer
:width: 75%

A departure trajectory from a planet where the heliocentric orbital radius of the departure planet is larger than the final planet. Note that the spacecraft's heliocentric speed is smaller than the planet's, so it emerges from the back side of the sphere of influence.
:::

## Angle of the Departure Hyperbola

In @eq:interplanetary-departure-impulse-angle, we found the angle $\eta$, the angle of the apse line of the hyperbola relative to the heliocentric planetary velocity. However, the inverse cosine function is ambigous in the quadrant of the result, meaning that the impulse could occur on either side of the velocity vector.

The solution for $\eta$ that is chosen in practice is determined by the inclination of the parking orbit. If the parking orbit is prograde ($0° < i < 90°$), then the injection to the departure hyperbola will be counterclockwise. On the other hand, if the parking orbit is retrograde ($90° < i < 180°$), then the injection to the departure hyperbola will be clockwise.
