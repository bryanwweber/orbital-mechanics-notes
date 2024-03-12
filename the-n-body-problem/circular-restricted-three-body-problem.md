# Circular Restricted Three-Body Problem

In this section, we solve the three-body problem, subject to some restrictions. In particular:

1. There are two primary masses, and the mass of the tertiary object is extremely small in comparison to $m_1$ and $m_2$
2. The mass of $m_1$ is larger than $m_2$
3. The two primary objects orbit in a circle around their center of mass

Although these assumptions seem fairly restrictive, they actually represent several very important physical situations: the Earth-Moon system, as well as the orbits of many of the planets around the sun, with a man-made object as the third mass! This is called the _Circular Restricted Three-Body Problem_ (CRTBP or CR3BP), because the orbits are restricted to circles and the mass of the third body is restricted to be much smaller than the other two.

:::{margin}
We'll see in a later section that the eccentricity of an orbit determines how close to a circle the orbit is. An eccentricity of 0 gives the equation for a circle, while vales up to 1.0 are ellipses.
:::

The orbit of the moon around the earth is approximately circular, with a mean eccentricity of 0.054, and semi-major and semi-minor axes of 384,400 km and 383,800 km, respectively. The center of mass of the system occurs at a distance of 4,600 km from the Earth's center, about 72% of the radius of the Earth. This data comes from [Wikipedia](https://en.wikipedia.org/wiki/Orbit_of_the_Moon).

Similarly, the orbits of Venus, Earth, Jupiter, Saturn, Neptune, and Uranus around the sun all have eccentricities less than 0.06, according to the [NASA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/).

Unlike the two-body problem, there is no general closed-form solution to this problem. Closed-form means an analytical equation we can solve. But we can construct the equations of motion to find some interesting parameters of the orbits.

## Orbit of Primary Masses

We first attach a _non-inertial_ coordinate system to the barycenter of the system of $m_1$ and $m_2$, such that the $x$-axis of this coordinate system points towards $m_2$. The distance from $m_1$ to $m_2$ is $r_{12}$, which is also the radius of the circular orbit, as shown in {numref}`fig:circular-restricted-three-body-problem`.

:::{figure} ../images/circular-restricted-three-body-problem.svg
:name: fig:circular-restricted-three-body-problem
:width: 50%

The system of masses for the circular restricted three body problem.
:::

The $y$-axis of this coordinate system is in the orbital plane, and the $z$-axis is perpendicular to the orbital plane, in the same direction as the angular momentum vector. In the rotating reference frame, $m_1$ and $m_2$ appear to be stationary.

The inertial angular velocity of the reference frame is:

:::{math}
:label: eq:angular-velocity-cr3bp
\vector{\Omega} = \varOmega\uvec{k}
:::

where

:::{math}
:label: eq:angular-velocity-magnitude-cr3bp
\varOmega = \frac{2\pi}{T}
:::

$T$ is the period of the orbit, and the orbital period for a circular orbit is:

:::{math}
:label: eq:circular-orbit-period-cr3bp
T = \frac{2\pi}{\sqrt{\mu}}r_{12}^{3/2}
:::

Plugging this in for $\varOmega$, we find:

:::{math}
:label: eq:angular-velocity-period-cr3bp
\varOmega = \sqrt{\frac{\mu}{r_{12}^3}}
:::

where the gravitational parameter is given by:

:::{math}
:label: eq:gravitational-parameter-cr3bp
\mu = GM = G\left(m_1 + m_2\right)
:::

Next, we want to find the positions of the two masses relative to the barycenter. By definition, the two masses lie in the orbital plane, so their $z$-coordinate is going to be zero. Since the line that connects $m_1$ and $m_2$ goes through the barycenter, then their $y$-coordinates must be zero as well.

In that case, we only need to find the $x$-coordinates, which we can do from the equation for the center of mass:

:::{math}
:label: eq:center-of-mass-cr3bp
m_1 x_1 + m_2 x_2 = 0
:::

We need a second independent equation to solve for $x_1$ and $x_2$. Fortunately, we know the distance between the masses is $r_{12}$. Solving for $x_2$:

:::{math}
:label: eq:position-of-m2-cr3bp
x_2 = x_1 + r_{12}
:::

To solve this set of equations, it's convenient to define two dimensionless ratios:

:::{margin}
You might be able to remember these by noting that $\pi_1$ has $m_1$ in the numerator, and $\pi_2$ has $m_2$ in the numerator.
:::

