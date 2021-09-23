# The Orbit Equation

Now, we'll return to the equation of relative motion, Eq. {eq}`eq:two-body-relative-motion`, repeated here for reference:

:::{math}
\ddot{\vector{r}} = -\left(\frac{\mu}{r^3}\right)\vector{r}
:::

Our goal is to be able to integrate this equation to find a scalar equation. An analytical equation will be more accurate than the numerical techniques we used earlier, and a scalar equation is easier to work with than a vector one.

We start by taking the cross product of this equation with the angular momentum, $\vector{h}$:

:::{math}
:label: eq:relative-motion-cross-h
\ddot{\vector{r}}\cross\vector{h} = -\left(\frac{\mu}{r^3}\right)\vector{r}\cross\vector{h}
:::

To make this easy to integrate, we want both sides to be $d/dt(\ldots)$. Let's try to replace the left-hand side of the equation. Since $\ddot{\vector{r}} = d/dt\left(\dot{\vector{r}}\right)$, lets try to pull a $d/dt$ out. By the product rule of differentiation, we find:

:::{math}
:label: eq:relative-motion-cross-h-lhs
\frac{d}{dt}\left(\dot{\vector{r}}\cross\vector{h}\right) = \ddot{\vector{r}}\cross\vector{h} + \dot{\vector{r}}\cross\dot{\vector{h}}
:::

But the angular momentum is constant, so its derivative $\dot{\vector{h}} = \vector{0}$ and the second term in Eq. {eq}`eq:relative-motion-cross-h-lhs` is zero. Therefore:

:::{math}
\frac{d}{dt}\left(\dot{\vector{r}}\cross\vector{h}\right) = \ddot{\vector{r}}\cross\vector{h} = -\left(\frac{\mu}{r^3}\right)\vector{r}\cross\vector{h}
:::

So, the left-hand side of the formula is in terms of $d/dt(\ldots)$. Let's get the right-hand side into the same form so we can simplify. After a bunch of algebra, we find:

:::{math}
-\frac{\mu}{r^3}\vector{r}\cross\vector{h} = \mu\frac{d}{dt}\left(\frac{\vector{r}}{r}\right)
:::

Substituting everything together, we find:

:::{math}
\frac{d}{dt}\left(\dot{\vector{r}}\cross\vector{h}\right) = \frac{d}{dt}\left(\mu\frac{\vector{r}}{r}\right)
:::

Rearranging:

:::{math}
\frac{d}{dt}\left(\dot{\vector{r}}\cross\vector{h} - \mu\frac{\vector{r}}{r}\right) = \vector{0}
:::

This equation can be integrated to find:

:::{math}
\dot{\vector{r}}\cross\vector{h} - \mu\frac{\vector{r}}{r} = \vector{B}
:::

where $\vector{B}$ is called the **Laplace vector** and is the constant of integration. The Laplace vector has the same dimensions as $\mu$, so we can transform it into a dimensionless number by dividing the equation by $\mu$:

:::{math}
:label: eq:vector-orbit-equation
\frac{\vector{r}}{r} + \vector{e} = \frac{\dot{\vector{r}}\cross\vector{h}}{\mu}
:::

where $\vector{e} = \vector{B}/\mu$ and is called the **eccentricity vector**. Since $\vector{B}$ lies in the orbital plane, $\vector{e}$ also lies in the orbital plane. The line along $\vector{e}$ is called the **apse line**. These coordinates are shown in {numref}`fig:apse-line`.

:::{figure} ../images/apse-line.svg
:name: fig:apse-line

The eccentricity vector lies in the plane of the orbit, starting at the occupied focus and pointing towards the point of closest approach. A line through this vector is the apse line. The true anomaly is the angle from the apse line to the current position vector from $m_1$ to $m_2$.
:::

We now want to transform Eq. {eq}`eq:vector-orbit-equation` to be in terms of $r$ and $\nu$, which is called the **true anomaly**, defined as the angle from the apse line to the $m_2$. This will result in a scalar equation, which is easier to work with than the vector equation.

To obtain a scalar equation, we take the dot product of Eq. {eq}`eq:vector-orbit-equation` with $\vector{r}$. After some algebra, we end up at:

:::{math}
:label: eq:scalar-orbit-equation
r = \frac{h^2}{\mu}\frac{1}{1 + e\cos\nu}
:::

where $e = \mag{\vector{e}}$ is called the **eccentricity**. Eq. {eq}`eq:scalar-orbit-equation` is called the **orbit equation** and it defines the path of $m_2$ around $m_1$, relative to $m_1$. In this equation, $h$, $e$, and $\mu$ are all constant. Since $e$ is the magnitude of $\vector{e}$, it is strictly positive, $e \geq 0$.

:::{important}
Put a big star next to Eq. {eq}`eq:scalar-orbit-equation`. We are going to use it for the rest of the course!
:::

```{margin}
**Conic sections** are the curve formed by the intersection of a plane and a cone.
```

The orbit equation describes [**conic sections**](https://en.wikipedia.org/wiki/Conic_section), meaning that all orbits are one of four types, as shown in {numref}`fig:TypesOfConicSections`. The particular type of orbit is determined by the magnitude of the eccentricity:

1. Circles: $e = 0$
2. Ellipses: $0 < e < 1$
3. Parabolas: $e = 1$
4. Hyperbolas $e > 1$

:::{figure} ../images/TypesOfConicSections.jpg
:width: 75%
:name: fig:TypesOfConicSections

The 4 types of conic section: 1. [Circle](https://en.wikipedia.org/wiki/Circle); 2. [Ellipse](https://en.wikipedia.org/wiki/Ellipse); 3. [Parabola](https://en.wikipedia.org/wiki/Parabola); 4. [Hyperbola](https://en.wikipedia.org/wiki/Hyperbola). [JensVyff](https://commons.wikimedia.org/wiki/File:TypesOfConicSections.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), via Wikimedia Commons
:::

We are going to handle each of these in turn in a few sections. In the meantime, we are going to do a little bit of work directly with the orbit equation.
