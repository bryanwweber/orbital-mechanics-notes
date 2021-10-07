(sec:conservation-of-energy)=
# Energy Is Conserved In Orbital Motion

The two masses $m_1$ and $m_2$ in the two-body problem form a _system_, so they must follow all of the conservation laws:

1. Conservation of mass
2. Conservation of energy
3. Conservation of momentum

Mass is trivially conserved in this system, since neither body is changing mass. In this section, we will prove that the two-body equation of motion satisfies conservation of energy.

In the rest of this section, we will assume the coordinate system is the co-moving system attached to $m_1$, so we are working with the [two-body problem in relative motion](../the-n-body-problem/two-body-relative-motion.md).

<div class="admonition important">
<p class="admonition-title">Takeaway Message</p>
There are two important results in this section:

1. The two-body equation of motion _does_ satisfy conservation of energy, that is, total energy is constant
2. The _vis viva_ equation gives the proportions of kinetic and potential energy that make up the total energy at any location on the orbit:

:::{math}
:label: eq:vis-viva-equation
E = \frac{v^2}{2} - \frac{\mu}{r}
:::

</div>

## An Intuitive Understanding of Energy

In the context of orbital mechanics, we care about two forms of energy:

1. Kinetic energy, $\KE$
2. Potential energy, $\PE$

These forms of mechanical energy are the only forms in this system, so the total energy must satisfy the law of conservation of energy:

:::{math}
:label: eq:conservation-of-mechanical-energy
\KE + \PE = E
:::

where $E$ is the total mechanical energy of the system and must be a constant.

:::{margin}
Conservative forces allow infinite conversion of energy between forms. Non-conservative forces, such as friction and drag, result in a conversion of mechanical energy into heat.
:::

