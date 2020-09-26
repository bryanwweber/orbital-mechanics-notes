# Chapter 2.10 - Perifocal Frame

In this section, we define the **perifocal reference frame**, a convenient reference frame for describing the planar orbits that we've been discussing. This will also serve as a prelude to the 3-D orbits to be discussed in the next chapter. This reference frame is essentially the one we've been using in this chapter.

The perifocal frame is a Cartesian reference centered at the occupied focus of the orbit, the location where $m_1$ exists. Since all the orbits we've looked at so far are planar, the $\pf{x}\pf{y}$ plane of the perifocal frame lies in the same plane as the orbit. This means that the $\pf{z}$ direction is pointing in the same direction as the angular momentum.

The unit vectors that define this coordinate system are:

1. $\uvec{p}$ pointing along the $\pf{x}$ axis
2. $\uvec{q}$ pointing along the $\pf{y}$ axis
3. $\uvec{w}$ pointing along the $\pf{z}$ axis

$\uvec{p}$ points along the apse line to the right of the focus. $\uvec{q}$ points 90° true anomaly from $\uvec{p}$. Finally, $\uvec{w}$ points in the same direction as the angular momentum, and can be defined by:

$$\uvec{w} = \frac{\vector{h}}{h}$$

## Position Vector

In the perifocal frame, the position vector $\vector{r}$ may be written in terms of the $\pf{x}$ and $\pf{y}$ Cartesian coordinates:

$$\vector{r} = \pf{x}\uvec{p} + \pf{y}\uvec{q}$$

where $\pf{x}$ and $\pf{y}$ can be transformed into the radial-true anomaly polar coordinate system by:

$$\begin{aligned}\pf{x} &= r\cos\theta & \pf{y} &= r\sin\theta\end{aligned}$$

By plugging in the orbit equation, $\vector{r}$ can be written as:

$$\vector{r} = \frac{h^2}{\mu}\frac{1}{1 + e\cos\theta}\left(\cos\theta\uvec{p} + \sin\theta\uvec{q}\right)$$

## Velocity Vector

The velocity is found by taking the time derivative of the position:

$$\vector{v} = \dot{\vector{r}} = \dot{\pf{x}}\uvec{p} + \dot{\pf{y}}\uvec{q}$$

Then we need to apply the product rule, because both $r$ and $\theta$ are functions of time:

$$\begin{aligned}\dot{\pf{x}} &= \dot{r}\cos\theta - r\dot{\theta}\sin\theta & \dot{\pf{y}} &= \dot{r}\sin\theta + r\dot{\theta}\cos\theta\end{aligned}$$

Substituting some of the relationships from previously, we can simplify the velocity vector as:

$$\vector{v} = \frac{\mu}{h}\left[-\sin\theta\uvec{p} + \left(e + \cos\theta\right)\uvec{q}\right]$$
