# Chapter 2.4 - Angular Momentum and the Orbit Formulas

In this section, we are going to use the relative motion results from the last section to define the equations for orbits. In the process, we will derive Kepler's second law!

## Relative Angular Momentum

The angular momentum of $m_2$ relative to $m_1$ is the moment of the linear momentum of $m_2$ relative to $m_1$:

$$\vector{H}_{2/1} = \vector{r}\cross m_2 \dot{\vector{r}}$$

where $m_2\dot{\vector{r}}$ is the linear moment of $m_2$ relative to $m_1$. Dividing through by $m_2$, we can define $\vector{h} = \vector{H}_{2/1}/m_{2}$:

$$\vector{h} = \vector{r}\cross\dot{\vector{r}}$$

This is the **specific angular momentum** of $m_2$ relative to $m_1$.

Now, let's see how the angular momentum varies with time. We know that angular momentum must be conserved (that's one of the fundamental laws of the universe, as far as we know). Taking the time derivative of the specific angular momentum, we find:

$$\dot{\vector{h}} = \dot{\vector{r}}\cross\dot{\vector{r}} + \vector{r}\cross\ddot{\vector{r}}$$

The first term is zero by the definition of the cross product. To simplify the second term, we recall the definition of the acceleration from the last section:

$$\ddot{\vector{r}} = -\frac{\mu}{r^3}\vector{r}$$

which results in

$$\dot{\vector{h}} = -\frac{\mu}{r^3}\left(\vector{r}\cross\vector{r}\right) = \vector{0}$$

What this result says is that the specific angular momentum is always constant! In other words, since there are no external torques on the system, the angular momentum is conserved!

If $\vector{r}$ and $\dot{\vector{r}}$ are parallel, that is, $m_2$ is moving directly towards or away from $m_1$, then $\vector{h} = \vector{0}$, and the angular momentum will always be zero. Thus, $m_2$ cannot follow a curved path relative to $m_1$ and will remain on the straight line trajectory.

## Orbital Plane

The two vectors $\vector{r}$ and $\dot{\vector{r}}$ define a plane called the **orbital plane**. The angular momentum vector is perpendicular to this plane. The unit vector normal to the plane is:

$$\uvec{h} = \frac{\vector{h}}{h}$$

where $h$ is the magnitude of the specific angular momentum. Since the angular momentum is constant for all time, it cannot change direction and it cannot change magnitude. Therefore, the unit vector perpendicular to the plane is constant for all time. This means that $m_2$ always orbits in the same plane around $m_1$.

In this situation, it is convenient to observe the plane looking in the same direction as $-\uvec{h}$, that is, looking down onto the orbit. We will resolve the relative velocity into two components, one parallel and one perpendicular to $\vector{r}$. The unit vectors in these directions are $\uvec{u}_r$ and $\uvec{u}_{\perp}$, respectively. Therefore,

$$\vector{v} = v_r\uvec{u}_r + v_{\perp}\uvec{u}_{\perp}$$

The angular momentum can then be defined as:

$$\begin{aligned}\vector{h} &= \vector{r}\cross\vector{v} = r\uvec{u}_r \cross\left(v_r\uvec{u}_r + v_{\perp}\uvec{u}_{\perp}\right)\\ &= r v_r\left(\uvec{u}_r\cross\uvec{u}_r\right) + r v_{\perp}\left(\uvec{u}_r\cross\uvec{u}_{\perp}\right)\\ &= r v_{\perp}\uvec{h}\end{aligned}$$

where the last result comes from the definition of $\uvec{h}$ as perpendicular to the orbital plane. This means that the magnitude of the angular momentum is:

$$h = r v_{\perp}$$

Now consider $m_2$ in orbit around $m_1$. As $m_2$ moves, the position vector $\vector{r}$ sweeps out an area inside the orbit. Over one whole orbit, the entire area inside the orbit will be swept. During a differential time interval $dt$, a differential area $dA$ is swept. The rate of change of this area is:

$$\frac{dA}{dt} = \frac{h}{2}$$

This is called the **areal velocity**. Since $h$ is constant, because of conservation of angular momentum, $dA/dt$ is also constant. This is Kepler's Second Law:

:::{admonition} **Kepler's Second Law**
Equal areas are swept out in equal times
:::

This can be shown by integrating the last equation:

$$A_2 - A_1 = \int_{t_1}^{t_2} \frac{h}{2} dt = \frac{h}{2}\left(t_2 - t_1\right)$$

