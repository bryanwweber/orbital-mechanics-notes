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

# Two-Body Numerical Solution in an Inertial Frame

The equations of motion for the two-body problem in an inertial frame are given by {eq}`eq:two-body-inertial-components`, repeated here:

:::{math}
\begin{aligned}
  \ddot{X}_1 &= G m_2 \frac{X_2 - X_1}{r^3} & \ddot{Y}_1 &= G m_2 \frac{Y_2 - Y_1}{r^3} & \ddot{Z}_1 &= G m_2 \frac{Z_2 - Z_1}{r^3}\\
  \ddot{X}_2 &= G m_1 \frac{X_1 - X_2}{r^3} & \ddot{Y}_2 &= G m_1 \frac{Y_1 - Y_2}{r^3} & \ddot{Z}_2 &= G m_1 \frac{Z_1 - Z_2}{r^3}
\end{aligned}
:::

The initial positions of the masses are:

:::{math}
\begin{aligned}
  \vector{R}_{1,0} &= \left(0 \uvec{I} + 0 \uvec{J} + 0 \uvec{K}\right) \mathrm{km} \\
  \vector{R}_{2,0} &= \left(3000 \uvec{I} + 0 \uvec{J} + 0 \uvec{K}\right) \mathrm{km}
\end{aligned}
:::

and the initial velocities are:

:::{math}
\begin{aligned}
  \dot{\vector{R}}_{1,0} &= \left(10 \uvec{I} + 20 \uvec{J} + 30 \uvec{K}\right) \mathrm{km/s} \\
  \dot{\vector{R}}_{2,0} &= \left(0 \uvec{I} + 40 \uvec{J} + 0 \uvec{K}\right) \mathrm{km/s}
\end{aligned}
:::

where the subscript $0$ indicates the _initial_ position and velocity. These are the 12 components of the _initial state vector_, which we will give the symbol $y_0$.

The two masses are equal, $m_1 = m_2 = 1.0\times 10^{26} \text{ kg}$ and Newton's gravitational constant, $G = 6.67430\times 10^{-2} \text{ km}^3 \text{ kg}^{-1} \text{ s}^{-2}$.

## The State Vector

In the numerical solution, the state vector is stored in an **array**. Arrays in programming are data structures that are optimized to store numbers. The order that the components appear in the state vector isn't important, only that we keep track of the order and don't forget it. For the sake of choosing something, we will set the positions followed by the velocities:

:::{math}
:label: eq:state-vector-array
y = \left[X_1\ Y_1\ Z_1\ X_2\ Y_2\ Z_2\ \dot{X}_1\ \dot{Y}_1\ \dot{Z_1}\ \dot{X}_2\ \dot{Y}_2\ \dot{Z}_2\right]
:::

The array is indicated by using square brackets, $[\dots]$, and lists all the components of the array inside the brackets. Depending on the programming language you're using, there are different ways to create arrays.

In the following code samples we use arrays to store the initial positions and velocities of both masses and then construct the state vector.

:::{tabbed} Python

``` python
import numpy as np
R_1_0 = np.array((0, 0, 0))  # km
R_2_0 = np.array((3000, 0, 0))  # km
V_1_0 = np.array((10, 20, 30))  # km/s
V_2_0 = np.array((0, 40, 0))  # km/s

y_0 = np.hstack((R_1_0, R_2_0, V_1_0, V_2_0))
```

:::

:::{tabbed} MATLAB

```matlab
R10 = [0 0 0];  % km
R20 = [3000 0 0];  % km
V10 = [10 20 30];  % km/s
V20 = [0 40 0];  % km/s

y_0 = [R10 R20 V10 V20];
```

:::

## Transforming the System of Ordinary Differential Equations

The system of ordinary differential equations (ODEs) in {eq}`eq:two-body-inertial-equation-of-motion` or {eq}`eq:two-body-inertial-components` is a second order system. However, it can be transformed to a system of first-order ODEs by recognizing the acceleration as the first derivative of the velocity. Solving a first-order system is much simpler than solving a second-order system.

We know that the system of equations requires the

:::{math}
:label: eq:numerical-solution
\dot{\vector{y}} = f\left(t, \vector{y}\right)
:::

where $\vector{y}$ is the state vector, $t$ is time, and $f$ is a function that depends on the current time and the current state vector.

The left hand side of {eq}`eq:numerical-solution` is the time-derivative of the state vector, which we find by taking the time derivative of each element of the state vector:

:::{math}
:label: eq:state-vector-derivative
\dot{\vector{y}} = \left[\dot{X}_1\ \dot{Y}_1\ \dot{Z}_1\ \dot{X}_2\ \dot{Y}_2\ \dot{Z}_2\ \ddot{X}_1\ \ddot{Y}_1\ \ddot{Z}_1\ \ddot{X}_2\ \ddot{Y}_2\ \ddot{Z}_2\right]
:::

In words, the left side of {eq}`eq:numerical-solution` is another array, where the first six elements are the velocity components (the first derivative of position) and the second six are the acceleration (the first derivative of velocity).

