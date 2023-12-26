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

# Example: Universal Variables

An Earth-centered trajectory has initial velocity of 10 km/s, initial radius of 10,000 km, and initial true anomaly of 30°. Determine the true anomaly 1 hr later, using the universal anomaly.

## Solution

The general solution procedure is as follows.

1. Determine the type of orbit
2. Determine which eccentric anomaly is appropriate, depending on the type of orbit
3. Determine the value of $\chi$ at the later time
4. Determine the value of the eccentric anomaly from $\chi$
5. Determine $\nu$ from the eccentric anomaly

To start, we need to identify the type of orbit. In the universal formulation, we know that if the semimajor axis is positive, the orbit is elliptical; if the semimajor axis is negative, the orbit is a hyperbola. We can find the semimajor axis from the energy equation:

$$a = \left(\frac{2}{r_0} - \frac{v_0^2}{\mu}\right)^{-1}$$

```{code-cell} ipython3
import numpy as np
from scipy.optimize import newton
import matplotlib.pyplot as plt

theta_0 = np.radians(30)
r_0 = 10_000  # km
v_0 = 10  # km/s
mu = 3.986004418E5  # km**3/s**2

a = 1 / (2 / r_0 - v_0**2 / mu)
print(round(a, 3), "km")
```

Since the semimajor axis is negative, we know the orbit is a hyperbola. Therefore, we can solve for the eccentricity using the orbit equation for a hyperbola, in terms of the semimajor axis:

$$r_0 = a\frac{e^2 - 1}{1 + e\cos\nu_0}$$

Solving this equation for $e$, we find:

$$0 = e^2 - \frac{r_0}{a}\cos\nu_0 e - \left(1 + \frac{r_0}{a}\right)$$

This equation is quadratic in $e$, so we can use the quadratic formula to solve it. Notice that the signs of the second and third term are negative. In addition, we need to take the absolute value of the semimajor axis, because the orbit formula was developed assuming that $a$ was positive.

```{code-cell} ipython3
e = (r_0/np.abs(a) * np.cos(theta_0) + np.sqrt((-r_0 / np.abs(a) * np.cos(theta_0))**2 + 4 * (1 + r_0/np.abs(a)))) / 2
print(round(e, 3))
```

As expected, the eccentricity is larger than 1 for a hyperbola.

Next, to find the universal anomaly at $t_0$ + 1 hr, we need the initial radial velocity. From Ch. 2, we know that:

$$v_r = \frac{\mu}{h} e \sin\nu$$

The only unknown in this equation is $h$, since we are interested in the initial radial velocity, that is, when $\nu = \nu_0$. For a hyperbola, we can find the orbital angular momentum from the hyperbolic excess velocity:

$$h = \frac{\mu}{v_{\infty}} \sqrt{e^2 - 1}$$

and the hyperbolic excess velocity in terms of the semimajor axis:

$$v_{\infty} = \sqrt{\frac{\mu}{a}}$$

Note again that this formula was derived under the assumption that $a$ is positive, so we need to take the absolute value.

```{code-cell} ipython3
v_infty = np.sqrt(mu / np.abs(a))
h = mu / v_infty * np.sqrt(e**2 - 1)
v_r0 = mu / h * e * np.sin(theta_0)
print(round(v_r0, 3), "km/s")
```

Now we have enough information to find the universal anomaly from Kepler's equation:

$$f(\chi) = 0 = \frac{r_0 v_{r,0}}{\sqrt{\mu}}\chi^2 C(z) + \left(1 - \alpha r_0\right) \chi^3 S(z)+ r_0 \chi - \sqrt{\mu}\Delta t$$

where $z = \alpha\chi^2$. The derivative of this function is:

$$f'(\chi) = \frac{r_0v_{r,0}}{\sqrt{\mu}} \chi\left(1 - z S(z)\right) + \left(1 - \alpha r_0\right) \chi^2 C(z) + r_0$$

The Stumpff functions $C(z) = c_2(z)$ and $S(z) = c_3(z)$ are:

