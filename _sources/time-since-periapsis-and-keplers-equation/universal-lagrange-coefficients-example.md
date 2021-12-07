---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.13.1
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Example: Universal Lagrange Coefficients

An Earth satellite moves in an inertial frame with the origin at the earth's center. Relative to that frame, the initial position and velocity of the satellite are measured as:

:::{math}
:label:
\begin{aligned}\vector{r}_0 &= 7000.0\uvec{\imath} - 12124\uvec{\jmath}\\\vector{v}_0 &= 2.6679\uvec{\imath} + 4.6210\uvec{\jmath}\end{aligned}
:::

Compute $\vector{r}$ and $\vector{v}$ 60 minutes later.

## Solution

In this problem, our objective is to calculate $\chi$ so that we can calculate the universal Lagrange coefficients and determine the vectors at the later time. We will find $\chi$ by solving the universal Kepler's equation, Eq. {eq}`eq:universal-keplers-equation`, repeated here for reference:

:::{math}
f(\chi) = 0 = \frac{r_0 v_{r,0}}{\sqrt{\mu}}\chi^2 C\left(\alpha\chi^2\right) + \left(1 - \alpha r_0\right) \chi^3 S\left(\alpha\chi^2\right) + r_0 \chi - \sqrt{\mu}\left(t - t_0\right)
:::

First, we need to find the magnitude of the initial position, and the magnitude of the initial radial velocity. The former is found from:

:::{math}
:label:
r = \sqrt{\vector{r}\cdot\vector{r}}
:::

and the latter by projecting the velocity vector onto a unit vector pointing in the direction of $\vector{r}$:

:::{math}
:label:
v_{r,0} = \vector{v}\cdot\uvec{u}_r = \vector{v}\cdot\frac{\vector{r}}{r}
:::

```{code-cell} ipython3
import numpy as np
from scipy.optimize import newton

mu = 3.986004418E5  # km**3/s**2

vec_r_0 = np.array((7000, -12124))  # km
vec_v_0 = np.array((2.6679, 4.6210))  # km/s

r_0 = np.sqrt(vec_r_0.dot(vec_r_0))
v_r0 = vec_v_0.dot(vec_r_0) / r_0
print(round(r_0, 3), round(v_r0, 3))
```

Then, we need to find $\alpha$, which we can find from the energy equation:

:::{math}
:label:
\alpha = \frac{1}{a} = \frac{2}{r_0} - \frac{v_0^2}{\mu}
:::

where

:::{math}
:label:
v_0^2 = \vector{v}_0 \cdot\vector{v}_0
:::

```{code-cell} ipython3
alpha = 2 / r_0 - vec_v_0.dot(vec_v_0) / mu
print(alpha)
```

Since $\alpha$ is positive, this must be an elliptical orbit.

Now we have enough information to solve the universal Kepler equation.

```{code-cell} ipython3
def stumpff_0(z):
    """Solve the Stumpff function C(z) = c0(z). The input z should be
    a scalar value.
    """
    if z > 0:
        return (1 - np.cos(np.sqrt(z))) / z
    elif z < 0:
        return (np.cosh(np.sqrt(-z)) - 1) / (-z)
    else:
        return 1/2

def stumpff_1(z):
    """Solve the Stumpff function S(z) = c1(z). The input z should be
    a scalar value.
    """
    if z > 0:
        return (np.sqrt(z) - np.sin(np.sqrt(z))) / np.sqrt(z)**3
    elif z < 0:
        return (np.sinh(np.sqrt(-z)) - np.sqrt(-z)) / np.sqrt(-z)**3
    else:
        return 1/6

def universal_kepler(chi, r_0, v_r0, alpha, delta_t, mu):
    """Solve the universal Kepler equation in terms of the universal anomaly chi.
    
    This function is intended to be used with an iterative solution algorithm,
    such as Newton's algorithm.
    """
    z = alpha * chi**2
    first_term = r_0 * v_r0 / np.sqrt(mu) * chi**2 * stumpff_0(z)
    second_term = (1 - alpha * r_0) * chi**3 * stumpff_1(z)
    third_term = r_0 * chi
    fourth_term = np.sqrt(mu) * delta_t
    return first_term + second_term + third_term - fourth_term

def d_universal_d_chi(chi, r_0, v_r0, alpha, delta_t, mu):
    """The derivative of the universal Kepler equation in terms of the universal anomaly."""
    z = alpha * chi**2
    first_term = r_0 * v_r0 / np.sqrt(mu) * chi * (1 - z * stumpff_1(z))
    second_term = (1 - alpha * r_0) * chi**2 * stumpff_0(z)
    third_term = r_0
    return first_term + second_term + third_term


delta_t = 1 * 3600
chi_0 = np.sqrt(mu) * np.abs(alpha) * delta_t
chi = newton(
    func=universal_kepler,
    fprime=d_universal_d_chi,
    x0=chi_0,
    args=(r_0, v_r0, alpha, delta_t, mu),
)
print(round(chi, 3))
```

Now we can solve the equations to find the Lagrange coefficients, and then the position and velocity at the later time.

```{code-cell} ipython3
z = alpha * chi**2
f = 1 - chi**2 / r_0 * stumpff_0(z)
g = delta_t - chi**3 / np.sqrt(mu) * stumpff_1(z)

vec_r = f * vec_r_0 + g * vec_v_0
r = np.sqrt(vec_r.dot(vec_r))
print(f"vec_r = {vec_r[0]:.3F}i + {vec_r[1]:.3F}j (km)")
print(round(r, 3), "km")
```

```{code-cell} ipython3
fdot = chi * np.sqrt(mu) / (r * r_0) * (z * stumpff_1(z) - 1)
gdot = 1 - chi**2 / r * stumpff_0(z)

vec_v = fdot * vec_r_0 + gdot * vec_v_0
v = np.sqrt(vec_v.dot(vec_v))
print(f"vec_v = {vec_v[0]:.3F}i + {vec_v[1]:.3F}j (km/s)")
print(round(v, 3), "km/s")
```

We can also compute the distance to perigee. First, we calculate the orbital angular momentum via:

:::{math}
:label:
h = \left.v_{\perp}\right)_0 r_0
:::

where

:::{math}
:label:
\left.v_{\perp}\right)_0 = \sqrt{v_0^2 - v_{r,0}^2}
:::

Then, since this is an elliptical orbit and we know the semimajor axis, we can find the eccentricity via:

:::{math}
:label:
a = \frac{h^2}{\mu} \frac{1}{1 - e^2}
:::

Finally, the distance to perigee is found from:

:::{math}
:label:
r_p = a\left(1 - e\right)
:::

Alternatively, we can find the eccentricity from the energy equation:

:::{math}
:label:
\varepsilon = \frac{1}{2}\frac{\mu^2}{h^2}\left(1 - e^2\right)
:::

where $\varepsilon$ can be determined from the initial velocity and position vectors.

```{code-cell} ipython3
v_perp0 = np.sqrt(vec_v_0.dot(vec_v_0) - v_r0**2)
h = v_perp0 * r_0
a = 1 / alpha
e = np.sqrt(1 - h**2 / (a * mu))
r_p = a * (1 - e)
print(r_p)
```

Fortunately, since the radius of the earth is 6378 km, this satellite will not impact the earth and will have an altitude at closest approach of ~622 km.
