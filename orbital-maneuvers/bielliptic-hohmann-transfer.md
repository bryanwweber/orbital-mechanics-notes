# Bielliptic Hohmann transfer

Hohmann showed that the Hohmann transfer is the most efficient _two_ impulse maneuver. However, for some cases, adding an additional impulse reduces the total $\Delta v$ requirement for an orbital transfer.

Assume that the initial and target orbits are circular. A bielliptic Hohmann transfer starts by departing the initial orbit onto an elliptical transfer orbit whose apoapsis is at a _higher altitude_ than the target orbit. Upon reaching apoapsis of the first transfer orbit, the velocity is boosted again onto a second transfer orbit. This second transfer orbit has the same apoapsis altitude as the target orbit.

This situation is shown in the figure below. The upper, green, transfer orbit is the first ellipse. Point 2 is at a higher altitude than the target, red, orbit. The lower, orange, transfer orbit has the same periapsis altitude as the target orbit.

![Bielliptic Hohmann transfer orbit. Source [Wikipedia](https://en.wikipedia.org/wiki/File:Bi-elliptic_transfer.svg)](../images/Bi-elliptic_transfer.svg)

The reason this type of transfer can be more efficient than the two-impulse Hohmann transfer is because the velocity change required to change the periapsis altitude at point 2 is very small.

One way to imagine this intuitively is as a lever. The farther point 2 is from the center of attraction, the less velocity change is required to change the perigee altitude. In the limit where point 2 goes to infinity, the required change in velocity is zero! By moving point 2 farther away, we are increasing the "leverage" that the propellent has to change the periapsis altitude.

This effect is particularly powerful if we need to accomplish a plane change maneuver in addition to a change of periapsis altitude. As we will see, plane changes can be very expensive in terms of propellent, so it is helpful to be able to reduce that need.

## Comparison of Regular and Bielliptic Hohmann Transfer

The bielliptic Hohmann transfer will be more efficient when the total $\Delta v$ required for the three impulses is less than the total $\Delta v$ that the regular Hohmann transfer requires. In terms of the ratios of the orbital radii $r_1$, $r_2$, and $r_3$, we find that when the ratio

$$\frac{r_3}{r_1} < 11.94$$

the regular Hohmann transfer is more efficient. On the other hand if the ratio

$$\frac{r_3}{r_1} > 15.58$$

then the bielliptic transfer is more efficient. In the intermediate range, the higher efficiency transfer depends on the ratio $r_2/r_1$. For a given value of $r_3/r_1$ between 11.94 and 15.58, higher values of $r_2/r_1$ (moving point 2 farther away) tend to make the bielliptic transfer preferred.

On the other hand, the bielliptic transfer has a much longer flight time than the standard Hohmann transfer. This is because the bielliptic transfer must traverse 360° of true anomaly on two very large ellipses.
