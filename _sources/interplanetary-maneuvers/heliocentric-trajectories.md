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

# Heliocentric Trajectories

In this section, we will discuss the heliocentric trajectory portion of the method of patched conics. There are three primary results of the calculation of the heliocentric trajectory:

1. The required spacecraft velocity at the edge of the initial planet’s sphere of influence, such that it is placed on the appropriate transfer trajectory
2. The spacecraft velocity at arrival to the final planet’s orbit around the Sun
3. The timing of the transfer

The third result will be discussed in the [next section](./interplanetary-transfer-phasing.md). Essentially, it determines when the spacecraft should depart the initial planet so that it arrives at the final planet’s orbit in the same location as the final planet.

In this section, we’ll present a simplified method of analysis to calculate the transfer trajectory velocities. This will allow us to determine the required $\Delta v$s at the departure and arrival planets.

## Trajectory Velocity Requirement

In general, any trajectory that intersects the initial and final orbit can be used for an interplanetary transfer, just as for transfers in the same gravitational field. The particular transfer trajectory chosen will depend on the requirement for the mission duration and the available propellant mass, as well as the available launch windows.

However, the Hohmann transfer is still the most efficient transfer, so it is a useful basis for comparison to other trajectories. Recall that in the Hohmann transfer, the velocity vectors of the spacecraft at departure and arrival are parallel to the initial and final orbits, and that the transfer is made of 180° of an ellipse.

To calculate the orbital parameters for a transfer, we will simplify the calculations with three assumptions:

1. All the planetary orbits are coplanar. With the exceptions of Mercury and Pluto, the orbital inclinations of the planets range from 0° for Earth to 3.4° for Venus, as shown in {numref}`tab:planetary-orbital-elements`.
2. The planetary orbits are circular. Again with the exceptions of Mercury and Pluto, the eccentricities of the planets’ orbits range from 6.7×10<sup>-3</sup> for Venus to 9.3×10<sup>-2</sup>, as shown in {numref}`tab:planetary-orbital-elements`.
3. The radius of the circular orbit is equal to the mean semimajor axis of the orbit. The semimajor axis can be found in {numref}`tab:planetary-orbital-elements`.

With these three assumptions, the calculation of the required velocities can be completed by the methods discussed in [](../orbital-maneuvers/hohmann-transfer.md) and [](../orbital-maneuvers/non-hohmann-transfers.md).

The value for the gravitational parameter $\mu$ *must* be the value for the sun, $\mu_{\text{Sun}} =$ 1.32712×10<sup>11</sup> km<sup>3</sup>/s<sup>2</sup>.

<!-- markdownlint-disable MD022 -->
(sec:neptune-venus-hohmann-example)=
## Example: Neptune–Venus Hohmann Transfer
<!-- markdownlint-enable MD022 -->

A spacecraft will complete a Hohmann transfer from Neptune to Venus. Calculate the required $\Delta v$ and the total transfer time.

As with the single-planet Hohmann transfer, there are multiple approaches to computing the required velocities. We will start by calculating the orbital velocities of the two planets. Any objects in the same orbit about the Sun must have the same velocity.

The spacecraft will start on the same orbit as Neptune, with Neptune's orbital velocity, before providing an impulse to get onto the transfer orbit. Upon reaching Venus's orbit, the spacecraft will provide another impulse to change its velocity to match Venus's orbital velocity.

The value for $\mu_{\text{Sun}}$ comes from {numref}`tab:planetary-mass-parameters` and the orbital radii for the planets are assumed to be equal to the semimajor axes given in {numref}`tab:planetary-orbital-elements`.

```{code-cell} ipython3
import math as m
mu = 1.32712E11  # km**3/s**2

r_1 = 4.53239E9  # km
r_2 = 1.08209E8  # km

v_1 = m.sqrt(mu / r_1)
v_2 = m.sqrt(mu / r_2)
```

```{code-cell} ipython3
:tags: [remove-cell]
from functools import partial
from myst_nb import glue as mystglue
glue = partial(mystglue, display=False)
glue("heliocentric-hohmann-v_1", v_1)
glue("heliocentric-hohmann-v_2", v_2)
```

This gives orbital velocities of $v_1 =$ {glue:text}`heliocentric-hohmann-v_1:.3f` km/s for Neptune and $v_2 =$ {glue:text}`heliocentric-hohmann-v_2:.3f` km/s for Venus. These match the values from {numref}`tab:planetary-orbital-elements`, as expected.

Next, we'll use the orbital energy of the transfer orbit to determine the velocities at aphelion and perihelion of the transfer orbit.

```{code-cell} ipython3
a_t = (r_1 + r_2) / 2
E_t = - mu / (2 * a_t)
v_t1 = m.sqrt(2 * (E_t + mu / r_1))
v_t2 = m.sqrt(2 * (E_t + mu / r_2))
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("heliocentric-hohmann-v_t1", v_t1)
glue("heliocentric-hohmann-v_t2", v_t2)
```

The velocities on the transfer orbit are $v_{t,1} =$ {glue:text}`heliocentric-hohmann-v_t1:.3f` km/s at depature from Neptune and $v_{t,2} =$ {glue:text}`heliocentric-hohmann-v_t2:.3f` km/s at arrival at Venus. Finally, the total $\Delta v$ is found by the sum of the $\Delta v$ at each end of the transfer orbit. We can also calculate the transfer time from the semimajor axis.

```{code-cell} ipython3
Delta_v = abs(v_t1 - v_1) + abs(v_t2 - v_2)
t_12 = m.pi / m.sqrt(mu) * a_t**(3/2)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("heliocentric-hohmann-Delta_v", Delta_v)
glue("heliocentric-hohmann-t_12", t_12/(525600*60))
```

The results are $\Delta v =$ {glue:text}`heliocentric-hohmann-Delta_v:.3f` km/s and $t_{12} =$ {glue:text}`heliocentric-hohmann-t_12:.3f` years.
