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

# Application of the CR3BP: Lagrange Points

The equations of motion of the circular restricted three body problem (CR3BP) were shown in Eq. {eq}`eq:non-dim-scalar-eom-cr3bp`. These non-dimensional equations of motion do not have a general analytical solution.

:::{margin}
Lagrange himself called them **libration points** so you will see them called that too.
:::

However, there are a set of five points for which the tertiary mass is in equilibrium with respect to the primary and secondary masses. An object placed at one of the equilibrium points will, if it is not perturbed, remain at that location indefinitely. These locations are called **Lagrange Points**.

According to the conditions for equilibrium, the acceleration and velocity components at the Lagrange points are zero:

:::{math}
:label: eq:equilibrium-conditions-lagrange-points
\dot{x}^* = \dot{y}^* = \dot{z}^* = 0 \qquad \text{and} \qquad \ddot{x}^* = \ddot{y}^* = \ddot{z}^* = 0
:::

and likewise for the dimensional coordinates as well. Plugging these conditions in to the equations of motion, we find:

:::{math}
:label: eq:non-dim-equilibrium-eom-lagrange
\begin{aligned}
  -x^* &= -\frac{1 - \pi_2}{\sigma^3}\left(x^* + \pi_2\right) - \frac{\pi_2}{\psi^3}\left(x^* - 1 + \pi_2\right) \\
  -y^* &= -\frac{1 - \pi_2}{\sigma^3} y^* - \frac{\pi_2}{\psi^3}y^* \\
  0 &= \left(-\frac{1 - \pi_2}{\sigma^3} - \frac{\pi_2}{\psi^3}\right)z^*
\end{aligned}
:::

In the last equation, for $z^*$, the terms in the parentheses are both greater than zero. Therefore, there is no way for them to cancel each other out, and the only way for the equation to be satisfied is if $z^* = 0$. Thus, the Lagrange points lie in the orbital plane.

Now, we need to solve for the $x^*$ and $y^*$ coordinates of the Lagrange points. There are two conditions that we need to consider, since they end up with different solutions:

1. $y^* \neq 0$, giving the so-called **equilateral Lagrange points**
2. $y^* = 0$, giving the so-called **collinear Lagrange points**

The collinear Lagrange points lie along the $x^*$ axis, between $m_1$ and $m_2$. The equilateral Lagrange points form an equilateral triangle with $m_1$ and $m_2$ as two of the corners and sides of length $r_{12}$.

## Equilateral Lagrange Points

:::{margin}
Remember that $z^*$ is zero for all the equilibrium points.
:::

To find the equilateral Lagrange points, we assume $y^*\neq 0$. Now we have 2 equations and 2 unknowns. Since $y^*\neq 0$, the $y^*$ in the second equation of motion (Eq. {eq}`eq:non-dim-equilibrium-eom-lagrange`) will cancel from both sides, and we end up with:

:::{math}
:label: eq:y-star-equilateral-lagrange
1 = \frac{1 - \pi_2}{\sigma_3} + \frac{\pi_2}{\psi^3}
:::

The equation for $x^*$ in Eq. {eq}`eq:non-dim-equilibrium-eom-lagrange` we see the $\left(1 - \pi_2\right)/\sigma^3$ term, so let's solve the $y^*$ equation for that and plug into the $x^*$ equation:

:::{math}
:label: eq:x-star-equilateral-lagrange
x^{*} = \left(1 - \frac{\pi_2}{\psi^3}\right)\left(x^* + \pi_2\right) + \frac{\pi_2}{\psi^3}\left(x^* - 1 + \pi_2\right)
:::

Simplifying, we find:

:::{math}
:label: eq:psi-equilateral-lagrange
\psi^3 = 1
:::

Then we can use the definition of $\psi$ to find $r_2$ in dimensional coordinates:

:::{math}
:label: eq:r_2-equilateral-lagrange
\psi = \frac{\mag{\vector{r}*2}}{r*{12}} \Rightarrow r_2 = r_{12}
:::

Plugging the result of Eq. {eq}`eq:psi-equilateral-lagrange` back into Eq. {eq}`eq:y-star-equilateral-lagrange` equation, we find:

:::{math}
:label: eq:sigma-equilateral-lagrange
\sigma^3 = 1
:::

