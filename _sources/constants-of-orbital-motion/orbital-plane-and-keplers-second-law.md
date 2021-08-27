# Orbital Plane and Kepler's Second Law

The two vectors $\vector{r}$ and $\dot{\vector{r}}$ define a plane called the **orbital plane**. The angular momentum vector is perpendicular to this plane. The unit vector normal to the plane is:

:::{math}
:label: eq:orbital-plane-unit-vector
\uvec{h} = \frac{\vector{h}}{h}
:::

where $h$ is the magnitude of the specific angular momentum.

Since the angular momentum is constant for all time, it cannot change direction and it cannot change magnitude. Therefore, the unit vector perpendicular to the plane is constant for all time. This means that $m_2$ always orbits in the same plane around $m_1$.

In this situation, it is convenient to observe the plane looking in the same direction as $-\uvec{h}$, that is, looking down onto the orbit. This is shown in {numref}`fig:definition-of-vr-vp`.

:::{figure} ../images/definition-of-vr-vp.svg
:name: fig:definition-of-vr-vp

The orbital plane viewed from above. The angular momentum vector is coming out of the screen towards you.
:::

We will resolve the relative velocity into two components, one parallel and one perpendicular to $\vector{r}$. The unit vectors in these directions are $\uvec{u}_r$ and $\uvec{u}_{\perp}$, respectively. Therefore:

:::{math}
:label: eq:velocity-in-orbital-components
\vector{v} = v_r\uvec{u}_r + v_{\perp}\uvec{u}_{\perp}
:::

The angular momentum can then be defined as:

:::{math}
:label: eq:angular-momentum-in-orbital-components
\begin{aligned}
  \vector{h} &= \vector{r}\cross\vector{v} = r\uvec{u}_r \cross\left(v_r\uvec{u}_r + v_{\perp}\uvec{u}_{\perp}\right)\\ 
             &= r v_r\left(\uvec{u}_r\cross\uvec{u}_r\right) + r v_{\perp}\left(\uvec{u}_r\cross\uvec{u}_{\perp}\right)\\
             &= r v_{\perp}\uvec{h}
\end{aligned}
:::

where the last result comes from the definition of $\uvec{h}$ as perpendicular to the orbital plane. This means that the magnitude of the angular momentum is:

:::{math}
:label: eq:magnitude-of-angular-momentum
h = r v_{\perp}
:::

Since the angular momentum is constant, there is an inverse relationship between the radius of the orbit and the perpendicular velocity at any instant. As one increases, the other must decrease.

## Kepler's Second Law

Now consider $m_2$ in orbit around $m_1$. As $m_2$ moves, the position vector $\vector{r}$ sweeps out an area inside the orbit. Over one whole orbit, the entire area inside the orbit will be swept. During a differential time interval $dt$, a differential area $dA$ is swept. The rate of change of this area is:

:::{math}
:label: eq:areal-velocity-definition
\frac{dA}{dt} = \frac{h}{2}
:::

This is called the **areal velocity**. Since $h$ is constant, because of conservation of angular momentum, $dA/dt$ is also constant. This is Kepler's Second Law:

:::{admonition} **Kepler's Second Law**
Equal areas are swept out in equal times
:::

This can be shown by integrating Eq. {eq}`eq:areal-velocity-definition`:

:::{math}
A_2 - A_1 = \int_{t_1}^{t_2} \frac{h}{2} dt = \frac{h}{2}\left(t_2 - t_1\right)
:::

since $h$ is constant. Assuming that $\Delta t$ is the same, the swept area will be the same.
