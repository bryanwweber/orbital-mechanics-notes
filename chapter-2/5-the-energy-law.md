# Chapter 2.5 - The Energy Law

We previously defined the gravitational force in terms of the potential energy field:

$$\vector{F} = -\frac{\partial V}{\partial \vector{r}}$$

where $V$ is the gravitational potential energy. Plugging this into Newton's second law, we find:

$$m_2 \ddot{\vector{r}} = -\frac{\partial V}{\partial \vector{r}}$$

Taking the dot product of this equation with the velocity, we find that the right hand side is:

$$-\frac{\partial V}{\partial x}\cdot\frac{dx}{dt} -\frac{\partial V}{\partial y}\cdot\frac{dy}{dt} -\frac{\partial V}{\partial z}\cdot\frac{dz}{dt} = -\frac{dV}{dt}$$

The left-hand side is:

$$m_2 \ddot{\vector{r}}\cdot\dot{\vector{r}} = \frac{m_2}{2}\frac{d(v^2)}{dt} = \frac{d \mathrm{KE}}{dt}$$

where $\mathrm{KE}$ is the kinetic energy of $m_2$ relative to $m_1$. Combining these \mathrm{KE}ogether, we find:

$$\frac{d\mathrm{KE}}{dt} + \frac{dV}{dt} = 0$$

This equation can be integrated to find:

$$\mathrm{KE} + V = E \left(\text{constant}\right)$$

where $E$ is the total mechanical energy of the system. This equation shows that the total energy of the system is constant. Since gravity is a conservative force, the energy of the system can be converted between kinetic and potential energy with no losses.

Dividing through by the mass, this can be represented as the mass-specific kinetic and potential energies:

$$\frac{v^2}{2} - \frac{\mu}{r} = \varepsilon \left(\text{constant}\right)$$

This is also known as the _vis viva_ equation, meaning the living force equation.

Since the energy is constant, we can find it at any point in the orbit and use that value throughout the orbit. It is convenient to find the energy at periapsis:

$$\varepsilon = \varepsilon_p = \frac{1}{2}\frac{h^2}{r_p^2} - \frac{\mu}{r_p} = -\frac{1}{2}\frac{\mu^2}{h^2}\left(1 - e^2\right)$$
