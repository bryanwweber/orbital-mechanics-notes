# Motion of the Barycenter

The first thing we will show is that we can actually define an inertial coordinate system attached to the **center of gravity**, or barycenter, of the two-mass system. This is a very important result, because it means that there actually _is_ an inertial reference frame we can use.

Now, adding these equations together, we find an extremely important result:

:::{math}
:label: eq:sum-of-accelerations
m_1 \ddot{\vector{R}}_1 + m_2 \ddot{\vector{R}}_2 = \vector{0}
:::

To see why this result is so important, we need to define one more quantity, the **barycenter** or center of mass for the two-body system. Using the absolute position vectors, we find that:

:::{math}
:label: eq:barycenter-definition
\vector{R}_G = \frac{m_1 \vector{R}_1 + m_2 \vector{R}_2}{m_1 + m_2}
:::

By taking derivatives of {eq}`eq:barycenter-definition`, we can find the absolute velocity and acceleration of the barycenter:

:::{math}
:label: eq:barycenter-velocity-and-acceleration
\begin{aligned}
  \vector{v}_G &= \dot{\vector{R}}_G = \frac{m_1 \dot{\vector{R}}_1 + m_2\dot{\vector{R}}_2}{m_1 + m_2}\\
  \vector{a}_G &= \ddot{\vector{R}}_G = \frac{m_1 \ddot{\vector{R}}_1 + m_2\ddot{\vector{R}}_2}{m_1 + m_2}
\end{aligned}
:::

```{margin}
Assuming that the only forces are the mutual gravitational attraction of the two masses.
```

Now go back to the result from Newton's laws - it says that the top of the fraction in the acceleration of the barycenter is equal to zero. In other words, the center of gravity of the two-body system does not undergo any acceleration and moves at constant velocity in a straight line for all time!

This is a hugely important result because it means that a coordinate system attached to the barycenter is an **inertial reference frame**. We can find the position, velocity, and acceleration of masses relative to a coordinate system attached to the barycenter, and they will be the absolute quantities.

## Gravitational Potential Energy

The gravitational potential energy function for a spherically-symmetrical shape is:

:::{math}
:label: eq:gravitational-potential-energy-function
V = -\frac{G m_1 m_2}{r} = -\frac{G m_1 m_2}{\sqrt{\left(X_2 - X_1\right)^2 + \left(Y_2 - Y_1\right)^2 + \left(Z_2 - Z_1\right)^2}}
:::

```{margin}
Conservative forces allow infinite conversion of energy between forms. Non-conservative forces, such as friction and drag, result in a conversion of mechanical energy into heat.
```

Gravity is a [**conservative force**](https://en.wikipedia.org/wiki/Conservative_force), which means that the force field can be determined from the gradient of the potential energy function:

:::{math}
:label: eq:gravity-force-field
\vector{F} = - \vector{\nabla} V
:::

Thus, the attractive forces between the masses are given by:

:::{math}
:label: eq:force-from-potential-function
\begin{aligned}
  \vector{F}_{12} &= -\left(\frac{\partial V}{\partial X_2}\uvec{\imath} + \frac{\partial V}{\partial Y_2}\uvec{\jmath} + \frac{\partial V}{\partial Z_2}\uvec{k}\right)\\
  \vector{F}_{21} &= -\left(\frac{\partial V}{\partial X_1}\uvec{\imath} + \frac{\partial V}{\partial Y_1}\uvec{\jmath} + \frac{\partial V}{\partial Z_1}\uvec{k}\right)
\end{aligned}
:::

In the book, they show that the gravitational potential energy field of a sphere is equivalent to the field of an equivalent point mass located at the center of the sphere. As long as the spheres don't come into contact, we can substitute point masses for spheres with no difference in the equations!

## Many-Body Problems

Since we have developed the equations for the two-body problem, the question naturally arises about having three or more masses in the system. Unfortunately, there are no general closed form solutions for the $n$-body problem when $n > 2$. The system can still be solved numerically, but it is highly chaotic and complex.

Given this is the case, the next question that arises is, how useful is the two-body solution, really? It turns out that the easiest way to solve the many-body problem for systems of engineering interest is to solve the two-body problem and treat other gravitational influences as perturbations of the two-body problem.

For example, consider a satellite orbiting Earth. The dominant gravitational force on the satellite is from the Earth. There will also be influences from the Sun, Moon, and other planets. However, those effects can be treated as perturbations on the solution of the two-body problem involving the Earth and the satellite.
