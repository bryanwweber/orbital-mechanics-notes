# Chapter 6.10 - Nonimpulsive Orbital Maneuvers

Up to now, all the maneuvers we have considered have been impulsive. This means that they happen extremely quickly relative to the time scale of the overall maneuver or trajectory. Practically, this means that the position vector is constant during the impulse.

However, there are very useful maneuvers that can be performed by providing nonimpulsive thrust. For instance, providing a very low thrust over a sufficiently long time period may be more efficient, depending on the propellant source, than impulsive maneuvers. Nonimpulsive maneuvers typically include propulsion devices such as solar sails and ion engines.

Since the position is changing during the impulse, we must return to the equation of motion and add an additional force term to the right hand side:

$$\ddot{\vector{r}} = -\mu\frac{\vector{r}}{r^3} + \frac{\vector{F}}{m}$$

Assuming that force is a thrust is provided in the same direction as the velocity, then:

$$\vector{F} = T\frac{\vector{v}}{v}$$

where $T$ is the magnitude of the thrust force and $\vector{v} = \dot{\vector{r}}$. If the thrust is provided in the opposite direction of the velocity, then a negative sign should be added to the previous equation. In any case, this results in three scalar equations of motion:

$$\begin{aligned}\ddot{x} &= -\mu\frac{x}{r^3} + \frac{T}{m}\frac{\dot{x}}{v} & \ddot{y} &= -\mu\frac{y}{r^3} + \frac{T}{m}\frac{\dot{y}}{v} & \ddot{z} &= -\mu\frac{z}{r^3} + \frac{T}{m}\frac{\dot{z}}{v}\end{aligned}$$

In addition, to provide the thrust $T$, the rocket motors must eject propellant overboard. This causes the mass of the spacecraft to decrease according to:

$$\frac{dm}{dt} = -\frac{T}{I_{sp}g_0}$$

where $m$ is the instantaneous mass of the spacecraft, $I_{sp}$ is the specific impulse of the engine/propellant combination, and $g_0$ is the sea-level acceleration of gravity.

This set of differential equations does not have an analytical solution in general. However, we can construct a numerical solution by writing the system of ODEs as the six components of the state vector (3 position and 3 velocity) plus the equation for the mass.
