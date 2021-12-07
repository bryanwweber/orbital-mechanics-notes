# The Lagrange Coefficients

```{margin}
Although, we can compute $e$ from the initial position and velocity.
```

The Lagrange coefficients are a set of 4 scalar functions that allow us to determine the orbit given only the initial position and velocity. We do not need to know the shape of the orbit beforehand, because we will see that the Lagrange coefficients do not depend on the eccentricity.

The position and velocity vectors at any time are linear combinations of the Lagrange coefficients and the initial conditions. This useful property allows us to introduce the time variable into our equations.

## Position, Velocity, and Angular Momentum

We start by defining the initial conditions, subscripted with a $0$:

:::{math}
:label: eq:lagrange-coefficients-initial-conditions
\begin{aligned}\vector{r}_0 &= x_0\uvec{p} + y_0\uvec{q} & \vector{v}_0 &= \dot{x}_0\uvec{p} + \dot{y}_0\uvec{q}\end{aligned}
:::

Then the angular momentum is found by taking the cross product:

:::{math}
:label:
\vector{h} = \vector{r}_0 \cross\vector{v}_0 = \uvec{w}\left(x_0\dot{y}_0 - y_0\dot{x}_0\right)
:::

From the definition of the $\uvec{w}$ unit vector, we can see that the magnitude of the angular momentum must be:

:::{math}
:label:
h = x_0\dot{y}_0 - y_0\dot{x}_0
:::

Now we want to write the unit vectors $\uvec{p}$ and $\uvec{q}$ in terms of the initial conditions. Equation {eq}`eq:lagrange-coefficients-initial-conditions` contains two equations, and $\uvec{p}$ and $\uvec{q}$ are the two unknowns. We will use the magnitude of the angular momentum to help simplify. We end up with:

:::{math}
:label:
\begin{aligned}\uvec{p} &= \frac{\dot{y}_0}{h}\vector{r}_0 - \frac{y_0}{h}\vector{v}_0 & \uvec{q} &= -\frac{\dot{x}_0}{h}\vector{r}_0 + \frac{x_0}{h}\vector{v}_0\end{aligned}
:::

Putting these two unit vectors back into the equations for the general position and velocity, and simplifying, we find:

:::{math}
:label:
\begin{aligned}\vector{r} &= \frac{x\dot{y}_0 - y\dot{x}_0}{h}\vector{r}_0 + \frac{-xy_0 + yx_0}{h}\vector{v}_0 \\ \vector{v} &= \frac{\dot{x}\dot{y}_0 - \dot{y}\dot{x}_0}{h}\vector{r}_0 + \frac{-\dot{x}y_0 + \dot{y}x_0}{h}\vector{v}_0\end{aligned}
:::

By inspecting these two equations, we can see that they are composed of a linear combination of $\vector{r}_0$ and $\vector{v}_0$. In addition, the coefficients in front of the initial position and velocity are related. These are called the **Lagrange coefficients**, and given the symbols $f$, $g$, $\dot{f}$, and $\dot{g}$:

:::{math}
:label:
\begin{aligned}f &= \frac{x\dot{y}_0 - y\dot{x}_0}{h} & g &= \frac{-xy_0 + yx_0}{h} \\ \dot{f} &= \frac{\dot{x}\dot{y}_0 - \dot{y}\dot{x}_0}{h} & \dot{g} &= \frac{-\dot{x}y_0 + \dot{y}x_0}{h}\end{aligned}
:::

Note that the time derivative coefficients, $\dot{f}$ and $\dot{g}$, only take the time derivative of the time-varying components, that is, $x$ and $y$. The initial conditions are constant, by definition.

From the conservation of angular momentum, we know that

:::{math}
:label:
\vector{h}_0 = \vector{r}_0 \cross\vector{v}_0 = \vector{h}
:::

since the angular momentum is constant. This imposes a condition on the relationship between the Lagrange coefficients:

:::{math}
:label:
f\dot{g} - \dot{f}g = 1
:::

Thus, if any three of the Lagrange coefficients are known, the fourth can be determined from this constraint.

## Coefficients in Terms of the True Anomaly

We can use a _lot_ of algebra and trig to define the Lagrange coefficients in terms of the change of true anomaly:

:::{math}
:label:
\begin{aligned}f &= 1 - \frac{\mu r}{h^2}\left(1 - \cos\Delta\nu\right) & g &= \frac{rr_0}{h}\sin\Delta\nu \\ \dot{f} &= \frac{\mu}{h}\frac{1 - \cos\Delta\nu}{\sin\Delta\nu}\left[\frac{\mu}{h^2}\left(1 - \cos\Delta\nu\right) - \frac{1}{r_0} - \frac{1}{r}\right] & \dot{g} &= 1 - \frac{\mu r_0}{h^2}\left(1 - \cos\Delta\nu\right)\end{aligned}
:::

These equations allow us to determine the state vector, given the initial conditions $\vector{r}_0$ and $\vector{v}_0$, and the desired change in true anomaly. Notice that we don't require the type of orbit, since the eccentricity does not appear in any of these equations.

One further equation that we need is the orbit equation in terms of the change of true anomaly:

:::{math}
:label:
r = \frac{h^2}{\mu}\frac{1}{1 + \left(\frac{h^2}{\mu r_0} - 1\right) \cos\Delta\nu - \frac{hv_{r,0}}{\mu}\sin\Delta\nu}
:::

The disadvantage of these equations is that we cannot solve for periapsis or apoapsis distances, without first calculating the eccentricity and true anomaly of the initial point. Fortunately, these can be calculated as follows. First, obtain the specific angular momentum from:

:::{math}
:label:
h = \mag{\vector{r}_0 \cross\vector{v}_0}
:::

Then, project the initial velocity into the radial direction by taking the dot product of the initial velocity with a unit vector pointing in the direction of $\vector{r}_0$:

:::{math}
:label:
v_{r,0} = \vector{v}_0\cdot\frac{\vector{r}_0}{r_0}
:::

Then, we can solve for the eccentricity and initial true anomaly from the orbit equation and its derivative:

:::{math}
:label:
\begin{aligned}r &= \frac{h^2}{\mu}\frac{1}{1 + e\cos\nu_0} & v_{r,0} = \frac{\mu}{h}\sin\nu_0\end{aligned}
:::
