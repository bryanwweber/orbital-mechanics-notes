# Chapter 1.3 - Kinematics

In orbital mechanics, we track the motion of particles through a Euclidean space. This means we need a **frame of reference**. The frame of reference consists of a clock to count time and a non-rotating Cartesian coordinate system to track the $x$, $y$, and $z$ position of the particle. We are going to assume that relativity is not important in this course, so a single universal clock is sufficient to specify the time for all Cartesian coordinate systems.

## Position and Velocity

Given a frame of reference, we can specify the position of any particle $P$ with reference to the origin $O$ of the the coordinate system:

$$\vector{r}(t) = x(t)\uvec{\imath} + y(t)\uvec{\jmath} + z(t)\uvec{k}$$

Naturally then, the distance of $P$ from the origin is the magnitude of its position vector:

$$\mag{\vector{r}} = r(t) = \sqrt{x^2 + y^2 + z^2} = \sqrt{\vector{r}\cdot\vector{r}}$$

Recalling that $x$, $y$, and $z$ are functions of time, we can define the velocity vector:

$$\begin{aligned}\vector{v}(t) &= \frac{dx(t)}{dt}\uvec{\imath} + \frac{dy(t)}{dt}\uvec{\jmath} + \frac{dz(t)}{dt}\uvec{k} \\ &= v_x\uvec{\imath} + v_y\uvec{\jmath} + v_z\uvec{k} \\ &= \dot{\vector{r}}\end{aligned}$$

and the acceleration vector:

$$\begin{aligned}\vector{a}(t) &= \frac{dv_x(t)}{dt}\uvec{\imath} + \frac{dv_y(t)}{dt}\uvec{\jmath} + \frac{dv_z(t)}{dt}\uvec{k} \\ &= a_x\uvec{\imath} + a_y\uvec{\jmath} + a_z\uvec{k} \\ &= \dot{\vector{v}} = \ddot{\vector{r}}\end{aligned}$$

## Particle Path

The locus of points $\vector{r}$ that a particle passes through is called its **path**. If the path is straight, the motion is called **rectilinear**. Otherwise, the motion is **curvilinear**.

By definition, the velocity vector $\vector{v}$ is tangent to the path. If $\uvec{u}_{t}$ is the unit vector tangent to the path, then the velocity can also be specified as:

$$\vector{v} = v \uvec{u}_{t}$$

where $v$ is the magnitude of the velocity, which can be determined from:

$$v = \mag{\vector{v}} = \sqrt{v_x^2 + v_y^2 + v_z^2}$$

if $v_x$, $v_y$, and $v_z$ are known. The velocity magnitude can also be found by differentiating the particle's distance along the path as a function of time:

$$v = \dot{s}$$

where $s$ is the distance that the particle travels along its path.

Note that, in general, the magnitude of the velocity $v$ is not equal to the time derivative of the magnitude of the position vector $\dot{r}$. In other words, the magnitude of the derivative of $\vector{r}$ does not equal the derivative of the magnitude of $\vector{r}$.

The acceleration has a component that is tangent to the path and a component that is perpendicular to the path:

$$\vector{a} = a_t \uvec{u}_{t} + a_n \uvec{u}_{n}$$

where $a_t$ and $a_n$ are the magnitudes of the acceleration in the tangent and normal directions, and $\uvec{u}_{n}$ is the unit vector normal to the path. The tangential acceleration causes the particle to move faster along its path, while the normal component causes the path of the particle to change, to curve the path.

The components of the acceleration are given by:

$$\begin{aligned}a_t &= \dot{v} = \ddot{s} & a_n &= \frac{v^2}{\rho}\end{aligned}$$

where $\rho$ is the **radius of curvature**. This is the distance from the particle $P$ to the center of curvature $C$ of the path at that point.

The normal unit vector is perpendicular to the tangent unit vector and points towards the center of curvature. The position of $C$ relative to $P$ is given by the vector:

$$\vector{r}_{C/P} = \rho \uvec{u}_{n}$$

## Osculating Plane

By definition, two vectors can be used to form a plane. In the case of $\uvec{u}_{t}$ and $\uvec{u}_{n}$, the plane they form is called the **osculating plane**. The unit vector normal to the osculating plane is called the **binormal vector**, $\uvec{u_b}$. If the tangent and normal path vectors are known, the binormal vector can be found from the cross product:

$$\uvec{u}_{b} = \uvec{u}_{t}\cross\uvec{u}_{n}$$

However, we are more likely to know the velocity and acceleration vectors of the particle. We can show algebraically that:

$$\uvec{u}_{b} = \frac{\vector{v}\cross\vector{a}}{\mag{\vector{v}\cross\vector{a}}}$$

which will be a more convenient way of calculating the binormal unit vector.

By construction, the center of curvature lies on the osculating plane. Since the particle is pivoting around the center of curvature, it sweeps out areas on the osculating plane as it moves. In a small time $dt$, the particle moves a distance $ds$. This motion is associated with a small swept angle $d\phi$:

$$ds = \rho d\phi$$

The time rate change of $\phi$ is then given by:

$$\dot{\phi} = \frac{v}{\rho}$$
