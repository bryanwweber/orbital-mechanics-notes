# Chapter 2.11 - The Lagrange Coefficients

```{margin}
Although, we can compute $e$ from the initial position and velocity.
```

The Lagrange coefficients are a set of 4 scalar functions that allow us to determine the orbit given only the initial position and velocity. We do not need to know the shape of the orbit beforehand, because we will see that the Lagrange coefficients do not depend on the eccentricity.

The position and velocity vectors at any time are linear combinations of the Lagrange coefficients and the initial conditions. This useful property allows us to introduce the variable to time back into our equations, which we previously replaced with $\theta$, the true anomaly. We will do this in Chapter 3.

## Position, Velocity, and Angular Momentum

We start by defining the initial conditions, subscripted with a $0$:

$$\begin{aligned}\vector{r}_0 &= \pf{x}_0\uvec{p} + \pf{y}_0\uvec{q} & \vector{v}_0 &= \dot{\pf{x}}_0\uvec{p} + \dot{\pf{y}}_0\uvec{q}\end{aligned}$$ (initial_conditions)

Then the angular momentum is found by taking the cross product:

$$\vector{h} = \vector{r}_0 \cross\vector{v}_0 = \uvec{w}\left(\pf{x}_0\dot{\pf{y}}_0 - \pf{y}_0\dot{\pf{x}}_0\right)$$

From the definition of the $\uvec{w}$ unit vector, we can see that the magnitude of the angular momentum must be:

$$h = \pf{x}_0\dot{\pf{y}}_0 - \pf{y}_0\dot{\pf{x}}_0$$

Now we want to write the unit vectors $\uvec{p}$ and $\uvec{q}$ in terms of the initial conditions. Equation {eq}`initial_conditions` contains two equations, and $\uvec{p}$ and $\uvec{q}$ are the two unknowns. We will use the magnitude of the angular momentum to help simplify. We end up with:

$$\begin{aligned}\uvec{p} &= \frac{\dot{\pf{y}}_0}{h}\vector{r}_0 - \frac{\pf{y}_0}{h}\vector{v}_0 & \uvec{q} &= -\frac{\dot{\pf{x}}_0}{h}\vector{r}_0 + \frac{\pf{x}_0}{h}\vector{v}_0\end{aligned}$$

Putting these two unit vectors back into the equations for the general position and velocity, and simplifying, we find:

```{margin}
**Note:** The velocity equation in the book has a typo, it is missing the dot on the $\pf{x}_0$ in the position term.
```

$$\begin{aligned}\vector{r} &= \frac{\pf{x}\dot{\pf{y}}_0 - \pf{y}\dot{\pf{x}}_0}{h}\vector{r}_0 + \frac{-\pf{x}\pf{y}_0 + \pf{y}\pf{x}_0}{h}\vector{v}_0 \\ \vector{v} &= \frac{\dot{\pf{x}}\dot{\pf{y}}_0 - \dot{\pf{y}}\dot{\pf{x}}_0}{h}\vector{r}_0 + \frac{-\dot{\pf{x}}\pf{y}_0 + \dot{\pf{y}}\pf{x}_0}{h}\vector{v}_0\end{aligned}$$

By inspecting these two equations, we can see that they are composed of a linear combination of $\vector{r}_0$ and $\vector{v}_0$. In addition, the coefficients in front of the initial position and velocity are related. These are called the **Lagrange coefficients**, and given the symbols $f$, $g$, $\dot{f}$, and $\dot{g}$:

```{margin}
**Note:** The equation for $\dot{f}$ in the book is correct, although as mentioned before, its form in the equation for velocity is not.
```

$$\begin{aligned}f &= \frac{\pf{x}\dot{\pf{y}}_0 - \pf{y}\dot{\pf{x}}_0}{h} & g &= \frac{-\pf{x}\pf{y}_0 + \pf{y}\pf{x}_0}{h} \\ \dot{f} &= \frac{\dot{\pf{x}}\dot{\pf{y}}_0 - \dot{\pf{y}}\dot{\pf{x}}_0}{h} & \dot{g} &= \frac{-\dot{\pf{x}}\pf{y}_0 + \dot{\pf{y}}\pf{x}_0}{h}\end{aligned}$$

Note that the time derivative coefficients, $\dot{f}$ and $\dot{g}$, only take the time derivative of the time-varying components, that is, $\pf{x}$ and $\pf{y}$. The initial conditions are constant, by definition.

From the conservation of angular momentum, we know that

$$\vector{h}_0 = \vector{r}_0 \cross\vector{v}_0 = \vector{h}$$

since the angular momentum is constant. This imposes a condition on the relationship between the Lagrange coefficients:

$$f\dot{g} - \dot{f}g = 1$$

Thus, if any three of the Lagrange coefficients are known, the fourth can be determined from this constraint.

## Coefficients in Terms of the True Anomaly

We can use a _lot_ of algebra and trig to define the Lagrange coefficients in terms of the change of true anomaly:

$$\begin{aligned}f &= 1 - \frac{\mu r}{h^2}\left(1 - \cos\Delta\theta\right) & g &= \frac{rr_0}{h}\sin\Delta\theta \\ \dot{f} &= \frac{\mu}{h}\frac{1 - \cos\Delta\theta}{\sin\Delta\theta}\left[\frac{\mu}{h^2}\left(1 - \cos\Delta\theta\right) - \frac{1}{r_0} - \frac{1}{r}\right] & \dot{g} &= 1 - \frac{\mu r_0}{h^2}\left(1 - \cos\Delta\theta\right)\end{aligned}$$

These equations allow us to determine the state vector, given the initial conditions $\vector{r}_0$ and $\vector{v}_0$, and the desired change in true anomaly. Notice that we don't require the type of orbit, since the eccentricity does not appear in any of these equations.

One further equation that we need is the orbit equation in terms of the true anomaly:

$$r = \frac{h^2}{\mu}\frac{1}{1 + \left(\frac{h^2}{\mu r_0} - 1\right) \cos\Delta\theta - \frac{h\left.v_r\right)_0}{\mu}\sin\Delta\theta}$$

The disadvantage of these equations is that we cannot solve for periapsis and/or apoapsis distances, without first calculating the eccentricity and true anomaly of the initial point. Fortunately, these can be calculated as follows. First, obtain the specific angular momentum from:

$$h = \mag{\vector{r}_0 \cross\vector{v}_0}$$

Then, project the initial velocity into the radial direction by taking the dot product of the initial velocity with a unit vector pointing in the direction of $\vector{r}_0$:

$$\left.v_r\right)_0 = \vector{v}_0\cdot\frac{\vector{r}_0}{r_0}$$

Then, we can solve for the eccentricity and initial true anomaly from the orbit equation and its derivative:

$$\begin{aligned}r &= \frac{h^2}{\mu}\frac{1}{1 + e\cos\theta_0} & \left.v_r\right)_0 = \frac{\mu}{h}\sin\theta_0\end{aligned}$$

## Relating True Anamoly to Time

Ideally, we would be able to solve this problem as a function of time, instead of true anomaly. Time is a much more natural variable for humans to deal with. To do so, we need a relationship between $\Delta\theta$ and $\Delta t$. This is a complex problem, and we will deal with it in the next chapter.

We can find series solutions of the Lagrange coefficients, which allow us to do these calculations. Since the series solutions are only valid for times around $t_0$, we will just wait to deal with the problem completely in the next chapter. Details are in the book if you're interested.