## Solution Algorithm

We now have enough information to start to solve the problem. The first step is to calculate the initial acceleration using {eq}`eq:two-body-inertial-components`. This can be done for one direction at a time, as shown in the following code:

:::{tabbed} Python

``` python
G = 6.67430E-2  # km**3/(kg * s**2)
m_1 = m_2 = 1.0E26

X_1 = y_0[0]
Y_1 = y_0[1]
Z_1 = y_0[2]
X_2 = y_0[3]
Y_2 = y_0[4]
Z_2 = y_0[5]

r = np.sqrt((X_2 - X_1)**2 + (Y_2 - Y_1)**2 + (Z_2 - Z_1)**2)

ddotX_1 = G * m_2 * (X_2 - X_1) / r**3
ddotY_1 = G * m_2 * (Y_2 - Y_1) / r**3
ddotZ_1 = G * m_2 * (Z_2 - Z_1) / r**3
ddotX_2 = -G * m_1 * (X_2 - X_1) / r**3
ddotY_2 = -G * m_1 * (Y_2 - Y_1) / r**3
ddotZ_2 = -G * m_1 * (Z_2 - Z_1) / r**3
```

:::

:::{tabbed} Matlab

``` matlab
G = 6.67430E-2;  % km**3/(kg * s**2)
m_1 = m_2 = 1.0E26;  % kg

X_1 = y_0(1);
Y_1 = y_0(2);
Z_1 = y_0(3);
X_2 = y_0(4);
Y_2 = y_0(5);
Z_2 = y_0(6);

r = sqrt((X_2 - X_1).^2 + (Y_2 - Y_1).^2 + (Z_2 - Z_1).^2);

ddotX_1 = G .* m_2 .* (X_2 - X_1) ./ r.^3;
ddotY_1 = G .* m_2 .* (Y_2 - Y_1) ./ r.^3;
ddotZ_1 = G .* m_2 .* (Z_2 - Z_1) ./ r.^3;
ddotX_2 = -G .* m_1 .* (X_2 - X_1) ./ r.^3;
ddotY_2 = -G .* m_1 .* (Y_2 - Y_1) ./ r.^3;
ddotZ_2 = -G .* m_1 .* (Z_2 - Z_1) ./ r.^3;
```

:::

Now choose a time-step size, let's say $\Delta t =$ 1 second. Since we have the initial values at $t = 0$, we can find the values at $t = 1$ by multiplying $\dot{\vector{y}}$ with $\Delta t$ and adding them to the initial values. We can repeat that process until we reach a desired end time.

However, it would be inefficient to do this by hand, and there are more accurate methods available. These are described in Chapter 1.8 of your textbook. I don't see a reason to re-implement standard functions, so we are going to use the functions built-in to SciPy or Matlab, depending on which software you're using.

