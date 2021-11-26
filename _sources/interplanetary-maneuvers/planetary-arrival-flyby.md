# Planetary Arrival: Flyby

As we discussed in the [last section](./planetary-arrival-capture.md), the options that a spacecraft has when arriving at a planet are to impact the planet, enter a capture orbit, or do a flyby to change its heliocentric velocity vector. In this section, we'll consider the case of a flyby of the arrival planet.

Let's begin with a few definitions. All capital letters will refer to heliocentric velocities, while lower case letters refer to geocentric velocities. Furthermore, the superscript $s$ will refer to the spacecraft, while variables with no superscript refer to the planet. Finally, subscript 1 refers to the arrival point at the sphere of influence and subscript 2 refers to the departure point from the sphere of influence.

The goal in this analysis is to determine the heliocentric velocity vector when the spacecraft exits the sphere of influence, $\vector{V}_2^s$. This vector is then used to determine the orbital elements of the spacecraft's modified heliocentric orbit.

To calculate the departure velocity vector, we will treat the arrival and departure events independently. We will also remove the assumption that $v_{\infty}$ be parallel to the planet's heliocentric velocity vector.

## Arrival Trajectory

When the spacecraft arrives at the target planet, it's trajectory will be a hyperbola relative to the planet. When crossing the sphere of influence of the planet, the spacecraft can be in one of two orientations:

1. crossing in front of the planet, as shown in {numref}`fig:interplanetary-leading-flyby`, called a **leading-side flyby**.

   :::{figure} ../images/interplanetary-leading-flyby.svg
   :name: fig:interplanetary-leading-flyby

   A leading-side planetary flyby. Notice that the spacecraft crosses in front of the planet along the planet's direction of motion.
   :::

2. crossing behind the planet, as shown in {numref}`fig:interplanetary-trailing-flyby`, called a **trailing-side flyby**

   :::{figure} ../images/interplanetary-trailing-flyby.svg
   :name: fig:interplanetary-trailing-flyby

   A trailing-side planetary flyby. Notice that the spacecraft crosses behind the planet along the planet's direction of motion.
   :::

The angle $\delta$, given by Eq. {eq}`eq:hyperbolic-turn-angle`, is the turn angle. Note that $\delta$ is positive counterclockwise, so it is negative for the trailing-side flyby.

### Arrival Heliocentric Velocity

To determine the spacecraft's hyperbolic orbital elements, we need to find $\vector{v}_{\infty,1}$, the excess velocity vector at arrival. The excess velocity vector can be found by taking the vector difference of the planet and spacecraft heliocentric velocity vectors:

:::{math}
:label: eq:interplanetary-flyby-arrival-excess-velocity-vector

\vector{v}_{\infty,1} = \vector{V}_1^s - \vector{V}
:::

where $\vector{V}$ is the orbital velocity of the planet and $\vector{V}_1^s$ is the spacecraft's heliocentric velocity vector. This vector sum is shown visually in {numref}`fig:interplanetary-leading-flyby` and {numref}`fig:interplanetary-trailing-flyby` in the inset figure.

In the heliocentric frame, the spacecraft's velocity can be split into two components:

:::{math}
:label: eq:interplanetary-flyby-arrival-heliocentric-components

\vector{V}_1^s = V_{1,r}^s \uvec{u}_r + V_{1,\perp}^s \uvec{u}_{\perp} = \frac{\mu_{\text{sun}}}{h_1} e_1 \sin\nu_1 \uvec{u}_r + \frac{\mu_{\text{sun}}}{h_1}\left(1 + e_1 \cos\nu_1\right) \uvec{u}_{\perp}
:::

where $e_1$, $h_1$, and $\nu_1$ are the eccentricity, angular momentum, and true anomaly, respectively, of the heliocentric transfer orbit.

### Geocentric Unit Vectors

To simplify the calculation of $\vector{v}_{\infty}$, we would like to work with unit vectors attached to the planet, rather than the sun. The $\uvec{u}_r$-$\uvec{u}_{\perp}$ coordinate system, which is attached to the heliocentric orbit, can be converted into a geocentric system with the unit vectors $\uvec{u}_{V}$ and $\uvec{u}_{S}$.

$\uvec{u}_V$ points along the planet's orbital velocity vector. Since we assumed that the planet's orbit is circular, the planet's orbital velocity vector is always perpendicular to it's radial vector. In other words:

:::{math}
:label: eq:interplanetary-flyby-uvec-perp
\uvec{u}_V = \uvec{u}_{\perp}
:::

The other geocentric unit vector corresponds to the radial direction, but is oriented in the opposite way. Thus:

:::{math}
:label: eq:interplanetary-flyby-uvec-r
\uvec{u}_S = -\uvec{u}_{r}
:::

Thus, in the geocentric coordinate system, the planet's orbital velocity is:

:::{math}
:label: eq:interplanetary-flyby-planet-velocity
\vector{V} = V \uvec{u}_V = \sqrt{\frac{\mu_{\text{sun}}}{R}} \uvec{u}_V
:::

where $R$ is the planet's orbital radius around the Sun. Similarly, the spacecraft's heliocentric velocity can be transformed to the geocentric coordinate system:

:::{math}
:label:
\vector{V}_1^s = V_1^s \cos\alpha_1 \uvec{u}_V + V_1^s \sin\alpha_1 \uvec{u}_S
:::

