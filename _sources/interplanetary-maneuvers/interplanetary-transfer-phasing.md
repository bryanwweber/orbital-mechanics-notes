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

# Interplanetary Transfer Phasing

Aside from the $\Delta v$ requirement discussed in the [previous section](./heliocentric-trajectories.md), the other important requirement for interplanetary trajectories is to correctly time the transfer so that the spacecraft and target planet rendezvous at arrival. Since the transfer orbits can take months or years to complete, the target planet may complete a significant fraction of its orbit during the transfer. Therefore, it is critical to launch the spacecraft at just the right time to rendezvous at arrival.

As we did before, we will use the Hohmann transfer for simplicity. However, all the techniques discussed here can be applied to non-Hohmann transfers as well, as long as the total transfer time is known.

## Planetary Phase Angles

To correctly determine when a spacecraft should be launched, we need to know two things:

1. The total time of the transfer orbit
2. The angular distance between two planets, relative to the Sun

The first item can be determined from the orbital elements of the transfer orbit, so we will not discuss how to calculate it here. The second item, the angular distance between two planets, is commonly called the **phase angle**. This is the angle formed by drawing radii from the initial planet to the Sun and then to the final planet, as shown in {numref}`fig:interplanetary-phase-angle`.

:::{figure} ../images/interplanetary-phase-angle.svg
:name: fig:interplanetary-phase-angle
:width: 75%

A hypothetical Hohmann transfer with increasing radius. The initial phase angle between the initial and final planets is $\gamma_1$ and the phase angle after the transfer is complete is $\gamma_2$. Note that while the spacecraft travels 180° of true anomaly on the transfer trajectory (green), the initial planet (blue) travels more than 180° and the final planet (red) travels less than 180°.
:::

In the previous section, we assumed that the orbits of the planets are circular. This allows us to define the angluar distance traversed by the planet in a time interval by its average angular velocity, also called the _mean motion_:

:::{math}
:label: eq:mean-motion
n = \frac{2\pi}{T}
:::

Using the mean motion, we can define the true anomaly of a planet at a given time $t$:

:::{math}
:label: eq:circle-planet-true-anomaly
\nu = \nu_0 + n t
:::

where $\nu_0$ is the value of the true anomaly at $t = 0$. Applying this to the two planets in the transfer, we can write:

:::{math}
:label: eq:planetary-phase-angle

\gamma = \nu_f - \nu_i = \gamma_0 + \left(n_f - n_i\right) t
:::

where $\gamma_0 = \nu_{f,0} - \nu_{i,0}$ is the phase angle at $t = 0$.

### Synodic Period

The question naturally arises, if the phase angle is $\gamma_0$ at $t = 0$, how long does it take to become $\gamma_0$ again? This length of time is called the **synodic period** of the two planets. Each pair of planets has its own synodic period, determined by the relative mean motions of the planets.

If we want the phase angle to change from $\gamma_0$, through all the values, and come back to $\gamma_0$, then the phase angle will have changed by 2𝜋 radians. If the initial planet has a smaller orbital radius, then the apparent motion is clockwise and the final phase angle is $\gamma_0 - 2\pi$. On the other hand, if the initial planet has a larger orbital radius, then the final phase angle will be $\gamma_0 + 2\pi$ because the apparent motion is counterclockwise.

In either case, we can use Eq. {eq}`eq:planetary-phase-angle` to calculate the time it takes for the initial phase angle to reoccur:

:::{math}
:label: eq:synodic-period-1
\gamma_0 \pm 2\pi = \gamma_0 + \left(n_f - n_i\right) T_{syn}
:::

where $T_{syn}$ is the synodic period. Solving Eq. {eq}`eq:synodic-period-1` for $T_{syn}$ would result in two equations, depending on whether $n_f > n_i$ or vice versa. We can unify the equations by taking the absolute value of the difference $n_f - n_i$:

:::{math}
:label: eq:synodic-period-2
T_{syn} = \frac{2\pi}{\lvert n_f - n_i\rvert}
:::

Finally, by plugging Eq. {eq}`eq:mean-motion` into Eq. {eq}`eq:synodic-period-2`, we can write the synodic period in terms of the planets' orbital periods, $T_i$ and $T_f$:

:::{math}
:label: eq:synodic-period-3
T_{syn} = \frac{T_i T_f}{\lvert T_i - T_f\rvert}
:::

The synodic period is the period of the orbit of one planet relative to another, rather than relative to the Sun.

## Phase Angle at Departure

We now have enough information to determine the required phase angle at departure from the initial planet. Given the transfer trajectory, we can compute the transfer time, $t_{12}$. For a Hohmann transfer, this is given by Eq. {eq}`eq:hohmann-transfer-time`.

