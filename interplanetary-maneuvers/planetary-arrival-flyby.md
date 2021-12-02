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
:label: eq:interplanetary-flyby-departure-ang-mom
h_2 = R V_{\perp,2}
:::

where $R$ is the planet's orbital radius. Using the orbit equation, Eq. {eq}`eq:scalar-orbit-equation` and Eq. {eq}`eq:parallel-velocity-component`, we can solve for the eccentricity and true anomaly:

:::{math}
:label: eq:interplanetary-flyby-departure-orbit-equation
R = \frac{h_2^2}{\mu_{\text{sun}}} \frac{1}{1 + e_2 \cos\nu_2}
:::

and

:::{math}
:label: eq:interplanetary-flyby-departure-radial-velocity
V_{r,2}^s = \frac{\mu_{\text{sun}}}{h_2}e_2\sin\nu_2
:::

## Example

A spacecraft will use a flyby manuever around Venus to change its heliocentric orbit. The spacecraft departs the orbit of Neptune on a velocity perpendicular to a line to the sun, and meets Venus at a true anomaly of 120° relative to the departure point. The periapsis altitude is 300 km. Calculate the spacecraft's new heliocentric orbital elements after a leading-side flyby and a trailing-side flyby.

First, we need to calculate the arrival heliocentric velocity vector. The spacecraft departs Neptune's orbit at aphelion of the transfer orbit. We know the departure point is aphelion because the velocity vector is perpendicular to the radius vector. We can find the orbital elements of the transfer orbit by using the orbit equation, Eq. {eq}`eq:scalar-orbit-equation` at the departure and arrival points.

:::{math}
:label:
\begin{aligned}
  R_{\text{Neptune}} &= \frac{h_1^2}{\mu_{\text{sun}}} \frac{1}{1 - e_1} & \text{Departure} \\
  R_{\text{Venus}} &= \frac{h_1^2}{\mu_{\text{sun}}} \frac{1}{1 - e_1\cos\nu_1} & \text{Arrival}
\end{aligned}
:::

where $\nu$ at Neptune departure is 180° and $\nu_1 =$ -60° or 300°. This pair of equations can be simultaneously solved for $h_1$ and $e_1$ to give the parameters of the transfer orbit. Solving first for $e_1$, we find:

:::{math}
:label:
e_1 = \frac{R_{\text{Neptune}} - R_{\text{Venus}}}{R_{\text{Neptune}} + R_{\text{Venus}}\cos\nu_1}
:::

Then, $h_1$ is found from the orbit equation at Neptune departure:

:::{math}
:label:
h_1 = \sqrt{\mu_{\text{sun}} R_{\text{Neptune}}\left(1 - e_1\right)}
:::

```{code-cell} ipython3
import numpy as np

mu_sun = 1.32712E11  # km**3/s**2
R_Neptune = 4.50489E9  # km
R_Venus = 1.08209E8  # km

nu_1 = np.radians(300)
e_1 = (R_Neptune - R_Venus) / (R_Neptune + R_Venus * np.cos(nu_1))
h_1 = np.sqrt(mu_sun * R_Neptune * (1 - e_1))
```

```{code-cell} ipython3
:tags: [remove-cell]
from functools import partial
from myst_nb import glue as myst_glue
glue = partial(myst_glue, display=False)
glue("interplanetary-flyby-e_1", e_1)
glue("interplanetary-flyby-h_1", h_1)
```

This give an eccentricity of $e_1 =$ {glue:text}`interplanetary-flyby-e_1:.4f` and $h_1 =$ {glue:text}`interplanetary-flyby-h_1:.2E` km<sup>2</sup>/s. With $e_1$, $nu_1$, and $h_1$, we can find the heliocentric velocity components at Venus using Eq. {eq}`eq:perpendicular-velocity-component` and Eq. {eq}`eq:parallel-velocity-component`:

```{code-cell} ipython3
V_p1 = h_1 / R_Venus
V_r1 = mu_sun / h_1 * e_1 * np.sin(nu_1)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("interplanetary-flyby-V_p1", V_p1)
glue("interplanetary-flyby-V_r1", V_r1)
```

The heliocentric velocity components are $V_{\perp,1}^s =$ {glue:text}`interplanetary-flyby-V_p1:.2f` km/s and $V_{r,1}^s =$ {glue:text}`interplanetary-flyby-V_r1:.2f` km/s. Next, we need to find the excess velocity vector at arrival, and its magnitude:

```{code-cell} ipython3
V_1 = np.sqrt(V_p1**2 + V_r1**2)
alpha_1 = np.arctan2(V_r1, V_p1)

V_Venus = np.sqrt(mu_sun / R_Venus)

v_infty1_V = V_p1 - V_Venus
v_infty1_S = -V_r1
v_infty = np.sqrt(v_infty1_V**2 + v_infty1_S**2)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("interplanetary-flyby-V_1", V_1)
glue("interplanetary-flyby-alpha_1", np.degrees(alpha_1))
glue("interplanetary-flyby-V_Venus", V_Venus)
glue("interplanetary-flyby-v_infty1_V", v_infty1_V)
glue("interplanetary-flyby-v_infty1_S", abs(v_infty1_S))
glue("interplanetary-flyby-v_infty", v_infty)
```