where $V_1^s$ is the magnitude of the spacecraft's heliocentric velocity and $\alpha_1$ is the angle that $\vector{V}_1^s$ makes with $\vector{V}$. Thus, $\alpha_1$ is the flight path angle of the spacecraft, and its value is found from Eq. {eq}`eq:flight-path-angle`:

:::{math}
:label:
\alpha_1 = \tan^{-1} \frac{V_{1,r}^s}{V_{1,\perp}^s} = \frac{e_1\sin\nu_1}{1 + e_1\cos\nu_1}
:::

### Arrival Excess Velocity Vector

In {numref}`fig:interplanetary-leading-flyby` and {numref}`fig:interplanetary-trailing-flyby`, we can break the excess velocity vector into the geocentric coordinate system:

:::{math}
:label: eq:interplanetary-flyby-excess-velocity-geocentric

\vector{v}_{\infty,1} = \left(V_1^s\cos\alpha_1 - V\right) \uvec{u}_V + V_1^s \sin\alpha_1 \uvec{u}_S
:::

Finally, we can compute the magnitude of the excess velocity:

:::{math}
:label: eq:interplanetary-flyby-excess-velocity-magnitude

v_{\infty} = \sqrt{\left(V_1^s\right)^2 + V^2 - 2 V_1^s V \cos\alpha_1}
:::

The magnitude $V_1^s$ can be found from the velocity components in Eq. {eq}`eq:interplanetary-flyby-arrival-heliocentric-components`, and $V$ is given by Eq. {eq}`eq:interplanetary-flyby-planet-velocity`.

The magnitude of the excess velocity depends only on the semimajor axis of the hyperbola. Since the semimajor axis is constant, the magnitude of the excess velocity is also constant. Thus, we drop the subscript for arrival and departure for the magntiude.

Once we have the magnitude of the excess velocity, and when we specify a value for $r_p$, we can apply the techniques in the [previous section](./planetary-arrival-capture.md) to compute the orbital elements of the hyperbola.

:::{note}
The techniques described in this section can also be used for a capture orbit if the excess velocity vector is not parallel to the planet's orbital velocity.
:::

## Departure Trajectory

Now that we have $\vector{v}_{\infty,1}$ from Eq. {eq}`eq:interplanetary-flyby-excess-velocity-geocentric`, we are ready to calculate the departure trajectory. The $\vector{v}_{\infty}$ vector is rotated through the turn angle $\delta$. We need a consistent reference line from which the angle of the $\vector{v}_{\infty}$ vector can be measured.

The easiest choice for a reference line is the planet's heliocentric velocity vector. As shown in {numref}`fig:interplanetary-flyby-phi-angle`, we can define an angle $\phi$ from the planet's velocity vector $\vector{V}$ to $\vector{v}_{\infty}$. $\phi_1$ is defined for the angle at arrival and $\phi_2$ is the angle at departure.

:::{figure} ../images/interplanetary-flyby-phi-angle.svg
:name: fig:interplanetary-flyby-phi-angle
:width: 75%

The angles $\phi_1$ and $\phi_2$ are defined from the planet's velocity vector to the excess velocity vector.
:::

The relationship between the $\phi$ angles is:

:::{math}
:label:
\phi_2 = \phi_1 + \delta
:::

Note that the sign of $\delta$ is important. For a leading-side flyby $\delta$ is positive, while for a trailing-side flyby $\delta$ is negative.

In the geocentric coordinate system, the excess velocity vector has components given by Eq. {eq}`eq:interplanetary-flyby-excess-velocity-geocentric`. From a right triangle, the angle $\phi_1$ is found by:

:::{math}
:label:
\tan\phi_1 = \frac{V_1^s\sin\alpha_1}{V_1^s\cos\alpha_1 - V}
:::

Since the magnitude of the excess velocity is constant, we can find the departure excess velocity vector using $\phi_2$ and the magnitude:

:::{math}
:label:
\vector{v}_{\infty,2} = v_{\infty}\cos\phi_2 \uvec{u}_V + v_{\infty} \sin\phi_2 \uvec{u}_S
:::

Then, finally, the heliocentric velocity vector at departure is found by the vector sum of $\vector{V}$ and $\vector{v}_{\infty,2}$:

:::{math}
:label:
\vector{V}_{2}^s = \vector{V} + \vector{v}_{\infty,2} = V + v_{\infty} \cos\phi_2\uvec{u}_V + v_{\infty}\sin\phi_2 \uvec{u}_S
:::

From Eqs. {eq}`eq:interplanetary-flyby-uvec-perp` and {eq}`eq:interplanetary-flyby-uvec-r`, we see that the perpendicular and radial components of the heliocentric velocity are:

:::{math}
:label:
\begin{aligned}
  V_{\perp,2}^s &= V + v_{\infty} \cos\phi_2 & V_{r,2}^s &= -v_{\infty}\sin\phi_2
\end{aligned}
:::

Using these two velocity components and the known radial distance of the planet from the sun, we can compute the orbital elements of the new heliocentric orbit. The orbital angular momentum is found by:

:::{math}
:label:
h_2 = R V_{\perp,2}
:::

where $R$ is the planet's orbital radius. Using the orbit equation, Eq. {eq}`eq:the-orbit-equation` and Eq. {eq}`eq:radial-velocity-vector`, we can solve for the eccentricity and true anomaly:

:::{math}
:label:
R = \frac{h_2^2}{\mu_{\text{sun}}} \frac{1}{1 + e_2 \cos\nu_2}
:::

and

:::{math}
:label:
V_{r,2}^s = \frac{\mu_{\text{sun}}}{h_2}e_2\sin\nu_2
:::
