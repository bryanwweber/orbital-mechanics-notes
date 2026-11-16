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

## Planetary Departure Trajectory: Example

Let's consider the example of a Hohmann transfer from Neptune to Venus. Assume the spacecraft starts in a 25,000-km-radius circular parking orbit. What $\Delta v$ is required to conduct the transfer away from Neptune? At what angle relative to Neptune's velocity vector should the impulsive transfer to the hyperbola occur?

To determine the $\Delta v$ for the spacecraft, we first need to determine the parameters of the heliocentric transfer trajectory.

```{code-cell} ipython3
import math as m
mu = 1.32712E11  # km**3/s**2, Sun

r_i = 4.53239E9  # km, Neptune
r_f = 1.08209E8  # km, Venus

v_i = m.sqrt(mu / r_i)  # km/s, Neptune

a_t = (r_i + r_f) / 2  # km
E_t = - mu / (2 * a_t)  # km**2/s**2
v_t1 = m.sqrt(2 * (E_t + mu / r_i))  # km/s

Delta_vt = abs(v_i - v_t1)  # km/s
```

Here, `v_1` is the heliocentric orbital velocity of Neptune, and `v_t1` is the spacecraft velocity on the heliocentric transfer orbit at Neptune's orbital radius relative to the Sun. `Delta_vt` is the change in velocity needed between Neptune's orbital velocity and the transfer orbit velocity. In other words, this is the spacecraft speed relative to Neptune at the start of the heliocentric transfer orbit.

`Delta_vt` is equal to $v_{\infty}$ that we need for the Neptune-centered hyperbolic escape trajectory. In addition, we know that the parking orbit radius, and therefore the radius of the hyperbolic periapsis is 26,000 km. Using this we can find the periapsis velocity.

```{code-cell} ipython3
v_infty = Delta_vt

mu_i = 6.83653E6  # km**3/s**2, Neptune
r_p = 25_000  # km
v_park = m.sqrt(mu_i / r_p)
v_p = m.sqrt(v_infty**2 + 2 * mu_i / r_p)  # km/s

Delta_v = abs(v_p - v_park)
```

The hyperbolic excess speed is $v_{\infty} =$ {eval}`f"{Delta_vt:.3f}"` km/s, the parking orbit speed is $v_{\text{park}} =$ {eval}`f"{v_park:.3f}"` km/s, the hyperbola periapsis speed is $v_p =$ {eval}`f"{v_p:.3f}"` km/s, and the $\Delta v$ to change from the parking orbit to the hyperbola is $\Delta v =$ {eval}`f"{Delta_v:.3f}"` km/s.

This is a fairly large $\Delta v$ requirement. One reason is that the 1-bar-radius of Neptune is about 24,764 km, so a 25,000 km parking orbit is very deep in Neptune's gravity well.

The impulse angle relative to the departure asymptote can be found by calculating the eccentricity.

```{code-cell} ipython3
ecc = 1 + r_p * v_infty**2 / mu_i

eta = m.acos(-1/ecc)
```

The eccentricity of the hyperbola is $e =$ {eval}`f"{m.degrees(ecc):.4f}"` and the impulse angle is $\eta =$ {eval}`f"{m.degrees(eta):.2f}"`°, assuming the parking orbit is prograde.
