(sec:conservation-of-angular-momentum)=

# Angular Momentum Is Conserved In Orbital Motion

The two masses $m_1$ and $m_2$ in the two-body problem form a _system_, so they must follow all of the conservation laws:

1. Conservation of mass
2. Conservation of energy
3. Conservation of momentum

Mass is trivially conserved in this system, since neither body is changing mass. In this section, we will prove that the two-body equation of motion satisfies conservation of angular momentum.

In the rest of this section, we will assume the coordinate system is the co-moving system attached to $m_1$, so we are working with the [two-body problem in relative motion](../the-n-body-problem/two-body-relative-motion.md).

:::{admonition} **Takeaway Message**
:class: attention
There are three important results in this section:

1. The angular momentum vector is normal to a plane defined by the relative position and velocity vectors
2. $m_2$ always orbits in the same plane, defined by the direction of the angular momentum vector, in the two-body system
3. The magnitude of the angular momentum is a constant for a given orbit

:::

## An Intuitive Understanding of Angular Momentum

For a given object, there are two parts of the total **[angular momentum](https://en.wikipedia.org/wiki/Angular_momentum)**:

1. The **spin** angular momentum, measured about the center of mass of the object
2. The **orbital** angular momentum, measured about a center of rotation

We are concerned with the orbital angular momentum for the two-body system. The spin angular momentum is important in the **[attitude control](https://en.wikipedia.org/wiki/Attitude_control)** of spacecraft, which we are not dealing with here.

```{margin}
Note that we are neglecting the ability of a spacecraft to provide **thrust**, which would be another force to consider in the system.
```

To change the orbital angular momentum of $m_2$ relative to $m_1$, we must apply a force perpendicular to the relative position vector, $\vector{r}$. However, the only force in the two-body system (gravity) is always parallel to the relative position vector and so cannot affect the angular momentum. Therefore, the angular momentum of the system must be constant.

## Conservation of Angular Momentum

```{margin}
We'll shorten _orbital angular momentum_ to just _angular momentum_ from here on out.
```

The orbital angular momentum of $m_2$ relative to $m_1$ is found by taking the cross, or vector, product of the relative position vector and the relative velocity vector:

:::{math}
:label: eq:definition-of-angular-momentum
\vector{h} = \vector{r} \cross \dot{\vector{r}}
:::

where $\vector{h}$ is the specific angular momentum. Note that the angular momentum is a vector. As such, it has both a magnitude and a direction. When we say that the angular momentum is constant, this requires _both_ the magnitude _and_ direction to remain constant.

The relative position and velocity vectors lie in the same plane, because any two lines form a plane. Because it is defined by a cross product, the specific angular momentum is perpendicular to both $\vector{r}$ and $\dot{\vector{r}}$, as shown in {numref}`fig:orbital-angular-momentum`.

:::{figure} ../images/orbital-angular-momentum.svg
:name: fig:orbital-angular-momentum

The orbital angular momentum is perpendicular to the position and velocity vectors.
:::

Since the direction of the specific angular momentum is constant, the orbit in a two-body system always remains in the same plane!

For the angular momentum to be constant, its time derivative must be zero:

:::{math}
:label: eq:derivative-of-angular-momentum
\frac{d\vector{h}}{dt} = \dot{\vector{r}}\cross\dot{\vector{r}} + \vector{r}\cross\ddot{\vector{r}}
:::

The first term in Eq. {eq}`eq:derivative-of-angular-momentum` is zero by the definition of the cross product. In the second term, we can replace $\ddot{\vector{r}}$ using the two-body equation of motion, Eq. {eq}`eq:two-body-relative-motion`:

:::{math}
\frac{d\vector{h}}{dt} = \vector{0} - \frac{\mu}{r^3}\left(\vector{r}\cross\vector{r}\right) = \vector{0}
:::

Thus, the system satisfies conservation of angular momentum.

:::{tip}
You can also verify this by taking the cross product of the relative position vector with Eq. {eq}`eq:two-body-relative-motion`.
:::