Then we can use the definition of $\sigma$ to find $r_1$ in dimensional coordinates:

:::{math}
:label: eq:r_1-equilateral-lagrange
\sigma = \frac{\mag{\vector{r}*1}}{r*{12}} \Rightarrow r_1 = r_{12}
:::

Since if $a = b$ and $b = c$, then $a = c$, we find:

:::{math}
:label: eq:equilateral-lagrange-distances
r_1 = r_2 = r_{12}\qquad \text{and}\qquad \psi = \sigma
:::

for the *equilateral Lagrange points*. Eq. {eq}`eq:equilateral-lagrange-distances` shows that the distance from $m_1$ to $m$ is the same as the distance from $m_2$ to $m$ and from $m_1$ to $m_2$. This defines an equilateral triangle, giving these Lagrange points their name.

From the definition of $\vector{\sigma}$ and $\vector{\psi}$, we can take their magnitudes and equate them to solve for the values of $x^*$ and $y^{*}$ at the equilibrium points:

:::{math}
:label: eq:sigma-psi-equilateral-lagrange
\begin{aligned}
  \sigma^2 &= \mag{\vector{\sigma}}^2 = \left(x^{*} + \pi_2\right)^2 + \left(y^*\right)^2 \\
  \psi^2 &= \mag{\vector{\psi}}^2 = \left(x^{*} - 1 + \pi_2\right)^2 + \left(y^*\right)^2
\end{aligned}
:::

where we have also used the fact that $z^* = 0$ for the Lagrange points. Using the result from Eq. {eq}`eq:equilateral-lagrange-distances` that $\sigma = \psi$ for the equilateral points, we find:

:::{math}
:label: eq:x-star-y-star-equilateral-lagrange
\begin{aligned}
  x^{*} &= \frac{1}{2} - \pi_2 \\
  y^* &= \pm \frac{\sqrt{3}}{2}
\end{aligned}
:::

The equilateral Lagrange points are given the symbols $L_4$ and $L_5$, for the positive and negative $y^*$ values, respectively:

:::{math}
:label: eq:equilateral-lagrange-points
\begin{aligned}
  &L_4: & x^* &= \frac{1}{2} - \pi_2 & y^*&= \frac{\sqrt{3}}{2} \\
  &L_5: & x^* &= \frac{1}{2} - \pi_2 & y^*&= -\frac{\sqrt{3}}{2}
\end{aligned}
:::

To convert these to dimensional $x$ and $y$ coordinates, you should multiply by $r_{12}$.

## Collinear Lagrange Points

For the collinear Lagrange points, we set $y = z = y^{*} = z^* = 0$ in the equations of motion, Eq. {eq}`eq:non-dim-scalar-eom-cr3bp`. We make this choice by inspection, seeing that setting $y = y^{*} = 0$ is one possible solution (the other case, $y^*\neq 0$ we just handled).

This leaves only the $x^*$ equation of motion, since the other two are trivially $0=0$. For $x^*$, we have from Eq. {eq}`eq:non-dim-equilibrium-eom-lagrange`:

:::{math}
:label: eq:x-star-collinear-lagrange
x^{*} = \frac{1 - \pi_2}{\sigma^3}\left(x^* + \pi_2\right) + \frac{\pi_2}{\psi^3}\left(x^* - 1 + \pi_2\right)
:::

:::{margin}
The vectors $\vector{\sigma}$ and $\vector{\psi}$ are the non-dimensional versions of the vectors from $m_1$ and $m_2$ to $m$.
:::

The terms $\sigma^3$ and $\psi^3$ in the bottom of both terms are found by cubing the magnitude of the vectors $\vector{\sigma}$ and $\vector{\psi}$. To find the vector magnitude, we necessarily have to take the square root, so we do not know the sign of the magnitude. Cubing a negative number will result in another negative and cubing a positive number will result in another positive.

Therefore, we do not know what the sign of $\sigma^3$ or $\psi^3$ will be, we have to include that as part of the solution of this equation. Cubing the magnitudes of $\vector{\sigma}$ and $\vector{psi}$ from Eq. {eq}`eq:non-dim-r-vectors-cr3bp` with $y^* = 0$ for the collinear points, we find:

:::{math}
:label: eq:sigma-psi-collinear-lagrange
\begin{aligned}
  \sigma^3 &= \left\lvert x^{*} + \pi_2\right\rvert ^3 & \psi^3 &= \left\lvert x^* - 1 + \pi_2\right\rvert ^3
\end{aligned}
:::

where the single vertical lines indicate that we're taking the absolute value. Substituting these into Eq. {eq}`eq:x-star-collinear-lagrange`, we find:

:::{math}
:label: eq:collinear-lagrange-solution
0 = x^{*} - \frac{1 - \pi_2}{\left\lvert x^* + \pi_2\right\rvert ^3}\left(x^* + \pi_2\right) - \frac{\pi_2}{\left\lvert x^* - 1 + \pi_2\right\rvert ^3}\left(x^* - 1 + \pi_2\right)
:::

We cannot cancel any of the terms because we don't know the sign of the cubic term on the bottom.

This equation is cubic in $x^*$, so it will have three separate values of $x^*$ that solve the equation, as long as $0 < \pi_2 < 1$. In the cases where $\pi_2 = 0$ or $\pi_2 = 1$, either $m_2$ or $m_1$ must be zero, which aren't very interesting.

There is no analytical solution to this equation, it must be solved numerically. There are many methods to solve the equation numerically, my suggestions are to use [`scipy.optimize.newton()`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.optimize.newton.html) in Python and [`fzero`](https://www.mathworks.com/help/matlab/ref/fzero.html) in Matlab. We will see how to use these functions in the [next example](./Lagrange-points-example.ipynb).

In the meantime, {numref}`fig:collinear-lagrange-solution` shows the solution of Eq. {eq}`eq:collinear-lagrange-solution`:

```{code-cell}
:tags: [remove-input, remove-output]
import numpy as np
from scipy.optimize import newton
import matplotlib.pyplot as plt
from myst_nb import glue
plt.rc("font", size=20)


def collinear_lagrange(xstar, pi_2):
    return xstar - (1 - pi_2)/np.abs(xstar + pi_2)**3 * (xstar + pi_2) - pi_2 / np.abs(xstar - 1 + pi_2)**3 * (xstar - 1 + pi_2)


n_points = 1000
pi_2 = np.linspace(1e-5, 1.0-1e-5, n_points)
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
ax.annotate("$L_3$", xy=(0.55, -1.25), ha="center", va="top", color="C2")
glue("collinear-lagrange-solution", fig, display=False);
```

:::{glue:figure} collinear-lagrange-solution
:name: fig:collinear-lagrange-solution

The solutions of Eq. {eq}`eq:collinear-lagrange-solution`, showing the dimensionless positions of the collinear Lagrange points as a function of the dimensionless mass.
:::

On this figure, the $x$ axis is $\pi_2$ and the $y$ axis is $x^*$. For a given value of $\pi_2$, we can locate the three values of $x^*$ that solve the equation. The gray dashed lines give the corresponding positions of $m_1$ and $m_2$ at the given value of $\pi_2$.

The solutions for $x^*$ for the collinear Lagrange points lie on the S-curve shape. For a given value of $\pi_2$, we can see there are 3 solutions of the function, corresponding to the three collinear Lagrange points for that system.

By convention, the Lagrange points are numbered such that $L_1$ lies between $m_1$ and $m_2$, $L_2$ lies to the right of $m_2$, and $L_3$ lies to the left of $m_1$. Thus, we can see on the figure that the upper part of the S-curve is the solution for $L_2$. Below $x^{*} = 1.0$, the solution is for $L_1$, since that lies between $m_1$ and $m_2$. Finally, below $x^{*} = -1.0$, the solution is for $L_3$.

{numref}`fig:lagrange-points-animation` plots the five Lagrange points in non-dimensional coordinates as a function of the mass ratio $\pi_2$.

```{code-cell}
:tags: [remove-input, remove-output]
from scipy.optimize import newton
import numpy as np
from myst_nb import glue
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
glue("lagrange-points-animation", HTML(anim.to_jshtml()), display=False)
```

:::{glue:figure} lagrange-points-animation
:name: fig:lagrange-points-animation

Animation showing the position of the five Lagrange points as the value of $\pi_2$ goes from 0 to 1.
:::

{numref}`fig:lagrange-points-animation` shows that the solution of the equations of motion for the equilibrium points is symmetrical. We chose $m_1$ to be the larger mass at the start of the problem, but we can interchange $m_1$ and $m_2$ without any problems.

For the Earth-Moon system, the value of $\pi_2$ is approximately 0.012.

## Lagrange Point Stability

Although all the Lagrange points are equilibrium points, they may not be *stable* equilibrium points. Stability is the ability of the system to return to its initial position after being perturbed.

To analyze the stability of the Lagrange points, we will use the potential energy function for the CR3BP.

As we discussed previously, gravity is a conservative force. As such, the force field can be defined in terms of a potential energy function. For the CR3BP, the pseudo-potential function in the rotating frame is given by Koon et al. {cite}`Koon2011`:

:::{math}
:label: eq:pseudo-potential-energy-cr3bp
U(x^*, y^*) = -\frac{1 - \pi_2}{\sigma} - \frac{\pi_2}{\psi} - \frac{1}{2}\left[\left(1 - \pi_2\right)\sigma^2 + \pi_2 \psi^2\right]
:::

A plot of this function is shown in {numref}`fig:pseudo-potential-energy-cr3bp`, including the positions of the five Lagrange points, for $\pi_2 =$ 0.3.

```{code-cell}
:tags: [remove-input, remove-output]
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm
from scipy.optimize import newton
from myst_nb import glue
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

fig = plt.figure(figsize=(12, 12))
ax = fig.add_subplot(111, projection='3d')
azim = -29.220779220779093
elev = 69.05844155844153
ax.view_init(elev, azim)
ax.set_zlim(-3, -1.5)
ax.axis('off')
ax.plot_surface(X, Y, U, rcount=100, ccount=100, cmap=cm.cividis, linewidth=0, antialiased=True, alpha=0.8)
ax.plot(L_1, 0, U_L1, 'rv', zorder=10, label="$L_1$", markersize=15)
ax.plot(L_2, 0, U_L2, 'r^', zorder=10, label="$L_2$", markersize=15)
ax.plot(L_3, 0, U_L3, 'rp', zorder=10, label="$L_3$", markersize=15)
ax.plot(0.5 - pi_2, np.sqrt(3)/2, L_45, 'rX', zorder=10, label="$L_4$", markersize=15)
ax.plot(0.5 - pi_2, -np.sqrt(3)/2, L_45, 'rs', zorder=10, label="$L_5$", markersize=15)
ax.legend()
glue("pseudo-potential-energy-cr3bp", fig, display=False)
```

:::{glue:figure} pseudo-potential-energy-cr3bp
:name: fig:pseudo-potential-energy-cr3bp

The pseudo-potential energy function in the rotation reference frame used for the CR3BP, with $\pi_2 =$ 0.3. The five Lagrange points for this system are labeled on the figure.
:::

Using this figure, we can get a qualitative sense of the stability of the Lagrange points. Imagine that we turn the potential function upside-down, and put a marble on each of the Lagrange points.

We can see that $L_4$ and $L_5$ are at the bottom of a bowl. Slight displacements of the marble will cause it to return to the initial position, so these points are considered **stable** Lagrange points.

On the other hand, $L_1$, $L_2$, and $L_3$ are saddle points on the potential energy surface. This means that slight displacements will cause the object's position to diverge from the equilibrium point over time.

### The Equilateral Lagrange Points

Since the equilateral Lagrange points are stable, objects placed in a small orbit, usually called a **halo orbit**, around those points will tend to remain there. The criterion for stability is:

:::{math}
:label: eq:lagrange-point-stability-criterion
\frac{m_1}{m_2} + \frac{m_2}{m_1} \geq 25
:::

:::{margin}
Note that {numref}`fig:pseudo-potential-energy-cr3bp` shows the potential surface for $\pi_2 = 0.3$, which does not satisfy the numerical stability criteria here for $L_4$ and $L_5$ from Eq. {eq}`eq:lagrange-point-stability-criterion`. We're plotting $\pi_2 = 0.3$ to exaggerate the shape of the potential function for clarity.
:::

which will be satisfied if $m_1/m_2>24.95994$ or $\pi_2 < 0.0385209$. In the Earth-Moon system, that ratio is $m_1/m_2 \approx 81.3$, so $L_4$ and $L_5$ are nominally stable. However, the $L_4$ and $L_5$ points for the Earth-Moon system are slightly destabilized by the influence of the sun and they aren't completely stable. Nonetheless, there are clouds of dust which have collected at these points because they are kinda stable.

Other pairs of $m_1$ and $m_2$ do have somewhat more stable $L_4$ and $L_5$ points. In particular, the orbit of Jupiter around the sun has stable equilateral Lagrange points. There are groups of asteroids, called **Trojan asteroids** that cluster around the stable Lagrange points in the orbit of Jupiter, as shown in {numref}`fig:trojan-asteroids-jupiter`.

```{code-cell}
:tags: [remove-input, remove-output]
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
from myst_nb import glue

plt.rcdefaults()

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
glue("trojan-asteroids-jupiter", fig, display=False)
```

:::{glue:figure} trojan-asteroids-jupiter
:name: fig:trojan-asteroids-jupiter

The Trojan and the Greek asteroids are clusters of asteroids that have collected at the stable $L_4$ and $L_5$ Lagrange points in the Sun-Jupiter system.
:::

### The Collinear Lagrange Points

The collinear Lagrange points, $L_1$, $L_2$, and $L_3$ are all **saddle points** in {numref}`fig:pseudo-potential-energy-cr3bp`, meaning that the function increases when going in one axis, but decreases going in the other axis. This means that the three collinear Lagrange points are **unstable** and an object placed at one of those points, if perturbed, will diverge from the position.

Nonetheless, these are quite useful points for observation of the solar system. Several satellites have been placed at the $L_1$ point of the Earth-Sun system for solar observation, and the James Webb Space Telescope (JWST) is located at the $L_2$ point in the Earth-Sun system specifically to avoid sunlight interefering with observations.

These satellites orbit around the unstable Lagrange points in a [Lissajous orbit](https://en.wikipedia.org/wiki/Lissajous_orbit). This type of orbit requires a very small amount of propulsion onboard the satellite to keep position, but the orbit can last for a very long time with only a little fuel. One example is the [Wilkinson Microwave Anisotropy Probe](https://en.wikipedia.org/wiki/Wilkinson_Microwave_Anisotropy_Probe) (WMAP) which was sent to the $L_2$ point in the Earth-Sun system to study the [Cosmic microwave background](https://en.wikipedia.org/wiki/Cosmic_microwave_background). The trajectory of WMAP is shown in {numref}`fig:wmap-trajectory`.

:::{figure} ../images/wmap-trajectory.gif
:name: fig:wmap-trajectory

The trajectory of the [Wilkinson Microwave Anisotropy Probe](https://en.wikipedia.org/wiki/Wilkinson_Microwave_Anisotropy_Probe) (WMAP) as viewed from Earth. Note the distance in the bottom of the animation, showing the satellite as approximately 1.5 million km from the earth. [Phoenix7777](https://commons.wikimedia.org/wiki/File:Animation_of_Wilkinson_Microwave_Anisotropy_Probe_trajectory_-_Viewd_from_Earth.gif), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), via Wikimedia Commons.
:::

Another example is the JWST, mentioned previously. JWST has a simpler [halo orbit](https://en.wikipedia.org/wiki/Halo_orbit) around $L_2$. The orbit of JWST is shown in {numref}`fig:jwst-trajectory`.

:::{figure} ../images/jwst-trajectory.gif
:name: fig:jwst-trajectory

The trajectory of the [James Webb Space Telescope](https://en.wikipedia.org/wiki/James_Webb_Space_Telescope) (JWST) as viewed from above the ecliptic plane with Earth fixed. Note again the distance in the bottom of the animation, showing the satellite as approximately 1.5 million km from the earth. [Phoenix7777](https://commons.wikimedia.org/wiki/File:Animation_of_James_Webb_Space_Telescope_trajectory_-_Polar_view.gif), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), via Wikimedia Commons.
:::

$L_1$ and $L_2$ in the Earth-Sun system are about 1.5 million km towards the Sun and away from the Sun, starting at the Earth, respectively. $L_3$ lies on the other side of the Sun, and has long been the predicted location of a hidden planet, since it could not be observed from Earth prior to the advent of satellite observation. Now, of course, we know there is no planet at that location.