During the transfer, the final planet moves an angular distance $n_f t_{12}$ radians, since $n_f$ is constant. This is shown in {numref}`fig:interplanetary-initial-phase-angle`.

:::{figure} ../images/interplanetary-initial-phase-angle.svg
:name: fig:interplanetary-initial-phase-angle
:width: 60%

The initial phase angle $\gamma_1$ and final phase angle $\gamma_2$ are related to the angular travel distances.
:::

The initial true anomaly of the final planet is $\nu_{f,1}$ and its final anomaly is $\nu_{f,2}$, such that:

:::{math}
:label: eq:interplanetary-final-planet-arrival-true-anomaly
\nu_{f,2} = \nu_{f,1} + n_f t_{12}
:::

Similarly, the initial true anomaly of the initial planet is $\nu_{i,1}$ and its final anomaly is $\nu_{i,2}$, such that:

:::{math}
:label: eq:interplanetary-initial-planet-arrival-true-anomaly
\nu_{i,2} = \nu_{i,1} + n_i t_{12}
:::

where $n_i t_{12}$ is the angular distance traveled by the initial planet during the transfer. The phase angle at departure, $\gamma_1$ is given by Eq. {eq}`eq:planetary-phase-angle`:

:::{math}
:label: eq:interplanetary-initial-true-anomaly
\gamma_1 = \nu_{f,1} - \nu_{i,1}
:::

Meanwhilie, the spacecraft travels an angular distance of $\Gamma$ radians during the transfer. $\Gamma$ is the difference in true anomaly between the departure and arrival points on the transfer trajectory.

:::{math}
:label: eq:interplanetary-transfer-true-anomaly
\Gamma = \nu_B - \nu_A
:::

where $\nu_B$ and $\nu_A$ are the true anomalies of the arrival and departure points, respectively. For a Hohmann transfer, $\nu_B - \nu_A = \pi$.

Note that $\nu_{f,2} = \nu_B$ and $\nu_{i,1} = \nu_A$. For the spacecraft to rendezvous with the planet at arrival, the true anomaly of the planet and the spacecraft must match. Plugging this relationship into Eq. {eq}`eq:interplanetary-final-planet-arrival-true-anomaly`, subtracting $\nu_A$ from both sides, and using Eq. {eq}`eq:interplanetary-initial-true-anomaly` and Eq. {eq}`eq:interplanetary-transfer-true-anomaly`, we find:

:::{math}
:label: eq:interplanetary-initial-phase-angle
\begin{gathered}
\nu_{f,1} + n_f t_{12} = \nu_B \\
\nu_{f,1} - \nu_{i,1} + n_f t_{12} = \nu_B - \nu_A \\
\gamma_1 + n_f t_{12} = \Gamma \\
\gamma_1 = \Gamma - n_f t_{12}
\end{gathered}
:::

## Phase Angle at Arrival

{numref}`fig:interplanetary-initial-phase-angle` can also be used to determine the phase angle at arrival, $\gamma_2$. Similar to Eq. {eq}`eq:interplanetary-initial-true-anomaly`, we can write the final phase angle in terms of the true anomalies of the planets:

:::{math}
:label: eq:interplanetary-final-true-anomaly
\gamma_2 = \nu_{f,2} - \nu_{i,2}
:::

Plugging this relationship into Eq. {eq}`eq:interplanetary-initial-planet-arrival-true-anomaly`, subtracting $\nu_A$ from both sides, and using Eq. {eq}`eq:interplanetary-transfer-true-anomaly`, we find:

:::{math}
:label: eq:interplanetary-final-phase-angle
\begin{gathered}
\nu_{f,2} - \gamma_2 = \nu_{i,1} + n_i t_{12} \\
\nu_{f,2} - \nu_{A} - \gamma_2 = \nu_{i,1} - \nu_A + n_i t_{12} \\
\gamma_2 = \Gamma - n_i t_{12}
\end{gathered}
:::

## Phase Angles for a Return Trip

Now let's assume that the spacecraft is located at the final planet and wants to return to the initial planet. What should the phase angle at departure from the final planet be? Assuming that the transfer time is the same for the return trip, we can see from Eq. {eq}`eq:interplanetary-final-phase-angle` that the phase angle for the return trip must be:

:::{math}
:label: eq:interplanetary-return-phase-angle
\gamma'_1 = - \gamma_2
:::

where the prime superscript indicates that this is for the return trip. At arrival to the final planet, the phase angle is equal to $\gamma_2$, so how long must the spacecraft wait for the phase angle to become equal to $\gamma'_1$? Using Eq. {eq}`eq:planetary-phase-angle`, where $\gamma_0 = \gamma_2$, we can solve for the wait time:

