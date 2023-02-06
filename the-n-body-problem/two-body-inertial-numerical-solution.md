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

The two masses are equal, $m_1 = m_2 = 1.0\times 10^{26} \text{ kg}$ and Newton's gravitational constant is $G = 6.67430\times 10^{-2} \text{ km}^3 \text{ kg}^{-1} \text{ s}^{-2}$.

## The State Vector

In the numerical solution, the state vector is stored in an **array**. Arrays in programming are data structures that are optimized to store numbers. The order that the components appear in the state vector isn't important, only that we keep track of the order and don't forget it. For the sake of choosing something, we will set the positions followed by the velocities:

:::{math}
:label: eq:state-vector-array
y = \left[X_1\ Y_1\ Z_1\ X_2\ Y_2\ Z_2\ \dot{X}_1\ \dot{Y}_1\ \dot{Z_1}\ \dot{X}_2\ \dot{Y}_2\ \dot{Z}_2\right]
:::

The array is indicated by using square brackets, $[\dots]$, and lists all the components of the array inside the brackets. Depending on the programming language you're using, there are different ways to create arrays.

In the following code samples we use arrays to store the initial positions and velocities of both masses and then construct the state vector.

::::{tab} Python
:::{literalinclude} scripts/two-body-inertial-numerical-solution.py
:start-after: "[section-1]"
:end-before: "[section-2]"
:::
::::

::::{tab} MATLAB
:::{literalinclude} scripts/two_body_inertial_numerical_solution.m
:start-after: "[section-1]"
:end-before: "[section-2]"
:language: matlab
:dedent: 4
:::
::::

These code samples first set the constants in the problem, $G$ and $m_1 = m_2$. Then, they create the initial position and velocity arrays. Finally, the arrays are stuck together into the initial state vector, `y_0`.

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

::::{tab} Python
:::{literalinclude} scripts/two-body-inertial-numerical-solution.py
:start-after: "[section-2]"
:end-before: "[section-3]"
::::

::::{tab} Matlab
:::{literalinclude} scripts/two_body_inertial_numerical_solution.m
:start-after: "[section-2]"
:end-before: "[section-3]"
:language: matlab
:dedent: 4
::::

:::{margin}
We'll see in a little bit why we're using the state vector to get positions rather than the position vectors.
:::

This code first retrieves the position components from the state vector. Then it calculates each component of acceleration for the two masses.

This code is pretty long, and we've created a bunch of variables to keep track of. Fortunately, there are simpler ways to approach this calculation. The next code samples show how to take advantage of the nature of array computations:

::::{tab} Python
:::{literalinclude} scripts/two-body-inertial-numerical-solution.py
:start-after: "[section-3]"
:end-before: "[section-4]"
::::

:::{tab} Matlab
:::{literalinclude} scripts/two_body_inertial_numerical_solution.m
:start-after: "[section-3]"
:end-before: "[section-4]"
:language: matlab
:dedent: 4
::::

In this code, you retrieve the position of each mass as an array instead of into a single variable. Then, using array functions, you compute the distance and the accelerations.

Now that you've calculated the acceleration, the velocity and position at the next time can be found by integration:

:::{math}
:label: eq:kinematic-integration
\begin{aligned}
  \dot{R}_1 &= \int_0^t \ddot{R}_1 dt + \dot{R}_{1,0}\\
  \dot{R}_2 &= \int_0^t \ddot{R}_2 dt + \dot{R}_{2,0}\\
  R_1 &= \int_0^t \dot{R}_1 dt + R_{1,0}\\
  R_2 &= \int_0^t \dot{R}_2 dt + R_{2,0}\\
\end{aligned}
:::

Assuming that the acceleration and velocity are constant over some time interval $\Delta t$, the integrals simplify to the product of the term and $\Delta t$. The choice of $\Delta t$ is up to you. Smaller values of $\Delta t$ will be more accurate but take longer to compute.

Let's choose $\Delta t = 1\text{ s}$. Then, to compute the state vector at the next time step:

::::{tab} Python
:::{literalinclude} scripts/two-body-inertial-numerical-solution.py
:start-after: "[section-4]"
:end-before: "[section-5]"
::::

:::{tab} Matlab
:::{literalinclude} scripts/two_body_inertial_numerical_solution.m
:start-after: "[section-4]"
:end-before: "[section-5]"
:language: matlab
:dedent: 4
::::

However, it would be inefficient to do this by hand and there are more accurate methods available. I don't see a reason to re-implement standard functions, so we are going to use the functions built-in to SciPy or Matlab, depending on which software you're using.

## Numerical Solution Using Pre-Built Libraries

