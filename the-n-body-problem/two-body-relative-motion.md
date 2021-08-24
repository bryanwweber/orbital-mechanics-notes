# Relative Motion in the Two-Body Problem

In this section, we will solve the two-body problem in _relative coordinates_, rather than absolute or inertial coordinates. There are several advantages to this approach:

1. The state vector only has 6 elements instead of 12
2. We remove the problem of finding an inertial reference frame
3. We can convert the vector equation for relative motion to a scalar equation which is easier to work with

According to Prussing and Conway {cite}`Prussing2013`:

> The solution for the allowed relative motion [in the two-body problem] was first obtained by Isaac Newton in 1683. Newton was arguably the first person capable of obtaining it since the solution requires a law of gravitation, a law of motion, and differential calculus, all of which he invented. **pp. 11**

## Equation of Relative Motion

Recall the equation for the position of $m_2$ relative to $m_1$, Eq. {eq}`eq:relative-position-vector`, and repeated here:

:::{math}
\begin{aligned}
  \vector{r} &= \vector{R}_2 - \vector{R}_1
\end{aligned}
:::

where lowercase $\vector{r}$ indicates that the vector is relative and uppercase $\vector{R}$ indicates that the vector is absolute.

The equation of motion is derived from {eq}`eq:relative-position-vector` by differentiating twice:

:::{math}
:label: eq:relative-acceleration-vector
\ddot{\vector{r}} = \ddot{\vector{R}}_2 - \ddot{\vector{R}}_1
:::

The absolute acceleration is found from Eq. {eq}`eq:two-body-inertial-equation-of-motion`. Plugging in the results for the two absolute acceleration vectors:

:::{math}
\ddot{\vector{r}} = -G m_1 \frac{\vector{r}}{r^3} - G m_2 \frac{\vector{r}}{r^3}
:::

This simplifies to:

:::{math}
:label: eq:two-body-relative-motion-literal
\ddot{\vector{r}} = -G\left(m_1 + m_2\right)\frac{\vector{r}}{r^3}
:::

