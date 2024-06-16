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

# Example: Hyperbolic Trajectory

A geocentric trajectory has a perigee altitude of 300 km and a perigee velocity of 15 km/s. Calculate the time to fly from perigee to a true anomaly of $\nu =$ 100°, and the position at that time. Then, calculate the true anomaly and speed 3 hr later.

## Given True Anomaly, Find Time Since Perigee

As for the elliptical case, the solution has three steps:

1. Find the hyperbolic eccentric anomaly, $F$, from the true anomaly, $\nu$
2. Find the hyperbolic mean anomaly, $M_h$, from the eccentric anomaly
3. Find the time since perigee, $t$, from the mean anomaly

Eq. {eq}`eq:eccentric-anomaly-true-anomaly-hyperbola` gives the eccentric anomaly in terms of the true anomaly. The only unknown parameter is the eccentricity of the hyperbola, which we need to find from the given orbital elements. Since we have $v_p$ and $r_p$ in the problem statement, we can calculate the angular momentum followed by the eccentricity.

```{code-cell} ipython3
import numpy as np
from scipy.optimize import newton

mu = 3.986004418E5  # km**3/s**2
nu_1 = np.radians(100)
r_p = 300 + 6378.1  # km
v_p = 15  # km/s
h = r_p * v_p  # km**2/s
e = h**2 / (r_p * mu) - 1
```

```{code-cell} ipython3
:tags: [remove-cell]
from functools import partial
from myst_nb import glue as myst_glue

np.set_printoptions(legacy="1.25")
glue = partial(myst_glue, display=False)

glue("hyperbolic-time-since-perigee-h", h)
glue("hyperbolic-time-since-perigee-e", e)
```

The eccentricity is $e =$ {glue:text}`hyperbolic-time-since-perigee-e:.4f`. Since $e > 1$, this trajectory is a hyperbola.

We should find the true anomaly of the asymptote from Eq. {eq}`eq:hyperbolic-true-anomaly-asymptote`, to ensure that our desired true anomaly is valid.

```{code-cell} ipython3
nu_infty = np.arccos(-1 / e)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("hyperbolic-time-since-perigee-nu_infty", np.degrees(nu_infty))
```

The true anomaly of the asymptote is $\nu_{\infty} =$ {glue:text}`hyperbolic-time-since-perigee-nu_infty:.2f`°. Therefore, our desired true anomaly is valid. Now we can calculate the eccentric anomaly, $F$.

```{code-cell} ipython3
F_1 = 2 * np.arctanh(np.sqrt((e - 1)/(e + 1)) * np.tan(nu_1 / 2))
```

Then, the mean anomaly is found from Kepler's equation, Eq. {eq}`eq:hyperbolic-keplers-equation`:

```{code-cell} ipython3
M_h1 = e * np.sinh(F_1) - F_1
```

Finally, calculating the time from the mean anomaly is done from the definition of the mean anomaly, Eq. {eq}`eq:hyperbolic-mean-anomaly`:

```{code-cell} ipython3
t_1 = h**3 / mu**2 * 1 / (e**2 - 1)**(3/2) * M_h1
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("hyperbolic-time-since-perigee-t_1", t_1 / 3600)
```

The total time is $t_1 =$ {glue:text}`hyperbolic-time-since-perigee-t_1:.2f` hr.

## Given Time Since Perigee, Find True Anomaly

Now, let's calculate the true anomaly 3 hours later, after about 4 total hours since perigee have elapsed. Again, there are three steps:

1. Given time since perigee, $t$, calculate the hyperbolic mean anomaly, $M_h$
2. Calculate the hyperbolic eccentric anomaly, $F$, from the hyperbolic mean anomaly
3. Calculate the true anomaly, $\nu$, from the hyperbolic eccentric anomaly

Since we already have the orbital eccentricity and specific angular momentum, we can start by finding the mean anomaly at the time.

```{code-cell} ipython3
t_2 = 3 * 3600 + t_1  # sec
M_h2 = mu**2 / h**3 * (e**2 - 1)**(3/2) * t_2
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("hyperbolic-time-since-perigee-t_2", t_2 / 3600)
```

Now, we need to solve Kepler's equation to find the eccentric anomaly, $F$. Since the equation is transcendental in $F$, we need to use the Newton solver in SciPy. Since we know the derivative, we will define two Python functions:

1. Kepler's equation, $f(F) = 0$
2. The derivative of Kepler's equation with respect to $F$, $f'(F)$