The spacecraft heliocentric velocity magnitude is $V_1^s =$ {glue:text}`interplanetary-flyby-V_1:.2f` km/s, the flight path angle is $\alpha_1 =$ {glue:text}`interplanetary-flyby-alpha_1:.2f`°, and the velocity of Venus is $V_{\text{Venus}} =$ {glue:text}`interplanetary-flyby-V_Venus:.2f` km/s. The excess velocity vector is $\vector{v}_{\infty,1} =$ {glue:text}`interplanetary-flyby-v_infty1_V:.2f` $\uvec{u}_V$ - {glue:text}`interplanetary-flyby-v_infty1_S:.2f` $\uvec{u}_S$ km/s, and its magnitude is $v_{\infty} =$ {glue:text}`interplanetary-flyby-v_infty:.2f` km/s.

Now we can compute the geocentric orbital elements of the flyby trajectory. In particular, we need to calculate the turn angle $\delta$ using Eq. {eq}`eq:hyperbolic-turn-angle`, which requires the eccentricity $e$ from Eq. {eq}`eq:interplanetary-arrival-eccentricity`. Then, we can calculate the $\phi$ angles.

```{code-cell} ipython3
r_p = 300 + 6051.8  # km
mu_Venus = 3.24859E5  # km**3/s**2
e = 1 + r_p * v_infty**2 / mu_Venus
delta = 2 * np.arcsin(1/e)

phi_1 = np.arctan2(v_infty1_S, v_infty1_V)
phi_2_leading = phi_1 + delta
phi_2_trailing = phi_1 - delta
```

```{code-cell} ipython3
:tags: [remove-cell]
d = np.degrees
glue("interplanetary-flyby-e", e)
glue("interplanetary-flyby-delta", d(delta))
glue("interplanetary-flyby-phi_1", d(phi_1))
glue("interplanetary-flyby-phi_2_leading", d(phi_2_leading))
glue("interplanetary-flyby-phi_2_trailing", d(phi_2_trailing))
```

The eccentricity of the hyperbola is $e =$ {glue:text}`interplanetary-flyby-e:.4f` and the turn angle is $\delta =$ {glue:text}`interplanetary-flyby-delta:.2f`°. This gives turn angles of $\phi_1 =$ {glue:text}`interplanetary-flyby-phi_1:.2f`° at arrival, $\phi_2 =$ {glue:text}`interplanetary-flyby-phi_2_leading:.2f`° when the flyby occurs on the leading side, and $\phi_2 =$ {glue:text}`interplanetary-flyby-phi_2_trailing:.2f`° for the trailing-side flyby. Notice that $\delta$ is treated as negative for the trailing-side flyby!

Finally, we can compute the departure excess velocity vector and the departure heliocentric velocity vector, which allows us to compute the new heliocentric orbital elements.

### Leading-Side Flyby

Let's start with the leading-side flyby.

```{code-cell} ipython3
v_infty2_V = v_infty * np.cos(phi_2_leading)
v_infty2_S = v_infty * np.sin(phi_2_leading)

V_p2 = V_Venus + v_infty2_V
V_r2 = - v_infty2_S
V_2 = np.sqrt(V_p2**2 + V_r2**2)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("interplanetary-flyby-leading-V_2", V_2)
glue("interplanetary-flyby-leading-V_p2", V_p2)
glue("interplanetary-flyby-leading-V_r2", V_r2)
glue("interplanetary-flyby-leading-Delta_V", abs(V_2 - V_1))
```

This gives a heliocentric velocity of $V_2^s =$ {glue:text}`interplanetary-flyby-leading-V_2:.2f` km/s, with components $V_{\perp,2}^s =$ {glue:text}`interplanetary-flyby-leading-V_p2:.2f` km/s and $V_{r,2}^s =$ {glue:text}`interplanetary-flyby-leading-V_r2:.2f` km/s. This is a decrease of about {glue:text}`interplanetary-flyby-leading-Delta_V:.2f` km/s in heliocentric speed, as expected for a leading-side flyby.

The departure angular momentum is found by Eq. {eq}`eq:interplanetary-flyby-departure-ang-mom`. From Eq. {eq}`eq:interplanetary-flyby-departure-orbit-equation`, we find:

:::{math}
:label: eq:interplanetary-flyby-e-cos
e_2 \cos\nu_2 = \frac{h_2^2}{\mu_{\text{sun}} R} - 1
:::

Similarly, from Eq. {eq}`eq:interplanetary-flyby-departure-radial-velocity`, we find:

:::{math}
:label: eq:interplanetary-flyby-e-sin
e_2 \sin\nu_2 = \frac{V_{r,2}^s h_2}{\mu_{\text{sun}}}
:::

Taking the ratio of Eqs. {eq}`eq:interplanetary-flyby-e-cos` and {eq}`eq:interplanetary-flyby-e-sin`, we find:

