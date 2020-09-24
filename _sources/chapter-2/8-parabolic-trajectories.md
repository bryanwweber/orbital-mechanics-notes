# Chapter 2.8 - Parabolic Trajectories ($e = 1$)

For the case of $e = 1$, the orbit formula is simplified:

$$r = \frac{h^2}{\mu}\frac{1}{1 + \cos\theta}$$

For $\theta\rightarrow\pi$, then $\cos\theta\rightarrow -1$ and the bottom of that fraction goes to zero. Therefore, as $\theta\rightarrow\pi$, $r\rightarrow\infty$!

From the _vis viva_ equation, conservation of energy, we find for $e = 1$ that $\varepsilon=0$ and:

$$\frac{v^2}{2} - \frac{\mu}{r} = 0$$

Then the velocity anywhere on the trajectory can be found by:

$$v = \sqrt{\frac{2\mu}{r}}$$

As $r\rightarrow\infty$, then $v\rightarrow 0$! Basically, $m_2$ will coast out to infinity and will have exactly zero velocity when it reaches infinity.

Since the path leads out and never comes back, the trajectory with $e = 1$ is also called an **escape trajectory**. The velocity necessary to escape from $m_1$ on a parabolic trajectory can then be found from the previous equation based on the current orbital radius of $m_2$.

For a circular orbit of radius $r$, we can show that:

```{margin}
**Note:** There's a typo in the book for this equation
```

$$v_{\text{esc}} = \sqrt{2} v_{\text{circular}}$$

An object that is launched from Earth on an escape trajectory will not actually make it out to infinity, because of the influence of other gravitational bodies in our solar system, particularly the sun. Interestingly, the satellite will end up in the same orbit as Earth, with no other velocity boosts.

## Flight Path Angle

We can show that for parabolic trajectories, the flight path angle is:

$$\gamma = \frac{\theta}{2}$$

## Orbital Parameter

The orbital parameter $p$, also called the semilatus rectum, can be written in terms of a Cartesian coordinate system centered on the focus of the parabola. The equation of this parabola is given by:

$$x = \ell (h - y)^2 + k$$

where $\ell$ and $k$ are constants we need to solve for. We have 2 unknowns, so we need two equations. The first equation is that the focus of the parabola is at the origin. The coordinates of the focus are:

$$\left(h, k + \frac{1}{4\ell}\right)$$

To be at the origin, we must have $h = 0$ and

$$k + \frac{1}{4\ell} = 0$$

The second equation comes from the fact that at $x = 0$, $y = \pm p$. For simplicity, we take the positive case:

$$0 = -\ell\left(p\right)^2 + k$$

Solving these equations simultaneously, we find:

$$\begin{aligned}\ell &= -\frac{1}{2p} & k &= \frac{p}{2}\end{aligned}$$

The coordinates of the vertex, the bottom point, of the parabola are $(h, k)$. Thus, the vertex is located at:

$$\left(0, \frac{p}{2}\right)$$

Then, we can fill in the equation for the parabola:

$$x = \frac{p}{2} - \frac{y^2}{2p}$$
