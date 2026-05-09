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

# Interplanetary Phasing Example: Neptune–Venus Hohmann Transfer

Continuing the [example from the previous section](@sec:neptune-venus-hohmann-example), we can determine the required phase angles for the Neptune–Venus Hohmann transfer and the total time taken for the transfer and the waiting period.

First, we compute the mean motion of Neptune and Venus.

```{code-cell} ipython3
import math as m
mu = 1.32712E11  # km**3/s**2

T_i = 60910.25  # days
T_f = 224.70  # days
n_i = 2 * m.pi / (T_i * 86_400)  # s
n_f = 2 * m.pi / (T_f * 86_400)  # s
```

The mean motion of Neptune is $n_i =$ {eval}`f"{n_i:.2e}"` rad/s and of Venus is $n_f =$ {eval}`f"{n_f:.2e}"` rad/s. For a Hohmann transfer, $\Gamma = \pi$ and the transfer time is found from @eq:hohmann-transfer-time. Then, we can find the initial phase angle required.

```{code-cell} ipython3
r_i = 4.53239E9  # km
r_f = 1.08209E8  # km
a_t = (r_i + r_f) / 2  # km
t_12 = m.pi / m.sqrt(mu) * a_t**(3/2)  # s

gamma_1 = (m.pi - n_f * t_12) % (2 * m.pi)
```

Note that we use the modulus (`%`) operator to bring the phase angle into the range of 0-2𝜋. The initial phase angle is $\gamma_1 =$ {eval}`f"{m.degrees(gamma_1):.2f}"`°. Although this is the initial phase angle, Venus actually completes approximately 53 orbits of the Sun while waiting for the spacecraft to arrive from Neptune. We can compute the phase angle at arrival similarly.

```{code-cell} ipython3
gamma_2 = (m.pi - n_i * t_12) % (2 * m.pi)
```

The phase angle at arrival is $\gamma_2 =$ {eval}`f"{m.degrees(gamma_2):.2f}"`°. These angles are shown in @fig:interplanetary-phase-angle-example.

:::{figure} ../../images/interplanetary-phase-angle-example.svg
:name: fig:interplanetary-phase-angle-example
:width: 100%

The figure on the left shows the transfer from Neptune inward to Venus. The figure on the right shows the return trip from Venus outward to Neptune. Note that Venus completes many orbits around the sun, while Neptune completes less than half of one orbit during this entire process.
:::

Using the final phase angle, we can compute the waiting time at Venus before a return Hohmann transfer is possible. Since $n_f > n_i$, we choose the positive version of @eq:interplanetary-wait-time.

```{code-cell} ipython3
t_wait = []
for N in (0, 1, 2, 3):
    t = (-2 * gamma_2 + 2 * m.pi * N) / (n_f - n_i)
    t_wait.append(t)
    if t > 0 and t_wait[N - 1] < 0:
      t_total = (2 * t_12 + t) / (525_600 * 60)
```

The wait times are shown in @tab:heliocentric-hohmann-wait-times. The total mission time, including the wait time, is {eval}`f"{t_total:.2f}"` years.

:::{table} The wait times for heliocentric Hohmann transfers from Neptune to Venus and back.
:name: tab:heliocentric-hohmann-wait-times

| N | $t_{\text{wait}}$ (years) |
|---|---------------------------|
| 0 | {eval}`f"{t_wait[0] / (525_600 * 60):.4f}"`     |
| 1 | {eval}`f"{t_wait[1] / (525_600 * 60):.4f}"`     |
| 2 | {eval}`f"{t_wait[2] / (525_600 * 60):.4f}"`     |
| 3 | {eval}`f"{t_wait[3] / (525_600 * 60):.4f}"`     |
:::

```{code-cell} ipython3
T_syn = T_i * T_f / abs(T_i - T_f)  # days
T_syn /= 365.25
```

Clearly, the total mission time is dominated by the transfer time. This is because the synodic period of Venus relative to Neptune is quite small, at only {eval}`f"{T_syn:.2f}"` Earth years. Since Venus whips around the Sun, relative to Neptune, the same phase angle occurs relatively often.
