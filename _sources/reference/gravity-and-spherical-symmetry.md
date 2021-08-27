# Gravity and Spherical Symmetry

In the [section about conservation of energy](sec:conservation-of-energy), we assumed that the two masses were spherically symmetric. In this section, we are going to prove that the force field from a conservative force is the same for a spherically symmetric distributed mass as an equivalent point mass. We will use gravity as an example.

## Conservative Forces Are Related to Potential Energy

The force field of a conservative force can be determined from the gradient of the potential energy function:

:::{math}
:label: eq:gravity-force-field
\vector{F} = - \vector{\nabla} V = - \left(\frac{\partial V}{\partial x}\uvec{\imath} + \frac{\partial V}{\partial y}\uvec{\jmath} + \frac{\partial V}{\partial z}\uvec{k}\right)
:::

Thus, the attractive force between $m_1$ and $m_2$ is:

:::{math}
:label: eq:force-from-potential-function
\vector{F} = \frac{V \vector{r}}{r^2}
:::

By plugging in the definition of $V$, Eq. {eq}`eq:gravitational-potential-energy-function`, we recover the two-body relative equation of motion.

In the book, they show that the gravitational potential energy field of a sphere is equivalent to the field of an equivalent point mass located at the center of the sphere. As long as the spheres don't come into contact, we can substitute point masses for spheres with no difference in the equations!

TODO: Add this proof following Appendix E in {cite}`Curtis2020`.
