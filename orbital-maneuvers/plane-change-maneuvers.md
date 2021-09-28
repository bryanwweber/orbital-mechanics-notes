---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
execution:
  timeout: 100
---

# Plane Change Maneuvers

So far, all the orbital maneuvers we have considered have been coplanar—the initial and final orbits shared the same inclination relative to the orbital focus. However, this need not be the case, and we will relax that assumption in this section.

In particular, orbital plane changes are necessary in many cases when the launch location does not match the desired orbit. Since the latitude of the launch location affects the orbital inclination, achieving certain orbits requires an orbital plane change depending on the launch latitude. One example is geosynchronous equatorial orbit ($i$ = 0°). If the spacecraft is launched from anywhere except the equator, a plane change is required to change the inclination.

## Analysis of Plane Change Maneuvers

We will consider plane changes that have a common focus for the initial and target orbits. For a transfer to occur with a single impulse, the orbital planes must intersect and the intersection of two planes forms a line. Since the orbits have the same focus, the line of intersection of the planes must pass through the focus.

Due to the geometry of this maneuver, it is most convenient to use a coordinate system attached to the moving spacecraft. The unit vectors are parallel and perpendicular to the position vector from the focus. Thus, the velocity is given by:

$$\vector{v} = v_r \uvec{u}_r + v_{\perp} \uvec{u}_{\perp}$$

For a single impulse maneuver, there are up to two locations on the line of intersection where the maneuver can be performed. The plane rotation takes place around the line of intersection. For an impulsive maneuver, the position of the spacecraft doesn't change.

Therefore, the radial velocity does not change direction during a plane change maneuver, although it may change magnitude. In other words, if orbit 1 is the initial orbit and orbit 2 is the target, we can say:

$$\left.\uvec{u}_r\right)_1 = \left.\uvec{u}_r\right)_2 = \uvec{u}_r$$

The plane change is accomplished by changing the direction of the perpendicular velocity component. The angle between the initial and final perpendicular components of the velocity is the **dihedral angle**, $\delta$. Like the radial velocity, the perpendicular velocity may also change its magnitude during a plane change maneuver.

## Required Change of Velocity

The change in velocity for a plane change maneuver is found by:

$$\Delta\vector{v} = \vector{v}_2 - \vector{v}_1 = \left[\left.v_r\right)_2 - \left.v_r\right)_1\right]\uvec{u}_r + \left.v_{\perp}\right)_2\left.\uvec{u}_{\perp}\right)_2 - \left.v_{\perp}\right)_1\left.\uvec{u}_{\perp}\right)_1$$

The magnitude of the velocity change is found by taking the dot product of $\Delta\vector{v}$ with itself:

$$\Delta v^2 = \Delta\vector{v}\cdot\Delta\vector{v} = \left[\left.v_r\right)_2 - \left.v_r\right)_1\right]^2 + \left.v_{\perp}\right)_2^2 + \left.v_{\perp}\right)_1^2 - 2\left.v_{\perp}\right)_1\left.v_{\perp}\right)_2\left[\left.\uvec{u}_{\perp}\right)_1\cdot\left.\uvec{u}_{\perp}\right)_2\right]$$

The last term, the dot product of the two unit vectors, can be replaced by the product of their magnitudes (which is one) and the cosine of the angle between them, so we obtain:

$$\Delta v = \sqrt{\left[\left.v_r\right)_2 - \left.v_r\right)_1\right]^2 + \left.v_{\perp}\right)_2^2 + \left.v_{\perp}\right)_1^2 - 2\left.v_{\perp}\right)_1\left.v_{\perp}\right)_2\cos\delta}$$

To keep $\Delta v$ at a minimum, we can see that the radial velocity component should be kept constant, and the perpendicular velocity should be as small as possible. This occurs when the initial and target orbit have a common apoapsis where the maneuver occurs.

In this case, $\left.v_r\right)_2 = \left.v_r\right)_1 = 0$ and therefore $v_1 = \left.v_{\perp}\right)_1$ and $v_2 = \left.v_{\perp}\right)_2$, so the equation reduces to:

$$\Delta v = \sqrt{v_1^2 + v_2^2 - 2v_1v_2\cos\delta}$$

### In Terms of Flight Path Angle

On the other hand, it may be more convenient to work with the total velocity magnitude and the flight angle, rather than the two velocity components. In that case, since:

$$\begin{aligned}v_r &= v \sin\gamma & v_{\perp} &= v \cos\gamma\end{aligned}$$

we can write:

$$\Delta v = \sqrt{v_1^2 + v_2^2 - 2 v_1 v_2\left[\cos\Delta\gamma - \cos\gamma_2\cos\gamma_1\left(1 - \cos\delta\right)\right]}$$

If $\delta$ = 0° and there is no plane change, then this equation reduces to the same equation we developed previously for non-Hohmann transfer trajectories.

### Pure Rotation of the Orbital Plane

By using the trigonometric identity:

$$\cos\delta = 1 - 2\sin^2\frac{\delta}{2}$$

and setting $v_1 = v_2 = v$ (that is, no speed change), the equation for $\Delta v$ reduces to:

$$\Delta v_{\delta} = 2v\sin\frac{\delta}{2}$$

where the subscript $\delta$ indicates this is for pure rotation of the orbital plane.

By dividing both sides of this equation by $v$, we can plot the relative $\Delta v$ versus $\delta$. On this plot, a value of $\Delta v / v$ of 1.0 means that the $\Delta v$ required is equal to the spacecraft speed, whatever that happens to be.

