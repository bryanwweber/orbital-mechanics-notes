# Kinematics

In classical mechanics, [**kinematics**](https://en.wikipedia.org/wiki/Kinematics) is the study of the motion of bodies without considering the forces applied to them. In other words, we do not care about why or how a body is in motion, only that it is in motion. This leads to a simplified description of the equations of motion.

## Position and Velocity

Given a [frame of reference](../intro/reference-frames.md), we can specify the position of any particle $P$ with reference to the origin $O$ of the the coordinate system:

:::{math}
:label: eq:cartesian-position-vector
\vector{r}(t) = x(t)\uvec{\imath} + y(t)\uvec{\jmath} + z(t)\uvec{k}
:::

:::{figure} ../images/position-vector-to-point.svg
:name: fig:cartesian-position-vector
:alt: The position of particle P in a Cartesian coordinate system

The position vector $\vec{r}(t)$ specifies the position of $P$ relative to $O$.
:::

The distance of $P$ from the origin is the magnitude of its position vector:

:::{math}
:label: eq:cartesian-distance
\mag{\vector{r}} = r(t) = \sqrt{x^2 + y^2 + z^2} = \sqrt{\vector{r}\cdot\vector{r}}
:::

Recalling that $x$, $y$, and $z$ are functions of time, we can define the velocity vector:

:::{math}
:label: eq:cartesian-velocity-vector
\begin{aligned}\vector{v}(t) &= \frac{dx(t)}{dt}\uvec{\imath} + \frac{dy(t)}{dt}\uvec{\jmath} + \frac{dz(t)}{dt}\uvec{k} \\ &= v_x\uvec{\imath} + v_y\uvec{\jmath} + v_z\uvec{k} \\ &= \dot{\vector{r}}\end{aligned}
:::

and the acceleration vector:

:::{math}
:label: eq:cartesian-acceleration-vector
\begin{aligned}\vector{a}(t) &= \frac{dv_x(t)}{dt}\uvec{\imath} + \frac{dv_y(t)}{dt}\uvec{\jmath} + \frac{dv_z(t)}{dt}\uvec{k} \\ &= a_x\uvec{\imath} + a_y\uvec{\jmath} + a_z\uvec{k} \\ &= \dot{\vector{v}} = \ddot{\vector{r}}\end{aligned}
:::

## Particle Path

The locus of points $\vector{r}$ that a particle passes through is called its **path**. If the path is straight, the motion is called **rectilinear**. Otherwise, the motion is **curvilinear**.

By definition, the velocity vector $\vector{v}$ is tangent to the path. If $\uvec{u}_{t}$ is the unit vector tangent to the path, then the velocity can also be specified as:

:::{math}
:label: eq:lagrange-velocity-vector
\vector{v} = v \uvec{u}_{t}
:::

where $v$ is the magnitude of the velocity, which can be determined from:

:::{math}
:label: eq:eulerian-velocity-magnitude
v = \mag{\vector{v}} = \sqrt{v_x^2 + v_y^2 + v_z^2}
:::

if $v_x$, $v_y$, and $v_z$ are known. The velocity magnitude can also be found by differentiating the particle's distance along the path as a function of time:

:::{math}
:label: eq:lagrange-velocity-magnitude
v = \frac{ds}{dt} = \dot{s}
:::

where $s$ is the distance that the particle travels along its path.

Note that, in general, the magnitude of the velocity $v$ is not equal to the time derivative of the magnitude of the position vector $\dot{r}$. In other words, the magnitude of the derivative of $\vector{r}$ does not equal the derivative of the magnitude of $\vector{r}$.

The acceleration has a component that is tangent to the path and a component that is perpendicular to the path:

:::{math}
:label: eq:lagrange-acceleration-vector
\vector{a} = a_t \uvec{u}_{t} + a_n \uvec{u}_{n}
:::

where $a_t$ and $a_n$ are the magnitudes of the acceleration in the tangent and normal directions, and $\uvec{u}_{n}$ is the unit vector normal to the path. The tangential acceleration causes the particle to move faster along its path, while the normal component causes the path of the particle to change, to curve the path.

The components of the acceleration are given by:

:::{math}
:label: eq:lagrange-acceleration-components
\begin{aligned}
  a_t &= \dot{v} = \ddot{s} \\
  a_n &= \frac{v^2}{\rho}
\end{aligned}
:::

where $\rho$ is the **radius of curvature**. This is the distance from the particle $P$ to the center of curvature $C$ of the path at that point.

The normal unit vector is perpendicular to the tangent unit vector and points towards the center of curvature. The position of $C$ relative to $P$ is given by the vector:

:::{math}
:label: eq:center-of-curvature
\vector{r}_{C/P} = \rho \uvec{u}_{n}
:::

:::{figure} ../images/center-of-curvature.svg
:name: fig-center-of-curvature

The center of curvature of a path $s$ is a distance $\rho$ from the particle.
:::

Since the particle is pivoting around the center of curvature, it sweeps out areas on a plane as it moves. In a small time $dt$, the particle moves a distance $ds$. This motion is associated with a small swept angle $d\phi$, as shown in {numref}`fig-swept-angle`:

:::{math}
:label: eq:differential-path-length
ds = \rho d\phi
:::

:::{figure} ../images/swept-angle.svg
:name: fig-swept-angle

The angle swept during a differential movement of the particle $P$ is $d\phi$.
:::

The time rate change of $\phi$ is then given by:

:::{math}
:label: eq:angular-velocity
\frac{d\phi}{dt} = \frac{ds}{dt}\frac{1}{\rho} = \frac{v}{\rho}
:::

## Osculating Plane

By definition, two vectors can be used to form a plane. In the case of $\uvec{u}_{t}$ and $\uvec{u}_{n}$, the plane they form is called the **osculating plane**. By construction, the center of curvature lies on the osculating plane and this is the plane where the angle $\phi$ is swept.

The unit vector normal to the osculating plane is called the **binormal vector**, $\uvec{u_b}$. If the tangent and normal path vectors are known, the binormal vector can be found from the cross product:

:::{math}
:label: eq:binormal-vector
\uvec{u}_{b} = \uvec{u}_{t}\cross\uvec{u}\_{n}
:::

However, we are more likely to know the velocity and acceleration vectors of the particle. We can show algebraically that:

:::{math}
:label: eq:binormal-from-acceleration
\uvec{u}\_{b} = \frac{\vector{v}\cross\vector{a}}{\mag{\vector{v}\cross\vector{a}}}
:::

which is usually a more convenient way of calculating the binormal unit vector.