since $h$ is constant. Assuming that $\Delta t$ is the same, the swept area will be the same.

## The Orbit Equation

Now, we'll return to the equation of relative motion:

$$\ddot{\vector{r}} = -\left(\frac{\mu}{r^3}\right)\vector{r}$$

Our goal is to be able to integrate this equation to find the position and velocity of the satellite at any instant. Since this is a second-order differential equation, and there are three components in the absolute acceleration vector, we will need 6 constants of integration. Three of the constants are given by the specific angular momentum, $\vector{h}$, and we will find two more in the course of the following discussion. The sixth is found in Chapter 3.

We start by taking the cross product of this equation with the angular momentum, $\vector{h}$:

$$\ddot{\vector{r}}\cross\vector{h} = -\left(\frac{\mu}{r^3}\right)\vector{r}\cross\vector{h}$$

Let's try to replace the left-hand side of the equation. By the product rule of differentiation, we find:

$$\frac{d}{dt}\left(\dot{\vector{r}}\cross\vector{h}\right) = \ddot{\vector{r}}\cross\vector{h} + \dot{\vector{r}}\cross\dot{\vector{h}}$$

But the angular momentum is constant, so its derivative must be zero:

$$\dot{\vector{h}} = \vector{0}$$

Therefore,

$$\frac{d}{dt}\left(\dot{\vector{r}}\cross\vector{h}\right) = \ddot{\vector{r}}\cross\vector{h}$$

So, the left-hand side of the formula is in terms of $d/dt(\ldots)$. Let's get the right-hand side into the same form so we can simplify. After a bunch of algebra, we find:

$$\frac{1}{r^3}\vector{r}\cross\vector{h} = -\frac{d}{dt}\left(\frac{\vector{r}}{r}\right)$$

Substituting everything together, we find:

$$\frac{d}{dt}\left(\dot{\vector{r}}\cross\vector{h}\right) = \frac{d}{dt}\left(\mu\frac{\vector{r}}{r}\right)$$

Rearranging:

$$\frac{d}{dt}\left(\dot{\vector{r}}\cross\vector{h} - \mu\frac{\vector{r}}{r}\right) = \vector{0}$$

This equation can be integrated to find:

$$\dot{\vector{r}}\cross\vector{h} - \mu\frac{\vector{r}}{r} = \vector{C}$$

where $\vector{C}$ is called the **Laplace vector** and is a constant. By taking the dot product of this equation with the angular momentum $\vector{h}$, we find:

$$\vector{C}\cdot\vector{h} = 0$$

In other words, the Laplace vector and the angular momentum are perpendicular. Since the angular momentum is perpendicular to the orbital plane, $\vector{C}$ must lie in the orbital plane.

The Laplace vector has the same dimensions as $\mu$, so we can transform it into a dimensionless number by dividing the equation by $\mu$:

$$\frac{\vector{r}}{r} + \vector{e} = \frac{\dot{\vector{r}}\cross\vector{h}}{\mu}$$(vector-orbit-equation)

where $\vector{e} = \vector{C}/\mu$ and is called the **eccentricity vector**. Since $\vector{C}$ lies in the orbital plane, $\vector{e}$ also lies in the orbital plane. The line along $\vector{e}$ is called the **apse line**.

The eccentricity vector provides two more of the constants of integration that we need for the equation of motion. However, due to the fact that $\vector{e}$ and $\vector{h}$ are perpendicular, we know that:

$$\vector{e}\cdot\vector{h} = 0$$

such that only 5 of the components of these vectors are independent. The sixth is determined by the dot product above.

We now want to transform Equation {eq}`vector-orbit-equation` to be in terms of $r$ and $\theta$, which is called the **true anomaly**, defined as the angle from the apse line to the satellite. This will result in a scalar equation, which is easier to work with than the vector equation.

To obtain a scalar equation, we take the dot product of this equation with $\vector{r}$. After some algebra, we end up at:

$$r = \frac{h^2}{\mu}\frac{1}{1 + e\cos\theta}$$

where $e = \mag{\vector{e}}$ is called the **eccentricity**. This is called the **orbit equation** and it defines the path of $m_2$ around $m_1$, relative to $m_1$. In this equation, $h$, $e$, and $\mu$ are all constant. Since $e$ is the magnitude of $\vector{e}$, it is strictly positive, $e \geq 0$.