```{code-cell}
:tags: [remove-input]
import numpy as np
import matplotlib.pyplot as plt
plt.rc("font", size=20)
delta = np.radians(np.linspace(0, 180, 200))
rel_delta_v = 2 * np.sin(delta / 2)
fig, ax = plt.subplots(figsize=(12, 9))
ax.plot(np.degrees(delta), rel_delta_v)
ax.set_xticks(np.arange(0, 200, 20))
ax.set_yticks(np.arange(0, 2.5, 0.5))
ax.grid()
ax.set_xlabel(r"$\delta$, degrees")
ax.set_ylabel(r"$\Delta v/v$");
```

As we can see from the graph, a plane change of 60° requires a $\Delta v$ equal to the current spacecraft velocity! In LEO, the velocity is approximately 7.5 km/s. A plane change of 60°, with an $I_{sp}$ of 300, would require over 90% of the spacecraft mass to be propellant. A plane change of about 24° requires the same $\Delta v$ as is needed to increase the speed to the escape velocity from a circular orbit.

This is why plane changes are often described as very expensive maneuvers, which should be avoided whenever possible once a spacecraft is in orbit. Instead, plane changes should be accomplished during launch. During launch, significantly more propellant can be provided for much less cost, since it does not have to be lifted all the way to orbit.

## Launch Azimuth

In some cases, however, plane changes are unavoidable due to the latitude of the launch site of the spacecraft. One common example is putting a spacecraft in geosynchronous equatorial orbit. It is not possible to launch a spacecraft into an equatorial orbit unless the launch site is on the equator.

We know that the orbital plane must intersect with the center of the earth. Therefore, if a spacecraft is launched from any latitude above or below the equator, the orbit will have some natural inclination relative to the equatorial plane.

The final inclination of the orbit can also be controlled by determining the **launch azimuth**. The launch azimuth is the flight direction when the spacecraft is inserted into its orbit. It is equal to 0° pointing North and increases clockwise. Therefore, launches due East have an azimuth of 90°, due South of 180°, and due West of 270°.

A launch azimuth of 90° (due East) takes most advantage of the rotation of the earth to give a velocity boost to the spacecraft. Since the orbital speed is relative to the inertial coordinates fixed to the earth's center, launching in an eastward direction reduces the $\Delta v$ required to achieve a particular orbital speed.

The linear velocity at the equator is the ratio of the earth's circumference and its sidereal period:

$$v_{\text{equatorial}} = 2 \pi R_E/\omega_E = 2\pi \cdot \unit{6378}{km} / \unit{23.9345}{h} = \unit{0.4651}{km/s}$$

The velocity at any latitude can be found by multiplying this by the cosine of the latitude:

$$v_{\text{latitude}} = v_{\text{equatorial}} \cos\phi$$

The due East launch azimuth also puts the spacecraft into an orbit with its inclination equal to the launch latitude. The relationship between launch azimuth, latitude, and orbital inclination is given by:

$$\cos i = \cos\phi\sin A$$

where $A$ is the launch azimuth. For $0° < A < 90°$ and $90° < A< 180°$, the launch is in an easterly direction, although not taking full advantage of the earth's rotational velocity. These launch azimuths produce an inclination greater than the launch latitude, but less than 90°. Since these orbits have a velocity component in the eastward direction, they are called **prograde** orbits.

Launches to the west, with $180° < A < 360°$, are called **retrograde** orbits. These produce an inclination between 90° and 180°.

To produce an inclination of 90° or 180° requires a launch due North or due South, respectively. These are the polar orbits.

The figure below shows a plot of the orbital inclination obtained for a range of latitudes and launch azimuths. We can see that the only way to achieve an inclination of 0°, an equatorial orbit, is to launch from the equator ($\phi$ = 0°) with a launch azimuth of $A$ = 90° (due East) to make a prograde orbit or $A$ = 180° (due West) for a retrograde orbit.

```{code-cell}
:tags: [remove-input]
phi = np.radians(np.arange(0, 70, 10))
A = np.radians(np.linspace(0, 360, 200))
fig, ax = plt.subplots(figsize=(12, 9))
ax.set_xticks(np.arange(0, 390, 30))
ax.set_yticks(np.arange(0, 210, 30))
ax.set_xlabel("$A$, degrees")
ax.set_ylabel("$i$, degrees")
ax.grid()
for p in phi:
    ax.plot(np.degrees(A), np.degrees(np.arccos(np.cos(p) * np.sin(A))), label=rf"$\phi$ = {np.degrees(p):.0F}°")
ax.legend();
```

As a practical consideration, launch azimuths are limited by the geography surrounding the launch site. Launches from Kennedy Space Center in Florida ($\phi$=28.6°N) are limited to azimuths between [35° and 120°](https://spaceflight.nasa.gov/shuttle/reference/shutref/sts/launch.html) so that they do not cross land over the US. Therefore, polar orbits ($i$ = 90°) are not possible to achieve from Kennedy.

The other major launch site in the US is Vandenberg Air Force Base in southern California ($\phi$ = 34.7°N). Similar restrictions at Vandenberg require most launches to go to the south, over the Pacific Ocean. However, polar and sun-synchronous orbits are possible from Vandenberg, where the azimuth limits are from [158° to 201°](https://spaceflight.nasa.gov/shuttle/reference/shutref/sts/launch.html).