The potential energy is due to the location of $m_2$ in the gravitational field of $m_1$, while the kinetic energy is due to the velocity of $m_2$ relative to $m_1$. Gravity is a [**conservative force**](https://en.wikipedia.org/wiki/Conservative_force), which means that any change of kinetic energy is associated with an equal and opposite equal change of potential energy.

As kinetic energy increases and the speed of $m_2$ increases, the potential energy must decrease and $m_2$ gets closer to $m_1$. The point of highest speed is at the point of closest approach. Likewise, the point of lowest speed is at the farthest point on the orbit. You can examine the results from [](../the-n-body-problem/two-body-relative-numerical-solution.md) to verify this is correct.

Now, let's define each of the forms of mechanical energy a little more rigorously.

## Conservation of Energy

Since the total mechanical energy, $E$, is a constant, its derivative with respect to time must be equal to zero:

:::{math}
:label: eq:derivative-of-energy-equation
\frac{dE}{dt} = 0 = \frac{d\KE}{dt} + \frac{d\PE}{dt}
:::

### Gravitational Potential Energy

The gravitational potential energy function for a spherically-symmetrical shape is:

:::{math}
:label: eq:gravitational-potential-energy-function
\PE = -\frac{G m_1 m_2}{r} = -\frac{G m_1 m_2}{\sqrt{x^2 + y^2 + z^2}}
:::

In Eq. {eq}`eq:gravitational-potential-energy-function`, the coordinates $x$, $y$, and $z$ are functions of time. This mildly complicates taking the derivative $d\PE/dt$:

:::{math}
:label: eq:derivative-of-gpe
\frac{d\PE}{dt} = -\frac{G m_1 m_2}{\left(x^2 + y^2 + z^2\right)^{3/2}} \left(-x v_x - y v_y - z v_z\right)
:::

where $v_x$, $v_y$, and $v_z$ are the components of velocity in those directions. Substituting the definition of $r$ and $\mu$, we find:

:::{math}
:label: eq:derivative-of-gpe-simplified
\frac{d\PE}{dt} = m_2 \frac{\mu}{r^3}\left(x v_x + y v_y + z v_z\right)
:::

### Kinetic Energy

The kinetic energy of $m_2$ relative to $m_1$ is:

:::{math}
:label: eq:kinetic-energy-function
\KE = \frac{1}{2} m_2 v^2 = \frac{1}{2} m_2 \left(v_x^2 + v_y^2 + v_z^2\right)
:::

where $v = \mag{\vector{v}}$ is the magnitude of the velocity. As with the potential energy, the components of the velocity are functions of time. Thus, the derivative of the kinetic energy with respect to time is:

:::{math}
:label: eq:derivative-of-ke
\frac{d\KE}{dt} = \frac{1}{2}m_2\frac{d\left(v^2\right)}{dt} = m_2\left(v_x a_x + v_y a_y + v_z a_z\right)
:::

where $a_x$, $a_y$, and $a_z$ are the relative acceleration components.

## Application to Two-Body Relative Motion

In this section, we are going to prove that the two-body equation of motion, Eq. {eq}`eq:two-body-relative-motion`, satisfies conservation of energy. Eq. {eq}`eq:two-body-relative-motion` is a _vector_ equation, while energy is a **scalar quantity**. This means that energy is represented by a single number, it has a magnitude but no direction.

```{margin}
This is why the dot product is also called the scalar product.
```

To convert between vectors and scalars mathematically, we have to use the vector dot product. We are going to take the dot product of Eq. {eq}`eq:two-body-relative-motion` with something, and now we have to decide what that something is.

As $m_2$ orbits around $m_1$, the conversion between kinetic and potential energy is done by work. The rate at which work is done is the power, and is in turn equal to the rate of change of the energy, $dE/dt$. We already saw $dE/dt$ in Eq. {eq}`eq:derivative-of-energy-equation`, so that is probably a good place to start.

Finally, the power is calculated by taking the dot product of the force and velocity vectors. So, we will take the dot product of the _velocity_ vector and Eq. {eq}`eq:two-body-relative-motion`.

:::{math}
:label: eq:dot-product-velocity-two-body-eom
\begin{aligned}
  \ddot{\vector{r}} \cdot \vector{v} + \frac{\mu}{r^3} \vector{r} \cdot \vector{v} &= 0 \\
  \left(v_x a_x + v_y a_y + v_z a_z\right) + \frac{\mu}{r^3} \left(x v_x + y v_y + z v_z\right) &= 0
\end{aligned}
:::

Now, if we multiply through by $m_2$ (which doesn't change anything), we see two things:

1. The first term on the left is identical to $d\KE/dt$, Eq. {eq}`eq:derivative-of-ke`
2. The second term on the left is identical to $d\PE/dt$, Eq. {eq}`eq:derivative-of-gpe-simplified`

Therefore, Eq. {eq}`eq:dot-product-velocity-two-body-eom` shows that the two-body equation of motion can be converted into power, and the sum of the power is zero. This precisely satisfies the condition in Eq. {eq}`eq:derivative-of-energy-equation`!

:::{note}
I'm not sure I've given this result enough oomph. What we have here is a proof that the two-body equation of motion satisfies the law of conservation of energy!
:::

## The _vis viva_ Equation

Now that we have proven that the two-body equation of motion satisfies conservation of energy, we can use the conservation law to derive another useful equation. Starting from Eq. {eq}`eq:derivative-of-energy-equation`, let's integrate with respect to time:

:::{math}
:label: eq:integrate-energy-equation
\begin{aligned}
  \int 0 dt &= \int \frac{d}{dt} \left(\frac{v^2}{2}\right) dt - \int \frac{d}{dt}\left(\frac{\mu}{r}\right) dt \\
  E &= \frac{v^2}{2} + \left(C - \frac{\mu}{r}\right)
\end{aligned}
:::

where $C$ is an arbitrary constant of integration. By choosing a value for $C$, we are setting the **reference point** for the potential energy. For instance, we could choose the reference point at $r = R_E$, the radius of the earth, which would give some finite value for $C$. However, it is most convenient to choose $C=0$, corresponding to a reference point at infinite radius.

Equation {eq}`eq:integrate-energy-equation` is a statement of the conservation of energy of the system. It is called the _vis viva_ equation, which translates as the _living force_ equation due to its central role in understanding how objects orbit each other.
