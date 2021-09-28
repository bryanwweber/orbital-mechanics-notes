# Parabolic Trajectories ($e = 1$)

For the case of $e = 1$, the orbit formula is simplified:

:::{math}
:label: eq:parabola-orbit-equation
r = \frac{h^2}{\mu}\frac{1}{1 + \cos\nu}
:::

For $\nu\rightarrow\pi$, then $\cos\nu\rightarrow -1$ and the bottom of that fraction goes to zero. Therefore, as $\nu\rightarrow\pi$, $r\rightarrow\infty$!

From the _vis viva_ equation, conservation of energy, we find for $e = 1$ that $E=0$ and:

:::{math}
:label: eq:parabola-vis-viva
\frac{v^2}{2} - \frac{\mu}{r} = 0
:::

Then the velocity anywhere on the trajectory can be found by:

:::{math}
:label: eq:parabola-velocity-magnitude
v = \sqrt{\frac{2\mu}{r}}
:::

As $r\rightarrow\infty$, then $v\rightarrow 0$! Basically, $m_2$ will coast out to infinity and will have exactly zero velocity when it reaches infinity.

Since the path leads out and never comes back, the trajectory with $e = 1$ is also called an **escape trajectory**. The velocity necessary to escape from $m_1$ on a parabolic trajectory can then be found from the previous equation based on the current orbital radius of $m_2$.

Let's start with a circular orbit with a radius $r$. The velocity is given by Eq. {eq}`eq:circular-orbit-velocity`. Assuming that we can instantaneously boost the spacecraft velocity to a parabolic trajectory, the velocity on the parabolic trajectory at the point where it is tangent to the circle is:

:::{math}
:label: eq:parabola-velocity-relative-to-circle
v_{\text{esc}} = \sqrt{2} v_{\text{circular}}
:::

In practice, an object that is launched from Earth on an escape trajectory will not actually make it out to infinity. This is because of the influence of other gravitational bodies in our solar system, particularly the sun. Interestingly, the satellite will end up in the same orbit as Earth if it doesn't have any other velocity boosts.

## Flight Path Angle

We can show that for parabolic trajectories, the flight path angle is a simple function of the true anomaly:

:::{math}
:label: 
\gamma = \frac{\nu}{2}
:::

## Orbital Parameter

The orbital parameter $p$, also called the semi-latus rectum, can be written in terms of a Cartesian coordinate system centered on the focus of the parabola. The equation of this parabola is given by:

:::{math}
:label: 
x = \ell (h - y)^2 + k
:::

where $\ell$ and $k$ are constants we need to solve for. We have 2 unknowns, so we need two equations. The first equation is that the focus of the parabola is at the origin. The coordinates of the focus are:

:::{math}
:label: 
\left(h, k + \frac{1}{4\ell}\right)
:::

To be at the origin, we must have $h = 0$ and

:::{math}
:label: 
k + \frac{1}{4\ell} = 0
:::

The second equation comes from the fact that at $x = 0$, $y = \pm p$. For simplicity, we take the positive case:

:::{math}
:label: 
0 = -\ell\left(p\right)^2 + k
:::

Solving these equations simultaneously, we find:

:::{math}
:label: 
\begin{aligned}\ell &= -\frac{1}{2p} & k &= \frac{p}{2}\end{aligned}
:::

The coordinates of the vertex, the bottom point, of the parabola are $(h, k)$. Thus, the vertex is located at:

:::{math}
:label: 
\left(0, \frac{p}{2}\right)
:::

Then, we can fill in the equation for the parabola:

:::{math}
:label: 
x = \frac{p}{2} - \frac{y^2}{2p}
:::
