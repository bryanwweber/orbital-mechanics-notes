# Hohmann Transfer

If the initial orbit and final, or target, orbit do not intersect, we need at least two impulses to transfer between the orbits. In 1925, Walter Hohmann {cite}`Hohmann1960` showed that the most efficient way to do this with two impulses, when the initial and final orbits are circular, is to connect opposite sides of the initial and target orbits with an ellipse. This transfer is called a [**Hohmann transfer**](https://en.wikipedia.org/wiki/Hohmann_transfer_orbit).

:::{figure} ../images/hohmann-transfer-orbit.svg
:width: 50%
:name: fig:hohmann-transfer

The Hohmann transfer orbit. [Leafnode](https://commons.wikimedia.org/wiki/File:Hohmann_transfer_orbit.svg) [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5), via Wikimedia Commons.
:::

In {numref}`fig:hohmann-transfer`, the spacecraft is initially in orbit 1 with radius $\mathsf{R}$ and is targeting orbit 3 with radius $\mathsf{R}'$. To achieve the transfer, the spacecraft boosts its velocity into an elliptical orbit, 2. When the spacecraft arrives at the far side of the ellipse, it boosts its velocity again to move into orbit 3.

The periapsis distance of this **transfer orbit** is equal to $\mathsf{R}$ and the apoapsis distance is $\mathsf{R}'$. This means that the transfer orbit intersects both orbits 1 and 3. By providing impulses at both intersection points, it is possible to move from orbit 1 to orbit 3.

## Energy Considerations

The specific energy of the initial and final orbits are given by Eq. {eq}`eq:circular-orbit-energy`, repeated here for reference:

:::{math}
E = -\frac{\mu}{2r}
:::

where $r$ is the radius of the circular orbit. Let subscripts $i$ and $f$ represent the initial and final orbits, respectively. Then, if $r_i < r_f$, the specific energy increases (gets closer to zero) as a result of the transfer. On the other hand, if $r_i > r_f$, the specific energy decreases (gets more negative).

The specific energy of the elliptical transfer orbit is given by Eq. {eq}`eq:ellipse-specific-energy`, repeated here for reference:

:::{math}
E = -\frac{\mu}{2a}
:::

For the Hohmann transfer, the semi-major axis of the transfer orbit is between the radii of the initial and final orbits. Therefore, the specific energy of the elliptical transfer orbit is also between the values for the initial and final orbits. We will use the subscript $t$ for quantities associated with the transfer orbit.

:::{dropdown} $r_i < a_t < r_f$
:open:

In this case, the semi-major axis of the transfer orbit is larger than the initial radius. Therefore, the specific energy of the transfer orbit is also larger, $E_i < E_t$.

The intersection between the initial and transfer orbits is at the _periapsis_ of the transfer orbit. Since the orbits intersect, their radius must be the same, $r_i = r_{t,p}$. For the energy of the elliptical orbit to be larger at the intersection point, its velocity must be higher, according to the _vis viva_ equation, Eq. {eq}`eq:vis-viva-equation`.

Therefore, the spacecraft conducts an impulsive burn to increase its speed from $v_i$ to $v_{t,p}$. In doing so, the apoapsis of the orbit increases from $r_i$ to $r_{t,a}$. This kind of impulse is referred to as **raising the apoapsis** of the orbit. Since the velocity is increasing, the spacecraft must have its engine pointing anti-parallel to the direction of the velocity vector.

After coasting on the transfer orbit for half of the ellipse, the spacecraft reaches apoapsis. At this point, the spacecraft still has the specific energy $E_t$, because specific energy is constant for a given orbit.

At apoapsis, the transfer orbit intersects with the final orbit, so that $r_f = r_{t,a}$. Since the specific energy of the transfer orbit is less than that of the final orbit, $E_t < E_f$, the _vis viva_ equation shows us that we need another velocity increase to change from the transfer orbit into the final orbit.

Once again, the spacecraft conducts an impulsive burn to increase its speed from $v_{t,a}$ to $v_f$. In doing so, it turns the elliptical transfer orbit into the circular final orbit. This kind of impulse is referred to as **circularizing the orbit**.
:::

:::{dropdown} $r_f < a_t < r_i$
:open:

In this case, the semi-major axis of the transfer orbit is smaller than the initial radius. Therefore, the specific energy of the transfer orbit is also smaller, $E_t < E_i$.

The intersection between the initial and transfer orbits is at the _apoapsis_ of the transfer orbit. Since the orbits intersect, their radius must be the same, $r_i = r_{t,a}$. For the energy of the elliptical orbit to be smaller at the intersection point, its velocity must be smaller, according to the _vis viva_ equation, Eq. {eq}`eq:vis-viva-equation`.

Therefore, the spacecraft conducts an impulsive burn to decrease its speed from $v_i$ to $v_{t,a}$. In doing so, the periapsis of the orbit decreases from $r_i$ to $r_{t,p}$. This kind of impulse is referred to as **lowering the periapsis** of the orbit. Since the velocity is decreasing, the spacecraft must have its engine pointing in the direction of the velocity vector, and this is called a **retrofire**.

After coasting on the transfer orbit for half of the ellipse, the spacecraft reaches periapsis. At this point, the spacecraft still has the specific energy $E_t$, because specific energy is constant for a given orbit.

At periapsis, the transfer orbit intersects with the final orbit, so that $r_f = r_{t,p}$. Since the specific energy of the transfer orbit is larger than that of the final orbit, $E_f < E_t$, the _vis viva_ equation shows us that we need another velocity decrease to change from the transfer orbit into the final orbit.

Once again, the spacecraft conducts an impulsive burn to decrease its speed from $v_{t,p}$ to $v_f$. In doing so, it turns the elliptical transfer orbit into the circular final orbit. This kind of impulse is referred to as **circularizing the orbit**.
:::

## Calculating $\Delta v$

At the locations where orbit 2 intersects with orbits 1 and 3, the velocity vectors are parallel. The reason the Hohmann transfer is the most efficient two-impulse maneuver is because only the magnitude of the velocity needs to change, not its direction as well. This means that the minimum propellant is used to achieve the necessary $\Delta \vector{v}$.

For multiple-impulse maneuvers, we are interested in determining the **total** $\Delta v$. Since a maneuver to decrease the spacecraft velocity consumes the same amount of propellant as one that increases the velocity we are concerned with the magnitude of all of the necessary velocity changes.

For each impulse, we need to calculate the difference in velocity between the circular orbits and the transfer orbit. Since the velocity vectors are parallel at both impulse locations we can work entirely with velocity magnitudes.

The velocity on the circular orbits is given by Eq. {eq}`eq:circular-orbit-velocity`:

:::{math}
v_{\text{circular}} = \sqrt{\frac{\mu}{r}}
:::

Since the impulses occur at periapsis and apoapsis of the transfer orbit, the transfer orbit velocity is given by:

:::{math}
:label: eq:hohmann-transfer-orbit-velocities
\begin{aligned}
  v_{t,p} &= \frac{h_t}{r_p} & v_{t,a} &= \frac{h_t}{r_a}
\end{aligned}
:::

From the equations for elliptical orbits, we can solve for the specific angular momentum in terms of $r_p$ and $r_a$:

:::{math}
:label: eq:ellipse-specific-angular-momentum
h_t = \sqrt{2\mu \frac{r_a r_p}{r_a + r_p}}
:::

Alternatively, we can use the _vis viva_ equation, Eq. {eq}`eq:vis-viva-equation`, to find the velocity on the transfer orbit

:::{math}
:label:
\begin{aligned}
  v_{t,p} &= \sqrt{\mu\left(\frac{2}{r_{t,p}} - \frac{1}{a_t}\right)} & v_{t,a} &= \sqrt{\mu\left(\frac{2}{r_{t,a}} - \frac{1}{a_t}\right)}
\end{aligned}
:::

where the semi-major axis of the elliptical transfer orbit is:

:::{math}
:label: eq:hohmann-transfer-semi-major-axis
a_t = \frac{r_{t,a} + r_{t,p}}{2}
:::

Finally, the total $\Delta v$ required for the Hohmann transfer is:

:::{math}
:label: eq:hohmann-transfer-delta-v
\begin{aligned}
  \Delta v &= \lvert v_f - v_{t,a}\rvert + \lvert v_i - v_{t,p}\rvert & \text{If $r_i < r_f$} \\
  \Delta v &= \lvert v_f - v_{t,p}\rvert + \lvert v_i - v_{t,a}\rvert & \text{If $r_f < r_i$}
\end{aligned}
:::

### Transit Time

Since the Hohmann transfer traverses half of the ellipse, the transfer time is given as half the period of the elliptical orbit from Eq. {eq}`eq:ellipse-period-useful`:

:::{math}
:label:
t = \frac{T}{2} = \pi\sqrt{\frac{a_t^3}{\mu}}
:::

where $t$ is the transfer time and $a_t$ is the semi-major axis of the transfer orbit.

## Elliptical Initial or Target Orbits

The idea of a Hohmann transfer can be extended to the case where one or both of the initial and final orbits are ellipses. Recalling that the Hohmann transfer traverses half of the elliptical transfer orbit, the departure and arrival points on the initial and final orbits will be on opposite sides of the attracting body. In addition, the definition of the Hohmann transfer is that the transfer orbit at the departure and arrival points should be tangent to the initial and final orbits, respectively.

```{margin}
We will deal with rotations of the apse line in a later section.
```

To start, let's assume that both the initial and final orbits are ellipses. The orbits have a common focus and their eccentricity vectors point in the same direction. For the transfer orbit to be tangent to the initial and final orbits, we have two choices:

1. Depart at periapsis of the initial orbit, arriving at apoapsis of the final orbit
2. Depart at apoapsis of the initial orbit, arriving at periapsis of the final orbit

It is not clear which transfer orbit is more efficient in terms of the $\Delta v$ requirement to achieve the transfer. We can analyze each transfer orbit in terms of the energy equation to determine which transfer is more efficient.

First, we will assume that the initial orbit has a smaller semi-major axis than the final orbit. Therefore, the final orbit has a higher energy (closer to zero) than the initial orbit. Likewise, the transfer orbit will have a higher energy than the initial orbit and a smaller energy than the final orbit.

To change from the initial orbit to the transfer orbit, the kinetic energy of the spacecraft must increase. The point on the initial orbit where the kinetic energy is closest to the transfer orbit is when the velocity of the initial orbit is highest: at periapsis.

To change from the transfer orbit to the final orbit, the kinetic energy must increase again. The point on the final orbit where the kinetic energy is closest to the transfer orbit is when the velocity of the final orbit is lowest: at apoapsis.

Therefore, we see that **option 1** is the case that provides the lowest energy transfer. Although we conducted this analysis for the case of $a_i < a_f$, the same type of reasoning will apply. See if you can decide which option is best for the case of $a_i > a_f$ before you open the answer below.

:::{dropdown} Which option requires lower $\Delta v$ for $a_f < a_i$?

**Option 2** has the lower $\Delta v$ requirement.

If we are decreasing the size of the semi-major axis, then $a_i > a_t > a_f$ and the specific energies have the same relationship, $E_i > E_t > E_f$. Therefore, going from the initial orbit to the transfer orbit requires a decrease in kinetic energy. The point with the smallest kinetic energy on the initial orbit is apoapsis.

Likewise, the kinetic energy of the final orbit is less than the kinetic energy of the transfer orbit where they intersect. The point on the final orbit with the highest kinetic energy is periapsis.
:::
