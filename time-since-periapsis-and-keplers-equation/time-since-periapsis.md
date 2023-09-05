---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Python 3 (ipykernel)
  language: python
  name: python3
---

# Time Since Periapsis, Mean Anomaly, and Eccentric Anomaly

In the last chapter, we derived equations for the position of an object in a two-body system as a function of the true anomaly. However, humans don't really think in terms of true anomaly, we think in terms of time. The only place time appeared in the last chapter was in the calculation of the orbital period.

As we'll find in this chapter, the equations to relate the orbital position to time are **transcendental** for all but the circular orbit. This means we will need to use Newton's method to solve them. Initially, we will derive separate equations each for the elliptical, parabolic, and hyperbolic orbits. Then, we will combine these using a universal variable formulation.

## Time Since Periapsis

The goal of this section is to relate the time since periapsis, $t$, to an object's position in the orbit defined by the true anomaly, $\nu$. We know that the direct relationship between $t$ and $\nu$ is complex because the object speeds up near periapsis and slows down near apoapsis. This phenomenon is one of the insights from Kepler's second law, which states that equal areas are swept out in equal times.

Instead of trying to find this direct relationship between $t$ and $\nu$, we're going to take a different route that has three main steps:

1. Calculate the area that the object sweeps out inside the orbit during a time interval $t$
2. Calculate the area that the object sweeps out inside an imaginary circle around the true orbit during the same time interval
3. Relate these two areas to each other to find an indirect relationship between $t$ and $\nu$

Let's start with the first area inside the orbit.

### Swept Area Inside the Orbit

Since Kepler's second law says that equal areas are swept in equal times, the swept area is _directly proportional_ to the time. Let's define a variable to capture this idea and call it the **Mean anomaly**, $M_e$:

:::{math}
M_e = C t
:::

where $C$ is the constant of proporionality. For an elliptical orbit, the swept area is the elapsed fraction of the orbital period multiplied by the total area of the ellipse:

:::{math}
M_e = C t = \frac{1}{2} a b \frac{t}{T}
:::

where $a$ and $b$ are the semimajor and semiminor axes, and $T$ is the orbial period. This is really convenient because linear relationships are much easier to work with than non-linear relationships.

:::{margin}
We'll use the example of an ellipse here, but the procedure shown here is the similar for a parabola or hyperbola.
:::

### Swept Area Inside a Circumscribing Circle

Step two is to relate the true anomaly to a circle that touches the ellipse at either end of the major axis. The reason we use a circle for this is that we know the swept area of a circular sector is directly proportional to the included angle. Directly proportional relationships are very convenient. We can also think of creating this circle as _stretching_ the ellipse along its minor axis until it becomes a circle.

:::{margin}
The circle here is called an **circumscribing circle** because it is tangent to the ellipse at two points, on both ends of the major axis. These positions are also the periapsis and apoapsis.
:::

As we imagine stretching the ellipse into the circle, we also need to bring the object with us. The object will move along a line perpendicular to the major axis since we're only stretching in the minor axis direction. Once the object touches the circumscribing circle, we've defined a sector that is related to the original position of the object, and therefore to its true anomaly.

Let's define a variable called the **Eccentric area**, $A_E$, to be the area inside the cicrumscribing circle for the sector we just found:

:::{math}
A_E = a^2 \frac{E}{2}
:::

where $E$ is the included angle inside the circumscribing circle and $a$ is the radius of the circle and the semimajor axis of the ellipse.

### Relating the Two Areas Together

Now we've defined two areas:

1. The Mean anomaly, $M_e$, the swept area inside the orbit
2. The Eccentric area, $E$, the area of a circular sector on the circumscribing circle

We can turn the eccentric area into the mean anomaly by subtracting out the triangle from the origin to the focus and up to the circle, then squishing the remaining part back down into an ellipse.

The base of the triangle we want to subtract is the length from the origin to the focus, $ae$ and its height is $a\sin E$, so the area of the leftover part is:

:::{math}
\frac{1}{2} a^2 E - \frac{1}{2} a^2 e \sin E = \frac{1}{2} a^2\left(E - e \sin E\right)
:::

Then we need to scale this leftover area back into an ellipse so it matches the mean anomaly. To scale back into the ellipse we need to multiply the circle by a factor $b/a$:

:::{math}
\frac{1}{2}a b \left(E - e \sin E\right) = \frac{1}{2} a b \frac{t}{T}
:::


## An Alternative Interpretation

Recall the orbit equation, Eq. {eq}`eq:scalar-orbit-equation`, defined in terms of the true anomaly:

