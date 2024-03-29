# Relative Motion

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

## Motion Relative to Earth Frames

The relative position vector of $P$ to the center of the Earth is:

:::{math}
:label:
\vector{r}_{\text{rel}} = \left(R_E + z\right)\uvec{k}
:::

:::{margin}
**Nonrotating Earth** is a little weird... It means to assume that, for the purposes of these calculations, the Earth is not rotating. We'll correct for the rotation in a minute.
:::

where $R_E$ is the radius of the Earth (assumed constant for now) and $z$ is the height of $P$ above the surface of the Earth. The velocity of $P$ relative to the **nonrotating Earth** is:

:::{math}
:label:
\vector{v}_{\text{rel}} = \dot{z}\uvec{k} + \left(R_E + z\right)\frac{d\uvec{k}}{dt}
:::

Now we have to calculate $d\uvec{k}/dt$. To do that, we need the angular velocity of the topopcentric-horizon coordinate system, $\vector{\omega}$, relative to the non-rotating Earth. This is found in terms of the rates of change of latitude ($\phi$) and longitude ($\Lambda$):

:::{margin}
You can find a derivation of the equation for angular velocity in spherical coordiantes here: [University of Illinois Online Dynamics Textbook](http://dynref.engr.illinois.edu/rvs.html). Just watch out for the different symbols that the author uses.
:::

:::{math}
:label:
\vector{\omega} = -\dot{\phi}\uvec{\imath} + \dot{\Lambda}\cos\phi\uvec{\jmath} + \dot{\Lambda}\sin\phi\uvec{k}
:::

Thus, including the $x$ and $y$ directions for future reference:

:::{math}
:label:
\begin{aligned}\frac{d\uvec{\imath}}{dt} &= \vector{\omega}\cross\uvec{\imath} = -\dot{\Lambda}\sin\phi\uvec{\jmath} - \dot{\Lambda}\cos\phi\uvec{k}\\ \frac{d\uvec{\jmath}}{dt} &= \vector{\omega}\cross\uvec{\jmath} = -\dot{\Lambda}\sin\phi\uvec{\imath} - \dot{\phi}\uvec{k}\\ \frac{d\uvec{k}}{dt} &= \vector{\omega}\cross\uvec{k} = \dot{\Lambda}\cos\phi\uvec{\imath} + \dot{\phi}\uvec{\jmath}\end{aligned}
:::

The velocity of $P$ in the nonrotating Earth frame, projected into the topocentric-horizon coordinates, is:

:::{math}
:label:
\vector{v}_{\text{rel}} = \dot{x}\uvec{\imath} + \dot{y}\uvec{\jmath} + \dot{z}\uvec{k}
:::

where

:::{math}
:label:
\begin{aligned}\dot{x} &= \left(R_E + z\right) \dot{\Lambda}\cos\phi & \dot{y} &= \left(R_E + z\right)\dot{\phi}\end{aligned}
:::

are the components of the velocity along the topocentric-horizon axes. These can be rearranged to solve for the rate of change of latitude and longitude:

:::{math}
:label:
\begin{aligned}\dot{\phi} &= \frac{\dot{y}}{R_E + z} & \dot{\Lambda} &= \frac{\dot{x}}{\left(R_E + z\right)\cos\phi}\end{aligned}
:::

We can take the time derivative of $\vector{v}_{\text{rel}}$ to find $\vector{a}_{\text{rel}}$:

:::{math}
:label:
\vector{a}_{\text{rel}} = \left[\ddot{x} + \frac{\dot{x}\left(\dot{z} - \dot{y}\tan\phi\right)}{R_E + z}\right]\uvec{\imath} + \left(\ddot{y} + \frac{\dot{y}\dot{z} + \dot{x}^2\tan\phi}{R_E + z}\right)\uvec{\jmath} + \left(\ddot{z} - \frac{\dot{x}^2 + \dot{y}^2}{R_E + z}\right)\uvec{k}
:::

## Absolute Motion

The absolute velocity, in the ECI frame, is:

:::{math}
:label:
\vector{v} = \vector{v}_C + \vector{\Omega}\cross\vector{r}_{\text{rel}} + \vector{v}_{\text{rel}}
:::

Geometrically, we find that $\uvec{K} = \cos\phi\uvec{\jmath} + \sin\phi\uvec{k}$, which we can use to determine the angular velocity of the Earth:

:::{math}
:label:
\vector{\Omega} = \Omega\uvec{K} = \Omega\cos\phi\uvec{\jmath} + \Omega\sin\phi\uvec{k}
:::

In the ECI, $\vector{v}_C = 0$, so we can find the absolute velocity of $P$:

:::{math}
:label:
\vector{v} = \left[\dot{x} + \Omega\left(R_E + z\right)\cos\phi\right]\uvec{\imath} + \dot{y}\uvec{\jmath} + \dot{z}\uvec{k}
:::

Next, the absolute acceleration of $P$ is given by:

:::{math}
:label:
\vector{a} = \vector{a}_C + \dot{\vector{\Omega}}\cross\vector{r}_{\text{rel}} + \vector{\Omega}\cross\left(\vector{\Omega}\cross\vector{r}_{\text{rel}}\right) + 2\vector{\Omega}\cross\vector{v}_{\text{rel}} + \vector{a}_{\text{rel}}
:::

In this equation, $\vector{a}_C = 0$ and $\dot{\vector{\Omega}} = 0$ because the center of the Earth is not accelerating and the rate of rotation of the Earth is constant. With this, we can find the absolute acceleration in terms of the topographic-horizontal motion:

:::{math}
:label:
\begin{aligned}\vector{a} &= \left[\ddot{x} + \frac{\dot{x}\left(\dot{z} - \dot{y}\tan\phi\right)}{R_E + z} + 2\Omega\left(\dot{z}\cos\phi - \dot{y}\sin\phi\right)\right]\uvec{\imath}\\ &+ \left\{\ddot{y} + \frac{\dot{y}\dot{z} + \dot{x}^2\tan\phi}{R_E + z} + \Omega\sin\phi\left[\Omega\left(R_E + z\right)\cos\phi + 2\dot{x}\right]\right\}\uvec{\jmath}\\ &+ \left\{\ddot{z} - \frac{\dot{x}^2 + \dot{y}^2}{R_E + z} - \Omega\cos\phi\left[\Omega\left(R_E + z\right)\cos\phi + 2\dot{x}\right]\right\}\uvec{k}\end{aligned}
:::

:::{admonition} Check your understanding

At this point, the book provides a few simplified equations. Look at the equations for "Flight straight up" and "Stationary". Convince yourself that these equations are physically correct.
:::