In SciPy, the function is called [`solve_ivp`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.solve_ivp.html#scipy.integrate.solve_ivp). In Matlab, the function is called [`ode45`](https://www.mathworks.com/help/matlab/ref/ode45.html).

First, you need to start by importing the appropriate Python libraries. In Matlab, all the functions you need are built-in.

::::{tab} Python
:::{literalinclude} scripts/two-body-inertial-numerical-solution.py
:start-after: "[section-5]"
:end-before: "[section-6]"
:::
::::

The two imports from `matplotlib` will plot the solution of the problem.

Then, we need to define the function that describes the motion of our system. This function needs to compute the left hand side of the equation above ($\dot{\vector{y}}$) and return it to the solver, so that the solver can calculate the value of the state vector at time $t + \Delta t$.

The function takes the time $t$ and current value of the state vector $y$ as inputs. In this way, we can use the current state vector to compute the current acceleration.

Inside the function, we use the values in the state vector to fill the `ydot` vector. Then, we return `ydot` back to the solver.

::::{tab} Python
:::{literalinclude} scripts/two-body-inertial-numerical-solution.py
:start-after: "[section-6]"
:end-before: "[section-7]"
:::
::::

::::{tab} Matlab
:::{literalinclude} scripts/two_body_inertial_numerical_solution.m
:start-after: "[section-6]"
:end-before: "[section-7]"
:::
::::

With the function defined, we can call `solve_ivp()` or `ode45()`. We need to tell it the function it should solve, the beginning and end times, the initial state vector, and then some information to help control the output.

Once the solver finishes, the solution is stored in `sol.y` in Python or just `y` in Matlab. Each column of `sol.y` corresponds to a single timestep and each row corresponds to one of the state variables. It is more convenient to work with the transpose of this array, so we do that and define `y`. In Matlab, the solution already has each timestep in a row.

Then we extract the position and velocity of each mass as a function of time, and compute the barycenter (the center of gravity of the system).

::::{tab} Python
:::{literalinclude} scripts/two-body-inertial-numerical-solution.py
:start-after: "[section-7]"
:end-before: "[section-8]"
:::
::::

::::{tab} Matlab
:::{literalinclude} scripts/two_body_inertial_numerical_solution.m
:start-after: "[section-7]"
:end-before: "[section-8]"
:language: matlab
:dedent: 4
:::
::::

Finally, we construct some plots of the situation. In {numref}`fig:two-body-inertial`, we are plotting the absolute motion of each of the two masses as well as the barycenter. Notice that the barycenter moves in a straight line. We will discuss this further in the [next section](./motion-of-the-barycenter.md).

The two masses spiral around the barycenter. One way to imagine this system is as the Earth and the Moon viewed as though you were sitting on the Sun. The Earth and Moon would move through space, and they would appear to be orbiting around each other. If you observed them for a short enough time, their motion would appear to be in a straight line.

```{code-cell} python
:tags: ["remove-input"]
from IPython.display import display, HTML
from myst_nb import glue

js = HTML(filename="scripts/two-body-inertial.html")
glue("two_body_inertial", js, display=False)
"change the code";
```

:::{glue:figure} two_body_inertial
:name: fig:two-body-inertial

The motion of two bodies subject to mutual gravitational attraction, viewed from an external inertial frame.
:::

Another way to view this system is by setting the barycenter to be the origin of the coordinate system, as shown in {numref}`fig:two-body-inertial-cg-relative`. Remember that since the barycenter is moving with constant velocity, it is allowed to be used as an inertial reference frame. This is kind of like sitting above the barycenter of the Earth-Moon system. You would see them orbit around the barycenter, and the orbits would be ellipses.

```{code-cell} python
:tags: ["remove-input"]
from IPython.display import display, HTML
from myst_nb import glue

js = HTML(filename="scripts/two-body-inertial-cg-relative.html")
glue("two_body_inertial_cg_relative", js, display=False)
```

:::{glue:figure} two_body_inertial_cg_relative
:name: fig:two-body-inertial-cg-relative

The motion of two bodies subject to mutual gravitational attraction, viewed from an inertial frame attached to the system barycenter. In this reference frame, the orbits of $m_1$ and $m_2$ appear to be ellipses with the barycenter at one of the foci.
:::

{numref}`fig:two-body-inertial-m1-relative` fixes the coordinate system on the first mass and plots the motion of the barycenter and the second mass relative to the position of the first mass. This is kind of like sitting on the Earth and watching the Moon go around. Notice that the barycenter of the system also orbits around the first mass in this reference frame.

```{code-cell} python
:tags: ["remove-input"]
from IPython.display import display, HTML
from myst_nb import glue

js = HTML(filename="scripts/two-body-inertial-m1-relative.html")
glue("two_body_inertial_m1_relative", js, display=False)
```

:::{glue:figure} two_body_inertial_m1_relative
:name: fig:two-body-inertial-m1-relative

The motion of two bodies subject to mutual gravitational attraction, viewed from a non-inertial frame attached to $m_1$. In this reference frame, the orbits of the barycenter and $m_2$ appear to be ellipses with $m_1$ at one of the foci.
:::

Interestingly, the equations for this solution are symmetric. We can reverse the roles of $m_1$ and $m_2$ and have exactly the same plot as {numref}`fig:two-body-inertial-m1-relative`. This means that sitting on the Moon watching the Earth orbit is the same as sitting on the Earth watching the Moon orbit. Just like the Moon has phases when viewed from Earth, the Earth has phases when viewed from the Moon!

The code to generate the plots is shown below.

::::{tab} Python
:::{literalinclude} scripts/two-body-inertial-numerical-solution.py
:start-after: "[section-8]"
:::
::::

::::{tab} Matlab
:::{literalinclude} scripts/two_body_inertial_numerical_solution.m
:start-after: "[section-8]"
:end-before: "[end-here]"
:language: matlab
:dedent: 4
:::
::::