:::{math}
r = \frac{h^2}{\mu} \frac{1}{1 + e\cos\nu}
:::

We now want to relate the true anomaly, $\nu$, to time. The rate of change of the true anomaly, $\dot{\nu}$ is equal to the angular velocity of the position vector. This is exactly the azimuthal, also called the perpendicular, component of the velocity:

:::{math}
:label: eq:rate-of-change-of-true-anomaly
v_{\perp} = r \dot{\nu} = r \frac{d\nu}{dt}
:::

The $v_{\perp}$ term in Eq. {eq}`eq:rate-of-change-of-true-anomaly` makes the equation more complicated than it needs to be, so we'd like to replace it. A more convenient form of Eq. {eq}`eq:rate-of-change-of-true-anomaly` is found by using the specific angular momentum to replace $v_{\perp}$, since $h$ is constant:

:::{math}
:label:
h = r v_{\perp} = r^2\dot{\nu} \Rightarrow \frac{d\nu}{dt} = \frac{h}{r^2}
:::

Substituting the orbit equation to eliminate $r$ and separating variables, we find:

:::{math}
:label:
\frac{\mu^2}{h^3}dt = \frac{d\nu}{\left(1 + e\cos\nu\right)^2}
:::

Since $\mu$ and $h$ are constant, the left side can be directly integrated:

:::{math}
:label:
\frac{\mu^2}{h^3}\int_{t_p}^{t} dt = \int_{0}^{\nu}\frac{d\nu}{\left(1 + e\cos\nu\right)^2}
:::

where $t_p$ is defined as the **time since periapsis**. Remember that periapsis is when $\nu = 0$ by convention. Typically we will set $t_p = 0$, such that:

:::{math}
:label: eq:time-since-periapsis
\frac{\mu^2}{h^3}t = \int_{0}^{\nu}\frac{d\nu}{\left(1 + e\cos\nu\right)^2}
:::

The integral on the right-hand side of Eq. {eq}`eq:time-since-periapsis` can be found in standard tables of integrals {cite}`Gradshtein2007,Zwillinger2003`. There are three forms of the equation, depending on the value of $e$.

