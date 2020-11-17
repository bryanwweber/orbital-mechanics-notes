# Chapter 6.3 - Hohmann Transfer

We will now analyze several impulsive maneuvers that allow a spacecraft to change orbital parameters such as $h$, $e$, $i$, and $\omega$. In all cases, we will assume that the initial orbit and final, desired, orbit have the same focus. Initially, we will also assume the orbits are coplanar.

## Intersecting Orbits

The simplest case is when the two orbits intersect at some point. In this case, there is only one impulse necessary. The change in velocity is given by the difference in velocity vectors at the intersection point:

$$\Delta \vector{v} = \vector{v}_2 - \vector{v}_1$$

An example of this type of maneuver is **circularizing** an elliptical orbit. Assume that the apoapsis distance of the initial orbit is the desired radius of the final, circular, orbit. Then, the velocity vectors at apoapsis of the initial orbit and the circular orbit are parallel. Thus, the $\Delta v$ required is the difference in velocity magnitude of the two orbits:

$$\Delta v = v_{2} - v_{1,a} = \sqrt{\frac{\mu}{r_a}} - \frac{h}{r_a} = \sqrt{\frac{\mu}{r_a}}\left(1 - \sqrt{1 - e_1}\right)$$

More complicated cases can be envisioned, but they all follow the same procedure.

## Two Impulse Transfers