$$C(z) = \begin{cases}\displaystyle \frac{1 - \cos\sqrt{z}}{z} & \left(z > 0\right)\\ \displaystyle\frac{\cosh\sqrt{-z} - 1}{-z} & \left(z < 0\right) \\ \displaystyle\frac{1}{2} & \left(z = 0\right)\end{cases}$$

and

$$S(z) =\begin{cases}\displaystyle \frac{\sqrt{z} - \sin\sqrt{z}}{\left(\sqrt{z}\right)^3} & \left(z > 0\right)\\ \displaystyle \frac{\sinh\sqrt{-z} - \sqrt{-z}}{\left(\sqrt{-z}\right)^3} & \left(z < 0\right) \\ \displaystyle \frac{1}{6} & \left(z = 0\right)\end{cases}$$

```{code-cell} ipython3
def stumpff_2(z):
    """Solve the Stumpff function C(z) = c2(z). The input z should be
    a scalar value.
    """
    if z > 0:
        return (1 - np.cos(np.sqrt(z))) / z
    elif z < 0:
        return (np.cosh(np.sqrt(-z)) - 1) / (-z)
    else:
        return 1/2

def stumpff_3(z):
    """Solve the Stumpff function S(z) = c3(z). The input z should be
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
    first_term = r_0 * v_r0 / np.sqrt(mu) * chi**2 * stumpff_2(z)
    second_term = (1 - alpha * r_0) * chi**3 * stumpff_3(z)
    third_term = r_0 * chi
    fourth_term = np.sqrt(mu) * delta_t
    return first_term + second_term + third_term - fourth_term

def d_universal_d_chi(chi, r_0, v_r0, alpha, delta_t, mu):
    """The derivative of the universal Kepler equation in terms of the universal anomaly."""
    z = alpha * chi**2
    first_term = r_0 * v_r0 / np.sqrt(mu) * chi * (1 - z * stumpff_3(z))
    second_term = (1 - alpha * r_0) * chi**2 * stumpff_2(z)
    third_term = r_0
    return first_term + second_term + third_term
```

Finally, we need to define the rest of the values for this function. By definition,

$$\alpha = \frac{1}{a}$$

and the initial guess for $\chi$ is given by:

$$\chi_{i=0} = \sqrt{\mu} \left\lvert\alpha\right\rvert \Delta t$$

```{code-cell} ipython3
delta_t = 1 * 3600
alpha = 1 / a
chi_0 = np.sqrt(mu) * np.abs(alpha) * delta_t
chi = newton(
    func=universal_kepler,
    fprime=d_universal_d_chi,
    x0=chi_0,
    args=(r_0, v_r0, alpha, delta_t, mu)
)
print(round(chi, 3))
```

With $\chi$ determined, we need to relate it back to the eccentric anomaly to determine the true anomaly. The appropriate eccentric anomaly is $F$, for hyperbolic trajectories. The relationship between $\chi$ and $F$ is:

$$\chi = \sqrt{-a} \left(F - F_0\right)$$

where $F_0$ is the eccentric anomaly determined at the initial true anomaly:

$$F_0 = 2 \tanh^{-1}\left(\sqrt{\frac{e - 1}{e + 1}}\tan\frac{\nu_0}{2}\right)$$

```{code-cell} ipython3
F_0 = 2. * np.arctanh(np.sqrt((e - 1) / (e + 1)) * np.tan(theta_0 / 2))
print(round(F_0, 3))
```

Then, we can solve for $F$ and relate that back to $\nu$:

$$F = \frac{\chi}{\sqrt{-a}} + F_0$$

and

$$\nu = 2 \tan^{-1} \left(\sqrt{\frac{e + 1}{e - 1}}\tanh\frac{F}{2}\right)$$

```{code-cell} ipython3
F = chi / np.sqrt(-a) + F_0
print(round(F, 3))
theta = 2 * np.arctan(np.sqrt((e + 1) / (e - 1)) * np.tanh(F / 2))
print(round(theta, 3), f"{np.degrees(theta):.3F}°")
```
