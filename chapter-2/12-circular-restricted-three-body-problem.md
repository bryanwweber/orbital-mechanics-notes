---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
kernelspec:
  display_name: Python 3
  language: python
  name: python3
execution:
  timeout: 100
---

# Chapter 2.12 - Circular Restricted Three-Body Problem

In this section, we solve the three-body problem, subject to some restrictions. In particular:

1. There are two primary masses, and the mass of the tertiary object is extremely small in comparison to $m_1$ and $m_2$
2. The mass of $m_1$ is larger than $m_2$
3. The two primary objects orbit in a circle around their center of mass

Although these assumptions seem fairly restrictive, they actually represent several very important physical situations: the Earth-Moon system, as well as the orbits of many of the planets around the sun, with a man-made object as the third mass! This is called the Circular Restricted Three-Body Problem (CRTBP or CR3BP), because the orbits are restricted to circles and the mass of the third body is restricted to be much smaller than the other two.

The orbit of the moon around the earth is approximately circular, with a mean eccentricity of 0.054, and semimajor and semiminor axes of 384,400 km and 383,800 km, respectively. The center of mass of the system occurs at a distance of 4,600 km from the Earth's center, about 72% of the radius of the Earth. This data comes from [Wikipedia](https://en.wikipedia.org/wiki/Orbit_of_the_Moon).

Similarly, the orbits of Venus, Earth, Jupiter, Saturn, Neptune, and Uranus around the sun all have eccentricities less than 0.06, according to the [NASA Planetary Fact Sheet](https://nssdc.gsfc.nasa.gov/planetary/factsheet/).

Unlike the two-body problem, there is no general closed-form solution to this problem. Closed-form means an analytical equation we can solve. But we can construct the equations of motion to find some interesting parameters of the orbits.

## Orbit of Primary Masses

We first attach a non-inertial coordinate system to the barycenter of the system of $m_1$ and $m_2$, such that the $x$-axis of this coordinate system points towards $m_2$. The distance from $m_1$ to $m_2$ is $r_{12}$, which is also the radius of the circular orbit.

The $y$-axis of this coordinate system is in the orbital plane, and the $z$-axis is perpendicular to the orbital plane, in the same direction as the angular momentum vector. In the rotating reference frame, $m_1$ and $m_2$ appear to be stationary.

The inertial angular velocity is given by

$$\vector{\Omega} = \Omega\uvec{k}$$

where

$$\Omega = \frac{2\pi}{T}$$

and the orbital period is for a circular orbit:

$$T = \frac{2\pi}{\sqrt{\mu}}r_{12}^{3/2}$$

Plugging this in for $\Omega$, we find:

$$\Omega = \sqrt{\frac{\mu}{r_{12}^3}}$$

where the gravitational parameter is given by:

$$\mu = GM = G\left(m_1 + m_2\right)$$

Next, we want to find the positions of the two masses relative to the barycenter. By definition, the two masses lie in the orbital plane, so their $z$-coordinate is going to be zero. Since the line that connects $m_1$ and $m_2$ goes through the barycenter, then their $y$-coordinates must be zero as well.

In that case, we only need to find the $x$-coordinates, which we can do from the equation for the center of mass:

$$m_1 x_1 + m_2 x_2 = 0$$

We need a second equation to solve for $x_1$ and $x_2$. Since $m_1$ is to the left of the center of mass, $x_1$ is negative. Then $x_2$ is the distance from $m_1$ to $m_2$ plus the distance from $m_1$ to the barycenter:

$$x_2 = x_1 + r_{12}$$

Then we define two dimensionless ratios:

```{margin}
You might be able to remember these by noting that $\pi_1$ has $m_1$ in the numerator, and $\pi_2$ has $m_2$ in the numerator.
```

$$\begin{aligned}\pi_1 &= \frac{m_1}{m_1 + m_2} & \pi_2 &= \frac{m_2}{m_1 + m_2}\end{aligned}$$

and solve for $x_1$ and $x_2$ in terms of these:

$$\begin{aligned}x_1 &= -\pi_2 r_{12} & x_2 &= \pi_1 r_{12}\end{aligned}$$

## Orbit of the Tertiary Mass

```{margin}
**Note:** The book calls the much smaller mass a _secondary_ mass, whereas I prefer _tertiary_. ¯\\\_(ツ)_/¯
```

Now let's add the much smaller, tertiary mass into the system. We'll use the symbol $m$ for this mass, without a subscript. We want the equation of motion, that is, Newton's second law. For that we need the acceleration, which we will derive from the position.

### Position, Velocity, and Acceleration

The position of the tertiary mass relative to the barycenter is:

$$\vector{r} = x\uvec{\imath} + y\uvec{\jmath} + z\uvec{k}$$

The position of the tertiary mass relative to $m_1$ is:

$$\vector{r}_1 = \left(x - x_1\right)\uvec{\imath} + y\uvec{\jmath} + z\uvec{k} = \left(x + \pi_2 r_{12}\right)\uvec{\imath} + y\uvec{\jmath} + z\uvec{k}$$

and finally, the position of $m$ relative to $m_2$ is:

$$\vector{r}_2 = \left(x - \pi_1 r_{12}\right)\uvec{\imath} + y\uvec{\jmath} + z\uvec{k}$$

Then we want the _inertial_ velocity of $m$, so we need to account for the rotating frame of reference, so:

$$\dot{\vector{r}} = \vector{v}_G + \vector{\Omega}\cross\vector{r} + \vector{v}_{\text{rel}}$$

where $\vector{v}_G$ is the absolute velocity of the barycenter and $\vector{v}_{\text{rel}}$ is the velocity calculated in the moving coordinate system:

$$\vector{v}_{\text{rel}} = \dot{x}\uvec{\imath} + \dot{y}\uvec{\jmath} + \dot{z}\uvec{k}$$

Then we can find the absolute acceleration of $m$:

$$\ddot{\vector{r}} = \vector{a}_G + \dot{\vector{\Omega}}\cross\vector{r} + \vector{\Omega}\cross\left(\vector{\Omega}\cross\vector{r}\right) + 2\vector{\Omega}\cross\vector{v}_{\text{rel}} + \vector{a}_{\text{rel}}$$(five-term-acceleration)

This equation can be simplified because we showed that the acceleration of the barycenter is zero for the two-body problem, $\vector{a}_G = 0$. In addition, the angular velocity is constant since the orbit is circular, so $\dot{\vector{\Omega}} = 0$. Then, Eq. {eq}`five-term-acceleration` can be simplified to:

$$\ddot{\vector{r}} = \vector{\Omega}\cross\left(\vector{\Omega}\cross\vector{r}\right) + 2\vector{\Omega}\cross\vector{v}_{\text{rel}} + \vector{a}_{\text{rel}}$$

where

$$\vector{a}_{\text{rel}} = \ddot{x}\uvec{\imath} + \ddot{y}\uvec{\jmath} + \ddot{z}\uvec{k}$$

Plugging everything in and simplifying:

$$\ddot{\vector{r}} = \left(\ddot{x} - 2\Omega\dot{y} - \Omega^2 x\right)\uvec{\imath} + \left(\ddot{y} + 2\Omega\dot{x} - \Omega^2 y\right)\uvec{\jmath} + \ddot{z}\uvec{k}$$

### Newton's Second Law

For the tertiary body, the forces are due to both of the other masses:

$$m \ddot{\vector{r}} = \vector{F}_1 + \vector{F}_2$$

where $\vector{F}_1$ is the force from $m_1$ on $m$ and $\vector{F}_2$ is the force from $m_2$ on $m$.

The two forces are found by Newton's law of gravitation:

$$\begin{aligned}\vector{F}_1 &= -G\frac{m_1 m}{r_1^2} \left.\uvec{u}_r\right)_1 = -\frac{\mu_1 m}{r_1^3}\vector{r}_1 \\ \vector{F}_2 &= -G\frac{m_2 m}{r_2^2}\left.\uvec{u}_r\right)_2 = -\frac{\mu_2 m}{r_2^3}\vector{r}_2\end{aligned}$$

