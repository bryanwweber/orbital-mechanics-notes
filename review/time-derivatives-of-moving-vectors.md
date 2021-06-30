# Time Derivatives of Moving Vectors

In this section, our goal is to find a means to calculate the time derivative of a moving vector. As we saw in the [kinematics review](./kinematics.md), the velocity of a particle is given by:

:::{math}
\vector{v}(t) = v_x \uvec{\imath} + v_y \uvec{\jmath} + v_z \uvec{k}
:::

Finding the acceleration of the particle is done by differentiating the velocity with respect to time:

:::{math}
\vector{a}(t) = \frac{d\vector{v}(t)}{dt} = \frac{d \left(v_x \uvec{\imath}\right)}{dt} + \frac{d \left(v_y \uvec{\jmath}\right)}{dt} + \frac{d \left(v_z \uvec{k}\right)}{dt}
:::

If only the velocity components are changing with respect to time, then this derivative becomes:

:::{math}
\vector{a}(t) = \frac{d v_x}{dt} \uvec{\imath} + \frac{d v_y}{dt} \uvec{\jmath} + \frac{d v_z}{dt} \uvec{k} = a_x \uvec{imath} + a_y \uvec{\jmath} + a_z \uvec{k}
:::

On the other hand, if _both_ the velocity components _and_ the unit vectors are changing as a function of time, then the derivative is more complicated. Determining methods to compute these derivatives is the goal of this section.

## Single Frame of Reference

Consider a vector $\vector{A}$ fixed to a body that is undergoing rigid body rotation. The magnitude of $\vector{A}$ is fixed. The angular velocity of the rigid body is given by $\vector{\omega}$ about some instantaneous axis of rotation. Then, the time derivative of $\vector{A}$ is:

:::{math}
:label:
\frac{d\vector{A}}{dt} = \vector{\omega}\cross\vector{A}
:::

The angular acceleration is defined as:

:::{math}
:label:
\vector{\alpha} = \frac{d\vector{\omega}}{dt}
:::

With this, we can calculate the second derivative of $\vector{A}$:

:::{math}
:label:
\frac{d^2\vector{A}}{dt^2} = \vector{\alpha}\cross\vector{A} + \vector{\omega}\cross\left(\vector{\omega}\cross\vector{A}\right)
:::

## Moving Frame of Reference

Consider two Cartesian axes, one an inertial frame (fixed relative to the stars) and one moving relative to the inertial frame. We note that the moving frame can be attached to a body or not, but we will focus on the former case here.

In the inertial frame, we will use capital letters to represent axes and unit vectors. Thus, the unit vector along the $X$ axis is $\uvec{I}$, along the $Y$ axis is $\uvec{J}$, and along the $Z$ axis is $\uvec{K}$.

Now consider a time-dependent vector $\vector{B}$ with some components in the inertial frame of reference:

:::{math}
:label:
\vector{B} = B_X\uvec{I} + B_Y\uvec{J} + B_Z\uvec{K}
:::

Since the unit vectors of the inertial frame of reference are fixed, the time derivative of $\vector{B}$ is:

:::{math}
:label:
\frac{d\vector{B}}{dt} = \frac{dB_X}{dt}\uvec{I} + \frac{B_Y}{dt}\uvec{J} + \frac{B_Z}{dt}\uvec{K}
:::

This is the absolute time derivative of $\vector{B}$. We can also resolve $\vector{B}$ into components along a _moving_ frame of reference, denoted by lower case letters:

:::{math}
:label:
\vector{B} = B_x\uvec{\imath} + B_y\uvec{\jmath} + B_z\uvec{k}
:::

The moving frame of reference has an absolute angular velocity relative to the inertial frame of reference, given by $\vector{\Omega}$, such that the unit vectors are a function of time. Therefore, their time derivatives are not zero and we must use the product rule to compute the derivative of $\vector{B}$:

:::{math}
:label:
\frac{d\vector{B}}{dt} = \frac{dB_x}{dt}\uvec{\imath} + B_x \frac{d\uvec{\imath}}{dt} + \frac{dB_y}{dt}\uvec{\jmath} + B_y \frac{d\uvec{\jmath}}{dt} +\frac{dB_z}{dt}\uvec{k} + B_z \frac{d\uvec{k}}{dt}
:::

From our discussion of the single frame of reference, we can determine the time derivatives of the unit vectors:

:::{math}
:label:
\begin{aligned}\frac{d\uvec{\imath}}{dt} &= \vector{\Omega}\cross\uvec{\imath} & \frac{d\uvec{\jmath}}{dt} &= \vector{\Omega}\cross\uvec{\jmath} & \frac{d\uvec{k}}{dt} &= \vector{\Omega}\cross\uvec{k}\end{aligned}
:::

Then, we can rewrite the derivative of $\vector{B}$ as:

:::{math}
:label:
\frac{d\vector{B}}{dt} = \left.\frac{d\vector{B}}{dt}\right)_{\text{rel}} + \vector{\Omega}\cross\vector{B}
:::

This equation allows us to compute the absolute time derivative of a vector when we know the derivative relative to a moving frame of reference by using the angular velocity of the moving frame of reference. The only time when the absolute and relative derivatives are equal are when the angular velocity of the frame of reference is zero.

We can compute higher order derivatives as well:

:::{math}
:label:
\frac{d^2\vector{B}}{dt^2} = \left.\frac{d^2\vector{B}}{dt^2}\right)_{\text{rel}} + \dot{\vector{\Omega}}\cross\vector{B} + \vector{\Omega}\cross\left(\vector{\Omega}\cross\vector{B}\right) + 2\vector{\Omega}\cross\left.\frac{d\vector{B}}{dt}\right)_{\text{rel}}
:::

## Relative Motion

Now, let's apply some of these vector properties to something more related to the real world. Let $P$ be a particle in arbitrary motion. We define two reference frames, one inertial and one moving.

The position of $P$ relative to the inertial frame is given by $\vector{r}$ and relative to the moving frame is $\vector{r}_{\text{rel}}$. The position of the origin $O$ of the moving reference frame relative to the inertial frame is $\vector{r}_O$. It then follows that the relationship between these vectors is:

:::{math}
:label:
\vector{r} = \vector{r}_O + \vector{r}_{\text{rel}}
:::

Taking the time derivative of $\vector{r}$ gives the absolute velocity:

:::{math}
:label:
\vector{v} = \vector{v}_O + \vector{\Omega}\cross\vector{r}_{\text{rel}} + \vector{v}_{\text{rel}}
:::

and taking the time derivative of $\vector{v}$ gives the absolute acceleration:

:::{math}
:label:
\vector{a} = \vector{a}_O + \dot{\vector{\Omega}}\cross\vector{r}_{\text{rel}} + \vector{\Omega}\cross\left(\vector{\Omega}\cross\vector{r}_{\text{rel}}\right) + 2\vector{\Omega}\cross\vector{v}_{\text{rel}}
:::

The last cross-product term is known as the **Coriolis acceleration**.
