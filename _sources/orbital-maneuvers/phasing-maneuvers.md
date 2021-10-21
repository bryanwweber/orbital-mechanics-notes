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

# Phasing Maneuvers

When two spacecraft want to rendezvous in space, they must simultaneously have the same position and velocity vectors. Common examples of rendezvous are resupply craft for the ISS or the Lunar Module (LM) with the Command and Service Module (CSM) during the Apollo missions.

For two spacecraft to rendezvous, there are typically two stages to the maneuver:

1. **Phasing maneuver**: The two spacecraft may begin the maneuver very far apart. The first stage of the rendezvous is to bring the two spacecraft into close proximity by performing a phasing maneuver, usually by one of the spacecraft.
2. **Final approach**: Once the spacecraft are in close proximity, the final approach maneuver requires small adjustments to the approaching craft's velocity so that the two can match.

In this section, we are going to focus on the first stage, the phasing maneuver. A phasing maneuver, in general, is a two-impulse transfer from an orbit into a different orbit, then back to the original orbit. The period of the transfer orbit is different from the original orbit, so the spacecraft will arrive back at the original impulse point at a different time than if it had stayed on the original orbit.

We assume that the velocity change is applied parallel to the velocity vector at the impulse point. This gives the minimum propellant usage for such a maneuver, but is relatively slow. More general orbital transfers, including rendezvous maneuvers that require less than a full orbit, will be covered in [](./non-hohmann-transfers.md).

## Returning At A Later Time

As shown in {numref}`fig:phasing-orbit-increase-period`, two spacecraft are initially on Orbit 1. The chase or interceptor spacecraft is at the point marked _Impulse Point_ and the target spacecraft is _behind_ the chase craft in the orbit.

:::{figure} ../images/phasing-orbit-increase-period.svg
:width: 75%
:name: fig:phasing-orbit-increase-period

A phasing orbit to allow a target spacecraft to catch up to the interceptor spacecraft. The semi-major axis of the phasing orbit (Orbit 2, blue) is larger than the initial orbit, so the period of the phasing orbit is longer.
:::

At the impulse point, the interceptor spacecraft increases its velocity to place itself on Orbit 2. The period of Orbit 2 is:

:::{math}
:label: eq:phasing-orbit-2-period

T_2 = \frac{2\pi}{\sqrt{\mu}} a_2^{3/2}
:::

while the period of Orbit 1 is:

:::{math}
:label: eq:phasing-orbit-1-period

T_1 = \frac{2\pi}{\sqrt{\mu}} a_1^{3/2}
:::

Since $a_1 < a_2$, the period of Orbit 2 is greater. Therefore, while the interceptor craft travels 360° of true anomaly in time $T_2$, the target spacecraft travels _more than_ 360° of true anomaly. This allows the target spacecraft to catch up and reach the impulse point at the same time that the interceptor returns there.

## Returning At An Earlier Time

As shown in {numref}`fig:phasing-orbit-decrease-period`, two spacecraft are initially on Orbit 1. The chase or interceptor spacecraft is at the point marked _Impulse Point_ and the target spacecraft is _behind_ the chase craft in the orbit.

:::{figure} ../images/phasing-orbit-decrease-period.svg
:width: 75%
:name: fig:phasing-orbit-decrease-period

A phasing orbit to allow an interceptor spacecraft to catch up to the target spacecraft. The semi-major axis of the phasing orbit (Orbit 2, blue) is smaller than the initial orbit, so the period of the phasing orbit is shorter.
:::

At the impulse point, the interceptor spacecraft decreases its velocity to place itself on Orbit 2. The period of Orbit 2 is given by Eq. {eq}`eq:phasing-orbit-2-period` while the period of Orbit 1 is given by Eq. {eq}`eq:phasing-orbit-1-period`.

Since $a_1 > a_2$, the period of Orbit 2 is smaller. Therefore, while the interceptor craft travels 360° of true anomaly in time $T_2$, the target spacecraft travels less than_ 360° of true anomaly. This allows the interceptor spacecraft to catch up and reach the impulse point at the same time that the target returns there.

## Example

Although we've treated phasing maneuvers as useful to rendezvous two spacecraft, they can also be used to change the longitude above which a satellite orbits. Assume a satellite is in GEO above the prime meridian, a longitude of 0°E. The target longitude is 137.2°W. Determine the $\Delta v$ requirement if the phasing maneuver takes 1, 2, and 5 rotations of Earth.

{numref}`fig:phasing-maneuver-example` shows the impulse point and the target longitude at the initial state. Earth is rotating counterclockwise and the orbit of the satellite is prograde, the same as Earth's rotation.

:::{figure} ../images/phasing-maneuver-example.svg
:name: fig:phasing-maneuver-example
:width: 70%

The initial conditions for the phasing maneuver to 137.2°W longitude. Not to scale.
:::