:::{math}
:label: eq:interplanetary-wait-time-1
\begin{gathered}
\gamma'_1 = - \gamma_2 = \gamma_2 + (n_f - n_i) t_{\text{wait}} \\
t_{\text{wait}} = \frac{-2\gamma_2}{n_f - n_i}
\end{gathered}
:::

Depending on the value of $\gamma_2$, Eq. {eq}`eq:interplanetary-wait-time-1` may give a negative result. Therefore, we must add or subtract integer multiples of 2𝜋 until $t_{\text{wait}}$ becomes positive.

:::{math}
:label: eq:interplanetary-wait-time
\begin{aligned}
t_{\text{wait}} &= \frac{-2\gamma_2 - 2\pi N}{n_f - n_i} &&\text{if } n_i > n_f \\
t_{\text{wait}} &= \frac{-2\gamma_2 + 2\pi N}{n_f - n_i} &&\text{if } n_i < n_f
\end{aligned}
:::

where $N = 0, 1, 2, \ldots$ is chosen so that $t_{\text{wait}}$ is positive.

## Example: Neptune–Venus Hohmann Transfer

Continuing the {ref}`example from the previous section <sec:neptune-venus-hohmann-example>`, we can determine the required phase angles for the Neptune–Venus Hohmann transfer and the total time taken for the transfer and the waiting period.

First, we compute the mean motion of Neptune and Venus.

```{code-cell} ipython3
import math as m
mu = 1.32712E11  # km**3/s**2

n_i = 2 * m.pi / (60910.25 * 86400)  # s
n_f = 2 * m.pi / (224.70 * 86400)  # s
```

```{code-cell} ipython3
:tags: [remove-cell]
from functools import partial
from myst_nb import glue as mystglue
glue = partial(mystglue, display=False)
glue("heliocentric-hohmann-n_i", n_i)
glue("heliocentric-hohmann-n_f", n_f)
```

The mean motion of Neptune is $n_i =$ {glue:text}`heliocentric-hohmann-n_i:.2e` rad/s and of Venus is $n_f =$ {glue:text}`heliocentric-hohmann-n_f:.2e` rad/s. For a Hohmann transfer, $\Gamma = \pi$ and the transfer time is found from Eq. {eq}`eq:hohmann-transfer-time`. Then, we can find the initial phase angle required.

```{code-cell} ipython3
r_i = 4.53239E9  # km
r_f = 1.08209E8  # km
a_t = (r_i + r_f) / 2  # km
t_12 = m.pi / m.sqrt(mu) * a_t**(3/2)  # s

gamma_1 = (m.pi - n_f * t_12) % (2 * m.pi)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("heliocentric-hohmann-gamma_1", m.degrees(gamma_1))
```

Note that we use the modulus (`%`) operator to bring the phase angle into the range of 0-2𝜋. The initial phase angle is $\gamma_1 =$ {glue:text}`heliocentric-hohmann-gamma_1:.2f`°. We can compute the phase angle at arrival similarly.

```{code-cell} ipython3
gamma_2 = (m.pi - n_i * t_12) % (2 * m.pi)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("heliocentric-hohmann-gamma_2", m.degrees(gamma_2))
```

The phase angle at arrival is $\gamma_2 =$ {glue:text}`heliocentric-hohmann-gamma_2:.2f`°. Using the final phase angle, we can compute the waiting time at Venus before a return Hohmann transfer is possible. Since $n_f > n_i$, we choose the positive version of Eq. {eq}`eq:interplanetary-wait-time`.

```{code-cell} ipython3
t_wait = []
for N in (0, 1, 2, 3):
    t = (-2 * gamma_2 + 2 * m.pi * N) / (n_f - n_i)
    t_wait.append(t)
```

```{code-cell} ipython3
:tags: [remove-cell]
for N in (0, 1, 2, 3):
    glue(f"heliocentric-hohmann-t_wait_{N}", t_wait[N] / (525600 * 60))
    if t_wait[N] > 0 and t_wait[N - 1] < 0:
        glue("heliocentric-hohmann-t_total", (2 * t_12 + t_wait[N]) / (525600 * 60))
```

The wait times are shown in {numref}`tab:heliocentric-hohmann-wait-times`. The total mission time, including the wait time, is {glue:text}`heliocentric-hohmann-t_total:.2f` years.

:::{table} The wait times for heliocentric Hohmann transfers from Neptune to Venus and back.
:name: tab:heliocentric-hohmann-wait-times

| N | $t_{\text{wait}}$ (years) |
|---|-----------------------|
| 0 | {glue:text}`heliocentric-hohmann-t_wait_0` |
| 1 | {glue:text}`heliocentric-hohmann-t_wait_1` |
| 2 | {glue:text}`heliocentric-hohmann-t_wait_2` |
| 3 | {glue:text}`heliocentric-hohmann-t_wait_3` |
:::
