---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.3-dev
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---
# Classical Orbital Elements

We know that the solution to the 3-D vector orbit equation requires six independent elements to find a solution. So far, we have worked with $\vector{r}$ and $\vector{v}$ and their scalar components when determining orbits. In this section, we introduce the six classical orbital elements, which can also be used as a set of independent components of the orbit.

The six elements are also known as Keplerian orbital elements:

1. $a$, the semi-major axis—a constant defining the size of the conic.
2. $e$, the eccentricity—a constant defining the shape of the conic.
3. $i$, the inclination—the constant angle between $\uvec{K}$ in the reference frame and $\uvec{h}$ in the orbital plane.
4. $\Omega$, right ascension (or longitude) of the ascending node—the right ascension of the point where the spacecraft crosses from below to above the fundamental plane of the reference frame. The crossing point is called the ascending node.
5. $\omega$, argument of periapsis—the angular distance along the orbit from the ascending node to periapsis.
6. $T$, time of periapsis passage—the time when the spacecraft passed periapsis.

Each of these six elements will be developed in the following subsections. This choice of six elements is not unique and equivalent parameters will be discussed below as well.

## $a$, the Semi-Major Axis

The semi-major axis determines the size of the conic section. For a circle, it is the radius, while for an ellipse, it describes the width of the ellipse. For a hyperbola, the semi-major axis describes the distance from the origin of the Cartesian coordinate system.

The semi-latus rectum may specified instead of the semi-major axis, since with $a$ and $e$, $p$ can be calculated. This is convenient for parabolic trajectories where the semi-major axis is not as meaningful.

Finally, the specific angular momentum, $h$, can also be used in place of the semi-major axis.

:::{html-figure} assets/semimajor.html
:name: fig:definition-of-semi-major-axis
:title: Semi-major axis of an elliptical orbit
:placeholder: ../../assets/threejs-placeholders/elements-semimajor.png

The semi-major axis, $a$, is the distance from the center of the ellipse to periapsis. Adjusting $a$ changes the orbit's size with eccentricity fixed at 0.4, inclination at 30°, and both right ascension of the ascending node and argument of periapsis at 0°. Lengths are shown in relative units.
:::

## $e$, the Eccentricity

The eccentricity describes the deviation of the trajectory from a circle. When $e=0$, the orbit is circular; for values of $e < 1$, the orbit is elliptical. When $e = 1$, the trajectory is parabolic and for $e > 1$, the trajectory is hyperbolic.

:::{html-figure} assets/eccentricity.html
:name: fig:definition-of-eccentricity
:title: Eccentricity of an elliptical orbit
:placeholder: ../../assets/threejs-placeholders/elements-eccentricity.png

Eccentricity changes the shape of the orbit while the semi-major axis stays fixed at 100 relative units. Inclination is 30°, and both right ascension of the ascending node and argument of periapsis are 0°. At zero eccentricity, the orbit is circular, the center and focus coincide, and periapsis is undefined.
:::

## $i$, the Inclination

The [inclination](https://en.wikipedia.org/wiki/Orbital_inclination) is the angle from the $\uvec{K}$ axis in the reference frame to the angular momentum vector, $\vector{h}$, as shown in @fig:definition-of-inclination. The inclination ranges from 0° to 180°.

:::{html-figure} assets/inclination.html
:name: fig:definition-of-inclination
:title: Inclination of an orbital plane
:placeholder: ../../assets/threejs-placeholders/elements-inclination.png

The inclination of a planar orbit with respect to a reference plane.
:::

An inclination of 0° is an equatorial orbit. Orbits with inclinations from 0° to 90° are called **prograde** orbits because they rotate counterclockwise when viewed from above the north pole. This is the same direction as the surface of the Earth rotates and the same direction that planets orbit around the Sun.

An orbit with an inclination of 90° is called a polar orbit because it passes directly over the north and south poles of the primary object.

Orbits from 90° to 180° are called **retrograde** orbits because they rotate clockwise when viewed from above the north pole. This is the opposite direction of the surface of the Earth or the planets.

## $\Omega$, the Right Ascension of the Ascending Node

Consider an orbit inclined at angle $i$ to the reference plane of the coordinate system, as shown in @fig:definition-of-raan. The spacecraft spends part of its time above the reference plane and part of the time below the reference plane.

:::{html-figure} assets/raan.html
:name: fig:definition-of-raan
:title: Right ascension of the ascending node
:placeholder: ../../assets/threejs-placeholders/elements-raan.png

The right ascension of the ascending node is the angle from the $X$ axis to the ascending node.
:::

The intersection of these two planes is a line, called the **node line**. This line will appear in calculations later. Since the orbit follows the perimeter of th orbital plane, this implies there are two crossing points:

1. The **descending node**: The point when the spacecraft goes from above to below the reference plane
2. The **ascending node**: The point when the spacecraft goes from below to above the reference plane

The right ascension of the ascending node is defined as the [right ascension](./right-ascension-declination.md) of the point where the spacecraft goes from below the reference plane to above it. This is therefore also the angle from the $\uvec{I}$ axis to the crossing point of the orbit.

The right ascension of the ascending node (abbreviated RAAN) can range from 0° to 360°, inclusive.

If the orbit has an inclination of 0° or 180°, the right ascension of the ascending node is not defined. For these inclinations the orbit is coplanar with the reference plane and does not go above or below it.

## $\omega$, the Argument of Periapsis

In the [perifocal reference frame](./perifocal-frame.md), periapsis occurs at a true anomaly of 0°. The argument of periapsis determines how far around the orbit you have to go, starting at the ascending node, before you get to periapsis. This definition is shown in @fig:definition-of-argument-of-periapsis.

:::{html-figure} assets/periapsis.html
:name: fig:definition-of-argument-of-periapsis
:title: Argument of periapsis
:placeholder: ../../assets/threejs-placeholders/elements-periapsis.png

The argument of periapsis is the angle in the orbital plane from the ascending node to periapsis.
:::

Alternatively, the right ascension of periapsis (abbreviated RAP or $\Pi$) may be specified. In this case, the angle given is the sum of the right ascension of the ascending node and the argument of periapsis:

:::{math}
:label: eq:right-ascension-of-periapsis

\Pi = \Omega + \omega
:::

If there is no periapsis, as in a circular orbit, then $\Pi$ and $\omega$ are both undefined.

## $T$, the Time At Periapsis

The time since periapsis gives the location of the spacecraft on the orbit at some known time, $t_0$. This can be specified in a number of ways. The time at periapsis, $T$, is simply the time when the spacecraft crossed periapsis. If this is known, along with the other orbital parameters and the current time, the current position of the spacecraft on the orbit can be determined.

Equivalently, the **true anomaly at the epoch** can be specified. The epoch is simply some known time; it is often conveniently chosen to be zero but this may not always be the case when using observational data. The true anomaly at this time can then be used as the sixth orbital element.

## Putting It All Together

Of course, each parameter can be adjusted independently. You can explore how each parameter interacts below!

:::{html-figure} assets/combined.html
:name: fig:explore-orbital-elements
:title: Explore the five orbital elements
:placeholder: ../../assets/threejs-placeholders/elements-combined.png

Explore how the semi-major axis, eccentricity, inclination, right ascension of the ascending node, and argument of periapsis determine the orbit's size, shape, and orientation. Lengths are in relative units. Drag to orbit around the origin, and scroll or pinch to zoom.
:::
