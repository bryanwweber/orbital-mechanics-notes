---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
execution:
  timeout: 100
---
# Chapter 3.7 - Universal Variables

You may have noticed that the equations for the ellipse and the hyperbola are quite similar. In many cases, they differ only by a negative sign or a change from circular to hyperbolic trigonometric functions. This is largely due to the fact that all of the orbits are conic sections, so they share a similar mathematical genealogy.

```{margin}
**Note:** The book has typos in equations 4 (missing an $a$) and 8 (missing an $e$ in the equation for the ellipse).
```

The equations for an ellipse and a hyperbola are summarized in the table below.

| Equation                           | Ellipse ($e < 1$)                                      | Hyperbola ($e > 1$)                                    |
|------------------------------------|--------------------------------------------------------|--------------------------------------------------------|
| Orbit equation (true anomaly)      | $r = \frac{h^2}{\mu} \frac{1}{1 + e\cos\theta}$      | $r = \frac{h^2}{\mu} \frac{1}{1 + e\cos\theta}$      |
| Cartesian Coordinates              | $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$              | $\frac{x^2}{a^2} - \frac{y^2}{b^2} = 1$              |
| Semimajor axis                     | $a = \frac{h^2}{\mu}\frac{1}{1 - e^2}$               | $a = \frac{h^2}{\mu}\frac{1}{e^2 - 1}$               |
| Semiminor Axis                     | $b = a\sqrt{1 - e^2}$                                | $b = a\sqrt{e^2 - 1}$                                |
| Energy Equation                    | $\frac{v^2}{2} - \frac{\mu}{r} = -\frac{\mu}{2a}$    | $\frac{v^2}{2} - \frac{\mu}{r} = \frac{\mu}{2a}$     |
| Mean anomaly                       | $M_e = \frac{\mu^2}{h^3}\left(1 - e^2\right)^{3/2}t$ | $M_h = \frac{\mu^2}{h^3}\left(e^2 - 1\right)^{3/2}t$ |
| Kepler's Equation                  | $M_e = E - e \sin E$                                 | $M_h = e\sinh F - F$                                 |
| Orbit equation (eccentric anomaly) | $r = a\left(1 - e\cos E\right)$                      | $r = a\left(e\cosh F - 1\right)$                     |

## The Universal Variable

Since these equations are so similar, we will try to find a way to unify them, such that we can solve a single equation regardless of the type of orbit. Given the initial position and velocity of the orbiting mass, we can determine the semimajor axis of the orbit from the energy equation:

$$a = \left(\frac{2}{r_0} - \frac{v_0^2}{\mu}\right)^{-1}$$

Notice that for a hyperbolic orbit, $a$ will be negative from this equation, in contrast to our previous definition where $a$ was positive. This gives an easy way of determining the type of orbit before finding the eccentricity.

Then, we will define the universal variable, or universal anomaly $\chi$, which is by definition zero at $t_0$ (the time when $\vector{r}_0$ and $\vector{v}_0$ are known). This is analogous to the true anomaly, which is zero on the apse line, and we previously defined $t_0$ to occur at the apse line.

Using the universal anomaly, we can find the position and velocity of the orbiting mass at any future time via:

$$\begin{aligned}\vector{r} &= \left[1 - \frac{\chi^2}{r_0}C\left(\alpha\chi^2\right)\right]\vector{r}_0 + \left[\left(t - t_0\right) - \frac{\chi^3}{\sqrt{\mu}}S\left(\alpha\chi^2\right)\right]\vector{v}_0\\\vector{v} &= \frac{\chi\sqrt{\mu}}{r r_0}\left[\alpha\chi^2S\left(\alpha\chi^2\right) - 1\right]\vector{r}_0 + \left[1 - \frac{\chi^2}{r}C\left(\alpha\chi^2\right)\right]\vector{v}_0\end{aligned}$$

where $\alpha = 1/a$ and we will define $C(z)$ and $S(z)$ shortly. Note that $\alpha < 0$ for hyperbolas, $\alpha = 0$ for parabolas ($a\rightarrow\infty$) and $\alpha > 0$ for ellipses. Interestingly, this gives $\chi$ dimensions of square root of length, such that $\alpha\chi^2$ is dimensionless.

