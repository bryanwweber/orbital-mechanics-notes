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
# Chapter 3.6 - Hyperbolic Trajectories ($e > 1$)

For the hyperbola, we identify $a = 1$ and $b = e > 1$, so the appropriate integral is then the third one:

$$\int\frac{dx}{\left(a + b\cos x\right)^2} = \frac{1}{\left(b^2 - a^2\right)^{3/2}}\left[\frac{b\sqrt{b^2 - a^2}\sin x}{a + b\cos x} - a\ln\left(\frac{\sqrt{b + a} + \sqrt{b - a}\tan\frac{x}{2}}{\sqrt{b + 1} - \sqrt{b - a}\tan\frac{x}{2}}\right)\right]$$

## Mean Anomaly

Defining the mean anomaly for the hyperbola as

$$M_h = \frac{\mu^2}{h^3} t \left(e^2 - 1\right)^{3/2}$$

we can write

$$M_h = \frac{e\sqrt{e^2 - 1}\sin\theta}{1 + e\cos\theta} - \ln\left[\frac{\sqrt{e + 1} + \sqrt{e - 1}\tan\frac{\theta}{2}}{\sqrt{e + 1} - \sqrt{e - 1}\tan\frac{\theta}{2}}\right]$$(mean-anomaly-hyperbola)

```{code-cell}
:tags: [remove-input]
import matplotlib.pyplot as plt
from matplotlib.ticker import (MultipleLocator, FuncFormatter,
                               AutoMinorLocator)
import numpy as np

fig, ax = plt.subplots()
ax.set_ylabel("$M_h$")
ax.set_xlabel(r"$\theta$")
ax.set_xlim(0, np.pi)
e_vals = [1.1, 1.5, 2.0, 3.0, 5.0]
ax.xaxis.set_major_locator(MultipleLocator(base=np.pi / 2))
ax.xaxis.set_major_formatter(FuncFormatter(lambda val, pos: {0: "0", np.pi/2: r"$\pi$/2", np.pi: r"$\pi$"}.get(val, "")))
ax.xaxis.set_minor_locator(AutoMinorLocator(n=10))
ax.xaxis.grid(which="both")
ax.yaxis.grid(which="major")
for e in e_vals:
    theta_inf = np.arccos(-1 / e)
    theta = np.linspace(0.1, theta_inf - 0.001)
    M_h = e * np.sqrt(e**2 - 1) * np.sin(theta) / (1 + e * np.cos(theta))
    sqrt_e_p_1 = np.sqrt(e + 1)
    sqrt_e_m_1_t = np.sqrt(e - 1) * np.tan(theta / 2)
    M_h -= np.log((sqrt_e_p_1 + sqrt_e_m_1_t) / (sqrt_e_p_1 - sqrt_e_m_1_t))
    ax.semilogy(theta, M_h, label=f"$e$ = {e}")
ax.legend();
```

Notice that $\theta$ cannot exceed $\theta_{\infty} = \cos^{-1}(-1 / e)$.

## Hyperbolic Eccentric Anomaly

Similar to the ellipse, we will define an auxiliary angle $F$ to simplify the equations. $F$ is defined with reference to the hyperbola below.

```{code-cell}
:tags: [remove-input]

fig, ax = plt.subplots(figsize=(12, 9))
ax.set_aspect("auto")
plt.rc("font", size=20)

ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.xaxis.set_tick_params(bottom=False, top=False, which="both", labelbottom=False)
ax.yaxis.set_tick_params(left=False, right=False, which="both", labelleft=False)

# Move remaining spines to the center
ax.spines["bottom"].set_position("zero")  # spine for xaxis
ax.spines["left"].set_position("zero")  # spine for yaxis

e = 1.5
theta_inf = np.arccos(-1 / e)
a = 1
b = a * np.sqrt(e ** 2 - 1)
r_p = a * (e - 1)
x_a = 100 * np.cos(theta_inf)
y_a = 100 * np.sin(theta_inf)

ax.set_xlim(-4, 4)
ax.set_ylim(-3, 3)

x = np.linspace(a, 3 * a, 100)
y = b / a * np.sqrt(x ** 2 - a ** 2)
ax.plot(np.hstack((-x[::-1], -x)), np.hstack((y[::-1], -y)))
ax.plot((x_a, -x_a), (y_a, -y_a), ls="--", color="C1")
ax.plot((-x_a, x_a), (y_a, -y_a), ls="--", color="C1")

t = np.radians(100)
r = a * (e ** 2 - 1) / (1 + e * np.cos(t))
x_1 = -a - r_p + r * np.cos(t)
y_1 = r * np.sin(t)
hyperbola_focus = -a - r_p
ax.plot((hyperbola_focus, x_1), (0, y_1), "k-o")
ax.plot((-a, -a), (0, b), "ko-", markersize=5)
ax.annotate("", xy=(-2*a - r_p, 0), xytext=(-2*a - r_p, y_1), arrowprops={"arrowstyle": "<->"})
ax.annotate("$y$", xy=(-2*a - r_p, y_1/2), backgroundcolor="white", ha="center", va="center")
ax.plot((-2*a - r_p - 0.1, x_1 - 0.1), (y_1, y_1), color="black", lw=0.5)
ax.annotate("", xy=(0, 2*b), xytext=(x_1, 2*b), arrowprops={"arrowstyle": "<->"})
ax.annotate("$x$", xy=(x_1/2, 2*b), backgroundcolor="white", ha="center", va="center")
ax.plot((x_1, x_1), (2*b + 0.1, y_1 + 0.1), color="black", lw=0.5)
ax.annotate("$b$", xy=(-a, b/2), ha="left", va="center")
ax.annotate("", xy=(0, -0.2), xytext=(-a, -0.2), arrowprops={"arrowstyle": "<->"})
ax.annotate("$a$", xy=(-a/2, -0.2), ha="center", va="center", backgroundcolor="white")
ax.annotate("", xy=(-a, -0.2), xytext=(-a - r_p, -0.2), arrowprops={"arrowstyle": "<->"})
ax.annotate("$r_p$", xy=(-a - r_p/2, -0.2), ha="center", va="center", backgroundcolor="white")
ax.plot((-a - r_p, -a - r_p), (-0.1, -0.3), lw=0.5, color="black")
ax.plot((-a , -a), (-0.1, -0.3), lw=0.5, color="black")
ax.annotate("$r$", xy=((x_1 + hyperbola_focus) / 2, y_1 / 2), ha="right", va="top")
ax.annotate("$C$", xy=(0, 0.2), va="bottom", ha="center", backgroundcolor="white");
```

