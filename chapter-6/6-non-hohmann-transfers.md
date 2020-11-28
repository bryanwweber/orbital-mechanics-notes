# Chapter 6.6 - Non-Hohmann Transfers with a Common Apse Line

The Hohmann transfer requires that the spacecraft have the thrust impulses applied at periapsis and apoapsis of the transfer orbit. However, this limits the possible timing of the transfer if we are trying to intercept another celestial body.

Instead, it would be more convenient if we could transfer to or from any point in the initial or target orbit. This would require more $\Delta v$ than a Hohmann transfer, but gives more flexibility.

For now, we will assume that the initial and target orbits have a common apse line. In addition, the two orbits will have the same focus. Assume that we want to leave the initial orbit at the true anomaly $\theta_A$ and arrive at the target orbit at the true anomaly $\theta_B$.

Since the two orbits have the same focus, the transfer orbit will also have the same focus. In addition, since the apse lines are in common, the departure and arrival true anomalies are the same in the transfer orbit.

Therefore, we can apply the orbit equation at the departure and arrival points:

$$\begin{aligned}r_A &= \frac{h^2}{\mu}\frac{1}{1 + e\cos\theta_A} & r_B &= \frac{h^2}{\mu}\frac{1}{1 + e\cos\theta_B}\end{aligned}$$

where $r_A$ and $r_B$ are the orbital radii at the departure and arrival points. Note that $h$ is the specific orbital angular momentum for the transfer orbit.

Now we have two equations and two unknowns for the transfer orbit, $e$ and $h$. Solving for these two, we find:

$$\begin{aligned}e &= \frac{r_A - r_B}{r_A \cos\theta_A - r_B\cos\theta_B} \\ h &= \sqrt{\mu r_A r_B}\sqrt{\frac{\cos\theta_A - \cos\theta_B}{r_A\cos\theta_A - r_B\cos\theta_B}}\end{aligned}$$

```{note}
**Note:** For the special case of a Hohmann transfer, $\theta_A$ = 0° and $\theta_B$ = 180°, such that:

$$\begin{aligned}e &= \frac{r_A - r_B}{r_A + r_B} \\ h &= \sqrt{2\mu}\sqrt{\frac{r_A r_B}{r_A - r_B}}\end{aligned}$$

There is a typo in this similar equation in the book for $e$.
```

## Calculating $\Delta v$

For orbital transfers that do not take place on the apse line, we have to account for the change in direction of the velocity vector in addition to the change of magnitude. The difference in length of the velocity vectors is the change in speed and the change of flight path angle is the change of direction of the vector.

It is very important that when we calculate the required $\Delta v$ for a maneuver, this is the magnitude of the change in velocity vector, not the change of magnitude of the velocity (speed). Since $\Delta\vector{v} = \vector{v}_2 - \vector{v}_1$, such that the magnitude is:

$$\Delta v = \mag{\Delta\vector{v}} = \sqrt{\left(\vector{v}_2 - \vector{v}_1\right)\cdot\left(\vector{v}_2 - \vector{v}_1\right)}$$

Expanding the product and simplifying with the law of cosines, we find:

$$\Delta v = \sqrt{v_1^2 + v_2^2 - 2 v_1 v_2 \cos\Delta\gamma}$$

where $\Delta\gamma = \gamma_2 - \gamma_1$ is the change of flight angle.

## Thrust Direction

To achieve the new velocity, the thrust from the engine must be directed parallel to the direction of $\Delta\vector{v}$. Relative to the local horizon, the required angle $\phi$ is given by:

$$\tan\phi = \frac{\Delta v_r}{\Delta v_{\perp}}$$

where $\Delta v_r$ is the change in the radial component of velocity and $\Delta v_{\perp}$ is the change in the perpendicular component of velocity.

## Relation to Specific Energy

The _vis viva_ equation determines the specific energy of the spacecraft due to its kinetic and potential energy:

$$\varepsilon = \frac{\vector{v}\cdot\vector{v}}{2} - \frac{\mu}{r}$$

The impulsive maneuver in this transfer changes the velocity but not the position (by definition). Then, we can calculate the change in specific energy due to the impulse:

$$\Delta\varepsilon = \frac{\left(\vector{v} + \Delta\vector{v}\right)\cdot\left(\vector{v} + \Delta\vector{v}\right)}{2} - \frac{\vector{v}\cdot\vector{v}}{2}$$

Simplifying, assuming that $\vector{v} = \vector{v}_1$ and $\left(\vector{v} + \Delta\vector{v}\right) = \vector{v}_2$, we find:

$$\Delta\varepsilon = v\Delta v \cos\Delta\gamma + \frac{1}{2}\Delta v^2$$

From this equation, for a fixed $\Delta v$ from the maneuver, we see that $\Delta\varepsilon$ is maximized when $v$ is largest and $\Delta\gamma$=0. In the sense that higher $\Delta\varepsilon$ for a given $\Delta v$ is more efficient, we can see that aligning the velocity vectors and maximizing $v$ by providing the impulse at periapsis has the highest efficiency.
