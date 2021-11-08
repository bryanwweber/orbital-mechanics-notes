# Interplanetary Trajectories and Maneuvers

In the chapter on Orbital Maneuvers, we focused on maneuvers where there was a common focus for the initial and final orbits. For interplanetary trajectories, the spacecraft will be in multiple orbits that have several foci. In addition, interplanetary trajectories require the spacecraft to leave the gravitational influence of Earth, so the trajectory is perturbed by the other objects in the solar system, primarily Jupiter.

There are multiple methods, of varying complexity, to calculate interplanetary trajectories. Since the trajectories are perturbed by several gravitational sources, they are not really two-body trajectories that we've been studying. One approach to solving these problems is to account for all the gravitational perturbations directly in the equations of motion. This approach quickly becomes very complicated and computationally intensive, so it is not usually pursued.

Instead, the most common method for interplanetary trajectory calculations is called the [**patched conic approximation**](https://en.wikipedia.org/wiki/Patched_conic_approximation). In this approximation, we patch together several conic sections to compute the entire trajectory of interest. More advanced methods can be considered by perturbing the equations in the patched conic framework, or by perturbations of the equations of motion more generally.

## Method of Patched Conics

In this chapter, we will focus on using the unperturbed patched conics method to calculate interplanetary transfers. The basic method of patched conics involves three conic trajectories:

1. A [**hyperbolic trajectory**](../the-orbit-equation/hyperbolic-trajectories.md) to escape the initial planet. The focus of this trajectory is the initial planet. The end of this trajectory is when the gravitational influence of the Sun is stronger than the initial planet.
2. An [**elliptical**](../the-orbit-equation/elliptical-orbits.md) or [**hyperbolic**](../the-orbit-equation/hyperbolic-trajectories.md) trajectory to transfer from the orbit of the initial planet to the orbit of the final planet. The focus of this trajectory is the Sun.
3. A [**hyperbolic trajectory**](../the-orbit-equation/hyperbolic-trajectories.md) on arrival at the final planet. The focus of this trajectory is the final planet. This trajectory starts at the point where the gravitational influence of the final planet is stronger than the Sun.

These three trajectories are shown in {numref}`fig:interplanetary-transfer`, which shows a Hohmann transfer from the initial planet to the final planet. The Hohmann transfer is the most efficient type of orbital transfer, so it's a good basis for comparison. However, any trajectory that intersects the orbits of the initial and final planets can be used for the transfer.

:::{figure} ../images/interplanetary-transfer.svg
:name: fig:interplanetary-transfer
:width: 100%

The three trajectories in the method of patched conics. The initial planet is shown on the left of the figure. The spacecraft departs the planet on a hyperbola relative to the initial planet. When the spacecraft reaches the radius of the initial planet's sphere of influence (shown as the dashed gray line), its velocity is such that the trajectory becomes an ellipse relative to the Sun. This is shown in the center of the figure by the green line. After traversing 180° in a Hohmann transfer, the spacecraft arrives at the final planet's sphere of influence. Relative to the final planet, the spacecraft is approaching on a hyperbolic trajectory.
:::

The dashed gray circles on {numref}`fig:interplanetary-transfer` represent the [**sphere of influence**](https://en.wikipedia.org/wiki/Sphere_of_influence_(astrodynamics)) of each planet. This represents the boundary of where the planet's gravitational influence on the spacecraft is stronger than the Sun's. Although there is no true boundary and the influence of the planet and Sun vary smoothly along the trajectory, the sphere of influence represents a useful way to divide the transfers.

Inside a planet's sphere of influence, the focus of the trajectory is the planet. Outside the sphere of influence, the focus of the trajectory is the Sun. Therefore, the edge of the sphere of influence is the _patch point_ where our analysis will from planet-centric to heliocentric on departure, and from heliocentric to planet-centric at arrival.

Analyzing the method of patched conics is done individually for each of the three trajectories. We start with the heliocentric transfer trajectory, since that determines the velocity of the spacecraft at the edges of the spheres of influence of the two planets. Once the heliocentric trajectory is determined, we can calculate the required hyperbolic trajectories at departure and arrival to achieve the mission objectives.
