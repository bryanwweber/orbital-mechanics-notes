# Chapter 4.7 - Effects of the Earth's Oblateness

Up to now, we have assumed that the earth (or whichever celestial body we happened to be orbiting) was a sphere. It turns out that for many planets, they are not perfectly spherical due to the rotation around an axis through the planet's poles. This rotation gives the day-night cycle on the planet, and it causes the equator to bulge relative to the poles.

Essentially, the mass of the planet at the equator is farther from the axis of rotation, so it experiences a higher centrifugal force. This causes a slightly larger displacement of that mass.

This type of shape is called an [**oblate spheroid**](https://en.wikipedia.org/wiki/Spheroid#Oblate_spheroids) and the associated property of the planet is called its **oblateness**, or [flattening](https://en.wikipedia.org/wiki/Flattening). Oblateness is defined by:

$$\text{Oblateness} = \frac{\text{Equatorial radius} - \text{Polar radius}}{\text{Equatorial radius}}$$

Due to the flattening of the poles of the planets, the spherical symmetry of the gravitational field is broken. Thus, unless a satellite is orbiting in a plane coincident with the planetary equatorial plane (which would be an inclination $i =$ 0°), the force of gravity will not be directed exactly to the center of the earth.

We can show that the gravitational field around a sphere is, well, spherically symmetric. However, the oblateness causes a variation of the gravitational field with latitude. This is called a **zonal variation**, where zonal indicates the variation is over latitude.

## Earth's Oblateness and WGS84

```{margin}
The field of [geodesy](https://en.wikipedia.org/wiki/Geodesy) is the science related to measuring Earth's geometric shape and gravitational field.
```

For the purposes of orbit calculations, we are interested in the [**reference ellipsoid**](https://en.wikipedia.org/wiki/Reference_ellipsoid) of the earth. The reference ellipsoid is an idealized surface of the earth that approximates the **geoid**. The geoid is, in turn, an averaged figure representing the surface of the earth more accurately than a sphere.

Using the reference ellipsoid, the equatorial radius of the earth is the semimajor axis $a$ and the polar radius is the semiminor axis $b$. Thus, we can define the flattening or oblateness as:

$$f = \frac{a - b}{a}$$

where $f$ is the flattening. This definition comes from the definition of an oblate spheroid as the volume of revolution of an ellipse about its semiminor axis.

Therefore, it is sufficient to define any two of $a$, $b$, or $f$ to define the reference ellipsoid. For Earth, the most commonly used reference ellipsoid comes from the [**WGS84**](https://en.wikipedia.org/wiki/World_Geodetic_System) standard. WGS stands for World Geodetic System, and comprises not only the reference ellipsoid but a definition of the coordinate system on the surface of the earth as well. WGS84 is the 1984 version of the standard, although parts of it have been updated several times since. WGS84 is used by GPS satellites when calculating positions on the surface of the earth.

The parameters specified in the WGS84 standard are:

<!-- markdownlint-disable MD033 -->
| Parameter      | Value                                                                            |
|----------------|----------------------------------------------------------------------------------|
| $a$            | 6,378,137.0 m                                                                    |
| $1/f$          | 298.257223 563                                                                  |
| $b$            | 6,356,752.314245 m (calculated)                                                 |
| Zero Longitude | [IERS Reference Meridian](https://en.wikipedia.org/wiki/IERS_Reference_Meridian) |
| $\mu$          | 3986004.418×10<sup>8</sup> m³/s².                                              |
| $\omega_E$     | 72.92115×10<sup>−6</sup> rad/s                                                   |
<!-- markdownline-enable MD033 -->

For even more accurate orbit calculations, particularly over longer time scales, it is necessary to map the variations in the earth's gravitational field due to things such as the tides, mountain ranges, oceans, and more. These effects are represented in a model called the [**Earth Gravitational Model**](https://en.wikipedia.org/wiki/Earth_Gravitational_Model) (EGM). The most recent EGM is from 2008 and relies on high accuracy satellite measurements of Earth's gravitational field.

[EGM2008](https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2011JB008916) specifies the geoid of the earth to very high accuracy, as low as 10 cm in places. The EGM2008 is a model fit to the available experimental data, using [spherical harmonic equations](https://en.wikipedia.org/wiki/Spherical_harmonics) of extremely high order, resulting in [many millions of coefficients](https://earth-info.nga.mil/GandG/wgs84/gravitymod/new_egm/new_egm.html) in the model.

## Effect of Oblateness on Orbits

<!-- markdownlint-disable MD033 -->
The effect of planetary oblateness on orbits is captured in the dimensionless parameter called $J_2$, the **second zonal harmonic**. The zonal harmonics are values that depend on the particular planet. For Earth, $J_2 =$ 1.08263×10<sup>-3</sup> {cite}`Vallado2013` (Page 1039).
<!-- markdownlint-enable MD033 -->

The effect of oblateness is to cause the right ascension of the ascending node and the argument of the periapsis to change as a function of time. The average rate of change of these variables is:

$$\frac{d\Omega}{dt} = \dot{\Omega} = -\left[\frac{3}{2}\frac{\sqrt{\mu}J_2 R^2}{\left(1 - e^2\right)^2 a^{7/2}}\right]\cos i$$(regression-of-nodes)

and

$$\frac{d\omega}{dt} = \dot{\omega} = -\left[\frac{3}{2}\frac{\sqrt{\mu}J_2 R^2}{\left(1 - e^2\right)^2 a^{7/2}}\right]\left(\frac{5}{2}\sin^2 i - 2\right)$$(advance-of-perigee)

where $R$ is the planet's equatorial radius and $i$ is the orbital inclination.

From these equations, we can see that when $0° \leq i < 90°$, $\dot{\Omega}$ is negative. This means that the node line will move westward over time, in the opposite of the direction of rotation of the earth. Thus, this phenomenon is called **regression of the nodes**. If $i = 90°$, the node line is fixed. Lastly, if $90° < i \leq 180°$, the node line will move eastward in the inertial frame.

For the argument of the perigee, if $0 \leq i < 63.4°$ or $116.6° < i \leq 180°$ then $\dot{\omega}$ will be positive and the perigee will advance in the same direction as the orbit. In the in-between region, $63.4° < i < 116.6°$, perigee will move backwards around the orbit. For the two critical values, $i = 63.4°$ and $i=116.6°$, the location of perigee will be fixed on the orbit.

We can use the regression of the nodes and the advance of perigee to generate two useful types of orbits:

1. Sun-synchronous orbits
2. Orbits that observe the far northern or southern latitudes

### Sun-Synchronous Orbits

In some cases, it is useful for a satellite to pass over the same position on the earth at the same local solar time each day. Since the solar day is longer than the sidereal day, the plane of the orbit must advance eastward by advancing the node line.

Imagine starting a stopwatch precisely when the sun crosses the meridian, or line of longitude, at your location. At that moment, there is a line directly from the center of the earth, through your meridian to the center of the sun. Exactly 24 hours later, the sun will cross the meridian again.

Now, over the course of the 24 hours, the earth moved:

$$\frac{360°}{356.26\text{ days}} 1\text{ day} = 0.9856°$$

in its orbit around the sun. This means that, relative to the **vernal equinox line**, which always points in a fixed direction, the radial line from the center of the earth to the center of the sun also shifted by 0.9856°.

A satellite in orbit around the earth with coordinates specified in either the geocentric equatorial frame or the perifocal frame is always relative to the vernal equinox line. Imagine that the orbit of a given satellite has its node line parallel to the radial line through your meridian when the sun crosses the meridian on the first day.

For the satellite to have its node line pass through the radial at exactly the same time 24 hours later, the node line must move eastward by 0.9856° over the course of the day. Therefore, we need to use the regression of the nodes to design an orbit where:

$$\dot{\Omega} = 0.9856°/\mathrm{day} = 1.991\times 10^{-7} rad/s$$

Notice that the node line must move eastward, so the orbital inclination must be greater than 90°.

Returning to Eq. {eq}`regression-of-nodes`, we can see that if $\dot{\Omega}$ is specified, we have three free parameters: $a$, $e$, and $i$. This allows some choice of perigee and period, and inclination can then be solved for.

### High-Latitude Observation

We saw in a previous example that satellites in geosynchronous equatorial orbits can only observe up to latitudes of about 80° N and S. Therefore, it is advantageous to have satellites specifically devoted to observations of higher latitudes. For observation or communication satellites, they will ideally have the same perigee and, probably more importantly, apogee altitudes to ensure consistent observation windows.

This means that the orbit should be ideally designed so that the advance of the perigee is negated by setting the inclination equal to either of the critical values, $i =63.4°$ and $i=116.6°$.

## Ground Tracks

As a spacecraft orbits, we can project a line from the satellite to the center of the earth. The location where this line intersects the surface of the earth can be assigned a latitude and longitude. If the set of intersecting points is plotted on a map of the earth over time, this is called a **ground track** of the spacecraft.

The ground track is useful to know because it is related to what parts of the earth can see the spacecraft and vice versa. Since communication with spacecraft requires the transmitting antenna to be able to see the receiving antenna, knowing where above the earth the satellite is at any given moment is a useful piece of information.

:::{margin}
The book calls the projection it uses the Mercator projection, but this is apparently a mistake, since the Mercator projection causes significant distortion in the high polar latitudes. Instead, the projection used in the book appears to be equirectangular, since all of the equally spaced lines of latitude and longitude form squares.
:::

Unless the spacecraft is in a polar orbit, it passes through all of the degrees of longitude going around the earth. Similarly, unless the orbit is equatorial, the spacecraft will pass through several, although not all, of the degrees of latitude. This causes the ground track to appear sinusoidal when plotted on a rectangular projection of latitude and longitude, such as the [equirectangular projection](https://en.wikipedia.org/wiki/Equirectangular_projection).

If the earth did not rotate (and was therefore spherical), the ground track would repeat indefinitely along the same line. However, since the earth does rotate underneath the satellite, and because of the regression of the nodes, the ground track actually shifts over time.

To calculate the ground track, we can imagine a pair of coordinate systems:

1. Fixed in space, with its origin at the center of the earth—the geocentric equatorial coordinate system, $X$, $Y$, and $Z$
2. Rotating at the same rate as the earth, with its origin at the center of the earth—the Earth-centered, Earth-fixed (ECEF) frame, $x'$, $y'$, and $z'$

The ground track of the spacecraft is then found by calculating the right ascension and declination at any instant in the ECEF frame.

The orbit of the spacecraft is defined in the geocentric equatorial frame by $\left\{r\right\}_{X}$ and $\left\{v\right\}_{X}$ or the classical orbital elements $h$, $e$, $\theta$, $i$, $\Omega$, and $\omega$, since we can transform between these sets of parameters.

We can also represent the orbit of the spacecraft in the Earth-centered, Earth-fixed frame by $\left\{r\right\}_{x'}$ and $\left\{v\right\}_{x'}$, where the $x'$ subscript indicates the use of the ECEF frame. To do so, we need to transform from the geocentric equatorial frame to the ECEF frame.

The transformation from the geocentric equatorial frame to the ECEF is given by the rotation matrix around the $Z$-$z'$ axis:

$$\left[\mathbf{R}_{3}(\theta_E)\right] = \begin{bmatrix}\cos\theta_E & \sin\theta_E & 0\\-\sin\theta_E & \cos\theta_E & 0\\0 & 0 & 1\end{bmatrix}$$

where

$$\theta_E = \omega_E\left(t - t_0\right)$$

Thus, the transformation can be accomplished by:

$$\left\{r\right\}_{x'} = \left[\mathbf{R}_{3}(\theta_E)\right]\left\{r\right\}_{X}$$

Then, once we know the coordinates in the ECEF, we can determine the right ascension and declination of the coordinates to determine the latitude and longitude.
