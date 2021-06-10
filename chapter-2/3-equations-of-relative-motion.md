# Chapter 2.3 - Equations of Relative Motion

To proceed in our solution of the two-body problem, it is advantageous to represent the problem in relative coordinates, rather than the inertial coordinates of the last section. This will allow us to develop a conceptual understanding of the system that enhances the practical understanding developed in the previous section.

According to Prussing and Conway {cite}`Prussing2013`:

> The solution for the allowed relative motion was first obtained by Isaac Newton in 1683. Newton was arguably the first person capable of obtaining it since the solution requires a law of gravitation, a law of motion, and differential calculus, all of which he invented. **pp. 11**

## Equation of Relative Motion

The equation of motion is derived from the equation for the relative position of $m_2$ with respect to $m_1$ by differentiating twice:

$$\ddot{\vector{r}} = \ddot{\vector{R}}_2 - \ddot{\vector{R}}_1$$

Plugging in the results for the two absolute position vectors, $\ddot{\vector{R}}$, we find:

$$\ddot{\vector{r}} = -\frac{G\left(m_1 + m_2\right)}{r^2}\uvec{u}_r$$

where $\uvec{u}_r$ is the unit vector pointing in the $\vector{r}$ direction, that is, from $m_1$ to $m_2$.

We now define a parameter, $\mu$, called the **gravitational parameter**:

$$\mu = G\left(m_1 + m_2\right)$$

The utility of this parameter is mostly for the case where $m_1 >> m_2$, which is the case for many practical problems. For instance, human-built devices orbiting around a planet have a much smaller mass than the planet, such that

$$\mu \approx G m_1$$

Therefore, we can tabulate values of $\mu$ for various celestial bodies, rather than computing it every time.

Returning to the equation of motion, and substituting $\mu$ and the definition of $\uvec{u}_r$:

$$\ddot{\vector{r}} = -\frac{\mu}{r^3}\vector{r}$$

This is a nonlinear, second-order ordinary differential equation. It can be solved analytically, if we can find the constants of integration. There are two vector constants of integration, each of which have three scalar components. Thus, there are six constants of integration that must be determined from the initial conditions.

```{note}
Interestingly, the roles of $m_1$ and $m_2$ can be interchanged by multiplying the equation above by -1. Thus, the motion of $m_1$ relative to $m_2$ has the same shape as the reverse. In other words, if you were standing on the Moon, the Earth would appear to be orbiting you!
```

## Equation of Motion in a Co-moving Frame

In the previous section, we developed the relative equation of motion in the inertial frame. This is because $\vector{R}$ has components in the inertial frame. It is also convenient to locate the two masses in a coordinate system attached to, and moving with, $m_1$. In this reference frame, the components of $\vector{r}$ are:

$$\vector{r} = x\uvec{\imath} + y\uvec{\jmath} + z\uvec{k}$$

```{margin}
_relative_ here means relative to the moving reference frame attached to $m_1$
```

We can find the relative velocity and acceleration:

$$\begin{aligned}\dot{\vector{r}}_{\text{rel}} &= \dot{x}\uvec{\imath} + \dot{y}\uvec{\jmath} + \dot{z}\uvec{k} & \ddot{\vector{r}}_{\text{rel}} &= \ddot{x}\uvec{\imath} + \ddot{y}\uvec{\jmath} + \ddot{z}\uvec{k}\end{aligned}$$

We know that the absolute acceleration is equal to the relative acceleration only in the case where $\vector{\Omega}$ and $\dot{\vector{\Omega}}$, the angular velocity and acceleration of the moving reference frame, are zero.

If we imagine a non-rotating coordinate system attached to $m_1$, then the equation of motion for the relative acceleration can be solved numerically in exactly the same way as the equations for absolute motion we used in the last section. The only difference is that the state vector has only 6 components, the 3 position coordinates, and the 3 velocity components, instead of 12 as in the absolute motion example.

## Motion Relative to the Center of Mass

```{margin}
Note the lower case $\vector{r}$ for the position relative to $G$.
```

There is one other interesting case to examine here, which is the motion of the masses relative to the center of mass, $G$, of the system. Let $\vector{r}_1$ and $\vector{r}_2$ be the position vectors of $m_1$ and $m_2$ relative to the center of mass, respectively. We also note that, in this definition, $\uvec{u}_r$ points in the same direction as $\vector{r}_2$.

Skipping all the algebra, it turns out that the equation of motion for $m_2$ relative to $G$ is:

$$\ddot{\vector{r}}_2 = - \frac{\mu'}{r_2^3}\vector{r}_2$$

where

$$\mu' = \left(\frac{m_1}{m_1 + m_2}\right)^3\mu$$

and $\mu$ is as given previously. Similarly, the equation of motion for $m_1$ relative to $G$ is:

$$\ddot{\vector{r}}_1 = - \frac{\mu''}{r_1^3}\vector{r}_1$$

where

$$\mu' = \left(\frac{m_2}{m_1 + m_2}\right)^3\mu$$

Thus, we can see that all three equations of relative motion:

1. $m_2$ relative to $m_1$
2. $m_2$ relative to $G$
3. $m_1$ relative to $G$

have the same form, differing only in the constants. The solutions to these equations will all have the same shape! In other words, if $m_2$ is orbiting around $m_1$ in an ellipse, then $m_2$ and $m_1$ will orbit around $G$ in an ellipse!