In SciPy, the function is called [`solve_ivp`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.solve_ivp.html#scipy.integrate.solve_ivp). In Matlab, the function is called [`ode45`](https://www.mathworks.com/help/matlab/ref/ode45.html). In the next page, we'll demonstrate the example from the book using SciPy and plot the results.

In this Notebook, we will solve the two-body problem and produce several plots of the results.

```{code-cell} python
from scipy.integrate import solve_ivp
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
```

First, we set the initial values and the constants. The initial position is with $m_1$ at the origin and $m_2$ 3000 km to the right of the origin.

In the function we will write, the state vector will be called $y$, so its initial value is $y_0$. Remember that the state vector includes 12 components, 6 positions and 6 velocities. These all need to be stored in one array.

```{code-cell} ipython3
G = 6.67430E-11  # m**3/(kg * s**2)
m_1 = m_2 = 1.0E26  # kg

R1_0 = np.array((0, 0, 0))*1000  # m
R2_0 = np.array((3000, 0, 0))*1000  # m
V1_0 = np.array((10, 20, 30))*1000  # m/s
V2_0 = np.array((0, 40, 0))*1000  # m/s

y_0 = np.hstack((R1_0, R2_0, V1_0, V2_0))
print(y_0)
```

Then, we need to define the function that describes the motion of our system. This function needs to compute the left hand side of the equation above ($\dot{\vector{y}}$) and return it to the solver, so that the solver can calculate the value of the state vector at time $t + \Delta t$.

The function takes the time $t$ and current value of the state vector $y$ as inputs. Because of the way that we constructed the initial values, the first 3 values of the state vector are the coordinates of $m_1$, the next 3 values are the coordinates of $m_2$, the next 3 values are the velocity components of $m_1$, and the last three values are the velocity components of $m_2$. However, if you construct your initial state vector in a different order, make sure you match that order in your function. It doesn't matter what order you choose, as long as you're consistent.

Inside the function, we use the values in the state vector to fill the `ydot` vector. Then, we return `ydot` back to the solver.

```{code-cell} ipython3
def absolute_motion(t, y):
    """Calculate the motion of a two-body system in an inertial reference frame.
    
    The state vector ``y`` should be in the order:
    
    1. Coordinates of $m_1$
    2. Coordinates of $m_2$
    3. Velocity components of $m_1$
    4. Velocity components of $m_2$
    """
    
    # Get the six coordinates for m_1 and m_2 from the state vector
    X_1, Y_1, Z_1 = y[:3]
    X_2, Y_2, Z_2 = y[3:6]
    
    # Fill the derivative vector with zeros
    ydot = np.zeros(len(y))
    
    # Set the first 6 elements of the derivative equal to the last
    # 6 elements of the state vector, which are the velocities
    ydot[:6] = y[6:]
    
    # Calculate the acceleration terms and fill them in to the rest
    # of the derivative array
    r = np.sqrt((X_2 - X_1)**2 + (Y_2 - Y_1)**2 + (Z_2 - Z_1)**2)
    Xddot = G * (X_2 - X_1) / r**3
    Yddot = G * (Y_2 - Y_1) / r**3
    Zddot = G * (Z_2 - Z_1) / r**3
    ydot[6] = Xddot * m_2
    ydot[7] = Yddot * m_2
    ydot[8] = Zddot * m_2
    ydot[9] = -Xddot * m_1
    ydot[10] = -Yddot * m_1
    ydot[11] = -Zddot * m_1
    return ydot
```

With the function defined, we can call `solve_ivp()`. We need to tell it the function it should solve, the beginning and end times, the initial state vector, and then some information to help control the output.

Once the solver finishes, the solution is stored in `sol.y`. Each column of `sol.y` corresponds to a single timestep and each row corresponds to one of the state variables. It is more convenient to work with the transpose of this array, so we do that and define `y`. Then we extract the position and velocity of each mass as a function of time, and compute the barycenter (the center of gravity of the system).

```{code-cell} ipython3
t_0 = 0  # seconds
t_f = 480  # seconds
t_points = np.linspace(t_0, t_f, 1000)

sol = solve_ivp(absolute_motion, [t_0, t_f], y_0, t_eval=t_points)
# MATLAB: ode45(absolute_motion, [t_0, t_f], y_0)

y = sol.y.T
R_1 = y[:, :3] / 1000  # km
R_2 = y[:, 3:6] / 1000  # km
V_1 = y[:, 6:9] / 1000  # km/s
V_2 = y[:, 9:] / 1000  # km/s
barycenter = (m_1 * R_1 + m_2 * R_2) / (m_1 + m_2)  # km
```

Finally, we construct some plots of the situation. In this first plot, we are plotting the absolute motion of each of the two masses as well as the barycenter. Notice that the barycenter moves in a straight line. This is a key feature of the solution of this problem, as we discussed above.

The two masses spiral around the barycenter. One way to imagine this system (to a first approximation) is as the Earth and the Moon viewed as though you were sitting on the Sun (but not rotating with the Sun). The Earth and Moon would move through space, and they would appear to be orbiting around each other.

```{code-cell} ipython3
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
ax.plot(R_1[:, 0], R_1[:, 1], R_1[:, 2], label="m_1")
ax.plot(R_2[:, 0], R_2[:, 1], R_2[:, 2], label="m_2")
ax.plot(barycenter[:, 0], barycenter[:, 1], barycenter[:, 2], label="CG")
ax.legend();
```

Another way to view this plot is by setting the barycenter to be the origin of the coordinate system, rather than an external inertial frame. Remember that since the barycenter is moving with constant velocity, it is allowed to be used as an inertial reference frame. This is kind of like sitting above the barycenter of the Earth-Moon system. You would see them orbit around the barycenter, and the orbits would be ellipses.

```{code-cell} ipython3
fig = plt.figure()
ax = fig.add_subplot(111, projection="3d")
R1_rel_G = R_1 - barycenter
R2_rel_G = R_2 - barycenter
ax.plot(R1_rel_G[:, 0], R1_rel_G[:, 1], R1_rel_G[:, 2], label="m_1")
ax.plot(R2_rel_G[:, 0], R2_rel_G[:, 1], R2_rel_G[:, 2], label="m_2")
ax.plot(0, 0, 0, 'ro', label="CG")
ax.legend();
```

The final plot here fixes the coordinate system on the first mass and plots the motion of the barycenter and the second mass relative to the position of the first mass. This is kind of like sitting on the Earth and watching the Moon go around. Notice that the barycenter of the system also orbits around the first mass (relatively speaking).

```{code-cell} ipython3
fig = plt.figure()
ax = fig.add_subplot(111, projection="3d")
R2_rel_R1 = R_2 - R_1
G_rel_R1 = barycenter - R_1
ax.plot(R2_rel_R1[:, 0], R2_rel_R1[:, 1], R2_rel_R1[:, 2], label="m_2")
ax.plot(G_rel_R1[:, 0], G_rel_R1[:, 1], G_rel_R1[:, 2], label="CG")
ax.plot(0, 0, 0, "ro", label="m_1")
ax.legend();
```