where

$$\begin{aligned}\mu_1 &= G m_1 & \mu_2 &= G m_2\end{aligned}$$

and

$$\begin{aligned}\left.\uvec{u}_r\right)_1 &= \frac{\vector{r}_1}{r_1} & \left.\uvec{u}_r\right)_2 &= \frac{\vector{r}_2}{r_2}\end{aligned}$$

Dividing through by $m$, we find:

$$\ddot{\vector{r}} = -\frac{\mu_1}{r_1^3}\vector{r}_1 - \frac{\mu_2}{r_2^3}\vector{r}_2$$

Now we substitute for $\ddot{\vector{r}}$ and split out by components to have three scalar equations of motion for the CRTBP:

$$\begin{aligned}\ddot{x} - 2\Omega\dot{y} - \Omega^2 x &= -\frac{\mu_1}{r_1^3}\left(x + \pi_2 r_{12}\right) - \frac{\mu_2}{r_2^3}\left(x - \pi_1 r_{12}\right) \\ \ddot{y} + 2\Omega\dot{x} - \Omega^2 y &= -\frac{\mu_1}{r_1^3}y - \frac{\mu_2}{r_2^3}y \\ \ddot{z} &= -\frac{\mu_1}{r_1^3}z - \frac{\mu_2}{r_2^3}z\end{aligned}$$