To find the $\Delta v$ requirement, we need to know how much $\Delta v$ is required to get onto the phasing orbit and then return back to GEO. This is determined by the GEO velocity as well as the velocity at the impulse point on the phasing orbit.

:::{margin}
If we wanted to get to a point in East longitude, we'd need to add 180° to find the total rotation that Earth has to do to reach the impulse point.
:::

The parameters of the phasing orbit depend on its period. For the satellite to be at the target longitude after the maneuver, the period of the phasing orbit has to be the same as the amount of time it takes for Earth to rotate 137.2°. After this amount of rotation, the target longitude will be pointing at the impulse point, and the satellite also needs to be at the impulse point at that moment to perform its second impulse and get back on GEO.

```{code-cell} ipython3
import math as m

sidereal_day = 86_164.0905  # s
omega_E = 2 * m.pi / sidereal_day  # rad/s
target_longitude = 137.2  # °W longitude

period_0 = m.radians(target_longitude) / omega_E  # s
```

```{code-cell} ipython3
:tags: [remove-cell]
from functools import partial
from myst_nb import glue as mystglue
glue = partial(mystglue, display=False)
glue("phasing_orbit_period_0", period_0)
glue("phasing_orbit_hours_0", period_0 / 3600)
```

The period of the phasing orbit has to be $T =$ {glue:text}`phasing_orbit_period_0:.3f` s = {glue:text}`phasing_orbit_hours_0:.3f` h. With the period, we can calculate the semi-major axis distance of the phasing orbit.

```{code-cell} ipython3
mu = 3.986E5  # km**3/s**2
period_constant = (mu / (4 * m.pi**2))**(1/3)
a_0 = period_0**(2/3) * period_constant  # km
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("phasing_orbit_a_0", a_0)
```

The semi-major axis of the phasing orbit is $a_0 =$ {glue:text}`phasing_orbit_a_0:.1f` km. Since the period of the phasing orbit is shorter than that of the GEO orbit, the impulse point is the apogee point of the phasing orbit. Thus, we know $a$ and $r_a$ for the phasing orbit and we can determine the other parameters from these two.

```{code-cell} ipython3
r_geo = sidereal_day**(2/3) * period_constant  # km
v_geo = m.sqrt(mu / r_geo)

r_a_0 = r_geo  # km
r_p_0 = 2 * a_0 - r_a_0  # km
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("phasing_orbit_v_geo", v_geo)
glue("phasing_orbit_r_p_0", r_p_0)
```

The perigee radius of the phasing orbit is $r_{p_0} =$ {glue:text}`phasing_orbit_r_p_0:.2f` km. Since this is less than the radius of Earth, this phasing orbit is not possible. Nonetheless, we can calculate the $\Delta v$ requirement for comparison.

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

```{code-cell} ipython3
:tags: [remove-cell]
glue("phasing_orbit_delta_v_0", delta_v_0)
glue("phasing_orbit_v_a_0", v_a_0)
```

The GEO velocity is $v_{\text{GEO}} =$ {glue:text}`phasing_orbit_v_geo:.3f` km/s, the phasing orbit apogee velocity is $v_{a_0} =$ {glue:text}`phasing_orbit_v_a_0:.3f` km/s, and the $\Delta v$ is {glue:text}`phasing_orbit_delta_v_0:.3f` km/s.

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
loc = locals()
for n in (1, 2, 5):
    glue(f"phasing_orbit_hours_{n}", loc[f"period_{n}"] / 3600)
    glue(f"phasing_orbit_delta_v_{n}", loc[f"delta_v_{n}"])
```

:::{table} Comparison of results for various phasing orbits.
:name: tab:phasing-orbit-comparison
:align: center

| Number of<br>Complete Rotations | Period (hours) | $\Delta v$ (km/s) |
|:-----------------------------|:---------------|:------------------|
| 0 | {glue:text}`phasing_orbit_hours_0:.2f` | {glue:text}`phasing_orbit_delta_v_0:.3f` |
| 1 | {glue:text}`phasing_orbit_hours_1:.2f` | {glue:text}`phasing_orbit_delta_v_1:.3f` |
| 2 | {glue:text}`phasing_orbit_hours_2:.2f` | {glue:text}`phasing_orbit_delta_v_2:.3f` |
| 5 | {glue:text}`phasing_orbit_hours_5:.2f` | {glue:text}`phasing_orbit_delta_v_5:.3f` |
:::

A comparison of the results is shown in {numref}`tab:phasing-orbit-comparison`. We can see that the impossible phasing orbit, taking only 9.2 hours and cutting through the earth, has the highest $\Delta v$ requirement. The smallest $\Delta v$ requirement is for the case of a single complete rotation of the earth. This is because having a longer period requires raising apogee higher than is necessary, incurring additional $\Delta v$ to do so.
