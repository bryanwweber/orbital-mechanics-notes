# Orbital Nomenclature

It is convenient to have direct formulas to compute the velocity components of $m_2$ relative to $m_1$. The component of velocity normal to the position vector is:

:::{math}
:label: 
v_{\perp} = r\dot{\nu}
:::

where $\dot{\nu}$ is the angular velocity of the position vector, or the rate of change of the true anomaly. From the magnitude of the specific angular momentum, $h = r v_{\perp}$, we find:

:::{math}
:label: 
h = r^2 \dot{\nu}
:::

and

:::{math}
:label: 
v_{\perp} = \frac{h}{r} = \frac{\mu}{h}\left(1 + e \cos\nu\right)
:::

The component of velocity along the position vector is $v_r$:

:::{math}
:label: 
v_r = \dot{r} = \frac{\mu}{h} e \sin\nu
:::

## Periapsis and Apoapsis

Recalling that the true anomaly is defined with $\theta=0$ pointing along the apse line, or the eccentricity vector, we can see that the distance, $r$, from $m_2$ to $m_1$ is the smallest when $\theta = 0$ and largest when $\theta = \pi$. The exception is when $e = 0$, in which case the orbital radius is constant, and the orbit is a circle.

The points of closest and farthest approach of $m_2$ to $m_1$ are called **periapsis** and **apoapsis** respectively. Both of them occur along the apse line. However, when $e\geq 1$, apoapsis occurs at an infinitely far distance from $m_1$, as we will see.

```{note}
The terms **periapsis** and **apoapsis** are composed of two parts - a prefix indicating the distance from the primary object, and a suffix indicating which astronomical body is the primary. The prefixes are **peri-**, which comes from a Greek root meaning _near_, and **apo-**, which comes from a Greek root meaning _away from_.

The suffixes depend on the primary body in the orbit. For orbits around the Earth, the suffix is **-gee**. So the closest point in an Earth orbit is **perigee** and the farthest point is **apogee**. Some other common suffixes are:

| Body    | Suffix  | Nearest point | Farthest Point |
|---------|---------|---------------|----------------|
| Earth   | -gee    | perigee       | apogee         |
| Sun     | -helion | perihelion    | aphelion       |
| Moon    | -lune   | perilune      | apolune        |
| General | -apsis  | periapsis     | apoapsis       |

Check out [Wikipedia](https://en.wikipedia.org/wiki/Apsis) for more.
```

The distance to periapsis is given by setting $\theta = 0$ in the orbit equation:

:::{math}
:label: 
r_p = \frac{h^2}{\mu}\frac{1}{1 + e}
:::

At periapsis, the radial velocity component is zero. For $0 < \theta < \pi$, the radial velocity is positive and $m_2$ is moving away from periapsis.

At $\theta = \pi$, $m_2$ reaches apoapsis and the radial component of velocity is again zero. The distance to apoapsis is:

:::{math}
:label: 
r_a = \frac{h^2}{\mu}\frac{1}{1 - e}
:::

After apoapsis, the radial velocity is negative, which means $m_2$ is moving towards periapsis.

## Flight Path Angle

The **flight path angle** is the angle that the velocity vector makes with the normal to the position vector. The normal to the position vector points in the same direction as $\vector{v}_{\perp}$ by definition, so the flight path angle is zero at periapsis and apoapsis. The direction of the normal vector to the position is called the **local horizon**.

By forming a right triangle with the velocity components, we can determine the flight path angle:

:::{math}
:label: 
\tan \gamma = \frac{v_r}{v_{\perp}} = \frac{e\sin\theta}{1 + e\cos\theta}
:::

where $\gamma$ is the flight path angle.

The flight path angle is positive when $v_r$ is positive and $m_2$ is moving away from periapsis, and vice versa when $v_r$ is negative.

## Latus Rectum

The trajectory of $m_2$ around $m_1$ is symmetrical about the apse line. A chord of the orbit that intersects $m_1$ at the apse line is called the **latus rectum**. The apse line divides the latus rectum into two halves, each of length $p$, called the **semilatus rectum** or the **parameter of the orbit**. The semilatus rectum can be calculated by:

:::{math}
:label: 
p = \frac{h^2}{\mu}
:::
