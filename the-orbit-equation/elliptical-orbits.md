# Elliptical Orbits ($0 < e < 1$)

If the eccentricity is between 0 and 1, then the radius of the orbit varies with the true anomaly. However, the magnitude of the product $e \cos\nu$ is never greater than one. This means that the bottom of the fraction in the orbit equation, Eq. {eq}`eq:scalar-orbit-equation`, is never zero and the orbit is an elliptical shape. The minimum value of $r$ occurs at periapsis where $\nu = 0$ and the maximum value of $r$ is at apoapsis where $\nu = \pi$. The distance to periapsis and apoapsis are given by Eq. {eq}`eq:distance-to-periapsis` and Eq. {eq}`eq:distance-to-apoapsis`, respectively.

## Major and Minor Axes

The geometry of the ellipse is shown in {numref}`fig:elliptical-orbit-definitions`.

:::{figure} ../images/elliptical-orbit-definitions.svg
:name: fig:elliptical-orbit-definitions
:width: 75%

The geometry and definition of distances in an elliptical orbit.
:::

Let $2a$ denote the total distance from periapsis to apoapsis along the apse line. Then:

:::{math}
:label: eq:ellipse-semi-major-axis
a = \frac{h^2}{\mu} \frac{1}{1 - e^2}
:::

where $a$ is the **semi-major axis** of the ellipse. We can then write the orbit equation, Eq. {eq}`eq:scalar-orbit-equation` in terms of the semi-major axis:

:::{math}
:label: eq:ellipse-orbit-equation-semi-major-axis
r = a\frac{1 - e^2}{1 + e\cos\nu}
:::

From the definition of the parameter of the orbit in Eq. {eq}`eq:semi-latus-rectum`, we can see that:

:::{math}
:label: eq:ellipse-parameter-of-orbit
p = a \left(1 - e^2\right)
:::

Then, the distance to periapsis, in terms of the semi-major axis is:

:::{math}
:label: eq:ellipse-periapsis-distance
r_p = a\left(1 - e\right)
:::

and the distance from $m_1$ to the center of the ellipse is:

:::{math}
:label: eq:ellipse-center-to-focus-distance
c = ae = a - r_p
:::

If $B$ is the point on the orbit directly above $C$, the center, then $b$ is the distance of the **semi-minor axis**. The semi-minor axis can then be found in terms of the semi-major axis and the eccentricity:

:::{math}
:label: eq:ellipse-semi-minor-axis
b = a\sqrt{1 - e^2}
:::

## Specific Energy

The specific energy of the orbit is found in terms of the semi-major axis as:

:::{math}
:label: eq:ellipse-specific-energy
E = -\frac{\mu}{2a}
:::

which is the same formula as the circular orbit, with the radius equal to the semi-major axis. In addition, the specific energy depends only on the semi-major axis, and is independent of the eccentricity.

## Period

:::{margin}
Interestingly, there is no formula to calculate the perimeter of an ellipse. This was discussed recently by [Stand Up Maths](https://youtu.be/5nW3nJhBHL0), where I first found out about it.
:::

The period of the elliptical orbit can be found in terms of the semi-major and semi-minor axes. The area of an ellipse is given by:

:::{math}
:label: eq:ellipse-area
A = \pi a b
:::

From Kepler's second law (equal areas in equal times), given by Eq. {eq}`eq:areal-velocity-definition`, we find:

:::{math}
:label: eq:ellipse-area-time-relation
A = \frac{h}{2} \Delta t
:::

If $A$ is the complete area of the ellipse, then $\Delta t$ is the period $T$:

:::{math}
:label: eq:ellipse-period-definition
T = \frac{2\pi ab}{h}
:::

Subbing the expressions for $a$ and $b$, we find:

:::{math}
:label: eq:ellipse-period-useful
T = \frac{2\pi}{\sqrt{\mu}}a^{3/2}
:::

which is also the same formula as a circle, with the semi-major axis in the role of the radius. Note that this formula is also independent of the eccentricity. This equation represents Kepler's third law:

:::{note}
**Kepler's Third Law:** The period of a planet is proportional to the 3/2 power of the semi-major axis of its orbit. This is shown in {numref}`fig:Solar_system_orbital_period_vs_semimajor_axis`.

:::{figure} ../images/Solar_system_orbital_period_vs_semimajor_axis.svg
:name: fig:Solar_system_orbital_period_vs_semimajor_axis
:width: 50%

Log-log plot of orbital period in Earth years vs orbit semi-major axis in AU of some Solar System bodies. Crosses denote values used by Kepler. Data is from [NASA](http://nssdc.gsfc.nasa.gov/planetary/factsheet/planet_table_ratio.html). Credit [Cmglee](https://commons.wikimedia.org/wiki/File:Solar_system_orbital_period_vs_semimajor_axis.svg) [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), via Wikimedia Commons
:::

## Eccentricity

The eccentricity of the orbit can be determined if the distances to periapsis and apoapsis are known. By dividing the equations for $r_p$ and $r_a$, we find:

:::{math}
:label: eq:ellipse-periapsis-apoapsis-ratio
\frac{r_p}{r_a} = \frac{1 - e}{1 + e}
:::

Solving Eq. {eq}`eq:ellipse-periapsis-apoapsis-ratio` for the eccentricity:

:::{math}
:label: eq:ellipse-eccentricity-periapsis-apoapsis
e = \frac{r_a - r_p}{r_a + r_p}
:::

## Average Radial Distance

One final interesting parameter of the orbit is the average distance from $m_1$ to $m_2$ over the orbit. This is:

:::{math}
:label: eq:ellipse-average-radial-distance
\overline{r}_{\nu} = a\sqrt{1 - e^2} = b = \sqrt{r_p r_a}
:::

where the $\nu$ subscript indicates that this average is performed over all the values of the true anomaly. Thus, we can see that the average orbital radius is equal to the semi-minor axis, or the square root of the product of the periapsis and apoapsis.
