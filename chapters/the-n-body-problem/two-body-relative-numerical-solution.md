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

# Two-Body Problem in the Co-Moving Frame

Recall the equations of motion for the two-body problem in a reference frame attached to $m_1$, @eq:two-body-relative-motion-components, repeated here for reference:

:::{math}
:enumerated: false

\begin{aligned}
  \ddot{x} &= -\mu \frac{x}{r^3} \\
  \ddot{y} &= -\mu \frac{y}{r^3} \\
  \ddot{z} &= -\mu \frac{z}{r^3}
\end{aligned}
:::

In this example, we will solve the two-body problem in relative coordinates. Although the problem is in relative coordinates, the solution procedure is the same as [](./two-body-inertial-numerical-solution.md). In Python, the first thing is to import the required libraries. This step is not necessary in Matlab.

::::{tab-set}
:::{tab-item} Python
:sync: python
```{code-cell} python
import matplotlib.pyplot as plt
import numpy as np
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401, needed for 3d plots
from scipy.integrate import solve_ivp
```
:::
::::

A 1000 kg satellite is in orbit around Earth. The initial position and velocity of the satellite are:

:::{math}
:enumerated: false

\begin{aligned}
  \vector{r}_0 &= \left(8000 \uvec{\imath} + 6000 \uvec{k}\right)\ \mathrm{km} \\
  \dot{\vector{r}}_0 &= 7.0 \uvec{\jmath}\ \mathrm{km/s}
\end{aligned}
:::

We want to determine the minimum and maximum altitude, and the satellite's speed at those two locations. The altitude of the satellite is its height above the Earth's surface. The radius of the Earth is 6378.12 km.

To avoid confusion with the $y$ coordinate, we will use capital `Y` for the state vector. Remember that the state vector includes 6 components, 3 positions and 3 velocities. These all need to be stored in one array.

:::::{tab-set}
::::{tab-item} Python
:sync: python
```{code-cell} python
G = 6.67430e-20  # km**3/(kg * s**2)
m_1 = 5.97219e24  # kg
m_2 = 1000  # kg
mu = G * m_1
R_E = 6378.12  # km

r_0 = np.array((8000, 0, 6000))  # km
v_0 = np.array((0, 7, 0))  # km/s
Y_0 = np.hstack((r_0, v_0))
```
::::
:::: {tab-item} Matlab
:sync: matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: [section-2]
:end-before: [section-3]
:language: matlab
:::
::::
:::::

Then, we need to define the function that describes the motion of our system. This function needs to compute the derivative of the state vector and return it to the solver.

Inside the function, we use the values in the state vector to fill the `Ydot` vector. Then, we return `Ydot` back to the solver.

:::::{tab-set}
:::{tab-item} Python
:sync: python
```{code-cell} python
def relative_motion(t, Y):
    """Calculate the motion of a two-body system relative to $m_1$.

    The state vector ``Y`` should be in the order:

    1. Coordinates of $m_2$ relative to $m_1$
    2. Velocity components of $m_2$ relative to $m_1$
    """
    # Get the three position components
    r_vec = Y[:3]

    # Create the derivative vector and copy the velocities into it
    Ydot = np.zeros_like(Y)
    Ydot[:3] = Y[3:]

    # Calculate the accelerations
    r = np.sqrt(np.sum(np.square(r_vec)))
    a_vec = -mu * r_vec / r**3
    Ydot[3:] = a_vec

    return Ydot
```
::::
::::{tab-item} Matlab
:sync: matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: [section-3]
:end-before: [section-4]
:language: matlab
:::
::::
:::::

With the function defined, we can call the solver function. We need to tell it the function it should solve, the beginning and end times, the initial state vector, and then some information to help control the output.

We will guess the final time and check that increasing it does not change the answers for minimum and maximum altitude.

In Python, once the solver finishes, the solution is stored in `sol.y`. Each column of `sol.y` corresponds to a single time step and each row corresponds to one of the state variables. It is more convenient to work with the transpose of this array, so we do that and define `Y`.

:::::{tab-set}
::::{tab-item} Python
:sync: python
```{code-cell} python
t_0 = 0  # seconds
t_f = 14_709  # seconds, period of one orbit
t_points = np.linspace(t_0, t_f, 1000)
sol = solve_ivp(relative_motion, [t_0, t_f], Y_0, t_eval=t_points)

Y = sol.y.T
r = Y[:, :3]  # km
v = Y[:, 3:]  # km/s
```
::::
::::{tab-item} Matlab
:sync: matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: [section-4]
:end-before: [section-5]
:language: matlab
:::
::::
:::::

Since we are looking for the minimum and maximum _altitude_, we need to calculate the distance of the satellite from the center of the Earth and then subtract the radius of the Earth. This will give the altitude above the surface:

