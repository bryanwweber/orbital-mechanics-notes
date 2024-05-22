---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.3-dev
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Hyperbolic Trajectories ($e > 1$)

When $e > 1$, the geometry of the trajectory is a hyperbola. The shape of a hyperbola is two symmetric, disconnected curves. The body following the trajectory occupies one of the curves. The other is an empty, imaginary orbit present only due to the mathematics.

All interplanetary bodies such as comets or asteroids that approach the earth, or any spacecraft we want to send to other planets, must be on a hyperbolic trajectory. Whereas a parabolic trajectory has zero velocity at infinite radius, the hyperbolic trajectory has some non-zero velocity.

From the orbit equation, Eq. {eq}`eq:scalar-orbit-equation`, we see that the denominator goes to zero when $1 + e\cos\nu$ goes to zero. The true anomaly when this happens is called the **true anomaly of the asymptote**:

:::{math}
:label: eq:hyperbolic-true-anomaly-asymptote
\nu_{\infty} = \cos^{-1}\left(-1/e\right)
:::

As the true anomaly approaches $\nu_{\infty}$, $r$ approaches infinity. $\nu_{\infty}$ is restricted to be between 90° and 180°.

For $-\nu_{\infty} < \nu < \nu_{\infty}$, the trajectory of $m_2$ follows the occupied or real trajectory. For $\nu_{\infty} < \nu < \left({360}^{\circ} - \nu_{\infty}\right)$, $m_2$ would occupy the virtual trajectory. This trajectory would require a repulsive gravitational force for a mass to actually follow it, so it is only a mathematical result.

<!-- ```{code-cell} ipython3
:tags: [remove-cell]

from IPython.display import HTML
from hyperbolic_trajectory import plot_figure
from myst_nb import glue
anim = plot_figure()
glue("hyperbolic-trajectory-animation", HTML(anim.to_jshtml()), display=False)
```

:::{glue:figure} hyperbolic-trajectory-animation
:name: fig:hyperbolic-trajectory-animation

Animation showing the hyperbolic trajectory and the value of the true anomaly for various positions on the occupied and virtual trajectories.
::: -->

Periapsis lies on the apse line, as usual, of the occupied trajectory. Interestingly, apoapsis lies on the virtual trajectory. Halfway between periapsis and apoapsis lies the center of a Cartesian coordinate system.

The asymptotes intersect at the origin of the Cartesian coordinate system. The angle between the asymptotes is called the **turn angle**, $\delta$, because it is the angle through which $m_2$ turns as it goes around $m_1$. The turn angle is found from the geometry of the hyperbola, by:

:::{math}
:label: eq:hyperbolic-turn-angle
\delta = 2\sin^{-1}\left(1/e\right)
:::

## Orbital Parameters

The distance to periapsis is:

:::{math}
:label: eq:hyperbolic-periapsis-distance
r_p = \frac{h^2}{\mu}\frac{1}{1 + e}
:::

and the distance to apoapsis is:

:::{math}
:label: eq:hyperbolic-apoapsis-distance
r_a = \frac{h^2}{\mu}\frac{1}{1 - e}
:::

Notice that the distance to apoapsis is negative, since $e > 1$. This is how we determine that the apoapsis lies on the virtual trajectory, to the right of the occupied trajectory.

We can determine the semi-major axis of the orbit by inspection from a drawing:

:::{math}
:label: eq:hyperbolic-semi-major-axis
a = \frac{-r_a - r_p}{2} = \frac{h^2}{\mu}\frac{1}{e^2 - 1}
:::

Note that since $a$ is a distance, it is positive even though $r_a$ is negative. Then, we can rearrange the orbit equation, Eq. {eq}`eq:scalar-orbit-equation`, to find:

:::{math}
:label: eq:hyperbolic-orbit-equation
r = a\frac{e^2 - 1}{1 + e\cos\nu}
:::

and we can rearrange the periapsis and apoapsis equations to find:

:::{math}
:label: eq:hyperbolic-periapsis-apoapsis
\begin{aligned}
  r_p &= a\left(e - 1\right) & r_a &= -a\left(e + 1\right)
\end{aligned}
:::

The semi-minor axis is defined as the distance from periapsis to one of the asymptote lines:

:::{math}
:label: eq:hyperbolic-semi-minor-axis
b = a\sqrt{e^2 - 1}
:::

## Energy Conservation

The specific energy of a hyperbolic trajectory is:

:::{math}
:label: eq:hyperbolic-specific-energy
E = \frac{\mu}{2a}
:::

Note tha the specific energy is positive. Plugging this in to Eq. {eq}`eq:integrate-energy-equation`, we find:

:::{math}
:label: eq:hyperbolic-energy-equation
\frac{v^2}{2} - \frac{\mu}{r} = \frac{\mu}{2a}
:::

If we denote $v_{\infty}$ as the speed of an object as $r\rightarrow\infty$, then this can be determined from conservation of energy:

:::{math}
:label: eq:hyperbolic-excess-speed
v_{\infty} = \sqrt{\frac{\mu}{a}}
:::

$v_{\infty}$ is called the **hyperbolic excess speed**. By putting Eq. {eq}`eq:integrate-energy-equation` in terms of $v_{\infty}$, we find that the excess speed is the kinetic energy in excess of that required to simply escape the gravity well of the primary mass:

:::{math}
:label: eq:hyperbolic-velocity-excess-escape
v^2 = v_{\text{esc}}^2 + v_{\infty}^2
:::

The hyperbolic excess speed is also known as the **characteristic energy**:

:::{math}
:label: eq:hyperbolic-characteristic-energy
C_3 = v_{\infty}^2
:::

$C_3$ is a measure of the energy required to perform an interplanetary mission, since all such missions require escaping from Earth's gravitational pull with some positive velocity. Since a given launch vehicle has a certain amount of energy stored in the fuel, $C_3$ is also a measure of the capability of a particular vehicle to perform a particular mission.

Finally, note that the hyperbolic excess speed can also be found by:

:::{math}
:label: eq:hyperbolic-excess-speed-nu
v_{\infty} = \frac{\mu}{h}e\sin\nu_{\infty} = \frac{\mu}{h}\sqrt{e^2 - 1}
:::