There are a few things we can note from these equations. First, the $x$ and $y$ equations are coupled; the $x$ equation depends on $y$, and the $y$ equation depends on $x$. However, the $z$ equation is decoupled from the other two, so if $m$ starts in planar motion, it will remain there.

## Nondimensional Equations of Motion

```{margin}
In a later section, the book also makes these equations nondimensional, since it aids the solution of some of the Lagrange points.
```

Next, let's make these equations nondimensional. This offers the advantage of being general for any system we want to study, and removing the dependence on the rate of rotation of the coordinate system. We start by defining a few characteristic parameters.

First, the characteristic distance will be $r_{12}$ and the characteristic mass will be $\pi_2$, for convenience. We could choose $\pi_1$ without loss of generality. We will also define a characteristic time:

$$t^* = \sqrt{\frac{r_{12}^3}{G\left(m_1 + m_2\right)}}$$

This characteristic time is used to generate the nondimensional time:

$\tau = \frac{t}{t^*}$$

Then we need to define the dimensionless position vectors. The vector from $G$ becomes:

$$\vector{\rho} = \frac{\vector{r}}{r_{12}} = x^*\uvec{\imath} + y^*\uvec{\jmath} + z^*\uvec{k}$$

where $x^* = x/r_{12}$, and similar for $y^*$ and $z^*$.

The other two position vectors, from $m_1$ and $m_2$, respectively, become:

$$\begin{aligned}\vector{\sigma} &= \frac{\vector{r}_1}{r_{12}} = \left(x^* + \pi_2\right)\uvec{\imath} + y^*\uvec{\jmath} + z^*\uvec{k} \\\vector{\psi} &= \frac{\vector{r}_2}{r_{12}} = \left(x^* - 1 + \pi_2\right)\uvec{\imath} + y^*\uvec{\jmath} + z^*\uvec{k}\end{aligned}$$

Note that $\pi_1 = 1 - \pi_2$.

Making the acceleration equation nondimensional involves replacing both the $\vector{r}$ and the $t$ terms in the $d^2\vector{r}/dt^2$:

$$\ddot{\vector{\rho}} = \frac{d^2\vector{r}}{dt^2}\frac{\left(t^{*}\right)^2}{r_{12}} = \frac{d^2\vector{\rho}}{d\tau^2}$$

Making the terms on the right hand side of Eq. {eq}`five-term-acceleration` nondimensional is also the result of multiplying by $\left(t^*\right)^2/r_{12}$. Note that the dimensions of $\Omega$ are $t^{-1}$:

$$\ddot{\vector{\rho}} = \left(\ddot{x}^* - 2\dot{y}^* - x^*\right)\uvec{\imath} + \left(\ddot{y}^* + 2\dot{x}^* - y^*\right)\uvec{\jmath} + \ddot{z}^*\uvec{k}$$

Now we have the nondimensional inertial acceleration, and we need to make Newton's second law nondimensional:

$$\ddot{\vector{\rho}} = -\frac{1 - \pi_2}{\sigma^3}\vector{\sigma} - \frac{\pi_2}{\psi^3}\vector{\psi}$$

where $\sigma = \mag{\vector{\sigma}}$ and $\psi = \mag{\vector{\psi}}$. Now we can break this into the three scalar components as before:

$$\begin{aligned}\ddot{x}^* - 2\dot{y}^* - x^* &= -\frac{1 - \pi_2}{\sigma^3}\left(x^* + \pi_2\right) - \frac{\pi_2}{\psi^3}\left(x^* - 1 + \pi_2\right) \\ \ddot{y}^* + 2\dot{x}^* - y^* &= -\frac{1 - \pi_2}{\sigma^3} y^* - \frac{\pi_2}{\psi^3}y^* \\ \ddot{z}^* &= -\frac{1 - \pi_2}{\sigma^3}z^* - \frac{\pi_2}{\psi^3}z^*\end{aligned}$$

There are three main advantages of this formulation of the equations of motion:

1. The equations are independent of the two masses $m_1$ and $m_2$, depending only on their relative sizes via $\pi_2$
2. The equations are independent of the rate of rotation of the reference frame
3. The equations are independent of the separation distance between $m_1$ and $m_2$, so can be used to represent any system

## Lagrange Points

With the equations of motion, we can determine solutions by integrating them in time. As we will see, this can be a little bit tricky, depending on the situation. We also cannot solve the equations analytically, either in the dimensional or nondimensional case.

However, there are five equilibrium points in this system of equations that we can find. An object placed at one of the equilibrium points will, if it is not perturbed, remain at that location indefinitely. These locations are called **Lagrange Points**, although Lagrange himself called them **libration points**.

By definition, the acceleration and velocity components at the Lagrange points are zero:

$$\dot{x} = \dot{y} = \dot{z} = 0 \qquad \text{and} \qquad  \ddot{x} = \ddot{y} = \ddot{z} = 0$$

