# Parabolic Trajectories ($e = 1$)

For the case of $e = 1$, the orbit formula is simplified:

:::{math}
:label: eq:parabola-orbit-equation
r = \frac{h^2}{\mu}\frac{1}{1 + \cos\nu}
:::

For $\nu\rightarrow\pi$, then $\cos\nu\rightarrow -1$ and the bottom of that fraction goes to zero. Therefore, as $\nu\rightarrow\pi$, $r\rightarrow\infty$!

When $e = 1$, the trajectory is a parabolic shape. By convention, the apse line lies along the $x$-axis and the parabola opens to the left, as shown in {numref}`fig:parabolic-orbit-definitions`.

:::{figure} ../images/parabolic-orbit-definitions.svg
:name: fig:parabolic-orbit-definitions
:height: 450px

Definition of distances in the parabolic trajectory. $p$ is the orbital parameter.
:::

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

For parabolic trajectories, the radial and azimuthal velocity components are:

:::{math}
:label: eq:parabolic-velocity-components
\begin{aligned}
  v_r &= \frac{\mu}{h}\sin\nu \\
  v_{\perp} &= \frac{\mu}{h}\left(1 + \cos\nu\right)
\end{aligned}
:::

These equations can be combined and simplified to find that the flight path angle is a simple function of the true anomaly:

:::{math}
:label: eq:parabolic-flight-path-angle
\phi = \frac{\nu}{2}
:::

## Orbital Parameter

The orbital parameter $p$, also called the semi-latus rectum, is the distance perpendicular to the apse line from the focus to the trajectory. The value is given by Eq. {eq}`eq:semi-latus-rectum`. Plugging in $e = 1$ to the equation for the periapsis distance, Eq. {eq}`eq:distance-to-periapsis`, we find:

:::{math}
:label: eq:parabolic-periapsis-distance
r_p = \frac{p}{2}
:::

For a Cartesian coordinate system centered on the focus, periapsis is then at the point $(p/2, 0)$. Thus, we can write a Cartesian equation for the parabola:

:::{math}
:label: eq:parabolic-cartesian-equation
x = \frac{p}{2} - \frac{y^2}{2p}
:::