In a previous section, we identified the coefficients of $\vector{r}_0$ and $\vector{v}_0$ in similar equations as the **Lagrange coefficients**, in that case, in terms of the change of true anomaly. These equations give the Lagrange coefficients in terms of the universal anomaly.

Now, we need a way to solve for $\chi$, the universal anomaly. We can write Kepler's equation in terms of the universal anomaly as:

$$\sqrt{\mu}\left(t - t_0\right) = \frac{r_0 \left.v_r\right)_0}{\sqrt{\mu}}\chi^2 C\left(\alpha\chi^2\right) + \left(1 - \alpha r_0\right) \chi^3S\left(\alpha\chi^2\right) + r_0 \chi$$

Like Kepler's equation in the ellipse and hyperbola specific forms, this equation is transcendental in $\chi$. If $\chi$ is known, the equation can be solved for the change in time interval, $t - t_0$. If the time interval is known instead, we must use numerical techniques to solve the equation.

## Stumpff Functions

The functions $C(z)$ and $S(z)$ are [**Stumpff functions**](https://en.wikipedia.org/wiki/Stumpff_function). They can be defined by infinite series of the form:

$$c_k(z) = \frac{1}{k!} - \frac{z}{\left(k + 2\right)!} + \frac{z^2}{\left(k + 4\right)!} - \cdots = \sum_{i=0}^{\infty}\frac{\left(-1\right)^{i} z^i}{\left(k + 2i\right)!}$$

where $k$ is an integer that indicates the type of Stumpff function. The first two Stumpff functions, $k=0$ and $k=1$ respectively, define our $C(z)$ and $S(z)$ functions from above. Interestingly, the Stumpff functions are related to the Taylor series expansions of the circular and hyperbolic trigonometric functions:

$$C(z) =\begin{cases}\displaystyle \frac{1 - \cos\sqrt{z}}{z} & \left(z > 0\right)\\ \displaystyle\frac{\cosh\sqrt{-z} - 1}{-z} & \left(z < 0\right) \\ \displaystyle\frac{1}{2} & \left(z = 0\right)\end{cases}$$

and

```{margin}
**Note:** There's a typo in the equation for $z < 0$ here in the book, it should be a $\left(\sqrt{-z}\right)^3$ in the denominator.
```

$$S(z) =\begin{cases}\displaystyle \frac{\sqrt{z} - \sin\sqrt{z}}{\left(\sqrt{z}\right)^3} & \left(z > 0\right)\\ \displaystyle \frac{\sinh\sqrt{-z} - \sqrt{-z}}{\left(\sqrt{-z}\right)^3} & \left(z < 0\right) \\ \displaystyle \frac{1}{6} & \left(z = 0\right)\end{cases}$$

```{margin}
**Note:** The equivalent Fig. 3.19 in the book has a typo in the last graph on the right, the curves for $C(z)$ and $S(z)$ are reversed.
```

The two Stumpff functions are plotted in the figure below. Notice that both $C(z)$ and $S(z)$ tend toward infinity as $z$ approaches $-\infty$, and they approach zero as $z$ approaches $+\infty$.

```{code-cell}
:tags: [remove-input]
import matplotlib.pyplot as plt
from matplotlib.ticker import AutoMinorLocator
import numpy as np
plt.rc("font", size=20)
plt.rc("figure", dpi=300)

def stumpff_0(z):
    x = np.full(len(z), np.nan)
    x[z > 0] = (1 - np.cos(np.sqrt(z[z > 0]))) / z[z > 0]
    x[z < 0] = (np.cosh(np.sqrt(-z[z < 0])) - 1) / (-z[z < 0])
    x[np.isnan(x)] = 1/2
    return x


def stumpff_1(z):
    x = np.full(len(z), np.nan)
    x[z > 0] = (np.sqrt(z[z > 0]) - np.sin(np.sqrt(z[z > 0]))) / np.sqrt(z[z > 0])**3
    x[z < 0] = (np.sinh(np.sqrt(-z[z < 0])) - np.sqrt(-z[z < 0])) / np.sqrt(-z[z < 0])**3
    x[np.isnan(x)] = 1/6
    return x

x_1 = np.linspace(-50, 0, 100)
x_2 = np.linspace(0, 30, 100)
x_3 = np.linspace(30, 500, 100)

y0_1 = stumpff_0(x_1)
y1_1 = stumpff_1(x_1)
y0_2 = stumpff_0(x_2)
y1_2 = stumpff_1(x_2)
y0_3 = stumpff_0(x_3)
y1_3 = stumpff_1(x_3)
fig, (ax_1, ax_2, ax_3) = plt.subplots(figsize=(9, 12), nrows=3)
ax_1.plot(x_1, y0_1, label="$C(z)$")
ax_1.plot(x_1, y1_1, label="$S(z)$")
ax_1.grid(which="both")
ax_1.xaxis.set_minor_locator(AutoMinorLocator(2))
ax_1.yaxis.set_minor_locator(AutoMinorLocator(2))
ax_1.legend()

ax_2.plot(x_2, y0_2, label="$C(z)$")
ax_2.plot(x_2, y1_2, label="$S(z)$")
ax_2.grid(which="both")
ax_2.xaxis.set_minor_locator(AutoMinorLocator(2))
ax_2.yaxis.set_minor_locator(AutoMinorLocator(2))
ax_2.legend()

ax_3.plot(x_3, y0_3, label="$C(z)$")
ax_3.plot(x_3, y1_3, label="$S(z)$")
ax_3.grid(which="both")
ax_3.xaxis.set_minor_locator(AutoMinorLocator(2))
ax_3.yaxis.set_minor_locator(AutoMinorLocator(2))
ax_3.legend();
```

## Relation of $\chi$ to Other Anomalies

We now seek to relate $\chi$ back to the anomalies for elliptical, parabolic, and hyperbolic orbits. For demonstration, we will choose the following initial conditions:

$$t_0 = 0\quad r_0 = r_p \quad \left.v_r\right)_0 = 0$$

