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

From the orbit equation:

:::{math}
:label: 
r = \frac{h^2}{\mu}\frac{1}{1 + e\cos\nu}
:::

we see that the denominator goes to zero when $1 + e\cos\nu$ goes to zero. The true anomaly when this happens is called the true anomaly of the asymptote:

:::{math}
:label: 
\nu_{\infty} = \cos^{-1}\left(-1/e\right)
:::

As the true anomaly approaches $\nu_{\infty}$, $r$ approaches infinity. $\nu_{\infty}$ is restricted to be between 90° and 180°.

For $-\nu_{\infty} < \nu < \nu_{\infty}$, the trajectory of $m_2$ follows the occupied or real trajectory shown on the animation below. For $\nu_{\infty} < \nu < \left({360}^{\circ} - \nu_{\infty}\right)$, $m_2$ would occupy the virtual trajectory on the figure below. This trajectory would require a repulsive gravitational force for a mass to actually follow it, so it is only a mathematical result.

```{code-cell} ipython3
:tags: [remove-input]

from IPython.display import HTML
from hyperbolic_trajectory import plot_figure
anim = plot_figure()
HTML(anim.to_jshtml())
```

Periapsis lies on the apse line, as usual, of the occupied trajectory. Interestingly, apoapsis lies on the virtual trajectory. Halfway between periapsis and apoapsis lies the center of a Cartesian coordinate system.

As the hyperbolas go out to infinity, they approach asymptotes. The angle that the asymptotes make with the horizontal axis is $\beta$, and is found by:

:::{math}
:label: 
\beta = 180° - \nu_{\infty} = \cos^{-1}\left(1/e\right)
:::

The asymptotes intersect at the origin of the Cartesian coordinate system. The angle between the asymptotes is called the **turn angle**, $\delta$, because it is the angle through which $m_2$ turns as it goes around $m_1$. The turn angle is found by:

:::{math}
:label: 
\delta = 180° - 2\beta = 2\sin^{-1}\left(1/e\right)
:::

## Orbital Parameters

The distance to periapsis is:

:::{math}
:label: 
r_p = \frac{h^2}{\mu}\frac{1}{1 + e}
:::

and the distance to apoapsis is:

:::{math}
:label: 
r_a = \frac{h^2}{\mu}\frac{1}{1 - e}
:::

Notice that the distance to apoapsis is negative, since $e > 1$. This is how we determine that the apoapsis lies on the virtual trajectory, to the right of the occupied trajectory.

We can determine the semimajor axis of the orbit by inspection from a drawing:

:::{math}
:label: 
a = \frac{-r_a - r_p}{2}
:::

Plugging in for $r_a$ and $r_p$, we find:

:::{math}
:label: 
a = \frac{h^2}{\mu}\frac{1}{e^2 - 1}
:::

Then, we can rearrange the orbit equation to find:

:::{math}
:label: 
r = a\frac{e^2 - 1}{1 + e\cos\nu}
:::

and we can rearrange the periapsis and apoapsis equations to find:

:::{math}
:label: 
\begin{aligned}r_p &= a\left(e - 1\right) & r_a &= -a\left(e + 1\right)\end{aligned}
:::

The semiminor axis is defined as the distance from periapsis to one of the asymptote lines:

:::{math}
:label: 
b = a\sqrt{e^2 - 1}
:::

One other parameter that we will find useful is the **aiming radius** or **impact parameter**:

:::{math}
:label: 
\Delta = a\sqrt{e^2 - 1} = b
:::

This parameter determines whether or not a body approaching from infinity will impact $m_1$.

## Cartesian Coordinates

We can express the coordinates of $m_2$ relative to the center of the Cartesian coordinate system as well:

:::{math}
:label: 
\begin{aligned}x &= -a -r_p + r\cos\nu & y &= r \sin\nu\end{aligned}
:::

## Energy Conservation

The specific energy of a hyperbolic trajectory is:

:::{math}
:label: 
\varepsilon = \frac{\mu}{2a}
:::

Plugging this in to the conservation of energy equation, we find:

:::{math}
:label: 
\frac{v^2}{2} - \frac{\mu}{r} = \frac{\mu}{2a}
:::

If we denote $v_{\infty}$ as the speed of an object at infinity, then this can be determined from conservation of energy:

:::{math}
:label: 
v_{\infty} = \sqrt{\frac{\mu}{a}}
:::

$v_{\infty}$ is called the **hyperbolic excess speed** and is the excess speed over the escape velocity:

:::{math}
:label: 
v^2 = v_{\text{esc}}^2 + v_{\infty}^2
:::

The hyperbolic excess speed is also known as the **characteristic energy**:

:::{math}
:label: 
C_3 = v_{\infty}^2
:::

$C_3$ is a measure of the energy required to perform an interplanetary mission, since all such missions require escaping from Earth's gravitational pull with some positive velocity. Since a given launch vehicle has a certain amount of energy stored in the fuel, $C_3$ is also a measure of the capability of a particular vehicle to perform a particular mission.

Finally, note that the hyperbolic excess speed can also be found by:

:::{math}
:label: 
v_{\infty} = \frac{\mu}{h}e\sin\nu_{\infty} = \frac{\mu}{h}\sqrt{e^2 - 1}
:::