and likewise for the nondimensional coordinates as well. Plugging these conditions in to the equations of motion, we find (taking the non-dimensional case):

$$\begin{aligned}-x^* &= -\frac{1 - \pi_2}{\sigma^3}\left(x^* + \pi_2\right) - \frac{\pi_2}{\psi^3}\left(x^* - 1 + \pi_2\right) \\-y^* &= -\frac{1 - \pi_2}{\sigma^3} y^* - \frac{\pi_2}{\psi^3}y^* \\ 0 &= \left(-\frac{1 - \pi_2}{\sigma^3} - \frac{\pi_2}{\psi^3}\right)z^*\end{aligned}$$

In the last equation, for $z^*$, the terms in the parentheses are both greater than zero. Therefore, there is no way for them to cancel each other out, and the only way for the equation to be satisfied is if $z^* = 0$. Thus, the Lagrange points lie in the orbital plane.

Now, we need to solve for the $x^*$ and $y^*$ coordinates of the Lagrange points. There are two conditions that we need to consider, since they end up with different solutions:

1. $y^* \neq 0$, giving the so-called **equilateral Lagrange points**
2. $y^* = 0$, giving the so-called **collinear Lagrange points**

### Equilateral Lagrange Points

To find the equilateral Lagrange points, we assume the $y^* \neq 0$. Now we have 2 equations and 2 unknowns. The $y^*$ in the second equation of motion will cancel from both sides, and we end up with:

$$1 = \frac{1 - \pi_2}{\sigma_3} + \frac{\pi_2}{\psi^3}$$

In the equation for $x^*$ we see the $\left(1 - \pi_2\right)/\sigma^3$ term, so let's solve the $y^*$ equation for that:

$$\frac{1 - \pi_2}{\sigma^3} = 1 - \frac{\pi_2}{\psi^3}$$

and plugging this into the $x^*$ equation, we find:

$$x^* = \left(1 - \frac{\pi_2}{\psi^3}\right)\left(x^* + \pi_2\right) + \frac{\pi_2}{\psi^3}\left(x^* - 1 + \pi_2\right)$$

Simplifying, we find:

$$\psi^3 = 1$$

or, plugging in the definition of $\psi$:

$$\psi = \frac{\mag{\vector{r}_2}}{r_{12}} \Rightarrow r_2 = r_{12}$$

Plugging the result of $\psi^3 = 1$ back into the simplified $y^*$ equation, we find:

$$\sigma^3 = 1$$

or, plugging in the definition of $\sigma$:

$$\sigma = \frac{\mag{\vector{r}_1}}{r_{12}} \Rightarrow r_1 = r_{12}$$

Since if $a = b$ and $b = c$, then $a = c$, we find:

$$r_1 = r_2 = r_{12}\qquad \text{and}\qquad \psi = \sigma$$

for the equilateral Lagrange points. Thus, the distance from $m_1$ to $m$ is the same as the distance from $m_2$ to $m$ and from $m_1$ to $m_2$. This defines an equilateral triangle, giving these Lagrange points their name.

From the definition of $\vector{\sigma}$ and $\vector{\psi}$, we can take their magnitudes and equate them to solve for the value of $x^*$ at the equilibrium points:

```{margin}
**Note:** There is a typo in the second of these equations (in the dimensional form) used in the book, Eq. 2.200. There is a $\pi_{12}$ which should be an $r_{12}$.
```

$$\begin{aligned}\sigma^2 &= \mag{\vector{\sigma}}^2 = \left(x^* + \pi_2\right)^2 + \left(y^*\right)^2\\\psi^2 &= \mag{\vector{\psi}}^2 = \left(x^* - 1 + \pi_2\right)^2 + \left(y^*\right)^2\end{aligned}$$

where we have also used the fact that $z^* = 0$ for these points. We find that:

$$x^* = \frac{1}{2} - \pi_2$$

Plugging this back into the equation for $\sigma^2$, we find:

$$y^* = \pm \frac{\sqrt{3}}{2}$$

The equilateral Lagrange points are given the symbols $L_4$ and $L_5$, for the positive and negative $y^*$ values, respectively:

$$\begin{aligned}&L_4: & x^* &= \frac{1}{2} - \pi_2 & y^* &= \frac{\sqrt{3}}{2}\\&L_5: & x^* &= \frac{1}{2} - \pi_2 & y^* &= -\frac{\sqrt{3}}{2}\end{aligned}$$

### Collinear Lagrange Points

For the collinear Lagrange points, we set $y = z = y^* = z^* = 0$ in our equations of motion. We make this choice by inspection, seeing that setting $y = y^* = 0$ is one possible solution (the other case, $y\neq 0$ we just handled).

