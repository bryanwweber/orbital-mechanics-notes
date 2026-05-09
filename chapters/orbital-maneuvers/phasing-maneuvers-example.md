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

## Phasing Maneuver: Example

Although we've treated phasing maneuvers as useful to rendezvous two spacecraft, they can also be used to change the longitude above which a satellite orbits. Assume a satellite is in GEO above the prime meridian, a longitude of 0°E. The target longitude is 137.2°W. Determine the $\Delta v$ requirement if the phasing maneuver takes 1, 2, and 5 rotations of Earth.

@fig:phasing-maneuver-example shows the impulse point and the target longitude at the initial state. Earth is rotating counterclockwise and the orbit of the satellite is prograde, the same as Earth's rotation.

:::{figure} ../../images/phasing-maneuver-example.svg
:name: fig:phasing-maneuver-example
:width: 70%

The initial conditions for the phasing maneuver to 137.2°W longitude. Not to scale.
:::

To find the $\Delta v$ requirement, we need to know how much $\Delta v$ is required to get onto the phasing orbit and then return back to GEO. This is determined by the GEO velocity as well as the velocity at the impulse point on the phasing orbit.

The parameters of the phasing orbit depend on its period. For the satellite to be at the target longitude after the maneuver, the period of the phasing orbit has to be the same as the amount of time it takes for Earth to rotate 137.2°. After this amount of rotation, the target longitude will be pointing at the impulse point, and the satellite also needs to be at the impulse point at that moment to perform its second impulse and get back on GEO.

:::{margin}
If we wanted to get to a point in East longitude, we'd need to add 180° to find the total rotation that Earth has to do to reach the impulse point.
:::

```{code-cell} ipython3
import math as m

sidereal_day = 86_164.0905  # s
omega_E = 2 * m.pi / sidereal_day  # rad/s
target_longitude = 137.2  # °W longitude

period_0 = m.radians(target_longitude) / omega_E  # s
```

The period of the phasing orbit has to be $T =$ {eval}`f"{period_0:.3g}"` s = {eval}`f"{period_0/3600:.3g}"` h. With the period, we can calculate the semi-major axis distance of the phasing orbit.

```{code-cell} ipython3
mu = 3.986E5  # km**3/s**2
period_constant = (mu / (4 * m.pi**2))**(1/3)
a_0 = period_0**(2/3) * period_constant  # km
```

The semi-major axis of the phasing orbit is $a_0 =$ {eval}`f"{a_0:.1f}"` km. Since the period of the phasing orbit is shorter than that of the GEO orbit, the impulse point is the apogee point of the phasing orbit. Thus, we know $a$ and $r_a$ for the phasing orbit and we can determine the other parameters from these two.

```{code-cell} ipython3
r_geo = sidereal_day**(2/3) * period_constant  # km
v_geo = m.sqrt(mu / r_geo)

r_a_0 = r_geo  # km
r_p_0 = 2 * a_0 - r_a_0  # km
```

The perigee radius of the phasing orbit is $r_{p_0} =$ {eval}`f"{r_p_0:.2f}"` km. Since this is less than the radius of Earth, this phasing orbit is not possible. Nonetheless, we can calculate the $\Delta v$ requirement for comparison.

The two impulses in the phasing orbit occur at the same location relative to the phasing orbit. Thus, the $\Delta v$ required to move from the initial orbit onto the phasing orbit has the same magnitude as the $\Delta v$ required to do the reverse.

When the period of the phasing orbit is less than the original orbit, and the impulse point is apoapsis of the phasing orbit, then we find:

:::{math}
:label: eq:shorter-period-phasing-delta-v

\Delta v = 2 \left\lvert v_a - v_i \right\rvert
:::

where $v_a$ is the apoapsis velocity of the phasing orbit and $v_i$ is the velocity at the impulse point on the original orbit. Conversely, when the period of the phasing orbit is longer than the original orbit, we find that the impulse point is the periapsis of the phasing orbit, such that:

:::{math}
:label: eq:longer-period-phasing-delta-v

\Delta v = 2 \left\lvert v_p - v_i \right\rvert
:::

```{code-cell} ipython3
E_0 = -mu / (2 * a_0)
v_a_0 = m.sqrt(2 * (E_0 + mu / r_a_0))
delta_v_0 = 2 * abs(v_a_0 - v_geo)
```

The GEO velocity is $v_{\text{GEO}} =$ {eval}`f"{v_geo:.3f}"` km/s, the phasing orbit apogee velocity is $v_{a_0} =$ {eval}`f"{v_a_0:.3f}"` km/s, and the $\Delta v$ is {eval}`f"{delta_v_0:.3f}"` km/s.

Now, let's allow the phasing maneuver to cover multiple revolutions of Earth. This means that the period of the phasing orbit will be:

:::{math}
:label: eq:phasing-orbit-multiple-revolutions

T_{\text{phasing}} = t_{137.2°} + n T_{\text{one orbit}}
:::

where $T_{137.2°}$ is the time for the target longitude to reach the impulse point, $n$ is the number of Earth rotations, and $T_{\text{one orbit}}$ is the period of one of the initial orbits. In this case, $T_{\text{one orbit}}$ is one sidereal day, since the initial orbit is GEO.

In this case, the period of the phasing orbit is longer than the GEO period, so the impulse point is at perigee of the phasing orbit.

```{code-cell} ipython3
r_p = r_geo
def delta_v(a):
    E = -mu / (2 * a)
    v_p = m.sqrt(2 * (E + mu / r_p))
    delta_v = 2 * abs(v_p - v_geo)
    return delta_v

n = 1
period_1 = m.radians(target_longitude) / omega_E + n * sidereal_day  # s
a_1 = period_1**(2/3) * period_constant  # km
delta_v_1 = delta_v(a_1)

n = 2
period_2 = m.radians(target_longitude) / omega_E + n * sidereal_day  # s
a_2 = period_2**(2/3) * period_constant  # km
delta_v_2 = delta_v(a_2)

n = 5
period_5 = m.radians(target_longitude) / omega_E + n * sidereal_day  # s
a_5 = period_5**(2/3) * period_constant  # km
delta_v_5 = delta_v(a_5)
```

```{code-cell} ipython3
:tags: [remove-cell]

import pandas as pd
import numpy as np
df = pd.DataFrame({
  "Number of Complete Rotations": [0, 1, 2, 5],
  "Period (hours)": np.array([period_0, period_1, period_2, period_5])/3600,
  "Delta v (km/s)": [delta_v_0, delta_v_1, delta_v_2, delta_v_5],
})
```

```{code-cell} ipython3
:tags: [remove-cell]
:label: code:phasing-orbit-comparison

df
```

:::{table} Comparison of results for various phasing orbits.
:name: tab:phasing-orbit-comparison
![](#code:phasing-orbit-comparison)
:::

A comparison of the results is shown in @tab:phasing-orbit-comparison. We can see that the impossible phasing orbit, taking only 9.2 hours and cutting through the earth, has the highest $\Delta v$ requirement. The smallest $\Delta v$ requirement is for the case of a single complete rotation of the earth. This is because having a longer period requires raising apogee higher than is necessary, incurring additional $\Delta v$ to do so.
