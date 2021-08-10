# Force, Acceleration, and Momentum

In the [_Principia_](https://en.wikipedia.org/wiki/Philosophi%C3%A6_Naturalis_Principia_Mathematica), Newton laid out three laws of motion:

1. Without a net external force, the motion of an object remains constant
2. The rate of change of momentum of an object subject to a net force is proportional to the force and in the same direction as the force
3. Every action has an equal and opposite reaction

Newton's second law can be expressed mathematically as:

:::{math}
:label: eq:newtons-second-law
\vector{F} = m \ddot{\vector{r}}
:::

In this equation, $\vector{\ddot{r}}$ is the **absolute acceleration** of the center of mass of the system. The absolute acceleration is measured in an [**inertial frame of reference**](sec:inertial-reference-frame) that is not accelerating relative to the fixed stars.

## Impulse and Linear Momentum

The **impulse** of a force is the integral of the force over time:

:::{math}
:label: eq:definition-impulse
\vector{I} = \int_{t_1}^{t_2} \vector{F} dt
:::

Note that impulse is a vector quantity. If the mass is constant, then impulse is equal to the change in linear momentum:

:::{math}
:label: eq:linear-momentum
\Delta\vector{v} = \frac{\vector{I}}{m}
:::

If the force is also constant, then the change in velocity is:

:::{math}
:label: eq:change-of-velocity
\Delta\vector{v} = \frac{\vector{F}}{m}\Delta t
:::

## Angular Momentum

The moment of a force about the origin $O$ of an inertial reference frame is:

:::{math}
:label: eq:moment-about-origin
\vector{M}_O = \vector{r}\cross\vector{F} = \vector{r}\cross m\vector{a} = \vector{r}\cross m\frac{d\vector{v}}{dt}
:::

Assuming that the mass is constant, this can be rewritten as:

:::{math}
:label: eq:moment-constant-mass
\vector{M}_O = \frac{d}{dt}\left(r\cross m\vector{v}\right) = \frac{d\vector{H}_O}{dt}
:::

where $\vector{H}_O$ is the **angular momentum** about $O$. Then we define the **net angular impulse**, analogous to the linear impulse:

:::{math}
:label: eq:net-angular-impulse
\int_{t_1}^{t_2} \vector{M}_O dt = H_{O,2} - H_{O,1}
:::