We now define a parameter, $\mu$, called the [**standard gravitational parameter**](https://en.wikipedia.org/wiki/Standard_gravitational_parameter):

:::{math}
:label: eq:literal-definition-of-mu
\mu = G\left(m_1 + m_2\right)
:::

The utility of this parameter is mostly for the case where $m_1 \gg m_2$. Fortunately, this is the case for many practical problems. For instance, human-built devices orbiting around a planet have a much smaller mass than the planet. Thus, if $m_2$ is the mass of the device and $m_1$ is the mass of the planet, then $m_1 + m_2 \approx m_1$ and we can set:

:::{math}
:label: eq:definition-of-mu
\mu \approx G m_1
:::

Therefore, we can tabulate values of $\mu$ for various celestial bodies, as shown in {numref}`tab:standard-gravitational-parameter`. To use any of the values here in your code, replace the `× 10^{<number>}` with `E<number>`, so `1.32712 × 10^{11}` becomes `1.32712E11`.

Notice that the smallest object in {numref}`tab:standard-gravitational-parameter` is Pluto, whose mass is on the order of 10<sup>22</sup> kg. Any human-made object is currently no more than 10<sup>6</sup> kg (1,000,000 kg), so there are at least 16 orders of magnitude difference in masses. This justifies the assumptions in Eq. {eq}`eq:definition-of-mu`.

:::{list-table} The standard gravitational parameter ($\mu$) and the mass for major celestial objects in the Solar System. See also: {ref}`sec:planetary-parameters` and {cite}`Park2021`
:name: tab:standard-gravitational-parameter
:header-rows: 1

-
  - Celestial Body
  - Mass [kg]
  - $\mu$ [km<sup>3</sup>/s<sup>2</sup>]
-
  - Sun
  - {glue:}`Sun_mass`
  - {glue:}`Sun_GM_in_km`
-
  - Mercury
  - {glue:}`Mercury_mass`
  - {glue:}`Mercury_GM_in_km`
-
  - Venus
  - {glue:}`Venus_mass`
  - {glue:}`Venus_GM_in_km`
-
  - Earth
  - {glue:}`Earth_mass`
  - {glue:}`Earth_GM_in_km`
-
  - Moon
  - {glue:}`Moon_mass`
  - {glue:}`Moon_GM_in_km`
-
  - Mars
  - {glue:}`Mars_mass`
  - {glue:}`Mars_GM_in_km`
-
  - Jupiter
  - {glue:}`Jupiter_mass`
  - {glue:}`Jupiter_GM_in_km`
-
  - Saturn
  - {glue:}`Saturn_mass`
  - {glue:}`Saturn_GM_in_km`
-
  - Uranus
  - {glue:}`Uranus_mass`
  - {glue:}`Uranus_GM_in_km`
-
  - Neptune
  - {glue:}`Neptune_mass`
  - {glue:}`Neptune_GM_in_km`
-
  - Pluto
  - {glue:}`Pluto_mass`
  - {glue:}`Pluto_GM_in_km`
:::

Returning to Eq. {eq}`eq:two-body-relative-motion-literal` and substituting $\mu$, we find:

:::{math}
:label: eq:two-body-relative-motion
\ddot{\vector{r}} = -\frac{\mu}{r^3}\vector{r}
:::

This is a nonlinear, second-order ordinary differential equation. It can be solved analytically, if we can find the constants of integration. There are two vector constants of integration, each of which have three scalar components. Thus, there are six constants of integration that must be determined from the initial conditions.

```{note}
Interestingly, the roles of $m_1$ and $m_2$ can be interchanged by multiplying Eq. {eq}`eq:two-body-relative-motion` by -1. Thus, the motion of $m_1$ relative to $m_2$ has the same shape as the reverse. In other words, if you were standing on the Moon, the Earth would appear to be orbiting you!
```

## Motion Relative to the Center of Mass

Now, referring to the [](./motion-of-the-barycenter.md), we will find the motion of the masses relative to the center of mass, $\COG$, of the system. Let $\vector{r}_1$ and $\vector{r}_2$ be the position vectors of $m_1$ and $m_2$ relative to the center of mass, respectively. We also note that, in this definition, $\uvec{u}_r$ points in the same direction as $\vector{r}_2$.

Skipping all the algebra, it turns out that the equation of motion for $m_2$ relative to $G$ is:

:::{math}
:label: eq:motion-of-m_2-relative-to-COG
\ddot{\vector{r}}_2 = - \frac{\mu'}{r_2^3}\vector{r}_2
:::

where

:::{math}
:label: eq:definition-of-mu-prime
\mu' = \left(\frac{m_1}{m_1 + m_2}\right)^3\mu
:::

and $\mu$ is as given previously. Similarly, the equation of motion for $m_1$ relative to $\COG$ is:

:::{math}
:label: eq:motion-of-m_1-relative-to-COG
\ddot{\vector{r}}_1 = - \frac{\mu''}{r_1^3}\vector{r}_1
:::

where

:::{math}
:label: eq:definition-of-mu-double-prime
\mu'' = \left(\frac{m_2}{m_1 + m_2}\right)^3\mu
:::

Thus, we can see that all three equations of relative motion:

1. $m_2$ relative to $m_1$, Eq. {eq}`eq:two-body-relative-motion`
2. $m_2$ relative to $\COG$, Eq. {eq}`eq:motion-of-m_2-relative-to-COG`
3. $m_1$ relative to $\COG$, Eq. {eq}`eq:motion-of-m_1-relative-to-COG`

have the same form, differing only in the constants. The solutions to these equations will all have the same shape! This means that if we find the solution in one reference frame, the solution will be the same shape in any other reference frame.

## Equation of Motion in a Co-moving Frame

Now we are going to transform Eq. {eq}`eq:relative-position-vector` into a more convenient form. Since it is hard to define an inertial reference frame, the vectors $\vector{R}_1$ and $\vector{R}_2$ are unknown in general.

In most of the problems that we work with, it is convenient to treat $m_1$ as the origin of the coordinate system. For example, in solving the motion of a satellite around Earth, we are most interested in where the satellite is relative to Earth. So a reference frame attached to the center of the Earth and moving with the Earth is quite convenient.

A reference frame attached to, and moving with, $m_1$ is shown in {numref}`fig:coordinate-relative-to-m1`. In this reference frame, the components of $\vector{r}$ are:

:::{math}
:label: eq:position-vector-in-comoving-frame
\vector{r} = x\uvec{\imath} + y\uvec{\jmath} + z\uvec{k}
:::

```{margin}
_relative_ here means relative to the moving reference frame attached to $m_1$
```

Note that the position here uses lowercase $x$, $y$, and $z$ and does not involve the difference between two absolute coordinates.

:::{figure} ../images/coordinate-relative-to-m1.svg
:name: fig:coordinate-relative-to-m1

The co-moving coordinate system attached to $m_1$.
:::

We can find the relative velocity and acceleration:

:::{math}
:label: eq:relative-velocity-and-acceleration
\begin{aligned}
  \dot{\vector{r}}_{\text{rel}} &= \dot{x}\uvec{\imath} + \dot{y}\uvec{\jmath} + \dot{z}\uvec{k} & \ddot{\vector{r}}_{\text{rel}} &= \ddot{x}\uvec{\imath} + \ddot{y}\uvec{\jmath} + \ddot{z}\uvec{k}
\end{aligned}
:::

The absolute acceleration is equal to the relative acceleration only in the case where $\vector{\Omega}$ and $\dot{\vector{\Omega}}$, the angular velocity and angular acceleration respectively, of the moving reference frame, are zero. Therefore, this reference frame attached to $m_1$ cannot be rotating.

Using the definition of $\vector{r}$ from Eq. {eq}`eq:position-vector-in-comoving-frame` and $\ddot{\vector{r}}$ from Eq. {eq}`eq:relative-velocity-and-acceleration`, we can rewrite the equation of relative motion, Eq. {eq}`eq:two-body-relative-motion`:

:::{math}
:label: eq:two-body-relative-motion-components
\begin{aligned}
  \ddot{x} &= -\mu \frac{x}{r^3} \\
  \ddot{y} &= -\mu \frac{y}{r^3} \\
  \ddot{z} &= -\mu \frac{z}{r^3}
\end{aligned}
:::

In the reference frame attached to $m_1$, Eq. {eq}`eq:two-body-relative-motion` can be solved numerically in exactly the same way as Eq. {eq}`eq:two-body-inertial-equation-of-motion` from [](./two-body-inertial-motion.md). Since the relative position, velocity, and acceleration vectors only have three components ($x$, $y$, $z$, etc.) the state vector will have 6 components instead of 12.
