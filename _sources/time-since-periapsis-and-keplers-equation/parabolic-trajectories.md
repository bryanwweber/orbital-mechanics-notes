# Parabolic Trajectories ($e = 1$)

Combining Eq. {eq}`eq:time-since-periapsis` and Eq. {eq}`eq:time-since-periapsis-rhs-e-eq-1` results in:

:::{math}
:label: eq:time-since-periapsis-parabola
\frac{\mu^2}{h^3}t = \frac{1}{2}\tan\frac{\nu}{2} + \frac{1}{6}\tan^3\frac{\nu}{2}
:::

We define the left hand side of Eq. {eq}`eq:time-since-periapsis-parabola` as $M_p$, the mean anomaly of the parabolic trajectory:

:::{math}
:label: eq:mean-anomaly-parabola
M_p = \frac{\mu^2}{h^3}t
:::

Eq. {eq}`eq:time-since-periapsis-parabola` is known as **Barker's equation** and gives us the time since periapsis in terms of the true anomaly. If, instead, we know the time since periapsis and want to solve for the true anomaly, we need to solve the cubic equation {cite}`Meire1985`:

:::{math}
:label:
0 = \frac{1}{2}\tan\frac{\nu}{2} + \frac{1}{6}\tan^3\frac{\nu}{2} - M_p
:::

which has one real root:

:::{math}
:label:
\tan\frac{\nu}{2} = z - \frac{1}{z}
:::

where:

:::{math}
:label:
z = \sqrt[3]{3M_p + \sqrt{1 + \left(3 M_p\right)^2}}
:::