which is to say, the same initial conditions that we defined for the equations in terms of the true and eccentric anomalies. For the case of the parabola, $\alpha = 0$ and we can show that:

$$M_p = \frac{1}{6}\left(\frac{\chi\sqrt{\mu}}{h}\right)^3 + \frac{1}{2}\left(\frac{\sqrt{\mu}}{h}\chi\right)$$

In the case of the ellipse, we know that $\alpha > 0$, and we can show that:

$$M_e = \frac{\chi}{\sqrt{a}} - e \sin\left(\frac{\chi}{\sqrt{a}}\right)$$

Finally, for the hyperbola, $\alpha < 0$ and $a < 0$, and we can show that:

$$M_h = e\sinh\left(\frac{\chi}{\sqrt{-a}}\right) - \frac{\chi}{\sqrt{-a}}$$

Summarizing these results, the universal anomaly $\chi$ is related to our previously defined anomalies as follows:

$$\chi =\begin{cases}\displaystyle\frac{h}{\sqrt{\mu}}\tan\frac{\theta}{2} & \text{parabola} \\\displaystyle\sqrt{a}E & \text{ellipse} \\\displaystyle \sqrt{-a}F & \text{hyperbola}\end{cases}$$

Generalizing from this to the case where $t_0\neq 0$, and does not occur at periapse, we find:

$$\chi =\begin{cases}\displaystyle\frac{h}{\sqrt{\mu}}\left(\tan\frac{\theta}{2} - \tan\frac{\theta_0}{2}\right) & \text{parabola} \\\displaystyle\sqrt{a}\left(E - E_0\right) & \text{ellipse} \\\displaystyle \sqrt{-a}\left(F - F_0\right) & \text{hyperbola}\end{cases}$$

where $\theta_0$, $E_0$, and $F_0$ are the true anomaly and eccentric anomalies at the time $t_0$.

Using these factors, we can relate the universal anomaly directly back to the true anomaly by:

$$\tan\frac{\theta - \theta_0}{2} = \frac{z}

## Numerical Solution of Kepler's Equation in the Universal Anomaly

To formulate the numerical solution of Kepler's equation in terms of the universal anomaly, we move everything over to one side of the equation, and seek the roots of:

$$f(\chi) = \frac{r_0 \left.v_r\right)_0}{\sqrt{\mu}}\chi^2 C\left(\alpha\chi^2\right) + \left(1 - \alpha r_0\right) \chi^3S\left(\alpha\chi^2\right) + r_0 \chi - \sqrt{\mu}\left(t - t_0\right)$$

The derivative of this function is also useful:

$$\frac{d f(\chi)}{d\chi} = 2\frac{r_0 \left.v_r\right)_0}{\sqrt{\mu}}\chi C(z) + \frac{r_0 \left.v_r\right)_0}{\sqrt{\mu}}\chi^2 \frac{d C(z)}{dz} \frac{dz}{d\chi} + 3\left(1 - \alpha r_0\right)\chi^2 S(z) + \left(1 - \alpha r_0\right)\chi^3 \frac{d S(z)}{dz}\frac{dz}{d\chi} + r_0$$(universal-kepler-derivative)

where $z = \alpha\chi^2$, such that:

$$\frac{dz}{d\chi} = 2\alpha\chi$$

and

$$\begin{aligned}\frac{d S(z)}{dz} &= \frac{1}{2z}\left[C(z) - 3S(z)\right] \\\frac{d C(z)}{dz} &= \frac{1}{2z}\left[1 - z S(z) - 2C(z)\right]\end{aligned}$$

Substituting these results back into Eq. {eq}`universal-kepler-derivative` gives:

$$\frac{d f(\chi)}{d\chi} = \frac{r_0 \left.v_r\right)_0}{\sqrt{\mu}}\chi\left[1 - \alpha\chi^2 S(z)\right] + \left(1 - \alpha r_0\right)\chi^2 C(z) + r_0$$

The last thing we need for a solution using Newton's algorithm is an initial guess. There are several methods suggested for this. In {cite}`Curtis2020`, they suggest using:

$$\chi_{i = 0} = \sqrt{\mu} \left\lvert\alpha\right\rvert \Delta t$$

In {cite}`Prussing2013`, they suggest a couple of different options. First, Prussing and Conway show that the solution lies in the interval:

$$\begin{aligned}\chi^{+} &= \frac{\sqrt{\mu}\Delta t}{r^{-}}\\\chi^{-} &= \frac{\sqrt{\mu}\Delta t}{r^{+}}\end{aligned}$$

where $r^{+}$ and $r^{-}$ are the largest and smallest values of the radius. The most conservative choice of $r^{-}$ is the radius at periapsis for all the orbits:

$$r^{-} = r_p$$

For elliptical orbits, the most conservative choice of $r^{+}$ is the radius at apoapse:

$$r^{+}_{\text{ellipse}} = r_a$$

For parabolas and hyperbolas, the most conservative choice is $r^{+} = \infty$, such that:

$$\chi^{-}_{\text{parabola/hyperbola}} = 0$$

With values of $\chi^{+}$ and $\chi^{-}$ computed, the initial guess is simply the average of the two:

$$\chi_{i = 0} = \frac{\chi^{+} + \chi^{-}}{2}$$

Alternatively, a more refined estimate can be determined using a secant estimate of the root of Kepler's equation:

$$\chi_{i = 0} = \frac{\mu\Delta t^2}{r_p \left[f(\chi^{+}) + \sqrt{\mu}\Delta t\right]}$$

where $f(\chi^{+})$ is the solution of Kepler's equation with the $\chi^{+}$ value.

```{note}
Prussing and Conway {cite}`Prussing2013`, citing Conway {cite}`Conway1986` suggest that faster convergence in the solution of Kepler's equation can be achieved by using the **Laguerre algorithm**, rather than Newton's algorithm. Another advantage of the Laguerre algorithm is that it is relatively insensitive to the value of the initial guess.

The Laguerre algorithm can be implemented as:

$$\chi_{i + 1} = \chi_{i} - \frac{n f(\chi_i)}{f'(\chi_i) \pm \left[\left(n - 1\right)^2 \left(f'(\chi_i\right)^2 - n\left(n - 1\right) f(\chi_i)f''(\chi_i)\right]}$$

The sign ambiguity in the denominator is determined by taking the sign of the numerical value of $f'(\chi_i)$. In addition, the solution is relatively insensitive to the choice of the value of $n$, which is an integer constant. It seems as though $n = 5$ is a reasonable value. Choosing $n = 1$ gives the standard Newton's algorithm.

Derivation of $f''(\chi_i)$ is left up to the reader.

Although the Laguerre algorithm was originally intended for finding the roots of polynomial equations, it seems to work well in this application.
```

## References

```{bibliography} ../references.bib
:style: unsrt
:filter: docname in docnames
```