```{code-cell} ipython3
def kepler(F, M_h, e):
    """Kepler's equation, to be used in a Newton solver."""
    return e * np.sinh(F) - F - M_h

def d_kepler_d_F(F, M_h, e):
    """The derivative of Kepler's equation, to be used in a Newton solver.

    Note that the argument M_h is unused, but must be present so the function
    arguments are consistent with the kepler function.
    """
    return e * np.cosh(F) - 1

F_2 = newton(func=kepler, fprime=d_kepler_d_F, x0=np.pi, args=(M_h2, e))
```

With this value for $F$, we can calculate the value for $\nu$. To avoid quadrant ambiguity problems, we will use Eq. {eq}`eq:eccentric-anomaly-true-anomaly-hyperbola`.

```{code-cell} ipython3
sqrt_e = np.sqrt((e + 1) / (e - 1))
nu_2 = (2 * np.arctan(sqrt_e * np.tanh(F_2 / 2))) % (2 * np.pi)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("hyperbolic-time-since-perigee-nu_2", np.degrees(nu_2))
```

Like for the ellipse, to convert $\nu$ to the range $[0, 2\pi)$, we take the modulus with $2\pi$. In most programming languages, Python and MATLAB included, the `arctan` function returns a value between $-\pi/2$ and $\pi/2$. When the result is multiplied by 2, it gives the range from $-\pi$ to $\pi$. We need to transform this angle to be in the range of $0$ to $2\pi$. To do so, we can take the **modulus** of the angle with $2\pi$.

The modulus is the remainder after division. In Python, the modulus operator is `%`, while in MATLAB, we have to use the function `mod(numerator, denominator)`. This works for both positive and negative numbers, and ensures that we get the correct angle for the appropriate quadrant.

The true anomaly after {glue:text}`hyperbolic-time-since-perigee-t_2:.2f` hr is $\nu_2 =$ {glue:text}`hyperbolic-time-since-perigee-nu_2:.2f`°.

## Calculate the Speed of the Spacecraft

To find the speed, we will calculate the velocity components. The radius at $\nu_2 =$ {glue:text}`hyperbolic-time-since-perigee-nu_2:.2f`° can be found from the orbit equation, Eq. {eq}`eq:scalar-orbit-equation`.

```{code-cell} ipython3
r_2 = h**2 / mu / (1 + e * np.cos(nu_2))
```

The velocity components can be found from Eqs. {eq}`eq:perpendicular-velocity-component` and {eq}`eq:parallel-velocity-component`.

```{code-cell} ipython3
v_perp = h / r_2
v_r = mu / h * e * np.sin(nu_2)
v_2 = np.sqrt(v_r**2 + v_perp**2)
```

```{code-cell} ipython3
:tags: [remove-cell]
glue("hyperbolic-time-since-perigee-r_2", r_2)
glue("hyperbolic-time-since-perigee-v_perp", v_perp)
glue("hyperbolic-time-since-perigee-v_r", v_r)
glue("hyperbolic-time-since-perigee-v_2", v_2)
```

The radius is $r_2 =$ {glue:text}`hyperbolic-time-since-perigee-r_2:.4E` km and the speed is $v_2 =$ {glue:text}`hyperbolic-time-since-perigee-v_2:.2f` km/s.

## MATLAB Solution

In MATLAB, the following code will give the same result:

```matlab
function kepler
    mu = 3.986e5; % km^3/s^2
    r_p = 300 + 6378; % km
    v_p = 15; % km/s
    h = r_p * v_p;
    e = h^2 / (mu * r_p) - 1;

    nu_1 = deg2rad(100);
    F_1 = 2 * atanh(sqrt((e - 1) / (e + 1)) * tan(nu_1 / 2));
    M_h1 = e * sinh(F_1) - F_1;
    t_1 = h^3 / mu^2 * 1 / (e^2 - 1)^(3 / 2) * M_h1;

    t_2 = t_1 + 3 * 3600;
    M_h2 = mu^2 / h^3 * (e^2 - 1)^(3 / 2) * t_2;

    function x = fun(F, M_h, e)
        x = e * sinh(F) - F - M_h;
    end

    F_2 = fzero(@(x) fun(x, M_h2, e), [3, 4]);
    t2 = 2 * atan(sqrt((e + 1) / (e - 1)) * tanh(F_2 / 2));
    nu_2 = mod(t2, 2 * pi);
    disp(rad2deg(nu_2))

    r_2 = h^2 / mu * 1 / (1 + e * cos(nu_2));
    v_perp = h / r_2;
    v_r = mu / h * e * sin(nu_2);
    v = sqrt(v_perp^2 + v_r^2);
    disp([v_perp, v_r, v])
end
```

We are using `fzero()` again to solve Kepler's equation. I'm not sure how sensitive `fzero()` will be to the initial guess.