:::{math}
:label:
\tan\nu_2 = \frac{R V_{r,2}^s h_2}{h_2^2 - R\mu_{\text{sun}}}
:::

With $h_2$, $e_2$, and $\nu_2$, we can calculate the other orbital elements of interest.

```{code-cell} ipython3
h_2 = R_Venus * V_p2
nu_2 = np.arctan2(R_Venus * V_r2 * h_2, h_2**2 - R_Venus * mu_sun)
e_2 = (V_r2 * h_2) / (mu_sun * np.sin(nu_2))
a_2 = h_2**2 / mu_sun / (1 - e_2**2)
R_p2 = a_2 * (1 - e_2)
R_a2 = 2 * a_2 - R_p2
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("interplanetary-flyby-leading-nu_2", d(nu_2))
glue("interplanetary-flyby-leading-e_2", e_2)
glue("interplanetary-flyby-leading-a_2", a_2)
glue("interplanetary-flyby-leading-R_p2", R_p2)
glue("interplanetary-flyby-leading-R_a2", R_a2)
```

For the leading-side flyby the eccentricity is $e_2 =$ {glue:text}`interplanetary-flyby-leading-e_2:.4f`. Since $e_2 < 1$, the new heliocentric trajectory is still an ellipse around the sun. The perihelion distance is $R_{p,2} =$ {glue:text}`interplanetary-flyby-leading-R_p2:.3E` km and the aphelion distance is $R_{a,2} =$ {glue:text}`interplanetary-flyby-leading-R_a2:.3E` km. This aphelion distance is approximately at the orbital radius of Jupiter. The true anomaly is $\nu_2 =$ {glue:text}`interplanetary-flyby-leading-nu_2:.2f`°, so the spacecraft is approaching perihelion.

### Trailing-Side Flyby

Now let's do the trailing-side flyby. The calculations are all the same as the leading-side, but we expect the spacecraft to increase its heliocentric speed.

```{code-cell} ipython3
v_infty2_V = v_infty * np.cos(phi_2_trailing)
v_infty2_S = v_infty * np.sin(phi_2_trailing)

V_p2 = V_Venus + v_infty2_V
V_r2 = - v_infty2_S
V_2 = np.sqrt(V_p2**2 + V_r2**2)
h_2 = R_Venus * V_p2
nu_2 = np.arctan2(R_Venus * V_r2 * h_2, h_2**2 - R_Venus * mu_sun)
e_2 = (V_r2 * h_2) / (mu_sun * np.sin(nu_2))
a_2 = h_2**2 / mu_sun / (e**2 - 1)
R_p2 = a_2 * (e_2 - 1)
R_a2 = 2 * a_2 - R_p2
nu_infty_2 = np.arccos(-1 / e_2)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("interplanetary-flyby-trailing-V_2", V_2)
glue("interplanetary-flyby-trailing-V_p2", V_p2)
glue("interplanetary-flyby-trailing-V_r2", V_r2)
glue("interplanetary-flyby-trailing-Delta_V", abs(V_2 - V_1))
```

This gives a heliocentric velocity of $V_2^s =$ {glue:text}`interplanetary-flyby-trailing-V_2:.2f` km/s, with components $V_{\perp,2}^s =$ {glue:text}`interplanetary-flyby-trailing-V_p2:.2f` km/s and $V_{r,2}^s =$ {glue:text}`interplanetary-flyby-trailing-V_r2:.2f` km/s. This is an increase of about {glue:text}`interplanetary-flyby-trailing-Delta_V:.2f` km/s in heliocentric speed, as expected for a trailing-side flyby.

```{code-cell} ipython3
:tags: [remove-cell]
glue("interplanetary-flyby-trailing-nu_2", d(nu_2))
glue("interplanetary-flyby-trailing-e_2", e_2)
glue("interplanetary-flyby-trailing-a_2", a_2)
glue("interplanetary-flyby-trailing-R_p2", R_p2)
glue("interplanetary-flyby-trailing-R_a2", R_a2)
glue("interplanetary-flyby-trailing-nu_infty_2" , d(nu_infty_2))
```

For the trailing-side flyby the eccentricity is $e_2 =$ {glue:text}`interplanetary-flyby-trailing-e_2:.4f`. Since $e_2 > 1$, the new heliocentric trajectory is a hyperbola relative to the sun and the true anomaly of the asymptote is $\nu_{\infty} =$ {glue:text}`interplanetary-flyby-trailing-nu_infty_2:.2f`°. This means the spacecraft is now on a trajectory to escape the solar system!

The current true anomaly is $\nu_2 =$ {glue:text}`interplanetary-flyby-trailing-nu_2:.2f`°, so the spacecraft is approaching perihelion, which will be at a distance of $R_{p,2} =$ {glue:text}`interplanetary-flyby-trailing-R_p2:.0f` km. Unfortunately, this is inside the equatorial radius of the Sun as shown in {numref}`tab:planetary-radius-parameters`, so the spacecraft would most likely not survive the encounter.
