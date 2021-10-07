# Perifocal Frame

In this section, we define the **perifocal reference frame**, a convenient reference frame for describing the planar orbits that we've been discussing. The perifocal frame is a Cartesian reference centered at the occupied focus of the orbit, the location where $m_1$ exists. Since all the orbits we've looked at so far are planar, the $\pf{x}\pf{y}$ plane of the perifocal frame lies in the same plane as the orbit. This means that the $\pf{z}$ direction is pointing in the same direction as the angular momentum.

The unit vectors that define this coordinate system are:

1. $\uvec{p}$ pointing along the $\pf{x}$ axis
2. $\uvec{q}$ pointing along the $\pf{y}$ axis
3. $\uvec{w}$ pointing along the $\pf{z}$ axis

:::{figure} ../images/definition-of-perifocal-frame.svg
:name: fig:definition-of-perifocal-frame
:width: 75%

The definition of the perifocal frame. The $\uvec{w}$ direction is pointing direction towards the viewer.
:::

As shown in {numref}`fig:definition-of-perifocal-frame`, $\uvec{p}$ points along the apse line to the right of the focus, towards periapsis. $\uvec{q}$ points 90° true anomaly from $\uvec{p}$. Finally, $\uvec{w}$ points in the same direction as the angular momentum, and can be defined by:

:::{math}
:label: eq:perifocal-w-unit-vector
\uvec{w} = \frac{\vector{h}}{h}
:::

## Position Vector

In the perifocal frame, the position vector $\vector{r}$ may be written in terms of the $\pf{x}$ and $\pf{y}$ Cartesian coordinates. Since the orbit is planar, the $\uvec{w}$ component is zero.

:::{math}
:label: eq:perifocal-position-vector
\vector{r} = \pf{x}\uvec{p} + \pf{y}\uvec{q}
:::

$\pf{x}$ and $\pf{y}$ can be transformed into the radial-true anomaly polar coordinate system by:

:::{math}
:label: eq:perifocal-polar-conversion
\begin{aligned}
  \pf{x} &= r\cos\nu & \pf{y} &= r\sin\nu
\end{aligned}
:::

By plugging in the orbit equation, Eq. {eq}`eq:scalar-orbit-equation`, $\vector{r}$ can be written as:

:::{math}
:label: eq:perifocal-vector-orbit-equation
\vector{r} = \frac{h^2}{\mu}\frac{1}{1 + e\cos\nu}\left(\cos\nu\uvec{p} + \sin\nu\uvec{q}\right)
:::

## Velocity Vector

The velocity is found by taking the time derivative of the position:

:::{math}
:label: eq:perifocal-velocity-vector
\vector{v} = \dot{\vector{r}} = \dot{\pf{x}}\uvec{p} + \dot{\pf{y}}\uvec{q}
:::

Then we need to apply the product rule, because both $r$ and $\nu$ are functions of time:

:::{math}
:label: eq:perifocal-dot-products
\begin{aligned}
  \dot{\pf{x}} &= \dot{r}\cos\nu - r\dot{\nu}\sin\nu \\
  \dot{\pf{y}} &= \dot{r}\sin\nu + r\dot{\nu}\cos\nu
\end{aligned}
:::

Substituting some of the relationships from previously, we can simplify the velocity vector as:

:::{math}
:label: eq:perifocal-simplified-velocity-vector
\vector{v} = \frac{\mu}{h}\left[-\sin\nu\uvec{p} + \left(e + \cos\nu\right)\uvec{q}\right]
:::
