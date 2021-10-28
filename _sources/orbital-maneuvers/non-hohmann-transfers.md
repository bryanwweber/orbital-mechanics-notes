# Non-Hohmann Transfers with a Common Apse Line

The Hohmann transfer requires that the spacecraft have the thrust impulses applied at periapsis and apoapsis of the transfer orbit. However, this limits the possible timing of the transfer if we are trying to intercept another celestial body.

Instead, it would be more convenient if we could transfer to or from any point in the initial or target orbit. This would require more $\Delta v$ than a Hohmann transfer, but gives more flexibility. The only required condition is that the transfer orbit must intersect both the initial and final orbits.

For now, we will assume that the initial and target orbits have a common apse line. In addition, the two orbits will have the same focus. Assume that we want to leave the initial orbit at the true anomaly $\nu_A$ and arrive at the target orbit at the true anomaly $\nu_B$.

Since the two orbits have the same focus, the transfer orbit will also have the same focus. In addition, since the apse lines are in common, the departure and arrival true anomalies are the same in the transfer orbit. This situation is shown in {numref}`fig:common-apse-line-transfer`.

:::{figure} ../images/common-apse-line-transfer.svg
:name: fig:common-apse-line-transfer
:width: 75%

The setup for the common apse line transfer orbit. The initial and final orbits are shown in black, while the transfer orbit is shown in blue. The solid section of the transfer orbit is the portion actually traversed by the spacecraft.
:::

Therefore, we can apply the orbit equation at the departure and arrival points:

:::{math}
:label: eq:non-hohmann-intersecting-points
\begin{aligned}
  r_A &= \frac{p_t}{1 + e_t\cos\nu_A} & r_B &= \frac{p_t}{1 + e_t\cos\nu_B}
\end{aligned}
:::

where $r_A$ and $r_B$ are the orbital radii at the departure and arrival points. Note that $p_t$ is the orbital parameter for the transfer orbit, and $p = h^2/\mu$.

Now we have two equations and two unknowns for the transfer orbit, $e_t$ and $p_t$. Solving for these two, we find:

:::{math}
:label: eq:non-hohmann-orbital-elements
\begin{aligned}
  e_t &= \frac{r_B - r_A}{r_A \cos\nu_A - r_B\cos\nu_B} \\
  p_t &= r_A r_B\frac{\cos\nu_A - \cos\nu_B}{r_A\cos\nu_A - r_B\cos\nu_B}
\end{aligned}
:::

::::{note}
**Note:** For the special case of a Hohmann transfer, $\nu_A$ = 0° and $\nu_B$ = 180°, such that:

:::{math}
\begin{aligned}
  e_t &= \frac{r_B - r_A}{r_A + r_B} \\
  p_t &= \frac{2 r_A r_B}{r_A - r_B}
\end{aligned}
:::
::::

## Calculating $\Delta v$

For orbital transfers that do not take place on the apse line, we have to account for the change in direction of the velocity vector in addition to the change of magnitude. The difference in length of the velocity vectors is the change in speed and the change of flight path angle is the change of direction of the vector.

It is very important that when we calculate the required $\Delta v$ for a maneuver, this is the magnitude of the change in velocity vector, not the change of magnitude of the velocity (speed). Since $\Delta\vector{v} = \vector{v}_{A_t} - \vector{v}_A$, the magnitude is:

:::{math}
:label: eq:non-hohmann-delta-v-vector
\Delta v = \mag{\Delta\vector{v}} = \sqrt{\left(\vector{v}_{A_t} - \vector{v}_{A}\right)\cdot\left(\vector{v}_{A_t} - \vector{v}_{A}\right)}
:::

Expanding the product and simplifying with the law of cosines, we find:

:::{math}
:label: eq:non-hohmann-delta-v-scalar
\Delta v = \sqrt{v_A^2 + v_{A_t}^2 - 2 v_A v_{A_t} \cos\Delta\phi}
:::

where $\Delta\phi = \phi_{A_t} - \phi_A$ is the change of flight path angle. The flight path angle is given by Eq. {eq}`eq:flight-path-angle`.

This situation is shown in {numref}`fig:non-hohmann-delta-v` for the departure point.

:::{figure} ../images/non-hohmann-delta-v.svg
:name: fig:non-hohmann-delta-v

Arbitrary changes may be made to the velocity vector by aligning the thrust vector to the angle $\gamma$. This causes a change in flight path angle from $\phi_A$ to $\phi_{A_t}$. This manuever will transfer from the initial orbit to the transfer orbit. A similar maneuver is required to go from the transfer orbit to the final orbit.
:::

This gives the required velocity change at the departure point, $A$. The same calculate can be done at the arrival point, $B$, to compute the total $\Delta v$ for the maneuver.

## Thrust Direction

To achieve the new velocity, the thrust from the engine must be directed parallel to the direction of $\Delta\vector{v}$. Relative to the local horizon, the required angle $\gamma$ is given by:

:::{math}
:label: eq:non-hohmann-thrust-direction
\tan\gamma = \frac{\Delta v_r}{\Delta v_{\perp}}
:::

where $\Delta v_r$ is the change in the radial component of velocity and $\Delta v_{\perp}$ is the change in the perpendicular component of velocity.

## Relation to Specific Energy

The _vis viva_ equation determines the specific energy of the spacecraft due to its kinetic and potential energy by Eq. {eq}`eq:vis-viva-equation`. The impulsive maneuver in this transfer changes the velocity but not the position (by definition). Then, we can calculate the change in specific energy due to the impulse:

:::{math}
:label:
\Delta E = \frac{\left(\vector{v} + \Delta\vector{v}\right)\cdot\left(\vector{v} + \Delta\vector{v}\right)}{2} - \frac{\vector{v}\cdot\vector{v}}{2}
:::

Simplifying, assuming that $\vector{v} = \vector{v}_A$ and $\left(\vector{v} + \Delta\vector{v}\right) = \vector{v}_{A_t}$, we find:

:::{math}
:label:
\Delta E = v\Delta v \cos\Delta\phi + \frac{1}{2}\Delta v^2
:::

From this equation, for a fixed $\Delta v$ from the maneuver, we see that $\Delta E$ is maximized when $v$ is largest and $\Delta\phi$=0. In the sense that higher $\Delta E$ for a given $\Delta v$ is more efficient, we can see that aligning the velocity vectors and maximizing $v$ by providing the impulse at periapsis has the highest efficiency.