The first equation of motion is then:

```{margin}
**Note:** The book uses $\xi$ here where we are using $x^*$.
```

$$x^* = \frac{1 - \pi_2}{\sigma^3}\left(x^* + \pi_2\right) + \frac{\pi_2}{\psi^3}\left(x^* - 1 + \pi_2\right)$$

where, with $y^* = 0$, $\sigma^3$ and $\psi^3$ are:

$$\begin{aligned}\sigma^3 &= \left\lvert x^* + \pi_2\right\rvert ^3 & \psi^3 &= \left\lvert x^* - 1 + \pi_2\right\rvert ^3\end{aligned}$$

Substituting these into the equation of motion:

$$0 = x^* - \frac{1 - \pi_2}{\left\lvert x^* + \pi_2\right\rvert ^3}\left(x^* + \pi_2\right) - \frac{\pi_2}{\left\lvert x^* - 1 + \pi_2\right\rvert ^3}\left(x^* - 1 + \pi_2\right)$$

We cannot cancel any of the terms because we don't know the sign of the cubic term on the bottom, since we took the square root of the respective vectors to find the magnitude. In any case, this equation is cubic in $x^*$, so it will have three roots for the nontrivial cases where $0 < \pi_2 < 1$. In the cases where $\pi_2 = 0$ or $\pi_2 = 1$, either $m_2$ or $m_1$ must be zero, which aren't very interesting.

