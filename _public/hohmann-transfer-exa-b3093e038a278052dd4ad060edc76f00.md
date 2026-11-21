---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Example: Hohmann Transfer

The [Geostationary Operational Environmental Satellite](https://en.wikipedia.org/wiki/Geostationary_Operational_Environmental_Satellite) system encompasses a set of spacecraft to perform imaging of the Earth from GEO. The most recently launched satellite is [GOES-17](https://en.wikipedia.org/wiki/GOES-17), which had a launch mass of 5,192 kg.

Assume that the launch vehicle placed GOES-17 into a circular LEO with an altitude of 250 km. Determine the $\Delta v$ and propellant mass required for a Hohmann transfer orbit to GEO.

The total $\Delta v$ requirement is the sum of the change required to go from LEO onto the transfer orbit, and the change required to go from the transfer orbit to GEO. First, let's calculate the velocity on the circular orbit.

```{code-cell} ipython3
import math as m

mu = 3.986E5  # km**3/s**2
R_E = 6378  # km
r_leo = 250 + R_E  # km

v_leo = m.sqrt(mu / r_leo)
```

The LEO velocity is $v_{\text{LEO}} =$ {eval}`f"{v_leo:.3f}"` km/s. Next, let's calculate GEO altitude and velocity. We know for GEO that the satellite must be orbiting with the same angular velocity as the surface of Earth.

```{code-cell} ipython3
sidereal_day = 86164.0905  # s
r_cubed = mu * sidereal_day**2 / (4 * m.pi**2)
r_geo = r_cubed ** (1 / 3)
v_geo = m.sqrt(mu / r_geo)
```

The GEO radius is $r_{\text{GEO}} =$ {eval}`f"{r_geo:.3f}"` km and the velocity is $v_{\text{GEO}} =$ {eval}`f"{v_geo:.3f}"` km/s.

The transfer ellipse will have a semi-major axis length, $a$, equal to half the total distance between the two circular orbits. In addition, the perigee radius of the transfer orbit will be equal to $r_{\text{LEO}}$ and the apogee radius will be equal to $r_{\text{GEO}}$. Using this information we can calculate the orbital angular momentum and the velocities.

```{code-cell} ipython3
r_p = r_leo
r_a = r_geo
h_t = m.sqrt(2 * mu * r_a * r_p / (r_a + r_p))
v_tp = h_t / r_p
v_ta = h_t / r_a
```

This gives a transfer orbit perigee velocity of $v_{t,p} =$ {eval}`f"{v_tp:.3f}"` km/s and apogee velocity of $v_{t,a} =$ {eval}`f"{v_ta:.3f}"` km/s. Finally, we can calculate the $\Delta v$ and the propellant mass $\Delta m$. The [Centaur](https://en.wikipedia.org/wiki/Centaur_(rocket_stage)) rocket stage that served as the second stage for the GOES-17 mission has an $I_{sp}$ of 450.5 s.

```{code-cell} ipython3
Delta_v = abs(v_geo - v_ta) + abs(v_tp - v_leo)
I_sp = 450.5
goes_mass = 5_192  # kg
Delta_m = goes_mass * (1 - m.exp(-Delta_v / (I_sp * 9.81E-3)))
```

Finally, the transfer velocity change is $\Delta v =$ {eval}`f"{Delta_v:.3f}"` km/s and the propellant mass is $\Delta m =$ {eval}`f"{Delta_m:.3f}"` kg.
