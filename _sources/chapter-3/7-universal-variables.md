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
