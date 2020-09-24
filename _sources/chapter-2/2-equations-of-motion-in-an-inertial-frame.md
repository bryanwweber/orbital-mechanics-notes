# Chapter 2.2 - Equations of Motion in an Inertial Frame

In this section, we will develop the equations of motion for two masses each affected by the other's gravitational pull. At first, we will assume an inertial reference frame, but we will relax this assumption later on.

The origin $O$ of any inertial reference frame may move with constant velocity, but it cannot rotate or accelerate (which are really saying the same thing).

## Motion of the Barycenter

Assume that we have an inertial reference frame and we will use capital letters to refer to coordinates in this reference frame, $X$, $Y$, and $Z$ with unit vectors $\uvec{I}$, $\uvec{J}$, and $\uvec{K}$, respectively.

The position vectors $\vector{R}_1$ and $\vector{R}_2$ of two point masses in this reference frame are:

$$\begin{aligned}\vector{R}_1 &= X_1\uvec{I} + Y_1\uvec{J} + Z_1\uvec{K}\\\vector{R}_2 &= X_2\uvec{I} + Y_2\uvec{J} + Z_2\uvec{K}\end{aligned}$$

Let $\vector{r}$ be the vector pointing from $m_1$ to $m_2$, which we also phrase as **$m_2$ relative to $m_1$**.

Then:

$$\begin{aligned}\vector{r} &= \vector{R}_2 - \vector{R}_1\\\vector{r} &= \left(X_2 - X_1\right)\uvec{I} + \left(Y_2 - Y_1\right)\uvec{J} + \left(Z_2 - Z_1\right)\uvec{K}\end{aligned}$$

We also define a **unit vector** pointing from $m_1$ toward $m_2$:

$$\uvec{u}_r = \frac{\vector{r}}{r}$$

where $r$ is the magnitude of $\vector{r}$.

The two masses are acted upon only by their mutual gravitational pull. $\vector{F}_{12}$ is the force exerted on $m_1$ by $m_2$ and $\vector{F}_{21}$ is the force exerted on $m_2$ by $m_1$. By Newton's third law:

$$\vector{F}_{12} = -\vector{F}_{21}$$

Newton's second law says that this force is equal to the mass times the acceleration:

$$\begin{aligned}\vector{F}_{12} &= m_1\ddot{\vector{R}}_1 \\\vector{F}_{21} &= m_2\ddot{\vector{R}}_2\end{aligned}$$

where $\ddot{\vector{R}}$ is the **absolute acceleration** of the subscripted mass. Absolute means that the acceleration is taken relative to an inertial reference frame.

We are going to combine Newton's second law with Newton's law of gravitation now:

$$\begin{aligned}\vector{F}_{12} &= \frac{G m_1 m_2}{r^2}\uvec{u}_r\\\vector{F}_{21} &= -\frac{G m_1 m_2}{r^2}\uvec{u}_r\end{aligned}$$

Putting it all together:

$$\begin{aligned}m_1 \ddot{\vector{R}}_1 &= \frac{G m_1 m_2}{r^2}\uvec{u}_r\\m_2 \ddot{\vector{R}}_2 &= -\frac{G m_1 m_2}{r^2}\uvec{u}_r\end{aligned}$$

Now, adding these equations together, we find an extremely important result:

$$m_1 \ddot{\vector{R}}_1 + m_2 \ddot{\vector{R}}_2 = \vector{0}$$

To see why this result is so important, we need to define one more quantity, the **barycenter** or center of mass for the two-body system. Using the absolute position vectors, we find that:

$$\vector{R}_G = \frac{m_1 \vector{R}_1 + m_2 \vector{R}_2}{m_1 + m_2}$$

By taking derivatives of this relationship, we can find the absolute velocity and acceleration of the barycenter:

$$\begin{aligned}\vector{v}_G &= \dot{\vector{R}}_G = \frac{m_1 \dot{\vector{R}}_1 + m_2\dot{\vector{R}}_2}{m_1 + m_2}\\\vector{a}_G &= \ddot{\vector{R}}_G = \frac{m_1 \ddot{\vector{R}}_1 + m_2\ddot{\vector{R}}_2}{m_1 + m_2}\end{aligned}$$

```{margin}
Assuming that the only forces are the mutual gravitational attraction of the two masses.
```

Now go back to the result from Newton's laws - it says that the top of the fraction in the acceleration of the barycenter is equal to zero. In other words, the center of gravity of the two-body system does not undergo any acceleration and moves at constant velocity in a straight line for all time!

This is a hugely important result because it means that a coordinate system attached to the barycenter is an **inertial reference frame**. We can find the position, velocity, and acceleration of masses relative to a coordinate system attached to the barycenter, and they will be the absolute quantities.

## Finding the Equations of Motion

Our goal is now to determine equations that will let us solve for the position, velocity, and acceleration of the two masses as a function of time. To do this, we will return to the combination of Newton's laws, divide through by the masses, and substitute the definition of the unit vector $\uvec{u}_r$:

$$\begin{aligned}\ddot{\vector{R}}_1 &= G m_2 \frac{\vector{r}}{r^3}\\\ddot{\vector{R}}_2 &= G m_1 \frac{\vector{r}}{r^3}\end{aligned}$$

We can split these into components to find the absolute acceleration:

$$\begin{aligned}\ddot{X}_1 &= G m_2 \frac{X_2 - X_1}{r^3} & \ddot{Y}_1 &= G m_2 \frac{Y_2 - Y_1}{r^3} & \ddot{Z}_1 &= G m_2 \frac{Z_2 - Z_1}{r^3}\\\ddot{X}_2 &= G m_1 \frac{X_1 - X_2}{r^3} & \ddot{Y}_2 &= G m_1 \frac{Y_1 - Y_2}{r^3} & \ddot{Z}_2 &= G m_1 \frac{Z_1 - Z_2}{r^3}\end{aligned}$$

The position vectors $\vector{R}$ and velocity vectors $\vector{v}$ are referred to as the **state vector** of the system. Given initial values for $\vector{R}$ and $\vector{v}$, we can use the acceleration equations to find the state of the system at any given time by integration. In practice, it is easiest to do this by solving the system of ordinary differential equations numerically.

## Numerical Solution of the Two-Body Problem

The system of ordinary differential equations is represented mathematically in this way:

$$\dot{\vector{y}} = f\left(t, \vector{y}\right)$$

On the left side, we are taking the time derivative of the state vector. This time derivative is some unknown function of time, $t$, and the state vector itself. In the case of the two-body problem, the state vector is made of the 3 components of position and velocity for each of the two masses:

$$\vector{y} = \left[X_1\ Y_1\ Z_1\ X_2\ Y_2\ Z_2\ \dot{X}_1\ \dot{Y}_1\ \dot{Z}_1\ \dot{X}_2\ \dot{Y}_2\ \dot{Z}_2\right]$$

This gives a state vector of length 12 elements. We define this as the state vector because we are interested in the positions of the masses as a function of time (for example, the position of the Earth and Moon as a function of time). If we only included the positions in the state vector, the left side of the equation would be just the velocity. However, to solve the velocity we need to include the acceleration. Therefore, we include the velocities in the state vector as well, so that the left hand side will include the acceleration.

The left hand side of the previous equation is:

$$\dot{\vector{y}} = \left[\dot{X}_1\ \dot{Y}_1\ \dot{Z}_1\ \dot{X}_2\ \dot{Y}_2\ \dot{Z}_2\ \ddot{X}_1\ \ddot{Y}_1\ \ddot{Z}_1\ \ddot{X}_2\ \ddot{Y}_2\ \ddot{Z}_2\right]$$

In other words, the first six elements of the left side are the velocities and the second six are the acceleration.

Now, if specify initial values for $\vector{R}_{1}$ and $\vector{R}_{2}$, we can calculate all of the acceleration terms. We also need to specify initial values for the velocities.

Now choose a time-step size, let's say $\Delta t =$ 1 second. Since we have the initial values at $t = 0$, we can find the values at $t = 1$ by multiplying $\dot{\vector{y}}$ with $\Delta t$ and adding them to the initial values. We can repeat that process until we reach a desired end time.

However, it would be inefficient to do this by hand, and there are more accurate methods available. These are described in Chapter 1.8 of your textbook. I don't see a reason to re-implement standard functions, so we are going to use the functions built-in to SciPy or Matlab, depending on which software you're using.

In SciPy, the function is called [`solve_ivp`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.solve_ivp.html#scipy.integrate.solve_ivp). In Matlab, the function is called [`ode45`](https://www.mathworks.com/help/matlab/ref/ode45.html). In the next page, we'll demonstrate the example from the book using SciPy and plot the results.

## Gravitational Potential Energy

The gravitational potential energy function for a spherically-symmetrical shape is:

$$V = -\frac{G m_1 m_2}{r} = -\frac{G m_1 m_2}{\sqrt{\left(X_2 - X_1\right)^2 + \left(Y_2 - Y_1\right)^2 + \left(Z_2 - Z_1\right)^2}}$$

```{margin}
Conservative forces allow infinite conversion of energy between forms. Non-conservative forces, such as friction and drag, result in a conversion of mechanical energy into heat.
```

Gravity is a [**conservative force**](https://en.wikipedia.org/wiki/Conservative_force), which means that the force field can be determined from the gradient of the potential energy function:

$$\vector{F} = - \vector{\nabla} V$$

Thus, the attractive forces between the masses are given by:

$$\begin{aligned}\vector{F}_{12} &= -\left(\frac{\partial V}{\partial X_2}\uvec{\imath} + \frac{\partial V}{\partial Y_2}\uvec{\jmath} + \frac{\partial V}{\partial Z_2}\uvec{k}\right)\\\vector{F}_{21} &= -\left(\frac{\partial V}{\partial X_1}\uvec{\imath} + \frac{\partial V}{\partial Y_1}\uvec{\jmath} + \frac{\partial V}{\partial Z_1}\uvec{k}\right)\end{aligned}$$

In the book, they show that the gravitational potential energy field of a sphere is equivalent to the field of an equivalent point mass located at the center of the sphere. As long as the spheres don't come into contact, we can substitute point masses for spheres with no difference in the equations!

## Many-Body Problems

Since we have developed the equations for the two-body problem, the question naturally arises about having three or more masses in the system. Unfortunately, there are no general closed form solutions for the $n$-body problem when $n > 2$. The system can still be solved numerically, but it is highly chaotic and complex.

Given this is the case, the next question that arises is, how useful is the two-body solution, really? It turns out that the easiest way to solve the many-body problem for systems of engineering interest is to solve the two-body problem and treat other gravitational influences as perturbations of the two-body problem.

For example, consider a satellite orbiting Earth. The dominant gravitational force on the satellite is from the Earth. There will also be influences from the Sun, Moon, and other planets. However, those effects can be treated as perturbations on the solution of the two-body problem involving the Earth and the satellite.