If the initial orbit and final orbit do not intersect, we need at least two impulses to transfer between the orbits. In 1925, Walter Hohmann showed that the most efficient way to do this with two impulses, when the initial and final orbits are circular, is to connect opposite sides of the initial and target orbits with an ellipse. This transfer is called a [**Hohmann transfer**](https://en.wikipedia.org/wiki/Hohmann_transfer_orbit).

![Hohmann transfer orbit. Source [Wikipedia](https://en.wikipedia.org/wiki/File:Hohmann_transfer_orbit.svg)](../images/hohmann-transfer-orbit.svg)

In this figure, the spacecraft is initially in orbit 1 with radius $\mathsf{R}$ and is targeting orbit 3 with radius $\mathsf{R}'$. Note that $\mathsf{R}' > \mathsf{R}$. To achieve the transfer, the spacecraft boosts its velocity into an elliptical orbit, 2. The periapsis distance of this transfer orbit is equal to $\mathsf{R}$ and the apoapsis distance is $\mathsf{R}'$.

Thus, at the locations where orbit 2 intersects with orbits 1 and 3, the velocity vectors are parallel, and we can work entirely with velocity magnitudes. The reason this is the most efficient two-impulse maneuver is because only the magnitude of the velocity needs to change, not its direction as well. This means that the minimum propellant is used to achieve the necessary $\Delta v$.

For multiple-impulse maneuvers, we are interested in determining the **total** $\Delta v$. Since a maneuver to decrease the spacecraft velocity consumes the same amount of propellant as one that increases the velocity we are concerned with the magnitude of all of the necessary velocity changes.

For the case of increasing the orbit altitude, the first impulse is an increase in velocity in the direction of flight. This impulse increases the apoapsis altitude of the orbit to match the radius of the target orbit. The second impulse is again in the direction of flight to increase the velocity again to match the velocity of the target orbit.

For the case of decreasing the orbit altitude, the first impulse is a decrease in the velocity, antiparallel to the direction of flight (called a **retrofire**). This impulse decreases the perigee altitude to match the target orbit. The second impulse is again antiparallel to the flight direction and reduces the velocity to match the target orbit velocity. In this case, the spacecraft traverses the dashed yellow line on the figure above.

### Calculating $\Delta v$

For each impulse, we need to calculate the difference in velocity magnitude between the circular orbit and the transfer orbit. Since the impulses occur at periapsis and apoapsis of the transfer orbit, the velocity is given by:

$$\begin{aligned}v_{t,p} &= \frac{h_t}{r_p} & v_{t,a} &= \frac{h_t}{r_a}\end{aligned}$$

where the subscript $t$ indicates the quantity is for the transfer orbit. That is, $h_t$ is the specific orbital angular momentum of the elliptical transfer orbit. The $a$ and $p$ subscripts stand for apoapsis and periapsis, respectively. Note that the periapsis and apoapsis radii are given by the radii of the initial and target orbits, depending on which direction the transfer is going.

From the equations for elliptical orbits, we can solve for the specific angular momentum in terms of $r_p$ and $r_a$, which are generally known:

$$h_t = \sqrt{2\mu}\sqrt{\frac{r_a r_p}{r_a + r_p}}$$

The velocities of the circular orbits are given by:

$$v_{\text{circular}} = \sqrt{\frac{\mu}{r}}$$

### Transit Time

Since the Hohmann transfer traverses half of the ellipse, the transfer time is given as half the period of the elliptical orbit:

$$t = \frac{T}{2} = \pi\sqrt{\frac{a_t^3}{\mu}}$$

where $t$ is the transfer time and $a_t$ is the semimajor axis of the transfer orbit. There are many ways to determine the semimajor axis, including from the definition of the semimajor axis:

$$a = \frac{r_a + r_p}{2}$$

or the specific angular momentum and eccentricity:

$$a = \frac{h_t^2}{\mu}\frac{1}{1 - e_t^2}$$

or the energy equation:

$$a = \frac{r_p \mu}{2 \mu - r_p v_{t,p}^2} = \frac{r_a \mu}{2 \mu - r_a v_{t,a}^2}$$

## Elliptical Initial or Target Orbits

The idea of a Hohmann transfer can be extended to the case where one or both of the initial and target orbits are ellipses. Recalling that the Hohmann transfer traverses half of the ellipse, the departure and arrival points on the initial and target orbits will be on opposite sides of the attracting body. In addition, the definition of the Hohmann transfer is that the transfer orbit at the departure and arrival points should be tangent to the initial and target orbits, respectively.

```{margin}
We will deal with rotations of the apse line in a later section.
```

To start, let's assume that both the initial and target orbits are ellipses. The orbits have a common focus and their eccentricity vectors point in the same direction. For the transfer orbit to be tangent to the initial and target orbits, we have two choices:

1. Depart at periapsis, arriving at apoapsis of the target orbit
2. Depart at apoapsis, arriving at periapsis of the target orbit

It is not clear which transfer orbit is more efficient in terms of the $\Delta v$ requirement to achieve the transfer. We can analyze each transfer orbit in terms of the energy equation to determine which transfer is more efficient.

We can calculate the required $\Delta v$ in each case to determine which is more efficient. We will approach this calculation using the energy equation:

$$\frac{v^2}{2\mu} - \frac{1}{r} = -\frac{1}{2a}$$

Without loss of generality, we will assume that the initial orbit has a smaller semimajor axis than the target orbit. Therefore, the target orbit has a higher energy (closer to zero) than the initial orbit.

<!-- Let the subscripts $A$, $B$, and $t$ denote the initial, target, and transfer orbits, respectively. In addition, let the subscripts $a$ and $p$ denote apoapsis and periapsis of the initial and target orbits.

The $\Delta v$ for the first case is given by:

$$\Delta v_1 = \Delta v_{A\rightarrow t} + \Delta v_{t\rightarrow B}$$

where the two $\Delta v$ terms are given by:

$$\begin{aligned}\Delta v_{A\rightarrow t} &= v_{t,p} - v_{A,p} = \frac{h_t}{r_{A,p}} - \frac{h_A}{r_{A,p}} & \Delta v_{t\rightarrow B} &= v_{B,a} - v_{t,a} = \frac{h_B}{r_{B,a}} - \frac{h_t}{r_{B,a}}\end{aligned}$$

The specific angular momentum terms are given by:

$$\begin{aligned}h_A &= \sqrt{2 \mu}\sqrt{\frac{r_{A,p}r_{A,a}}{r_{A,a} + r_{A,p}}} & h_B &= \sqrt{2 \mu}\sqrt{\frac{r_{B,p}r_{B,a}}{r_{B,a} + r_{B,p}}} & h_t &= \sqrt{2 \mu}\sqrt{\frac{r_{A,p}r_{B,a}}{r_{B,a} + r_{A,p}}}\end{aligned}$$

The $\Delta v$ for the second case is given by:

$$\Delta v_2 = \Delta v_{A\rightarrow t} + \Delta v_{t\rightarrow B}$$

where the two $\Delta v$ terms are given by:

$$\begin{aligned}\Delta v_{A\rightarrow t} &= v_{t,p} - v_{A,a} = \frac{h_t}{r_{A,a}} - \frac{h_A}{r_{A,a}} & \Delta v_{t\rightarrow B} &= v_{B,p} - v_{t,a} = \frac{h_B}{r_{B,p}} - \frac{h_t}{r_{B,p}}\end{aligned}$$

The specific angular momentum terms for $A$ and $B$ are the same; the transfer orbit specific angular momentum is:

$$h_t = \sqrt{2 \mu}\sqrt{\frac{r_{A,a}r_{B,p}}{r_{B,p} + r_{A,a}}}$$

Conveniently, if we take the ratio $\Delta v_2 / \Delta v_1$, the $\sqrt{2\mu}$ term cancels out and the result is only dependent on the ratios $r_{A,a}/r_{A,p}$, $r_{B,a}/r_{B,p}$, and $r_{B,p}/r_{A,p}$. -->