:::{math}
:label: eq:non-dimensional-masses-cr3bp
\begin{aligned}
  \pi_1 &= \frac{m_1}{m_1 + m_2} & \pi_2 &= \frac{m_2}{m_1 + m_2}
\end{aligned}
:::

Note that $\pi_2 = 1 - \pi_1$. Now we can solve for $x_1$ and $x_2$ in terms of these:

:::{math}
:label: eq:positions-of-masses-cr3bp
\begin{aligned}
  x_1 &= -\pi_2 r_{12} & x_2 &= \pi_1 r_{12}
\end{aligned}
:::

## Orbit of the Tertiary Mass

Now let's add the much smaller, tertiary mass into the system. We'll use the symbol $m$ for this mass, without a subscript. We want the equation of motion, that is, Newton's second law. For that we need the acceleration, which we will derive from the position.

### Position, Velocity, and Acceleration

The position of the tertiary mass relative to the barycenter is:

:::{math}
:label: eq:position-tertiary-cog-cr3bp
\vector{r} = x\uvec{\imath} + y\uvec{\jmath} + z\uvec{k}
:::

The position of the tertiary mass relative to $m_1$ is:

:::{math}
:label: eq:position-tertiary-m1-cr3bp
\vector{r}_1 = \left(x - x_1\right)\uvec{\imath} + y\uvec{\jmath} + z\uvec{k} = \left(x + \pi_2 r_{12}\right)\uvec{\imath} + y\uvec{\jmath} + z\uvec{k}
:::

and finally, the position of $m$ relative to $m_2$ is:

:::{math}
:label: eq:position-tertiary-m2-cr3bp
\vector{r}_2 = \left(x - \pi_1 r_{12}\right)\uvec{\imath} + y\uvec{\jmath} + z\uvec{k}
:::

Newton's second law requires the _inertial_ acceleration. To find that, we first find the _inertial_ velocity of $m$. We need to account for the rotating frame of reference. This means that the velocity and acceleration need to include the rotation of the coordinate system:

:::{math}
:label: eq:inertial-velocity-cr3bp
\dot{\vector{r}} = \vector{v}_{\COG} + \vector{\Omega}\cross\vector{r} + \vector{v}_{\text{rel}}
:::

where $\vector{v}_{\COG}$ is the absolute velocity of the barycenter and $\vector{v}_{\text{rel}}$ is the velocity calculated in the moving coordinate system:

:::{math}
:label: eq:relative-velocity-cr3bp
\vector{v}_{\text{rel}} = \dot{x}\uvec{\imath} + \dot{y}\uvec{\jmath} + \dot{z}\uvec{k}
:::

Then we can find the absolute acceleration of $m$:

:::{math}
:label: eq:five-term-acceleration-cr3bp
\ddot{\vector{r}} = \vector{a}_{\COG} + \dot{\vector{\Omega}}\cross\vector{r} + \vector{\Omega}\cross\left(\vector{\Omega}\cross\vector{r}\right) + 2\vector{\Omega}\cross\vector{v}_{\text{rel}} + \vector{a}_{\text{rel}}
:::

This equation can be simplified because we showed that the acceleration of the barycenter is zero for the two-body problem, $\vector{a}_{\COG} = 0$. In addition, the angular velocity is constant since the orbit is circular, so $\dot{\vector{\Omega}} = 0$. Then, Eq. {eq}`eq:five-term-acceleration-cr3bp` can be simplified to:

:::{math}
:label: eq:three-term-acceleration-cr3bp
\ddot{\vector{r}} = \vector{\Omega}\cross\left(\vector{\Omega}\cross\vector{r}\right) + 2\vector{\Omega}\cross\vector{v}_{\text{rel}} + \vector{a}_{\text{rel}}
:::

where

:::{math}
:label: eq:relative-acceleration-cr3bp
\vector{a}_{\text{rel}} = \ddot{x}\uvec{\imath} + \ddot{y}\uvec{\jmath} + \ddot{z}\uvec{k}
:::

Plugging everything in and simplifying:

:::{math}
:label: eq:inertial-acceleration-cr3bp
\ddot{\vector{r}} = \left(\ddot{x} - 2\varOmega\dot{y} - \varOmega^2 x\right)\uvec{\imath} + \left(\ddot{y} + 2\varOmega\dot{x} - \varOmega^2 y\right)\uvec{\jmath} + \ddot{z}\uvec{k}
:::