```{margin}
**Conic sections** are the curve formed by the intersection of a plane and a cone.
```

The orbit equation describes [**conic sections**](https://en.wikipedia.org/wiki/Conic_section), meaning that all orbits are one of four types:

1. Ellipses
2. Circles (a special case of the ellipse)
3. Parabolas
4. Hyperbolas

We are going to handle each of these in turn in a few sections. In the meantime, we are going to do a little bit of work directly with the orbit equation.

## Orbital Parameters

It is convenient to have direct formulas to compute the velocity components of $m_2$ relative to $m_1$. The component of velocity normal to the position vector is:

$$v_{\perp} = r\dot{\theta}$$

where $\dot{\theta}$ is the angular velocity of the position vector, or the rate of change of the true anomaly. From the magnitude of the specific angular momentum, $h = r v_{\perp}$, we find:

$$h = r^2 \dot{\theta}$$

and

$$v_{\perp} = \frac{h}{r} = \frac{\mu}{h}\left(1 + e \cos\theta\right)$$

The component of velocity along the position vector is $v_r$:

$$v_r = \dot{r} = \frac{\mu}{h} e \sin\theta$$

### Periapsis and Apoapsis

Recalling that the true anomaly is defined with $\theta=0$ pointing along the apse line, or the eccentricity vector, we can see that the distance, $r$, from $m_2$ to $m_1$ is the smallest when $\theta = 0$ and largest when $\theta = \pi$. The exception is when $e = 0$, in which case the orbital radius is constant, and the orbit is a circle.

The points of closest and farthest approach of $m_2$ to $m_1$ are called **periapsis** and **apoapsis** respectively. Both of them occur along the apse line. However, when $e\geq 1$, apoapsis occurs at an infinitely far distance from $m_1$, as we will see.

```{note}
The terms **periapsis** and **apoapsis** are composed of two parts - a prefix indicating the distance from the primary object, and a suffix indicating which astronomical body is the primary. The prefixes are **peri-**, which comes from a Greek root meaning _near_, and **apo-**, which comes from a Greek root meaning _away from_.

The suffixes depend on the primary body in the orbit. For orbits around the Earth, the suffix is **-gee**. So the closest point in an Earth orbit is **perigee** and the farthest point is **apogee**. Some other common suffixes are:

| Body    | Suffix  | Nearest point | Farthest Point |
|---------|---------|---------------|----------------|
| Earth   | -gee    | perigee       | apogee         |
| Sun     | -helion | perihelion    | apohelion      |
| Moon    | -lune   | perilune      | apolune        |
| General | -apsis  | periapsis     | apoapsis       |

Check out [Wikipedia](https://en.wikipedia.org/wiki/Apsis) for more.
```

The distance to periapsis is given by setting $\theta = 0$ in the orbit equation:

$$r_p = \frac{h^2}{\mu}\frac{1}{1 + e}$$

At periapsis, the radial velocity component is zero. For $0 < \theta < \pi$, the radial velocity is positive and $m_2$ is moving away from periapsis.

At $\theta = \pi$, $m_2$ reaches apoapsis and the radial component of velocity is again zero. The distance to apoapsis is:

$$r_a = \frac{h^2}{\mu}\frac{1}{1 - e}$$

After apoapsis, the radial velocity is negative, which means $m_2$ is moving towards periapsis.

### Flight Path Angle

The **flight path angle** is the angle that the velocity vector makes with the normal to the position vector. The normal to the position vector points in the same direction as $\vector{v}_{\perp}$ by definition, so the flight path angle is zero at periapsis and apoapsis. The direction of the normal vector to the position is called the **local horizon**.

By forming a right triangle with the velocity components, we can determine the flight path angle:

$$\tan \gamma = \frac{v_r}{v_{\perp}} = \frac{e\sin\theta}{1 + e\cos\theta}$$

where $\gamma$ is the flight path angle.

The flight path angle is positive when $v_r$ is positive and $m_2$ is moving away from periapsis, and vice versa when $v_r$ is negative.

### Latus Rectum

The trajectory of $m_2$ around $m_1$ is symmetrical about the apse line. A chord of the orbit that intersects $m_1$ at the apse line is called the **latus rectum**. The apse line divides the latus rectum into two halves, each of length $p$, called the **semilatus rectum** or the **parameter of the orbit**. The semilatus rectum can be calculated by:

$$p = \frac{h^2}{\mu}$$
