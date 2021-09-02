# Orbital Nomenclature

In this section, we will introduce some common nomenclature for orbits that are conical sections. {numref}`fig:periapsis-and-apoapsis-ellipse`, {numref}`fig:periapsis-and-apoapsis-circle`, and  show the four possible types of conical orbits. All conical sections have two **foci** (singular: **focus**). For all the orbits, one of the foci is _occupied_ by the primary mass $m_1$ and the other is _unoccupied_.

## Periapsis and Apoapsis

For the four conical orbits, the true anomaly is defined with $\nu=0$ pointing along the apse line, or the eccentricity vector.

::::{tab} Ellipse
:::{figure} ../images/periapsis-and-apoapsis-ellipse.svg
:name: fig:periapsis-and-apoapsis-ellipse

An elliptical orbit, $0 < e < 1$
:::

The elliptical orbit has two foci. We choose the right focus to be occupied by convention. This means that the point of closest approach to the primary mass in the occupied focus occurs at $\nu =$ 0°. The point of closest approach in an orbit is called **periapsis**.

The location in the orbit that is farthest from the primary mass is located at $\nu =$ 180°. This point is called **apoapsis**.
::::

::::{tab} Circle
:::{figure} ../images/periapsis-and-apoapsis-circle.svg
:name: fig:periapsis-and-apoapsis-circle
:width: 75%

A circular orbit, $e = 0$
:::

The circular orbit has eccentricity $e = 0$. In the circular orbit, there is no periapsis or apoapsis. This is because every point on the orbit is at the same radius from the primary mass. Similarly, the two foci are coincident at the origin in the circular orbit.

For circular orbits, we usually pick the apse line to be along the $x$-axis and start counting the true anomaly from there. However, the choice is arbitrary and any point would give an equivalent result.
::::

::::{tab} Parabola
:::{figure} ../images/periapsis-and-apoapsis-parabola.svg
:name: fig:periapsis-and-apoapsis-parabola
:width: 75%

A parabolic trajectory, $e = 1$
:::

The parabolic trajectory has eccentricity $e = 1$. The parabolic trajectory extends to infinity towards the left of the domain. It is the limiting case where an object on a parabolic trajectory will never return to the primary mass. Thus, it is called a _trajectory_ rather than _orbit_ since it is not periodic.

The parabolic trajectory has a periapsis, a point of closest approach, but no apoapsis, since the trajectory extends to infinity.
::::

::::{tab} Hyperbola
:::{figure} ../images/periapsis-and-apoapsis-hyperbola.svg
:name: fig:periapsis-and-apoapsis-hyperbola
:width: 75%

A hyperbolic trajectory, $e > 1$
:::

The hyperbolic trajectory has eccentricity $e > 1$. The hyperbolic trajectory extends to infinity towards the left of the domain and the right of the domain. Like the ellipse, the hyperbola has two foci. By convention, we choose the left focus as the occupied focus where the primary mass is located. The trajectory on the left is then the occupied, or real, trajectory.

The curve on the right is unoccupied and is a virtual path. For a mass to occupy this trajectory would require a repulsive gravitational force.

The hyperbolic trajectory has a periapsis, a point of closest approach, on the occupied trajectory. Mathematically, the apoapsis occurs on the virtual path, but no object can ever be there.

The wings of the hyperbola approach the asymptote lines as $x$ goes to infinity.
::::

```{note}
The terms _periapsis_ and _apoapsis_ are composed of two parts - a prefix indicating the distance from the primary object, and a suffix indicating which astronomical body is the primary. The prefixes are _peri-_, which comes from a Greek root meaning _near_, and _apo-_, which comes from a Greek root meaning _away from_.

The suffixes depend on the primary body in the orbit. For orbits around the Earth, the suffix is _-gee_. So the closest point in an Earth orbit is _perigee_ and the farthest point is _apogee_. Some other common suffixes are:

| Body    | Suffix  | Nearest point | Farthest Point |
|---------|---------|---------------|----------------|
| Earth   | -gee    | perigee       | apogee         |
| Sun     | -helion | perihelion    | aphelion       |
| Moon    | -lune   | perilune      | apolune        |
| General | -apsis  | periapsis     | apoapsis       |

Check out [Wikipedia](https://en.wikipedia.org/wiki/Apsis) for more.
```

## Velocity Components

It is convenient to have direct formulas to compute the velocity components of $m_2$ relative to $m_1$. The component of velocity normal to the position vector is:

:::{math}
:label: eq:perpendicular-velocity-component
v_{\perp} = \frac{h}{r} = \frac{\mu}{h}\left(1 + e \cos\nu\right)
:::

The component of velocity along the position vector is $v_r$:

:::{math}
:label: eq:parallel-velocity-component
v_r = \dot{r} = \frac{\mu}{h} e \sin\nu
:::

## Distance to Periapsis and Apoapsis

The distance to periapsis is given by setting $\nu = 0$ in the orbit equation, Eq. {eq}`eq:scalar-orbit-equation`:

:::{math}
:label: eq:distance-to-periapsis
r_p = \frac{h^2}{\mu}\frac{1}{1 + e}
:::

Notice that $\cos 0 = 1$. This gives the largest value in the bottom of the fraction in Eq. {eq}`eq:scalar-orbit-equation`, which results in the shortest distance.

At periapsis, the radial velocity component from Eq. {eq}`eq:parallel-velocity-component` is zero, since $\sin 0 = 0$. For $0 < \nu < \pi$, the radial velocity is positive. This means the position vector is getting longer and $m_2$ is moving away from periapsis.

Notice that only the circle and ellipse have apoapsis positions that can be occupied by $m_2$. We will discuss apoapsis more thoroughly in the context of each conical orbit type. For now, we note that apoapsis occurs at $\nu = \pi$, such that:

:::{math}
:label: eq:distance-to-apoapsis
r_a = \frac{h^2}{\mu}\frac{1}{1 - e}
:::

After apoapsis, the radial velocity is negative, which means $m_2$ is moving towards periapsis.

## Flight Path Angle

The **flight path angle** is the angle that the velocity vector makes with the normal to the position vector. The normal to the position vector points in the same direction as $\vector{v}_{\perp}$ by definition, so the flight path angle is zero at periapsis and apoapsis. The direction of the normal vector to the position is called the **local horizon**.

By forming a right triangle with the velocity components, we can determine the flight path angle:

:::{math}
:label: 
\tan \gamma = \frac{v_r}{v_{\perp}} = \frac{e\sin\nu}{1 + e\cos\nu}
:::

where $\gamma$ is the flight path angle.

The flight path angle is positive when $v_r$ is positive and $m_2$ is moving away from periapsis, and vice versa when $v_r$ is negative.

## Latus Rectum

The trajectory of $m_2$ around $m_1$ is symmetrical about the apse line. A chord of the orbit that intersects $m_1$ at the apse line is called the **latus rectum**. The apse line divides the latus rectum into two halves, each of length $p$, called the **semilatus rectum** or the **parameter of the orbit**. The semilatus rectum can be calculated by:

:::{math}
:label: 
p = \frac{h^2}{\mu}
:::