### Newton's Second Law

For the tertiary body, the forces are due to both of the other masses:

:::{math}
:label: eq:net-force-cr3bp
m \ddot{\vector{r}} = \vector{F}_1 + \vector{F}_2
:::

where $\vector{F}_1$ is the force from $m_1$ on $m$ and $\vector{F}_2$ is the force from $m_2$ on $m$.

The two forces are found by Newton's law of gravitation:

:::{math}
:label: eq:nlog-cr3bp
\begin{aligned}
  \vector{F}_1 &= -G\frac{m_1 m}{r_1^2} \left.\uvec{u}_r\right)_1 = -\frac{\mu_1 m}{r_1^3}\vector{r}_1 \\
  \vector{F}_2 &= -G\frac{m_2 m}{r_2^2}\left.\uvec{u}_r\right)_2 = -\frac{\mu_2 m}{r_2^3}\vector{r}_2
\end{aligned}
:::

where

:::{math}
:label: eq:mu-definition-cr3bp
\begin{aligned}
  \mu_1 &= G m_1 & \mu_2 &= G m_2
\end{aligned}
:::

and

:::{math}
:label: eq:ur-vector-cr3bp
\begin{aligned}
  \left.\uvec{u}_r\right)_1 &= \frac{\vector{r}_1}{r_1} & \left.\uvec{u}_r\right)_2 &= \frac{\vector{r}_2}{r_2}
\end{aligned}
:::

Combining Eq. {eq}`eq:net-force-cr3bp` and Eq. {eq}`eq:nlog-cr3bp`, and dividing through by $m$, we find:

:::{math}
:label: eq:vector-eom-cr3bp
\ddot{\vector{r}} = -\frac{\mu_1}{r_1^3}\vector{r}_1 - \frac{\mu_2}{r_2^3}\vector{r}_2
:::

Now we substitute for $\ddot{\vector{r}}$ from Eq. {eq}`eq:inertial-acceleration-cr3bp` and split out by components to have three scalar equations of motion for the CR3BP:

:::{math}
:label: eq:components-eom-cr3bp
\begin{aligned}
  \ddot{x} - 2\varOmega\dot{y} - \varOmega^2 x &= -\frac{\mu_1}{r_1^3}\left(x + \pi_2 r_{12}\right) - \frac{\mu_2}{r_2^3}\left(x - \pi_1 r_{12}\right) \\
  \ddot{y} + 2\varOmega\dot{x} - \varOmega^2 y &= -\frac{\mu_1}{r_1^3}y - \frac{\mu_2}{r_2^3}y \\
  \ddot{z} &= -\frac{\mu_1}{r_1^3}z - \frac{\mu_2}{r_2^3}z
\end{aligned}
:::

There are a few things we can note from these equations. First, the $x$ and $y$ equations are coupled; the $x$ equation depends on $y$, and the $y$ equation depends on $x$. However, the $z$ equation is decoupled from the other two, so if $m$ starts in planar motion, it will remain there.

## Non-dimensional Equations of Motion

:::{margin}
This section is adapted from Rubinsztejn {cite}`Rubinsztejn2018,Rubinsztejn2018a,Rubinsztejn2018b`.
:::

Next, let's make these equations non-dimensional. This offers the advantage of being general for any system we want to study and removing the dependence on the rate of rotation of the coordinate system.

To make the equations of motion non-dimensional, we need to define characteristic parameters for all of the dimensions in our problem. Typically, the characteristic parameters are chosen so that they are representative of some physical quantity in the system. We need the same number of characteristic parameters as dimensions in the problem.

In this problem, we have 3 dimensions:

1. Mass
2. Length
3. Time

The characteristic mass is the sum of the primary and secondary masses, $m_1 + m_2$. To create the non-dimensional masses, we divide $m_1$ and $m_2$ by the characteristic mass, which gives the definitions of $\pi_1$ and $\pi_2$ from Eq. {eq}`eq:non-dimensional-masses-cr3bp`.

The characteristic length is the circular orbit radius, $r_{12}$. Using this, we define the non-dimensional position vectors by dividing the dimensional position vectors, $\vector{r}_1$, $\vector{r}_2$, and $\vector{r}$ by $r_{12}$:

:::{math}
:label: eq:non-dim-r-vectors-cr3bp
\begin{aligned}
  \vector{\rho} &= \frac{\vector{r}}{r_{12}} = x^_\uvec{\imath} + y^_\uvec{\jmath} + z^_\uvec{k} \\
  \vector{\sigma} &= \frac{\vector{r}_1}{r_{12}} = \left(x^_ + \pi_2\right)\uvec{\imath} + y^_\uvec{\jmath} + z^_\uvec{k} \\
  \vector{\psi} &= \frac{\vector{r}_2}{r_{12}} = \left(x^* - 1 + \pi_2\right)\uvec{\imath} + y^_\uvec{\jmath} + z^_\uvec{k}
\end{aligned}
:::

where $x^* = x/r_{12}$, and similar for $y^*$ and $z^*$.

The natural unit of time in this problem is the period of the circular orbit, Eq. {eq}`eq:circular-orbit-period-cr3bp`. We will ignore the constant factor of $2\pi$ because it doesn't change the dimensions available in the equation. Therefore, the characteristic time is:

:::{math}
:label: eq:characteristic-time-cr3bp
t_C = \sqrt{\frac{r_{12}^3}{\mu}}
:::

To make Eq. {eq}`eq:five-term-acceleration-cr3bp` non-dimensional, we need to multiply both sides of the equation by $t_C^2/r_{12}$. For the left side of Eq. {eq}`eq:five-term-acceleration-cr3bp`, this makes:

:::{math}
:label: eq:non-dimensional-acceleration-cr3bp
\ddot{\vector{\rho}} = \frac{d^2\vector{r}}{dt^2}\frac{t_C^2}{r_{12}} = \frac{d^2\vector{\rho}}{d\tau^2}
:::

where $\tau = t/t_C$. Making the terms on the right hand side of Eq. {eq}`eq:five-term-acceleration-cr3bp` non-dimensional is also the result of multiplying by $t_C^2/r_{12}$. Note that the dimensions of $\varOmega$ are $t^{-1}$:

:::{math}
:label: eq:non-dim-five-term-accel-cr3bp
\ddot{\vector{\rho}} = \left(\ddot{x}^* - 2\dot{y}^* - x^_\right)\uvec{\imath} + \left(\ddot{y}^_ + 2\dot{x}^* - y^_\right)\uvec{\jmath} + \ddot{z}^_\uvec{k}
:::

Now we have the non-dimensional inertial acceleration, we need to make Eq. {eq}`eq:vector-eom-cr3bp`, the equation of motion, non-dimensional. After a bunch of algebra, not shown here, we end up with:

:::{math}
:label: eq:non-dim-vector-eom-cr3bp
\ddot{\vector{\rho}} = -\frac{1 - \pi_2}{\sigma^3}\vector{\sigma} - \frac{\pi_2}{\psi^3}\vector{\psi}
:::

where $\sigma = \mag{\vector{\sigma}}$ and $\psi = \mag{\vector{\psi}}$. Now we can break this into the three scalar components as before:

:::{math}
:label: eq:non-dim-scalar-eom-cr3bp
\begin{aligned}
  \ddot{x}^* - 2\dot{y}^* - x^* &= -\frac{1 - \pi_2}{\sigma^3}\left(x^* + \pi_2\right) - \frac{\pi_2}{\psi^3}\left(x^* - 1 + \pi_2\right) \\
  \ddot{y}^* + 2\dot{x}^* - y^* &= -\frac{1 - \pi_2}{\sigma^3} y^* - \frac{\pi_2}{\psi^3}y^* \\
  \ddot{z}^* &= -\frac{1 - \pi_2}{\sigma^3}z^* - \frac{\pi_2}{\psi^3}z^*
\end{aligned}
:::

There are three main advantages of this formulation of the equations of motion:

1. The equations are independent of the two masses $m_1$ and $m_2$, depending only on their relative sizes via $\pi_2 = m_2 / (m_1 + m_2)$
2. The equations are independent of the rate of rotation of the reference frame, $\varOmega$
3. The equations are independent of the separation distance between $m_1$ and $m_2$, $r_{12}$, so can be used to represent any system

With the equations of motion, we can determine solutions by integrating them in time. As we will see, this can be a little bit tricky, depending on the situation. We also cannot solve the equations analytically, either in the dimensional or non-dimensional case.

Nonetheless, this system represents a number of physical systems, as mentioned previously, so we will continue to analyze its properties with these non-dimensional equations.