:::{math}
:label: eq:earth-altitude-definition
h = \mag{\vector{r}} - R_E
:::

where $h$ is the altitude and $R_E$ is the radius of the Earth. Similarly, the speed is the magnitude of the velocity.

:::::{tab-set}
::::{tab-item} Python
:sync: python
```{code-cell} python
r_mag = np.sqrt(np.sum(np.square(r), axis=1))
# altitude is the distance above the surface of the Earth
altitude = r_mag - R_E

speed = np.sqrt(np.sum(np.square(v), axis=1))
```
::::
::::{tab-item} Matlab
:sync: matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: [section-5]
:end-before: [section-6]
:language: matlab
:::
::::
:::::

Now we can process the arrays to find the minimum and maximum altitude, and the speed at those locations. In Python, there are separate functions to find the minimum/maximum and its index; in Matlab, there is a single function to do both.

:::::{tab-set}
::::{tab-item} Python
:sync: python
```{code-cell} python
min_altitude = np.min(altitude)
i_min = np.argmin(altitude)

max_altitude = np.max(altitude)
i_max = np.argmax(altitude)

speed_at_min_alt = speed[i_min]
speed_at_max_alt = speed[i_max]
time_at_min_alt = sol.t[i_min]
time_at_max_alt = sol.t[i_max]
```
::::
::::{tab-item} Matlab
:sync: matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: [section-6]
:end-before: [section-7]
:language: matlab
:::
::::
:::::

Finally, we can print the results to the screen.

:::::{tab-set}
::::{tab-item} Python
:sync: python
```{code-cell} python
print(
    f"""\
The minimum altitude during the orbit is: {min_altitude:.2F} km
The speed at the minimum altitude is: {speed_at_min_alt:.2F} km/s
The time at minimum altitude is: {time_at_min_alt:.2F} s
The maximum altitude during the orbit is: {max_altitude:.2F} km
The velocity at the maximum altitude is: {speed_at_max_alt:.4F} km/s
The time at maximum altitude is: {time_at_max_alt:.2F} s
"""
)
```
::::
::::{tab-item} Matlab
:sync: matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: [section-7]
:end-before: [section-8]
:language: matlab
:::
::::
:::::

Interestingly, the results from Python and Matlab are slightly different. This is most likely because of different time resolution from the solvers. Now let's plot the orbit. The central sphere is representative of the Earth.

:::::{tab-set}
::::{tab-item} Python
:sync: python
```python
fig = plt.figure()
ax = fig.add_subplot(111, projection="3d")
ax.plot(r[:, 0], r[:, 1], r[:, 2], label="Orbit")
ax.set_xlabel("km")
ax.set_ylabel("km")
ax.set_zlabel("km")

# This adds a sphere to the plot of the radius of the Earth
p = np.linspace(0, np.pi, 200)
t = np.linspace(0, 2 * np.pi, 200)
P, T = np.meshgrid(p, t)

X = R_E * np.cos(T) * np.sin(P)
Y = R_E * np.sin(T) * np.sin(P)
Z = R_E * np.cos(P)

ax.plot_surface(X, Y, Z)
ax.plot(r[i_min, 0], r[i_min, 1], r[i_min, 2], "ro", label="Min. Altitude")
ax.plot(r[i_max, 0], r[i_max, 1], r[i_max, 2], "go", label="Max. Altitude")
ax.legend();
```
::::
::::{tab-item} Matlab
:sync: matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: [section-8]
:end-before: [section-9]
:language: matlab
:::
::::
:::::

<!-- The code is duplicated here from the tab item above so that we can remove the cell after it runs so we don't end up with duplicate figure output -->
```{code-cell} python
:label: code:two-body-relative
:tags: ["remove-cell"]
fig = plt.figure()
ax = fig.add_subplot(111, projection="3d")
ax.plot(r[:, 0], r[:, 1], r[:, 2], label="Orbit")
ax.set_xlabel("km")
ax.set_ylabel("km")
ax.set_zlabel("km")

# This adds a sphere to the plot of the radius of the Earth
p = np.linspace(0, np.pi, 200)
t = np.linspace(0, 2 * np.pi, 200)
P, T = np.meshgrid(p, t)

X = R_E * np.cos(T) * np.sin(P)
Y = R_E * np.sin(T) * np.sin(P)
Z = R_E * np.cos(P)

ax.plot_surface(X, Y, Z)
ax.plot(r[i_min, 0], r[i_min, 1], r[i_min, 2], "ro", label="Min. Altitude")
ax.plot(r[i_max, 0], r[i_max, 1], r[i_max, 2], "go", label="Max. Altitude")
ax.legend();
```

:::{figure} #code:two-body-relative
:name: fig:two-body-relative

The motion of a satellite in orbit around the Earth.
:::