Now, let's define the ratio $y/b$ as the hyperbolic sine of the angle $F$:

$$\sinh F = \frac{y}{b}$$

Then, because

$$\cosh^2 x - \sinh^2 x = 1$$

we can also define

$$\cosh F = \frac{x}{a}$$

```{note}
The hyperbolic angle $F$ is weird. The reason we don't draw it on the figure is because hyperbolic angles aren't angles _per se_. Instead, they can be interpreted as half the area between the $x$-axis and a line drawn from the origin to the point of interest, bounded by the hyperbola. I think. At least, that's my best interpretation from what I've been able to read. YMMV.

Another way of thinking about this is by analogy to a circle. For a circle, we can draw any two lines from the center of the circle to the perimeter. These two lines will have an angle $\phi$ between them, and the area between them will be:

$$A_{\text{circular sector}} = \frac{r^2 \phi}{2}$$

![Circular Sector](../images/Circle_arc.svg)

The area is called a **circular sector**. The image is modified from [Wikimedia](https://en.wikipedia.org/wiki/File:Circle_arc.svg).

If the circle is a unit circle ($r = 1$), then the area of the sector will be equal to the angle divided by two. Turned around, the angle is equal to twice the area:

$$\phi = \frac{2A}{1^2}$$

Similarly, we can define the hyperbolic angle on the unit hyperbola as twice the area between two lines that start at the origin and touch the hyperbola, called a **hyperbolic sector**.

![Hyperbolic Sector](../images/Hyperbolic_functions-2.svg)

The area of the hyperbolic sector is half the hyperbolic angle. However, the circular angle between the $x$-axis and the ray from the origin is not the same as the hyperbolic angle.

You can read more about hyperbolic angles on [Brilliant](https://brilliant.org/wiki/hyperbolic-trigonometric-functions/) and on [Wikipedia](https://en.wikipedia.org/wiki/Hyperbolic_angle).
```

We can relate $F$ to the true anomaly $\theta$ by plugging in $y = r\sin\theta$, and the orbit equation for $r$. We also note that $b = a\sqrt{e^2 - 1}$. Then:

$$F = \sinh^{-1}\left(\frac{\sin\theta\sqrt{e^2 - 1}}{1 + e\cos\theta}\right) = \ln\left(\frac{\sin\theta\sqrt{e^2 - 1} + \cos\theta + e}{1 + e\cos\theta}\right)$$

After some more trigonometry and algebra, we find:

$$F= \ln\left[\frac{\sqrt{e + 1} + \sqrt{e - 1}\tan\frac{\theta}{2}}{\sqrt{e + 1} - \sqrt{e - 1}\tan\frac{\theta}{2}}\right]$$

Substituting this back into Eq. {eq}`mean-anomaly-hyperbola`, we find **Kepler's equation for the hyperbola**:

$$M_h = e\sinh F - F$$

As with the ellipse, Kepler's equation can be solved easily if $\theta$ is known, to be able to find $F$. However, if time is the known quantity, then Kepler's equation is transcendental and must be solved numerically.

To aid in the numerical solution, the derivative of Kepler's equation for the hyperbola is:

$$f'(F) = e \cosh F - 1$$

Some more trigonometry and algebra lead us to a simpler relationship between $F$ and $\theta$, analogous to the equation for the ellipse:

$$\tanh\frac{F}{2} = \sqrt{\frac{e - 1}{e + 1}}\tan\frac{\theta}{2}$$

and the inverse, to solve for $\theta$ from $F$:

$$\tan\frac{\theta}{2} = \sqrt{\frac{e + 1}{e - 1}}\tanh\frac{F}{2}$$

## Orbit Equation in Terms of Hyperbolic Eccentric Anomaly

It is useful to have the orbit equation in terms of $F$, analogous to the ellipse. We find:

$$r = a\left(e\cosh F - 1\right)$$