There is no analytical solution to this equation, it must be solved numerically. There are many methods to solve the equation numerically, my suggestions are to use [`scipy.optimize.newton()`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.newton.html) in Python and [`fzero`](https://www.mathworks.com/help/matlab/ref/fzero.html) in Matlab. We will see how to use these functions in the next example.

In the meantime, it is useful to plot the solutions of this equation:

```{margin}
**Note:** The similar figure in the book has $m_2$ and $m_1$ reversed, which I'm pretty sure is a typo.
```

```{code-cell}
:tags: [remove-input]
import numpy as np
from scipy.optimize import newton
import matplotlib.pyplot as plt
plt.rc("font", size=20)
def collinear_lagrange(xstar, pi_2):
    return xstar - (1 - pi_2)/np.abs(xstar + pi_2)**3 * (xstar + pi_2) - pi_2 / np.abs(xstar - 1 + pi_2)**3 * (xstar - 1 + pi_2)


n_points = 1000
pi_2 = np.linspace(1e-5, 1.0-1e-5, 1000)
L_2 = newton(func=collinear_lagrange, x0=np.repeat(1, n_points), args=(pi_2,))
L_1 = newton(func=collinear_lagrange, x0=np.repeat(0, n_points), args=(pi_2,))
L_3 = newton(func=collinear_lagrange, x0=np.repeat(-1, n_points), args=(pi_2,))

fig, ax = plt.subplots(figsize=(12, 9))
ax.plot(pi_2, L_2, label="$L_2$")
ax.plot(pi_2, L_1, label="$L_1$")
ax.plot(pi_2, L_3, label="$L_3$")
ax.plot([0, 1], [1, 0], lw=1.0, color="silver", ls="--", label="$m_1$")
ax.plot([0, 1], [0, -1], lw=1.0, color="silver", ls="--", label="$m_2$")
ax.set_xticks(np.arange(0, 1.1, 0.1))
ax.set_yticks(np.arange(-1.5, 1.75, 0.25))
ax.grid()
ax.set_xlabel("$\pi_2$")
ax.set_ylabel("$x^*$")
ax.annotate("$m_2$", xy=(0.55, 0.5), ha="center", va="bottom")
ax.annotate("$m_1$", xy=(0.55, -0.5), ha="center", va="bottom")
ax.annotate("$L_2$", xy=(0.55, 1.25), ha="center", va="bottom", color="C0")
ax.annotate("$L_1$", xy=(0.55, 0.05), ha="center", va="bottom", color="C1")
ax.annotate("$L_3$", xy=(0.55, -1.25), ha="center", va="top", color="C2");
```

On this figure, the $x$ axis is $\pi_2$ and the $y$ axis is $x^*$. Remember that the nondimensional position of $x^*_{m_1} = -\pi_2$ and of $x^*_{m_2} = 1 + \pi_2$. For a given value of $\pi_2$, the mass ratio of $m_2$ to $m_1 + m_2$, we can locate the positions of $m_1$ and $m_2$ from the dashed gray lines on the graph.

There is also an S-curve shape which represents the solution of the equation for the $x^*$ position of the collinear Lagrange points. For a given value of $\pi_2$, we can see there are 3 solutions of the function, corresponding to the three Lagrange points for that system.

By convention, the Lagrange points are numbered such that $L_1$ lies between $m_1$ and $m_2$, $L_2$ lies to the right of $m_2$, and $L_3$ lies to the left of $m_1$. Thus, we can see on the figure that the upper part of the S-curve is the solution for $L_2$. Below $x^{*} = 1.0$, the solution is for $L_1$, since that lies between $m_1$ and $m_2$. Finally, below $x^{*} = -1.0$, the solution is for $L_3$.

The figure below plots the five Lagrange points in nondimensional coordinates as a function of the mass ratio $\pi_2$:

```{code-cell}
:tags: [remove-input]
%matplotlib agg
from scipy.optimize import newton
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.path as mpath
import matplotlib.animation as animation
from IPython.display import HTML

def collinear_lagrange(xstar, pi_2):
    return xstar - (1 - pi_2)/np.abs(xstar + pi_2)**3 * (xstar + pi_2) - pi_2 / np.abs(xstar - 1 + pi_2)**3 * (xstar - 1 + pi_2)

plt.ioff()
circle = mpath.Path.unit_circle()
wedge_1 = mpath.Path.wedge(90, 180)
wedge_2 = mpath.Path.wedge(270, 0)

verts = np.concatenate([circle.vertices, wedge_1.vertices[::-1, ...], wedge_2.vertices[::-1, ...]])
codes = np.concatenate([circle.codes, wedge_1.codes, wedge_2.codes])
center_of_mass = mpath.Path(verts, codes)

fig, ax = plt.subplots(figsize=(12, 9))
ax.set_xlim(-1.5, 1.5)
ax.set_ylim(-1.1, 1.1)
ax.set_aspect("equal")
ax.set_xlabel("$x^*$")
ax.set_ylabel("$y^*$")

cos = np.cos(np.linspace(0, np.pi, 100))
sin = np.sin(np.linspace(0, np.pi, 100))

(com,) = ax.plot(0, 0, 'k', marker=center_of_mass, markersize=15)
l = ax.axhline(0, color='k')

(m2_orb,) = ax.plot([], [], 'C0')
(m1_orb,) = ax.plot([], [], 'C1')
(equil,) = ax.plot([], [], 'k', ls="--", lw=1)

(L1_line,) = ax.plot([], [], 'rv', label="$L_1$", markersize=15)
(L2_line,) = ax.plot([], [], 'r^', label="$L_2$", markersize=15)
(L3_line,) = ax.plot([], [], 'rp', label="$L_3$", markersize=15)
(L4_line,) = ax.plot([], [], 'rX', label="$L_4$", markersize=15)
(L5_line,) = ax.plot([], [], 'rs', label="$L_5$", markersize=15)
(m1_line,) = ax.plot([], [], 'bo', label="$m_1$", markersize=15)
(m2_line,) = ax.plot([], [], 'go', label="$m_2$", markersize=15)

ann = ax.annotate("", xy=(1, 0.85), ha="center", va="center", fontsize=20)

ax.legend(bbox_to_anchor=(0, 1, 1, 0), loc="lower left", mode="expand", ncol=7)


def init():
    m2_orb.set_data([], [])
    m1_orb.set_data([], [])
    equil.set_data([], [])
    ann.set_text("")
    return (com, l, m2_orb, m1_orb, equil, ann)


def animate(pi_2):
    m_1 = -pi_2
    m_2 = 1 - pi_2
    m1_line.set_data(m_1, 0)
    m2_line.set_data(m_2, 0)
    x_2 = m_2 * cos
    y_2 = m_2 * sin
    x_1 = m_1 * cos
    y_1 = m_1 * sin
    m2_orb.set_data(np.hstack((x_2, x_2[::-1])), np.hstack((y_2, -y_2[::-1])))
    m1_orb.set_data(np.hstack((x_1, x_1[::-1])), np.hstack((y_1, -y_1[::-1])))
    L_2 = newton(func=collinear_lagrange, x0=1, args=(pi_2,))
    L_1 = newton(func=collinear_lagrange, x0=0, args=(pi_2,))
    L_3 = newton(func=collinear_lagrange, x0=-1, args=(pi_2,))
    L_4 = L_5 = 0.5 - pi_2
    L1_line.set_data(L_1, 0)
    L2_line.set_data(L_2, 0)
    L3_line.set_data(L_3, 0)
    L4_line.set_data(L_4, np.sqrt(3) / 2)
    L5_line.set_data(L_5, -np.sqrt(3) / 2)
    equil.set_data([m_1, L_4, m_2, L_5, m_1], [0, np.sqrt(3) / 2, 0, -np.sqrt(3) / 2, 0])
    ann.set_text(fr"$\pi_2$ = {pi_2:.4G}")

    return (m2_orb, m1_orb, equil, m1_line, m2_line, L1_line, L2_line, L3_line, L4_line, L5_line)

pi_2 = np.hstack((np.logspace(-5, -1, 25), np.linspace(0.1, 0.8, 50), np.logspace(-0.08, -4e-6, 25)))
anim = animation.FuncAnimation(
    fig, animate, init_func=init, frames=pi_2, blit=True
)
HTML(anim.to_jshtml())
```

## Lagrange Point Stability

As we discussed previously, gravity is a conservative force. As such, the force field can be defined in terms of a potential energy function. For the CR3BP, the pseudo-potential function in the rotating frame is given by {cite}`Koon2011`:

$$U(x^*, y^*) = -\frac{1 - \pi_2}{\sigma} - \frac{\pi_2}{\psi} - \frac{1}{2}\left[\left(1 - \pi_2\right)\sigma^2 + \pi_2 \psi^2\right]$$

A plot of this function is shown below, including the positions of the five Lagrange points, for $\pi_2 = 0.3$:

```{code-cell}
:tags: [remove-input, remove-output]
from myst_nb import glue
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm
from scipy.optimize import newton
pi_2 = 0.3
m_1 = -pi_2
m_2 = 1 - pi_2
x = np.linspace(-2, 2, 100)
y = np.linspace(-2, 2, 100)
X, Y = np.meshgrid(x, y)
r_1 = np.sqrt((X + pi_2)**2 + Y**2)
r_2 = np.sqrt((X - 1 + pi_2)**2 + Y**2)
U = -(1 - pi_2) / r_1 - pi_2 / r_2 - 0.5 * ((1 - pi_2) * r_1**2 + pi_2 * r_2**2)
U[U < -3] = -3

def collinear_lagrange(xstar, pi_2):
    return xstar - (1 - pi_2)/np.abs(xstar + pi_2)**3 * (xstar + pi_2) - pi_2 / np.abs(xstar - 1 + pi_2)**3 * (xstar - 1 + pi_2)

r_L45 = np.sqrt(0.5**2 + 3/4)
L_45 = -(1 - pi_2)/r_L45 - pi_2/r_L45 - 0.5 * ((1 - pi_2) * r_L45**2 + pi_2 * r_L45**2)

L_1 = newton(func=collinear_lagrange, x0=0, args=(pi_2,))
L_2 = newton(func=collinear_lagrange, x0=1, args=(pi_2,))
L_3 = newton(func=collinear_lagrange, x0=-1, args=(pi_2,))

r_1_L1 = L_1 - m_1
r_2_L1 = m_2 - L_1
U_L1 = -(1 - pi_2) / r_1_L1 - pi_2 / r_2_L1 - 0.5 * ((1 - pi_2) * r_1_L1**2 + pi_2 * r_2_L1**2)

r_1_L2 = L_2 - m_1
r_2_L2 = L_2 - m_2
U_L2 = -(1 - pi_2) / r_1_L2 - pi_2 / r_2_L2 - 0.5 * ((1 - pi_2) * r_1_L2**2 + pi_2 * r_2_L2**2)

r_1_L3 = m_1 - L_3
r_2_L3 = m_2 - L_3
U_L3 = -(1 - pi_2) / r_1_L3 - pi_2 / r_2_L3 - 0.5 * ((1 - pi_2) * r_1_L3**2 + pi_2 * r_2_L3**2)

fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
azim = -29.220779220779093
elev = 69.05844155844153
ax.view_init(elev, azim)
ax.set_zlim(-3, -1.5)
ax.axis('off')
ax.plot_surface(X, Y, U, rcount=100, ccount=100, cmap=cm.cividis, linewidth=0, antialiased=True, alpha=0.8)
ax.plot(L_1, 0, U_L1, 'rv', zorder=10, label="$L_1$")
ax.plot(L_2, 0, U_L2, 'r^', zorder=10, label="$L_2$")
ax.plot(L_3, 0, U_L3, 'rp', zorder=10, label="$L_3$")
ax.plot(0.5 - pi_2, np.sqrt(3)/2, L_45, 'rX', zorder=10, label="$L_4$")
ax.plot(0.5 - pi_2, -np.sqrt(3)/2, L_45, 'rs', zorder=10, label="$L_5$")
ax.legend()
glue("potential_function", fig, display=False)
```

```{glue:} potential_function
```

Using this figure, we can get a qualitative sense of the stability of the Lagrange points. Imagine that we turn the potential function upside-down, and put a marble on each of the Lagrange points. We can see that $L_4$ and $L_5$ are at the bottom of a bowl. Slight displacements of the marble will cause it to return to the initial position, so these points are considered **stable** Lagrange points.

Since the equilateral Lagrange points are stable, objects placed in a small orbit, usually called a **halo orbit**, around those points will tend to remain there. The criterion for stability is:

$$\frac{m_1}{m_2} + \frac{m_2}{m_1} \geq 25$$

```{margin}
Note that the figure shows the potential surface for $\pi_2 = 0.3$, which does not satisfy the stability criteria here for $L_4$ and $L_5$. We're plotting $\pi_2 = 0.3$ to exaggerate the shape of the potential function for clarity, but it will remain the same for all values of $\pi_2$.
```

which will be satisfied if $m_1/m_2>24.95994$ or $\pi_2 < 0.0385209$. In the Earth-Moon system, that ratio is $m_1/m_2 \approx 81.3$. However, in the Earth-Moon system, the $L_4$ and $L_5$ points are slightly destabilized by the influence of the sun. Nonetheless, there are clouds of dust which have collected at these points.

However, other pairs of $m_1$ and $m_2$ do have somewhat more stable $L_4$ and $L_5$ points, in particular, the orbit of Jupiter around the sun. There are groups of asteroids, called **trojan asteroids** that cluster around the stable Lagrange points in the orbit of Jupiter.

```{code-cell}
:tags: [remove-input, remove-output]
from myst_nb import glue
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
img = mpimg.imread('../images/InnerSolarSystem-en.png')
fig, ax = plt.subplots(figsize=(12, 12))
ax.axis('off')
ax.imshow(img)

n_pixels = img.shape[0]
sun = [300, 300]
jupiter = [133, 512]
x_S = sun[0]
y_S = sun[1]

x_J = jupiter[0] - sun[0]
y_J = jupiter[1] - sun[1]

m = (jupiter[1] - sun[1]) / (jupiter[0] - sun[0])
x_0 = (n_pixels - 10 - jupiter[1]) / m + jupiter[0]
ax.plot([sun[0], x_0], [sun[1], n_pixels - 10], lw=3, color="r")

r_J = np.sqrt(x_J**2 + y_J**2)
theta_J = np.arctan2(y_J, x_J)

arc = np.linspace(0, np.pi/3, 100)

x_T = r_J * np.cos(theta_J + np.pi/3) + 300
y_T = r_J * np.sin(theta_J + np.pi/3) + 300
ax.plot([sun[0], x_T], [sun[1], y_T], lw=3, color="r")
ax.annotate("$L_5$", xy=(x_T, y_T), ha="right", va="center", fontsize=30, color="r")

x_arc_T = 3*r_J/4 * np.cos(arc + theta_J) + 300
y_arc_T = 3*r_J/4 * np.sin(arc + theta_J) + 300
ax.plot(x_arc_T, y_arc_T, lw=3, color="r")
ax.annotate("60°", xy=(7*r_J/8*np.cos(theta_J + np.pi/6) + 300, 7*r_J/8*np.sin(theta_J + np.pi/6) + 300), fontsize=30, color='r', ha="center", va="center")

x_G = r_J * np.cos(theta_J - np.pi/3) + 300
y_G = r_J * np.sin(theta_J - np.pi/3) + 300
ax.plot([sun[0], x_G], [sun[1], y_G], lw=3, color="r")
ax.annotate("$L_4$", xy=(x_G, y_G), ha="left", va="top", fontsize=30, color="r")

x_arc_G = 3*r_J/4 * np.cos(theta_J - arc) + 300
y_arc_G = 3*r_J/4 * np.sin(theta_J - arc) + 300
ax.plot(x_arc_G, y_arc_G, lw=3, color="r")
ax.annotate("60°", xy=(7*r_J/8*np.cos(theta_J - np.pi/6) + 300, 7*r_J/8*np.sin(theta_J - np.pi/6) + 300), fontsize=30, color='r', ha="center", va="center")

glue("trojan_asteroids", fig, display=False)
```

```{glue:} trojan_asteroids
```

As you can see, there are clusters of asteroids at angles of $\pm 60^{\circ}$ from Jupiter, corresponding to the $L_4$ and $L_5$ Lagrange points!

On the other hand, $L_1$, $L_2$, and $L_3$ are all **saddle points**, meaning that the function increases when going in one axis, but decreases going in the other axis. This means that the three collinear Lagrange points are **unstable** and an object placed at one of those points, if perturbed, will diverge from the position.

Nonetheless, these are quite useful points for observation of the solar system. Several satellites have been placed at the $L_1$ point of the Earth-Sun system for solar observation, and the James Webb Space Telescope is planned to launch to the $L_2$ of the Earth-Sun system sometime this year.

$L_1$ and $L_2$ in the Earth-Sun system are about 1.5 million km towards the Sun and away from the Sun, starting at the Earth, respectively. $L_3$ lies on the other side of the Sun, and has long been the predicted location of a hidden planet, since it could not be observed from Earth prior to the advent of satellite observation. Now, of course, we know there is no planet at that location.

## References

```{bibliography} ../references.bib
:style: unsrt
:filter: docname in docnames
```
