# Elliptical Orbits ($0 < e < 1$)

If the eccentricity is between 0 and 1, then the radius of the orbit varies with the true anomaly. However, the magnitude of the product $e \cos\nu$ is never greater than one. This means that the bottom of the fraction in the orbit equation:

:::{math}
:label: 
r = \frac{h^2}{\mu}\frac{1}{1 + e\cos\nu}
:::

never crosses zero and the orbit is an elliptical shape. The minimum value of $r$ occurs at periapsis and $\nu = 0$:

:::{math}
:label: 
r_p = \frac{h^2}{\mu}\frac{1}{1 + e}
:::

and the maximum value of $r$ is at apoapsis and $\nu = \pi$:

:::{math}
:label: 
r_a = \frac{h^2}{\mu}\frac{1}{1 - e}
:::

## Major and Minor Axes

Let $2a$ denote the total distance from periapsis to apoapsis along the apse line. Then:

:::{math}
:label: 
a = \frac{h^2}{\mu} \frac{1}{1 - e^2}
:::

where $a$ is the **semi-major axis** of the ellipse. We can then write the orbit equation in terms of the semimajor axis:

:::{math}
:label: 
r = a\frac{1 - e^2}{1 + e\cos\nu}
:::

Then, the distance to periapsis, in terms of the semimajor axis is:

:::{math}
:label: 
r_p = a\left(1 - e\right)
:::

and the distance from $m_1$ to the center of the ellipse is:

:::{math}
:label: 
CF = ae
:::

where $C$ is the coordinate of the center of the ellipse and $F$ is the coordinate at $m_1$.

If $B$ is the point on the orbit directly above $C$, then $b$ is the distance of the **semiminor axis**. We can show that the radial distance from $F$ to $B$, $r_B$ is:

:::{math}
:label: 
r_B = a
:::

In addition, the semiminor axis can then be found in terms of the semimajor axis and the eccentricity:

:::{math}
:label: 
b = a\sqrt{1 - e^2}
:::

## Specific Energy

The specific energy of the orbit is found in terms of the semimajor axis as:

:::{math}
:label: 
\varepsilon = -\frac{\mu}{2a}
:::

which is the same formula as the circular orbit, with the radius equal to the semimajor axis. In addition, the specific energy depends only on the semimajor axis, and is independent of the eccentricity.

## Period

The period of the elliptical orbit can be found in terms of the semimajor and semiminor axes. The area of an ellipse is given by:

:::{math}
:label: 
A = \pi a b
:::

From Kepler's second law, we find:

:::{math}
:label: 
\Delta A = \frac{h}{2} \Delta t
:::

If $\Delta A$ is the complete area of the ellipse, then $\Delta t$ is the period $T$:

:::{math}
:label: 
T = \frac{2\pi ab}{h}
:::

Subbing the expressions for $a$ and $b$, we find:

:::{math}
:label: 
T = \frac{2\pi}{\sqrt{\mu}}a^{3/2}
:::

which is also the same formula as a circle, with the semimajor axis in the role of the radius. Note that this formula is also independent of the eccentricity. This equation represents Kepler's third law:

```{note}
**Kepler's Third Law:** The period of a planet is proportional to the 3/2 power of the semimajor axis of its orbit
```

## Eccentricity

The eccentricity of the orbit can be determined if the distances to periapsis and apoapsis are known. By dividing the equations for $r_p$ and $r_a$, we find:

:::{math}
:label: 
\frac{r_p}{r_a} = \frac{1 - e}{1 + e}
:::

Solving for the eccentricity:

:::{math}
:label: 
e = \frac{r_a - r_p}{r_a + r_p}
:::(ellipse-eccentricity-periapsis-apoapsis)

## Average Radial Distance

One final interesting parameter of the orbit is the average distance from $m_1$ to $m_2$ over the orbit. This is:

:::{math}
:label: 
\overline{r}_{\nu} = a\sqrt{1 - e^2} = \sqrt{r_p r_a}
:::

where the $\nu$ subscript indicates that this average is performed over all the values of the true anomaly. Thus, we can see that the average orbital radius is equal to the semiminor axis, or the square root of the product of the periapsis and apoapsis.
