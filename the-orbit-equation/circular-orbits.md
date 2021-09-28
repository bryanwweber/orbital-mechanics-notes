# Circular Orbits ($e = 0$)

Setting $e = 0$ in the orbit equation, Eq. {eq}`eq:scalar-orbit-equation` yields:

:::{math}
:label: eq:circular-orbit-equation
r = \frac{h^2}{\mu}
:::

The radius of an orbit with $e = 0$ is constant, so the orbit is a circle. The velocity is also constant:

:::{math}
:label: eq:circular-orbit-velocity
v_{\text{circular}} = \sqrt{\frac{\mu}{r}}
:::

The time required to complete one orbit is known as the **orbital period**. Because the speed of a circular orbit is constant, the period is simply the circumference divided by the velocity:

:::{math}
:label: eq:circular-orbit-period
T = \frac{2\pi r}{\sqrt{\mu/r}} = \frac{2\pi}{\sqrt{\mu}}r^{3/2}
:::

The specific energy of a circular orbit is:

:::{math}
:label: eq:circular-orbit-energy
E_{\text{circular}} = -\frac{\mu}{2r}
:::

The specific energy of the circular orbit is negative. As the orbit radius goes up, the energy increases and gets closer to zero. Thus, a given launch vehicle with a certain amount of fuel can launch a large payload to an orbit with a small radius, or a small payload to an orbit with a large radius.

## Low Earth Orbit

Many manned spacecraft and unpopulated satellites occupy ideally circular orbits around the Earth. These orbits typically fall between altitudes of 150 km (100 miles) and 2000 km (1200 miles). These orbits are called **low earth orbits**, or LEO. The lower of these altitudes is substantially above the bulk of the drag-inducing atmosphere. The higher altitude is less than the altitude of the [Van Allen radiation belts](https://en.wikipedia.org/wiki/Van_Allen_radiation_belt), a dangerous region of space extending from about 1000 km outwards.

:::{figure} ../images/Comparison_satellite_navigation_orbits.svg
:name: fig:Comparison_satellite_navigation_orbits
:width: 50%

A comparison of satellite navigation orbits. [cmglee](https://commons.wikimedia.org/wiki/File:Comparison_satellite_navigation_orbits.svg), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0), via Wikimedia Commons
:::

## Geostationary Equatorial Orbit

If a satellite remains at a constant location above the earth's equator, then the orbit is a circular **geostationary equatorial orbit**, or GEO. For GEO, the radial vector from the center of the earth to the satellite must have the same angular velocity as the surface of the earth.

The angular velocity of the earth is calculated by dividing the complete revolution, $2\pi$ radians by the length of the [**sidereal day**](https://en.wikipedia.org/wiki/Sidereal_time#Sidereal_day). The familiar, 24-hour, day is called the [**synodic day**](https://en.wikipedia.org/wiki/Synodic_day) or **solar day**. The solar day is the time that it takes for the Sun to apparently make one revolution around the Earth.

However, for GEO, we are interested in the time it takes for the Earth to complete one rotation around its axis. This is slightly shorter than the synodic day, because the Earth is also moving around the sun as it rotates. If the Earth were fixed in space, the synodic and sidereal days would be equal length.

The sidereal day is approximately 23.93 hours, giving an inertial angular velocity of the Earth of:

:::{math}
:label: eq:earth-angular-velocity
\omega_E = \unit{72.9218\times 10^{-6}}{rad/s}
:::

The radius of GEO is

:::{math}
:label: eq:geo-radius
r_{\text{GEO}} = \sqrt[3]{\frac{\mu}{\left(\omega_E\right)^2}} = \sqrt[3]{\frac{398,600}{\left(72.9218\times10^{-6}\right)^2}} = \unit{42,164}{km}
:::

The altitude is then:

:::{math}
:label: eq:geo-altitude
z_{\text{GEO}} = \unit{35,768}{km} = \unit{22,241}{mi}
:::

The speed at GEO is:

:::{math}
:label: eq:geo-speed
v_{\text{GEO}} = \unit{3.075}{km/s}
:::
