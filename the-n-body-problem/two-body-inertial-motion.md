# Two-Body Equations of Motion in an Inertial Frame

In this section, we will develop the equations of motion for two masses, $m_1$ and $m_2$, each affected by the other's gravitational pull. Remember that an inertial reference frame may move with constant velocity, but it cannot rotate or accelerate.

The origin of this inertial frame of reference is arbitrary. We don't specify where the origin of the frame is, only that the frame exists and is inertial. Finding a truly inertial reference frame can be tricky, since picking a fixed location in space is tricky. Even Newton deferred this question!

## Relative Position Vector

We will use capital letters to refer to coordinates in the inertial reference frame, $X$, $Y$, and $Z$ with unit vectors $\uvec{I}$, $\uvec{J}$, and $\uvec{K}$, respectively.

:::{figure} ../images/two-point-masses.svg
:name: fig:two-point-masses
:alt: Two point masses in an inertial reference frame

The locations of two point masses, $m_1$ and $m_2$, in an inertial reference frame
:::

The position vectors $\vector{R}_1$ and $\vector{R}_2$ of two point masses in this reference frame are:

:::{math}
:label: eq:absolute-position-vector
\begin{aligned}
  \vector{R}_1 &= X_1\uvec{I} + Y_1\uvec{J} + Z_1\uvec{K}\\
  \vector{R}_2 &= X_2\uvec{I} + Y_2\uvec{J} + Z_2\uvec{K}
\end{aligned}
:::

Let $\vector{r}$ be the vector pointing from $m_1$ to $m_2$, which we also phrase as **$m_2$ relative to $m_1$**. Then:

:::{math}
:label: eq:relative-position-vector
\begin{aligned}
  \vector{r} &= \vector{R}_2 - \vector{R}_1\\
  \vector{r} &= \left(X_2 - X_1\right)\uvec{I} + \left(Y_2 - Y_1\right)\uvec{J} + \left(Z_2 - Z_1\right)\uvec{K}
\end{aligned}
:::

We also define a **unit vector** pointing from $m_1$ toward $m_2$:

:::{math}
:label: eq:relative-unit-vector
\uvec{u}_r = \frac{\vector{r}}{r}
:::

where $r$ is the magnitude of $\vector{r}$, or the distance between the two masses.

### Forces in the Two-Body System

The two masses are acted upon only by their mutual gravitational pull. $\vector{F}_{12}$ is the force exerted on $m_1$ by $m_2$ and $\vector{F}_{21}$ is the force exerted on $m_2$ by $m_1$. By Newton's third law:

:::{math}
:label: eq:newtons-third-law-for-two-body
\vector{F}_{12} = -\vector{F}_{21}
:::

Newton's second law says that the force is equal to the mass times the acceleration:

:::{math}
:label: eq:newtons-second-law-two-body
\begin{aligned}
  \vector{F}_{12} &= m_1\ddot{\vector{R}}_1 \\
  \vector{F}_{21} &= m_2\ddot{\vector{R}}_2
\end{aligned}
:::

where $\ddot{\vector{R}}$ is the **absolute acceleration** of the subscripted mass. Absolute means that the acceleration is taken relative to an inertial reference frame. This is important because Newton's second law only applies for absolute accelerations.

Since the only force in this system is the gravitational attraction, the force is also equal to Newton's law of gravitation, {eq}`eq:newtons-law-of-gravitation`. The force of $m_2$ on $m_1$, $F_{12}$, points in the _positive_ direction of $\uvec{u}_r$. Because of Newton's third law, as represented by {eq}`eq:newtons-third-law-for-two-body`, the force of $m_1$ on $m_2$, $F_{21}$, points in the negative direction of $\uvec{u}_r$. This is shown in {eq}`eq:gravitational-force-two-body`:

:::{math}
:label: eq:gravitational-force-two-body
\begin{aligned}
  \vector{F}_{12} &= \frac{G m_1 m_2}{r^2}\uvec{u}_r\\
  \vector{F}_{21} &= -\frac{G m_1 m_2}{r^2}\uvec{u}_r
\end{aligned}
:::

## Finding the Equations of Motion

Combining {eq}`eq:newtons-second-law-two-body` and {eq}`eq:gravitational-force-two-body`, we find:

:::{math}
:label: eq:second-law-and-gravity-two-body
\begin{aligned}
  m_1 \ddot{\vector{R}}_1 &= \frac{G m_1 m_2}{r^2}\uvec{u}_r\\
  m_2 \ddot{\vector{R}}_2 &= -\frac{G m_1 m_2}{r^2}\uvec{u}_r
\end{aligned}
:::

Finally, we divide through by the mass on the left side of each equation and replace $\uvec{u}_r$ with its definition, {eq}`eq:relative-unit-vector` to arrive at the **two-body inertial equations of motion**:

:::{math}
:label: eq:two-body-inertial-equation-of-motion
\begin{aligned}
  \ddot{\vector{R}}_1 &= G m_2 \frac{\vector{r}}{r^3}\\
  \ddot{\vector{R}}_2 &= G m_1 \frac{\vector{r}}{r^3}
\end{aligned}
:::

This is a coupled, nonlinear, vector system of ordinary differential equations.

## Finding the System State as a Function of Time

Our goal is now to determine equations that will let us solve for the position, velocity, and acceleration of the two masses as a function of time. We split {eq}`eq:two-body-inertial-equation-of-motion` into components to find the absolute acceleration of each mass:

:::{math}
:label: eq:two-body-inertial-components
\begin{aligned}
  \ddot{X}_1 &= G m_2 \frac{X_2 - X_1}{r^3} & \ddot{Y}_1 &= G m_2 \frac{Y_2 - Y_1}{r^3} & \ddot{Z}_1 &= G m_2 \frac{Z_2 - Z_1}{r^3}\\
  \ddot{X}_2 &= G m_1 \frac{X_1 - X_2}{r^3} & \ddot{Y}_2 &= G m_1 \frac{Y_1 - Y_2}{r^3} & \ddot{Z}_2 &= G m_1 \frac{Z_1 - Z_2}{r^3}
\end{aligned}
:::

Now we have a system of six nonlinear ordinary differential equations. Since the highest order derivative in the system is the second derivative, we need 6 equations * 2nd order = 12 initial conditions to solve the problem. The most convenient set of initial conditions are the six position components and six velocity components of $m_1$ and $m_2$.

These components are called the **state vector** of the system. This is because when all 12 values are known, the state of the system is completely determined. This happens in two steps:

1. By using the positions, we can find all the acceleration components using {eq}`eq:two-body-inertial-components`
2. By integrating the acceleration from step 1 and adding the known velocity components, we can find the absolute velocity

Although these steps can be done by hand, in practice it is more convenient to solve them with a computer, numerically.
