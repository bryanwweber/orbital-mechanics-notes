# Bi-elliptic Hohmann transfer

Hohmann {cite}`Hohmann1960` showed that the Hohmann transfer is the most efficient _two_ impulse maneuver. However, for some cases, adding an additional impulse reduces the total $\Delta v$ requirement for an orbital transfer.

Assume that the initial and target orbits are circular. A [Bi-elliptic Hohmann transfer](https://en.wikipedia.org/wiki/Bi-elliptic_transfer) starts by departing the initial orbit onto an elliptical transfer orbit whose apoapsis is at a _higher altitude_ than the target orbit. Upon reaching apoapsis of the first transfer orbit, the velocity is boosted again onto a second transfer orbit. This second transfer orbit has the same periapsis altitude as the target orbit.

This situation is shown in {numref}`fig:bi-elliptic-hohmann-transfer`. The upper, green, transfer orbit is the first ellipse. Point 2 is at a higher altitude than the target, red, orbit. The lower, orange, transfer orbit has the same periapsis altitude as the target orbit.

:::{figure} ../images/Bi-elliptic_transfer.svg
:width: 50%
:name: fig:bi-elliptic-hohmann-transfer

The bi-elliptic Hohmann transfer. [AndrewBuck](https://commons.wikimedia.org/wiki/File:Bi-elliptic_transfer.svg) [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), via Wikimedia Commons
:::

The reason this type of transfer can be more efficient than the two-impulse Hohmann transfer is because the velocity change required to change the periapsis altitude of the second transfer orbit at point 2 is very small.

One way to imagine this intuitively is as a lever. The farther point 2 is from the center of attraction, the less velocity change is required to change the perigee altitude. In the limit where point 2 goes to infinity, the required change in velocity is zero! By moving point 2 farther away, we are increasing the "leverage" that the propellent has to change the periapsis altitude.

This effect is particularly powerful if we need to accomplish a plane change maneuver in addition to a change of periapsis altitude. As we will see, plane changes can be very expensive in terms of propellent, so it is helpful to be able to reduce that need.

## Comparison of Regular and Bielliptic Hohmann Transfer

The bi-elliptic Hohmann transfer will be more efficient when the total $\Delta v$ required for the three impulses is less than the total $\Delta v$ that the regular Hohmann transfer requires. In terms of the orbital radii $r_1$ (initial orbit), $r_2$ (apoapsis of the transfer), and $r_3$ (target orbit), we find for:

:::{math}
:label: eq:hohmann-more-efficient
\frac{r_3}{r_1} < 11.94
:::

the regular Hohmann transfer is more efficient. Thus, smaller orbital radius changes will be more efficient using a two-impulse Hohmann transfer.

On the other hand if the target orbit to initial orbit ratio is:

:::{math}
:label: eq:bi-elliptic-more-efficient
\frac{r_3}{r_1} > 15.58
:::

then the bi-elliptic transfer is more efficient. This happens because the bi-elliptic transfer uses more of its $\Delta v$ when the velocity of the spacecraft is higher. Due to the [Oberth effect](https://en.wikipedia.org/wiki/Oberth_effect), this results in a higher kinetic energy that can be used for other purposes.

In the intermediate range, the higher efficiency transfer depends on the ratio $r_2/r_1$. For a given value of $r_3/r_1$ between 11.94 and 15.58, higher values of $r_2/r_1$ (moving point 2 farther away) tend to make the bielliptic transfer preferred.

On the other hand, the bielliptic transfer has a much longer flight time than the standard Hohmann transfer. This is because the bielliptic transfer must traverse 360° of true anomaly on two very large ellipses.
