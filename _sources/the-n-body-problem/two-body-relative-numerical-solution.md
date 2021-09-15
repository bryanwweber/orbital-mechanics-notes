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

Recall the equations of motion for the two-body problem in a reference frame attached to $m_1$, Eq. {eq}`eq:two-body-relative-motion-components`, repeated here for reference:

:::{math}
\begin{aligned}
  \ddot{x} &= -\mu \frac{x}{r^3} \\
  \ddot{y} &= -\mu \frac{y}{r^3} \\
  \ddot{z} &= -\mu \frac{z}{r^3}
\end{aligned}
:::

In this example, we will solve the two-body problem in relative coordinates. Although the problem is in relative coordinates, the solution procedure is the same as [](./two-body-inertial-numerical-solution.md). In Python, the first thing is to import the required libraries. This step is not necessary in Matlab.

::::{tab} Python
:::{literalinclude} scripts/two-body-relative-numerical-solution.py
:start-after: "[section-1]"
:end-before: "[section-2]"
:::
::::

A 1000 kg satellite is in orbit around Earth. The initial position and velocity of the satellite are:

:::{math}
\begin{aligned}
  \vector{r}_0 &= \left(8000 \uvec{\imath} + 6000 \uvec{k}\right)\ \mathrm{km} \\
  \dot{\vector{r}}_0 &= 7.0 \uvec{\jmath}\ \mathrm{km/s}
\end{aligned}
:::

We want to determine the minimum and maximum altitude, and the satellite's speed at those two locations. The altitude of the satellite is its height above the earth's surface. The radius of the earth is 6378.12 km.

To avoid confusion with the $y$ coordinate, we will use capital $Y$ for the state vector. Remember that the state vector includes 6 components, 3 positions and 3 velocities. These all need to be stored in one array.

::::{tab} Python
:::{literalinclude} scripts/two-body-relative-numerical-solution.py
:start-after: "[section-2]"
:end-before: "[section-3]"
:::
::::

::::{tab} Matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: "[section-2]"
:end-before: "[section-3]"
:::
::::

Then, we need to define the function that describes the motion of our system. This function needs to compute the derivative of the state vector and return it to the solver.

Inside the function, we use the values in the state vector to fill the `Ydot` vector. Then, we return `Ydot` back to the solver.

::::{tab} Python
:::{literalinclude} scripts/two-body-relative-numerical-solution.py
:start-after: "[section-3]"
:end-before: "[section-4]"
:::
::::

::::{tab} Matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: "[section-3]"
:end-before: "[section-4]"
:::
::::

With the function defined, we can call the solver function. We need to tell it the function it should solve, the beginning and end times, the initial state vector, and then some information to help control the output.

We will guess the final time and check that increasing it does not change the answers for minimum and maximum altitude.

In Python, once the solver finishes, the solution is stored in `sol.y`. Each column of `sol.y` corresponds to a single timestep and each row corresponds to one of the state variables. It is more convenient to work with the transpose of this array, so we do that and define `Y`.

::::{tab} Python
:::{literalinclude} scripts/two-body-relative-numerical-solution.py
:start-after: "[section-4]"
:end-before: "[section-5]"
:::
::::

::::{tab} Matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: "[section-4]"
:end-before: "[section-5]"
:::
::::

Since we are looking for the minimum and maximum _altitude_, we need to calculate the distance of the satellite from the center of the earth and then subtract the radius of the earth. This will give the altitude above the surface:

:::{math}
:label: eq:earth-altitude-definition
h = \mag{\vector{r}} - R_E
:::

where $h$ is the altitude and $R_E$ is the radius of the earth. Similarly, the speed is the magnitude of the velocity.

::::{tab} Python
:::{literalinclude} scripts/two-body-relative-numerical-solution.py
:start-after: "[section-5]"
:end-before: "[section-6]"
:::
::::

::::{tab} Matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: "[section-5]"
:end-before: "[section-6]"
:::
::::

Now we can process the arrays to find the minimum and maximum altitude, and the speed at those locations. In Python, there are separate functions to find the minimum/maximum and its index; in Matlab, there is a single function to do both.

::::{tab} Python
:::{literalinclude} scripts/two-body-relative-numerical-solution.py
:start-after: "[section-6]"
:end-before: "[section-7]"
:::
::::

::::{tab} Matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: "[section-6]"
:end-before: "[section-7]"
:::
::::

Finally, we can print the results to the screen.

::::{tab} Python
:::{literalinclude} scripts/two-body-relative-numerical-solution.py
:start-after: "[section-7]"
:end-before: "[section-8]"
:::
::::

::::{tab} Matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: "[section-7]"
:end-before: "[section-8]"
:::
::::

```text
The minimum altitude during the orbit is: 3621.88 km
The speed at the minimum altitude is: 7.00 km/s
The time at minimum altitude is: 0.00 s
The maximum altitude during the orbit is: 9431.85 km
The velocity at the maximum altitude is: 4.4353 km/s
The time at minimum altitude is: 7288.57 s
```

Interestingly, the results from Python and Matlab are slightly different. This is most likely because of different time resolution from the solvers. Now let's plot the orbit. The central sphere is representative of the earth.

::::{tab} Python
:::{literalinclude} scripts/two-body-relative-numerical-solution.py
:start-after: "[section-8]"
:end-before: "[section-9]"
:::
::::

::::{tab} Matlab
:::{literalinclude} scripts/two_body_relative_numerical_solution.m
:start-after: "[section-8]"
:end-before: "[section-9]"
:::
::::

```{code-cell} python
:tags: ["remove-input"]
from IPython.display import display, HTML
from myst_nb import glue

js = HTML(filename="scripts/two-body-relative.html")
glue("two_body_relative_figure", js, display=False)
```

:::{glue:figure} two_body_relative_figure
:name: fig:two-body-relative

The motion of a satellite in orbit around the earth.
:::