:::{margin}
In {cite}`Gradshtein2007` (available [here](http://fisica.ciens.ucv.ve/~svincenz/TISPISGIMR.pdf)), the appropriate integrals are found on pages 172 and 173, No. 2.554-3 and related integrals for Eqs. {eq}`eq:time-since-periapsis-rhs-e-lt-1` and {eq}`eq:time-since-periapsis-rhs-e-gt-1`. In {cite}`Zwillinger2003` (available [here](https://www.google.com/books/edition/CRC_Standard_Mathematical_Tables_and_For/gE_MBQAAQBAJ?hl=en&gbpv=1&pg=PA434&printsec=frontcover)), the appropriate integrals are found on pages 433 and 434, No. 354 and 324 for Eqs. {eq}`eq:time-since-periapsis-rhs-e-lt-1` and {eq}`eq:time-since-periapsis-rhs-e-gt-1`. I couldn't find the form for {eq}`eq:time-since-periapsis-rhs-e-eq-1` in those references. Note that $a = 1$ and $b = e$ to relate the reference equations to Eq. {eq}`eq:time-since-periapsis`.
:::

:::{math}
:label: eq:time-since-periapsis-rhs-e-lt-1
\int\frac{d\nu}{\left(1 + e\cos \nu\right)^2} = \frac{1}{\left(1 - e^2\right)^{3/2}}\left[2\tan^{-1}\left(\sqrt{\frac{1 - e}{1 + e}}\tan\frac{\nu}{2}\right)-\frac{e\sqrt{1 - e^2}\sin \nu}{1 + e \cos \nu}\right]
:::

In Eq. {eq}`eq:time-since-periapsis-rhs-e-lt-1`, $e < 1$, so it will apply for circular and elliptical orbits.

:::{math}
:label: eq:time-since-periapsis-rhs-e-eq-1
\int\frac{d\nu}{\left(1 + e\cos \nu\right)^2} = \left(\frac{1}{2}\tan \frac{\nu}{2}+\frac{1}{6}\tan^{3}\frac{\nu}{2}\right)
:::

In Eq. {eq}`eq:time-since-periapsis-rhs-e-eq-1`, $e = 1$, so it will apply for parabolic trajectories.

:::{math}
:label: eq:time-since-periapsis-rhs-e-gt-1
\int\frac{d\nu}{\left(1 + e\cos \nu\right)^2} = \frac{1}{\left(e^2 - 1\right)^{3/2}}\left[\frac{e\sqrt{e^2 - 1}\sin \nu}{1 + e\cos \nu} - \ln\left(\frac{\sqrt{e + 1} + \sqrt{e - 1}\tan\frac{\nu}{2}}{\sqrt{e + 1} - \sqrt{e - 1}\tan\frac{\nu}{2}}\right)\right]
:::

In Eq. {eq}`eq:time-since-periapsis-rhs-e-gt-1`, $e > 1$, so it will apply for hyperbolic trajectories.

When Eq. {eq}`eq:time-since-periapsis` is combined with one of Eq. {eq}`eq:time-since-periapsis-rhs-e-lt-1`, Eq. {eq}`eq:time-since-periapsis-rhs-e-eq-1`, or Eq. {eq}`eq:time-since-periapsis-rhs-e-eq-1`, we have a relationship where time is related to the true anomaly.

## Mean and Eccentric Anomalies

As we can see, Eqs. {eq}`eq:time-since-periapsis-rhs-e-lt-1`, {eq}`eq:time-since-periapsis-rhs-e-eq-1`, and {eq}`eq:time-since-periapsis-rhs-e-gt-1` are rather complicated functions of the true anomaly. To simplify handling them, we are going to define two other anomalies:

1. **Mean anomaly**
2. **Eccentric anomaly**

:::{note}
Conceptually, it is easiest to understand the mean and eccentric anomalies in the context of an elliptical orbit. Just remember that they also apply to parabolic and hyperbolic trajectories as well.
:::

For an ellipse, we know that the angular speed of the spacecraft is a function of the true anomaly. This is a result of Kepler's second law, that equal areas are swept in equal times—the spacecraft must move faster near periapsis and slower near apoapsis to sweep the same area in a given time interval. Thus, the rate of change of the true anomaly is not constant!

:::{margin}
Such a circle is said to **circumscribe** the ellipse.
:::

The **mean anomaly** for an ellipse is defined such that it is a constant rate that gives the same period as the true anomaly. If we draw a circle that touches the ellipse at periapsis and apoapsis, then the rate of change of the mean anomaly is the rate at which a point must move around this circle to meet the spacecraft at periapsis and apoapsis.

The **eccentric anomaly** is defined slightly differently. Imagine the same circle that touches the ellipse at periapsis and apoapsis. Now draw a line perpendicular to the semimajor axis from the orbit to the circle, at the current true anomaly. The angle to the point defined in this way on the circle is the eccentric anomaly.

The three anomalies: true, mean, and eccentric, are shown in {numref}`fig:true-mean-eccentric-anomalies`.

```{code-cell} ipython3
:tags: [remove-cell]
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from scipy.optimize import newton
plt.ioff()
fig, ax = plt.subplots(figsize=(9, 9))
ax.set_xlim((-1.1, 1.1))
ax.set_ylim((-1.1, 1.1))
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.xaxis.set_tick_params(bottom=False, top=False, which="both", labelbottom=False)
ax.yaxis.set_tick_params(left=False, right=False, which="both", labelleft=False)

# Move remaining spines to the center
ax.spines["bottom"].set_position("zero")  # spine for xaxis
ax.spines["left"].set_position("zero")  # spine for yaxis
a = 1
e = 0.7
p = a * (1 - e**2)
b = a * np.sqrt(1 - e**2)
r_a = p / (1 - e)
r_p = 2 * a - r_a
M_e = np.linspace(0, 2 * np.pi, 300)
Me_ann = ax.annotate("True anomaly", xy=(a*e, 0.21), ha="center", va="bottom", fontsize=20, color="C0")
Me_ann = ax.annotate("Mean anomaly", xy=(-0.01, -0.01), ha="right", va="top", fontsize=20, color="C1")
Me_ann = ax.annotate("Eccentric anomaly", xy=(0, 0.41), ha="center", va="bottom", fontsize=20, color="C2")

def kepler(E, M_e, e):
    """Kepler's equation, to be used in a Newton solver."""
    return E - e * np.sin(E) - M_e


def d_kepler_d_E(E, M_e, e):
    """The derivative of Kepler's equation, to be used in a Newton solver.

    Note that the argument M_e is unused, but must be present so the function
    arguments are consistent with the kepler function.
    """
    return 1 - e * np.cos(E)


E = newton(func=kepler, fprime=d_kepler_d_E, x0=np.ones_like(M_e) * np.pi, args=(M_e, e))
nu = (2 * np.arctan(np.sqrt((1 + e) / (1 - e)) * np.tan(E / 2))) % (2 * np.pi)
r = p / (1 + e * np.cos(nu))
x = a * e + r * np.cos(nu)
y = r * np.sin(nu)
(ellipse,) = ax.plot(x, y)
(circle,) = ax.plot(a * np.cos(M_e), a * np.sin(M_e))
(ecc_line,) = ax.plot([], [], "ko-")
(spacecraft,) = ax.plot([], [], color="C0", marker="o", ls="-")
(true_anomaly_arc,) = ax.plot([], [], color="C0", ls="-")
(mean_anomaly,) = ax.plot([], [], color="C1", marker="o", ls="-")
(mean_anomaly_arc,) = ax.plot([], [], color="C1", ls="-")
(eccentric_anomaly,) = ax.plot([], [], color="C2", marker="o", ls="-")
(eccentric_anomaly_arc,) = ax.plot([], [], color="C2", ls="-")


def init():
    spacecraft.set_data([], [])
    mean_anomaly.set_data([], [])
    eccentric_anomaly.set_data([], [])
    ecc_line.set_data([], [])
    true_anomaly_arc.set_data([], [])
    mean_anomaly_arc.set_data([], [])
    eccentric_anomaly_arc.set_data([], [])
    return (ellipse, circle, spacecraft, mean_anomaly, eccentric_anomaly, ecc_line, true_anomaly_arc, mean_anomaly_arc, eccentric_anomaly_arc)


def animate(t):
    E = newton(func=kepler, fprime=d_kepler_d_E, x0=np.pi, args=(t, e))
    M_e = t
    nu = (2 * np.arctan(np.sqrt((1 + e) / (1 - e)) * np.tan(E / 2))) % (2 * np.pi)
    r = p / (1 + e * np.cos(nu))
    spacecraft.set_data([a * e, a * e + r * np.cos(nu)], [0, r * np.sin(nu)])
    mean_anomaly.set_data([0, a * np.cos(M_e)], [0, a * np.sin(M_e)])
    eccentric_anomaly.set_data([0, a * np.cos(E)], [0, a * np.sin(E)])
    ecc_line.set_data([a * np.cos(E), a * np.cos(E)], [r * np.sin(nu), a * np.sin(E)])

    nu_arc = np.linspace(0, nu, 50)
    true_anomaly_arc.set_data(a * e + 0.2 * np.cos(nu_arc), 0.2 * np.sin(nu_arc))

    Me_arc = np.linspace(0, M_e, 50)
    mean_anomaly_arc.set_data(0.1 * np.cos(Me_arc), 0.1 * np.sin(Me_arc))

    ecc_arc = np.linspace(0, E, 50)
    eccentric_anomaly_arc.set_data(0.4 * np.cos(ecc_arc), 0.4 * np.sin(ecc_arc))
    return (ecc_line, spacecraft, mean_anomaly, eccentric_anomaly, true_anomaly_arc, mean_anomaly_arc, eccentric_anomaly_arc)

anim = animation.FuncAnimation(
    fig, animate, init_func=init, frames=M_e, blit=True, interval=16
)
from IPython.display import HTML
from myst_nb import glue
glue("true-mean-eccentric-anomalies", HTML(anim.to_jshtml()), display=False)
```

:::{glue:figure} true-mean-eccentric-anomalies
:name: fig:true-mean-eccentric-anomalies

The true, mean, and eccentric anomalies for an elliptical orbit. The true anomaly is shown in blue, the mean anomaly is shown in orange, and the eccentric anomaly is shown in green. The mean anomaly proceeds around the orange circle at a constant rate, while the rates of the true and eccentric anomalies vary with position. Nonetheless, they all meet at periapsis and apoapsis. Note the vertical line connecting the true and eccentric anomalies.
:::

(sec:time-since-periapsis-solution-procedures)=

## Solution Procedures

There are now two cases that we want to consider:

1. We know the current true anomaly and want to find the time since periapsis
2. We know the current time since periapsis and want to know the true anomaly

Each case is solved slightly differently, and the equations depend on the type of trajectory, so this will just be a general overview. Specific solutions for each type of trajectory will be in the following sections.

### Given True Anomaly, Find Time Since Periapsis

1. Use the true anomaly to find the eccentric anomaly
2. Use the eccentric anomaly to find the mean anomaly
3. Use the mean anomaly to find the time since periapsis

### Given Time Since Periapsis, Find True Anomaly

1. Use the time since periapsis to find the mean anomaly
2. Use the mean anomaly to find the eccentric anomaly
3. Use the eccentric anomaly to find the true anomaly
