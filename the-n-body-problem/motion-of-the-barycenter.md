# Motion of the Barycenter

We saw in the [last section](./two-body-inertial-numerical-solution.md) that the center of gravity in the two-body problem moves in a straight line. In this section, we will show that the center of gravity also moves at constant velocity.

Since the barycenter does not accelerate, we can define an inertial coordinate system with its origin at the barycenter and use that reference frame for further calculations.

The **barycenter** or center of mass for the two-body system is found by using the absolute position vectors to our external inertial frame:

:::{math}
:label: eq:barycenter-definition
\vector{R}_{\COG} = \frac{m_1 \vector{R}_1 + m_2 \vector{R}_2}{m_1 + m_2}
:::

By taking derivatives of {eq}`eq:barycenter-definition`, we can find the absolute velocity and acceleration of the barycenter:

:::{math}
:label: eq:barycenter-velocity-and-acceleration
\begin{aligned}
  \vector{v}_{\COG} &= \dot{\vector{R}}_{\COG} = \frac{m_1 \dot{\vector{R}}_1 + m_2\dot{\vector{R}}_2}{m_1 + m_2}\\
  \vector{a}_{\COG} &= \ddot{\vector{R}}_{\COG} = \frac{m_1 \ddot{\vector{R}}_1 + m_2\ddot{\vector{R}}_2}{m_1 + m_2}
\end{aligned}
:::

```{margin}
Assuming that the only forces are the mutual gravitational attraction of the two masses.
```

The top of the acceleration fraction, $m_1 \ddot{\vector{R}}_1 + m_2 \ddot{\vector{R}}_2$, can be found in Eq. {eq}`eq:second-law-and-gravity-two-body`. In Eq. {eq}`eq:second-law-and-gravity-two-body`, we saw that the two forces of $m_1$ on $m_2$ and vice versa, were equal and opposite. In other words, the acceleration of the two masses must sum to zero:

:::{math}
:label: eq:sum-of-accelerations
m_1 \ddot{\vector{R}}_1 + m_2 \ddot{\vector{R}}_2 = \vector{0}
:::

Therefore, the acceleration of the barycenter is zero and it must move with constant velocity.

This is a hugely important result because it means that a coordinate system attached to the barycenter is an **inertial reference frame**. We can find the position, velocity, and acceleration of masses relative to a coordinate system attached to the barycenter, and they will be the absolute quantities.

In the next section we will apply this useful result to verify simpler equations for the motion in the two-body system.
