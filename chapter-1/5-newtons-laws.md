# Chapter 1.5 - Newton's Laws

We are all familiar with Newton's Second Law, relating the force applied to an object to its mass and acceleration:

$$\vector{F} = m \vector{a}$$

In this equation, $\vector{a}$ is the **absolute acceleration** of the center of mass of the system. The absolute acceleration is measured in a frame of reference that is not accelerating relative to the fixed stars. This is called an **absolute** or **inertial** frame of reference.

## Impulse and Linear Momentum

The **impulse** of a force is the integral of the force over time:

$$\vector{I} = \int_{t_1}^{t_2} \vector{F} dt$$

Note that impulse is a vector quantity. If the mass is constant, then impulse is equal to the change in linear momentum:

$$\Delta\vector{v} = \frac{\vector{I}}{m}$$

If the force is also constant, then the change in velocity is:

$$\Delta\vector{v} = \frac{\vector{F}}{m}\Delta t$$

## Angular Momentum

The moment of a force about the origin $O$ of an inertial reference frame is:

$$\vector{M}_O = \vector{r}\cross\vector{F} = \vector{r}\cross m\vector{a} = \vector{r}\cross m\frac{d\vector{v}}{dt}$$

Assuming that the mass is constant, this can be rewritten as:

$$\vector{M}_O = \frac{d}{dt}\left(r\cross m\vector{v}\right) = \frac{d\vector{H}_O}{dt}$$

where $\vector{H}_O$ is the **angular momentum** about $O$. Then we define the **net angular impulse**, analogous to the linear impulse:

```{margin}
Note that this equation in the book is missing the $dt$ on the left hand side.
```

$$\int_{t_1}^{t_2} \vector{M}_O dt = H_{O,2} - H_{O,1}$$
