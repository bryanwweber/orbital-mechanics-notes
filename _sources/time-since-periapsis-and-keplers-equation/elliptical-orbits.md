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

# Circular and Elliptical Orbits ($e < 1$)

As we discussed in the last section, we need to find equations for the mean anomaly and eccentric anomaly. In this section we'll find three equations that we need:

1. An equation relating the mean anomaly to the time since periapsis:
   :::{math}
   M_e = \frac{2\pi t}{T} = \frac{\mu^2}{h^3} t \left(1 - e^2\right)^{3/2}
   :::
2. An equation relating the eccentric anomaly to the true anomaly
   :::{math}
   \tan\frac{E}{2} = \sqrt{\frac{1 - e}{1 + e}}\tan\frac{\nu}{2}
   :::
3. An equation relating the mean anomaly to the eccentric anomaly
   :::{math}
   M_e = E - e \sin{E}
   :::

With these three equations, we can solve either of the cases of knowing the time since periapsis; or knowing the true anomaly.

For the circle and ellipse, we will follow two methods to derive the appropriate equations:

1. Using a geometric argument to relate swept areas on the orbit and a circumscribing circle
2. Using calculus and trigonometric transformations starting from the orbit equation

These methods result in the same result, but some people may find one easier to follow than the other.

## Swept Area Inside the Orbit

Since Kepler's second law says that equal areas are swept in equal times, the swept area is _directly proportional_ to the elapsed time. Let's define a variable to capture this idea and call it the **Mean Area**, $A_m$:

:::{math}
:label:
A_m = C t
:::

where $C$ is the constant of proportionality. For an elliptical orbit, the swept area is the elapsed fraction of the orbital period ($t/T$) multiplied by the total area of the ellipse ($\pi a b$):

:::{margin}
We'll use the example of an ellipse here, but the procedure shown here is similar for a parabola or hyperbola. They just end up with different values for $C$.
:::

:::{math}
:label: eq:mean-anomaly-area
A_m = C t = \pi a b \frac{t}{T}
:::

where $a$ and $b$ are the semimajor and semiminor axes, and $T$ is the orbital period.

:::{figure} ../images/time-since-periapsis-area-ellipse.svg
:name: fig:time-since-periapsis-area-ellipse
:width: 75%

The swept area $m_1$-$P$-$B$ inside the elliptical orbit corresponding to time $t$ with true anomaly $\nu$
:::

This area is shown in {numref}`fig:time-since-periapsis-area-ellipse` as $m_1$-$P$-$B$.

### Swept Area Inside a Circumscribing Circle

The next step is find another equation for $A_m$ so that we can solve for $t$ in Eq. {eq}`eq:mean-anomaly-area`. We already used Kepler's second law to define Eq. {eq}`eq:mean-anomaly-area`, so continuing to work with the ellipse will be kind of a pain.

:::{margin}
The circle here is called an **circumscribing circle** because it is tangent to the ellipse at two points, on both ends of the major axis. These positions are also the periapsis and apoapsis.
:::

Instead, we can work with a circle, where it's much easier to calculate areas. We are going to transform the ellipse into a circle by stretching it in the vertical direction, ensuring that the circle and ellipse continue to touch at the point $P$. While the ellipse is stretching, the swept area is also stretching. This process is animated in {numref}`fig:ellipse-area-animate`.

```{code-cell} ipython3
:tags: [remove-cell]
from pathlib import Path

svg_file = Path("../images/time-since-periapsis-area-animate.svg")
# Assume that the SVG file starts with an XML declaration
svg = "\n".join(svg_file.read_text().splitlines()[1:])
js = """
<script>
// Get the ellipse path element
const svg = document.querySelector('#ellipse-animate');
const ellipsePath = svg.querySelector('#animated-ellipse');
const QPoint = svg.querySelector('#Q-point');
const Q = svg.querySelector('#Q');
const axisToB = svg.querySelector('#axis-to-B');
const m1ToB = svg.querySelector('#m1-to-B');
const filledArea = svg.querySelector('#filled-area');

// Create slider input
const slider = document.querySelector('#ellipse-slider');

// Parse the path data into coordinates
const pathData = ellipsePath.getAttribute('d');
const coords = pathData.split(' ')
  .filter(s => !isNaN(parseFloat(s)))
  .map(parseFloat);

const axisToBData = axisToB.getAttribute('d');
const axisToBCoords = axisToBData.split(' ')
  .filter(s => !isNaN(parseFloat(s)))
  .map(parseFloat);

const m1ToBData = m1ToB.getAttribute('d');
const m1ToBCoords = m1ToBData.split(' ')
  .filter(s => !isNaN(parseFloat(s)))
  .map(parseFloat);

// Store original y-coordinates
const originalY = coords.filter((_, i) => i % 2 === 1);
const originalQY = parseFloat(QPoint.getAttribute('cy'));
const x = coords.filter((_, i) => i % 2 === 0);

// Calculate center and target radius
const minY = Math.min(...originalY);
const maxY = Math.max(...originalY);
const centerY = 13/16 * 400;
const currentRadius = (maxY - minY) / 2;
const targetRadius = 300;
const scaleFactor = targetRadius / currentRadius;

function animate() {
  if (slider.value >= 990 && Q.getAttribute('display') === 'none') {
    Q.setAttribute('display', 'inline');
  } else if (slider.value < 990 && Q.getAttribute('display') === 'inline') {
    Q.setAttribute('display', 'none');
  }
  const t = slider.value / 1000;
  const newY = originalY.map(y => {
    const distanceFromCenter = y - centerY;
    return centerY + (distanceFromCenter * (1 + (scaleFactor - 1) * t));
  });


  const newQY = newY[60] - 2;

  // Build new path data string
  let newPath = 'M ';
  for(let i = 0; i < x.length; i++) {
    newPath += `${x[i]} ${newY[i]} `;
    if(i < x.length-1) newPath += 'L ';
  }

  let newLine = `M ${axisToBCoords[0]} ${axisToBCoords[1]} L ${axisToBCoords[2]} ${newQY}`;
  let newm1ToB = `M ${m1ToBCoords[0]} ${m1ToBCoords[1]} L ${m1ToBCoords[2]} ${newQY}`;

  let newArea = 'M ';
  for(let i = 60; i < 102; i++) {
    newArea += `${x[i]} ${newY[i]} `;
    if(i < 101) newArea += 'L ';
  }
  newArea += `L 400 325 L 335 325 L 183.699219 ${newQY}`;
  // Update the path
  ellipsePath.setAttribute('d', newPath);
  QPoint.setAttribute('cy', newQY);
  axisToB.setAttribute('d', newLine);
  m1ToB.setAttribute('d', newm1ToB);
  filledArea.setAttribute('d', newArea);
}

// Listen for slider changes
slider.addEventListener('input', animate);
</script>
"""
from IPython.display import HTML

hh = HTML("""\
<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;" class="animation">
"""
    + svg
    + """\
<input id="ellipse-slider" type="range" min="0" max="1000" step="1" value="0" style="width: 200px;">
</div>"""
    + js )
from myst_nb import glue
glue("ellipse-area-animate", hh, display=False)
```

:::{glue:figure} ellipse-area-animate
:name: fig:ellipse-area-animate
:width: 75%

Transforming the original elliptical orbit into a circumscribing circle by stretching the ellipse in the vertical direction. Note that the point $B$ translates vertically to point $Q$.
:::

Notice that the original area $m_1$-$P$-$B$ has been transformed to the area $m_1$-$P$-$Q$. Our goal now is to find the new area, then scale that area back down to the right size for Eq. {eq}`eq:mean-anomaly-area`. To find the area $m_1$-$P$-$Q$, we make two observations:

1. The region $O$-$P$-$Q$ is a [circular sector](https://en.wikipedia.org/wiki/Circular_sector)
2. The region $O$-$m_1$-$Q$ is a triangle

These regions are shown on {numref}`fig:circle-eccentric-anomaly-areas`.

:::{figure} ../images/time-since-periapsis-area-circle.svg
:name: fig:circle-eccentric-anomaly-areas
:width: 75%

Areas within the circular sector formed by transforming the original ellipse. Note that the original ellipse has been removed from this figure for clarity and only the circumscribing circle is present.
:::

Using these regions, we can find the area $m_1$-$P$-$Q$:

:::{math}
:label: eq:circular-chord-area
m_1\text{-}P\text{-}Q = O\text{-}P\text{-}Q - O\text{-}m_1\text{-}Q = \frac{a^2 E}{2} - \frac{a^2 e \sin{E}}{2}
:::

where $a$ is the semimajor axis of the ellipse and the radius of the circle, $E$ is the included angle in the circular sector, and $e$ is the eccentricity of the ellipse.

### Relating the Two Areas Together

The final step is to scale the area $m_1$-$P$-$Q$ back down to the right size and then equate it with $A_m$. The scaling factor for $m_1$-$P$-$Q$ is the ratio of the semi-minor axis, $b$, to the semi-major axis, $a$:

:::{math}
A_m = \frac{b}{a} \left(m_1\text{-}P\text{-}Q\right) = \frac{abE}{2} - \frac{abe \sin{E}}{2} = \frac{1}{2} a b \left(E - e \sin{E}\right)
:::

where we have substituted the result of Eq. {eq}`eq:circular-chord-area` and simplified. Finally, substituting Eq. {eq}`eq:mean-anomaly-area`:

:::{math}
:label: eq:keplers-equation-area
\pi a b \frac{t}{T} = \frac{1}{2}a b \left(E - e \sin{E}\right) \rightarrow 2\pi\frac{t}{T} = E - e \sin{E}
:::

In Eq. {eq}`eq:keplers-equation-area`, we can define the left side of the equation as the **mean anomaly**:

:::{math}
:label: eq:mean-anomaly-definition
M_e = 2\pi\frac{t}{T} = \frac{\mu^2}{h^3} t \left(1 - e^2\right)^{3/2}
:::

where $T$ is the orbital period, $\mu$ is the specific gravitational constant, $h$ is the specific angular momentum, and $e$ is the eccentricity of the orbit. The last equality comes from the definition of the orbital period, Eq. {eq}`eq:ellipse-period-useful`.

Substituting Eq. {eq}`eq:mean-anomaly-definition` into Eq. {eq}`eq:keplers-equation-area`, we find **Kepler's Equation** for an ellipse:

:::{math}
:label: eq:keplers-equation-ellipse
M_e = E - e \sin{E}
:::

:::{note}
This equation is super important in the field of orbital mechanics, which is why it's named for Kepler. Make sure to remember this equation!
:::

Now we have two of the three equations we need to solve problems relating elapsed time and true anomaly:

1. Eq. {eq}`eq:mean-anomaly-definition` gives us a relationship between $t$ and $M_e$
2. Kepler's equation, Eq. {eq}`eq:keplers-equation-ellipse` gives us the relationship between $M_e$ and $E$

The last step is to relate the eccentric anomaly to the true anomaly.

(sec:ellipse-eccentric-anomaly)=

## Eccentric Anomaly

The eccentric anomaly, $E$, is defined as the angle from the $x$ axis to a point on a circle that circumscribes the orbital ellipse and where the point is located vertically above a point with true anomaly $\nu$ on the ellipse. This is shown in {numref}`fig:true-mean-eccentric-anomalies` and {numref}`fig:definition-of-eccentric-anomaly-ellipse`.

:::{figure} ../images/definition-of-eccentric-anomaly-ellipse.svg
:name: fig:definition-of-eccentric-anomaly-ellipse
:width: 75%

The eccentric anomaly. The blue ellipse is the trajectory of the spacecraft; the green circle is circumscribed around the ellipse. Point $O$ is the origin, point $F$ is the focus of the ellipse, point $S$ is the spacecraft, point $P$ is the intersection of the apse line and a perpendicular line through $S$, and point $Q$ is the intersection of the circle and the perpendicular line through $S$.
:::

From {numref}`fig:definition-of-eccentric-anomaly-ellipse`, we see that the distance $OP$ is equal to:

:::{math}
:label: eq:OP-distance-ellipse
OP = ae + FP = a \cos E
:::

where $a$ is the semimajor axis of the ellipse, $e$ is the eccentricity, and the distance $FP$ is related to the true anomaly:

:::{math}
:label: eq:FP-distance-ellipse
FP = r \cos\nu
:::

Combining Eq. {eq}`eq:OP-distance-ellipse` and Eq. {eq}`eq:FP-distance-ellipse`, we find:

:::{math}
:label:
a\cos E = ae + r\cos\nu
:::

Replacing $r$ with the orbit equation in terms of the semimajor axis and simplifying, we find:

:::{math}
:label: eq:cos-eccentric-anomaly-ellipse
\cos E = \frac{e + \cos\nu}{1 + e\cos\nu}
:::

or, solving for $\nu$:

:::{math}
:label:
\cos\nu = \frac{e - \cos E}{e\cos E - 1}
:::

Unfortunately, these equations result in a quadrant ambiguity. We can resolve this by some further trigonometric transformations, which result in the equation:

:::{math}
:label: eq:eccentric-anomaly-true-anomaly-ellipse
\tan\frac{E}{2} = \sqrt{\frac{1 - e}{1 + e}}\tan\frac{\nu}{2}
:::

The inverse tangent function is not multi-valued for a given value of $\nu$ or $E$, so this resolves the quadrant ambiguity.

```{note}
**Note:** Eq. {eq}`eq:eccentric-anomaly-true-anomaly-ellipse` can be solved in Python with `np.arctan()` and in Matlab with `atan()`. It is not necessary to use `np.arctan2()` or `atan2()`. Make sure all your arguments are in terms of radians!
```

Now with Eqs. {eq}`eq:keplers-equation-ellipse`, {eq}`eq:eccentric-anomaly-true-anomaly-ellipse`, and {eq}`eq:mean-anomaly-definition` we have the three equations we need to solve time since periapsis problems!

:::{hint}
The next section describes an alternate means of deriving these equations from calculus and trigonometric manipulations. I find these derivations interesting, but you may not! Feel free to skip to the examples in the next pages, starting with [](./elliptical-orbit-example.md).
:::

(sec:alternate-keplers-equation-derivation)=

## An Alternative Derivation

Now we will pursue the second way to derive Kepler's equation and the related equations for mean and eccentric anomaly. Recall the orbit equation, Eq. {eq}`eq:scalar-orbit-equation`, defined in terms of the true anomaly:

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

The integral on the right-hand side of Eq. {eq}`eq:time-since-periapsis` can be found in standard tables of integrals {cite}`Gradshtein2007,Zwillinger2003`. There are three forms of the equation, depending on the value of $e$. In this section, we'll show the equation for $e < 1$ and the other equations will be shown in the sections for the [parabola](./parabolic-trajectories.md) and [hyperbola](./hyperbolic-trajectories.md).

:::{margin}
In {cite}`Gradshtein2007` (available [here](http://fisica.ciens.ucv.ve/~svincenz/TISPISGIMR.pdf)), the appropriate integrals are found on pages 172 and 173, No. 2.554-3 and related integrals for Eqs. {eq}`eq:time-since-periapsis-rhs-e-lt-1` and {eq}`eq:time-since-periapsis-rhs-e-gt-1`. In {cite}`Zwillinger2003` (available [here](https://www.google.com/books/edition/CRC_Standard_Mathematical_Tables_and_For/gE_MBQAAQBAJ?hl=en&gbpv=1&pg=PA434&printsec=frontcover)), the appropriate integrals are found on pages 433 and 434, No. 354 and 324 for Eqs. {eq}`eq:time-since-periapsis-rhs-e-lt-1` and {eq}`eq:time-since-periapsis-rhs-e-gt-1`. I couldn't find the form for {eq}`eq:time-since-periapsis-rhs-e-eq-1` in those references. Note that $a = 1$ and $b = e$ to relate the reference equations to Eq. {eq}`eq:time-since-periapsis`.
:::

:::{math}
:label: eq:time-since-periapsis-rhs-e-lt-1
\int\frac{d\nu}{\left(1 + e\cos \nu\right)^2} = \frac{1}{\left(1 - e^2\right)^{3/2}}\left[2\tan^{-1}\left(\sqrt{\frac{1 - e}{1 + e}}\tan\frac{\nu}{2}\right)-\frac{e\sqrt{1 - e^2}\sin \nu}{1 + e \cos \nu}\right]
:::

In Eq. {eq}`eq:time-since-periapsis-rhs-e-lt-1`, $e < 1$, so it will apply for circular and elliptical orbits.

When Eq. {eq}`eq:time-since-periapsis` is combined with Eq. {eq}`eq:time-since-periapsis-rhs-e-lt-1` we have a relationship where time is related to the true anomaly.

For circular and elliptical orbits, combining Eq. {eq}`eq:time-since-periapsis` and Eq. {eq}`eq:time-since-periapsis-rhs-e-lt-1` results in:

:::{math}
:label: eq:time-since-periapsis-ellipse
\frac{\mu}{h^3}t = \frac{1}{\left(1 - e^2\right)^{3/2}}\left[2\tan^{-1}\left(\sqrt{\frac{1 - e}{1 + e}}\tan\frac{\nu}{2}\right)-\frac{e\sqrt{1 - e^2}\sin \nu}{1 + e \cos \nu}\right]
:::

## Mean Anomaly

We define the term in the square brackets in Eq. {eq}`eq:time-since-periapsis-ellipse` to be the **mean anomaly**, $M_e$, where the subscript $e$ indicates that this is for the ellipse. We will have different equations for the parabola and hyperbola.

:::{math}
:label: eq:mean-anomaly-ellipse-with-nu
M_e = \left[2\tan^{-1}\left(\sqrt{\frac{1 - e}{1 + e}}\tan\frac{\nu}{2}\right)-\frac{e\sqrt{1 - e^2}\sin \nu}{1 + e \cos \nu}\right]
:::

The mean anomaly is a monotonically increasing function of the true anomaly, as shown in {numref}`fig:mean-vs-true-anomaly-ellipse`. This is good because it means that $M_e$ can be used in place of $\nu$ for all four quadrants on the $x$-$y$ plane. If $M_e$ had a peak, we would have to be concerned about which quadrant we were in.

```{code-cell} ipython3
:tags: [remove-cell]
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.ticker import (MultipleLocator, FuncFormatter,
                               AutoMinorLocator)
plt.rc("font", size=20)

n_points = 500
e_vals = np.array((0, 0.25, 0.5, 0.75, 0.99))
E = np.linspace(0, np.pi, n_points)

fig_2, ax_2 = plt.subplots(figsize=(12, 9))
ax_2.set_ylabel("$M_e$")
ax_2.set_xlabel(r"$\nu$")
ax_2.xaxis.set_major_locator(MultipleLocator(base=np.pi))
ax_2.xaxis.set_major_formatter(FuncFormatter(lambda val, pos: {0: "0", np.pi: r"$\pi$", 2*np.pi: r"2 $\pi$"}.get(val, "")))
ax_2.yaxis.set_major_locator(MultipleLocator(base=np.pi))
ax_2.yaxis.set_major_formatter(FuncFormatter(lambda val, pos: {0: "0", np.pi: r"$\pi$", 2*np.pi: r"2 $\pi$"}.get(val, "")))
ax_2.xaxis.set_minor_locator(AutoMinorLocator(n=10))
ax_2.yaxis.set_minor_locator(AutoMinorLocator(n=10))
ax_2.grid(which="both")
for e in e_vals:
    M_e = E - e * np.sin(E)
    nu = np.arccos((e - np.cos(E)) / (e * np.cos(E) - 1))
    M_e = np.hstack((M_e, 2 * np.pi - M_e[::-1]))
    nu = np.hstack((nu, 2 * np.pi - nu[::-1]))
    ax_2.plot(nu, M_e, label=f"$e$ = {e:.2F}")

ax_2.legend()
from myst_nb import glue
glue("mean-vs-true-anomaly-ellipse", fig_2, display=False)
```

:::{glue:figure} mean-vs-true-anomaly-ellipse
:name: fig:mean-vs-true-anomaly-ellipse

Mean anomaly as a function of true anomaly for a range of eccentricities. Note that $e < 1$.
:::

Notice that when $e = 0$ (a circular orbit), the mean anomaly and true anomaly are equal.

Plugging Eq. {eq}`eq:mean-anomaly-ellipse-with-nu` into Eq. {eq}`eq:time-since-periapsis-ellipse` and solving for $M_e$, we find:

:::{math}
:label: eq:mean-anomaly-ellipse
M_e = \frac{\mu^2}{h^3} t \left(1 - e^2\right)^{3/2}
:::

If we know the period of the orbit, we can simplify the equation for the mean anomaly:

:::{math}
:label: eq:mean-anomaly-ellipse-period
M_e = \frac{2\pi}{T}t
:::

For a circle, the mean anomaly equals the true anomaly:

:::{math}
:label: eq:true-anomaly-time-circle
\nu_{\text{circle}} = \frac{2\pi}{T} t
:::

Further solution is not needed if the orbit is circular. Now we have the relationship between mean anomaly and time that we need for solution of these problems. Note that Eq. {eq}`eq:mean-anomaly-definition` and Eqs. {eq}`eq:mean-anomaly-ellipse` and {eq}`eq:mean-anomaly-ellipse-period` are exactly identical.

The procedure to find the eccentric anomaly is the same as in the {ref}`previous section <sec:ellipse-eccentric-anomaly>`, so we can move on to deriving Kepler's equation.

## Kepler's Equation

Some further trigonometry with Eq. {eq}`eq:cos-eccentric-anomaly-ellipse`, Eq. {eq}`eq:eccentric-anomaly-true-anomaly-ellipse`, and Eq. {eq}`eq:time-since-periapsis-ellipse` yields **Kepler's Equation**:

:::{math}
M_e = E - e \sin E
:::

This gives the relationship between mean anomaly and eccentric anomaly. The value of $M_e$ monotonically increases as a function of $E$, as shown in {numref}`fig:mean-eccentric-anomaly-ellipse` for several values of $e$.

```{code-cell} ipython3
:tags: [remove-cell]

n_points = 500
e_vals = np.array((0, 0.25, 0.5, 0.75, 0.99))
E = np.linspace(0, np.pi, n_points)

fig_1, ax_1 = plt.subplots(figsize=(12, 9))
ax_1.set_xlabel("$E$")
ax_1.set_ylabel(r"$M_e$")
ax_1.xaxis.set_major_locator(MultipleLocator(base=np.pi))
ax_1.xaxis.set_major_formatter(FuncFormatter(lambda val, pos: {0: "0", np.pi: r"$\pi$", 2*np.pi: r"2 $\pi$"}.get(val, "")))
ax_1.yaxis.set_major_locator(MultipleLocator(base=np.pi))
ax_1.yaxis.set_major_formatter(FuncFormatter(lambda val, pos: {0: "0", np.pi: r"$\pi$", 2*np.pi: r"2 $\pi$"}.get(val, "")))
ax_1.xaxis.set_minor_locator(AutoMinorLocator(n=10))
ax_1.yaxis.set_minor_locator(AutoMinorLocator(n=10))
ax_1.grid(which="both")
for e in e_vals:
    M_e = E - e * np.sin(E)
    M_e = np.hstack((M_e, 2 * np.pi - M_e[::-1]))
    ax_1.plot(np.hstack((E, 2 * np.pi - E[::-1])), M_e, label=f"$e$ = {e:.2F}")

ax_1.legend()
glue("mean-eccentric-anomaly-ellipse", fig_1, display=False)
```

:::{glue:figure} mean-eccentric-anomaly-ellipse
:name: fig:mean-eccentric-anomaly-ellipse

The mean anomaly as a function of eccentric anomaly for several values of the eccentricity. Note that $e < 1$.
:::

## Solution Procedures

Now we have all the pieces we need to apply the solution procedures discussed in {ref}`the introductory section <sec:time-since-periapsis-solution-procedures>`.

### Given True Anomaly, Find Time Since Periapsis

Given a value of the true anomaly $\nu$, the eccentric anomaly $E$ can be calculated from Eq. {eq}`eq:eccentric-anomaly-true-anomaly-ellipse`. Then, Kepler's Equation can be solved to find $M_e$, and the time since periapsis is found by:

:::{math}
:label:
t = \frac{M_e}{2\pi} T
:::

### Given Time Since Periapsis, Find True Anomaly

If, on the other hand, we are given the time since periapsis and want to find the true anomaly, we must first solve Eq. {eq}`eq:mean-anomaly-ellipse-period` for $M_e$. Then we need to solve Kepler's equation for $E$. Unfortunately, this equation is transcendental in $E$, so it cannot be solved analytically. There are several methods to solve Kepler's equation, depending on the level of accuracy required and the access to computational tools.

Once $E$ is determined, Eq. {eq}`eq:eccentric-anomaly-true-anomaly-ellipse` can be solved for $\nu$.

### Newton's Method to Solve Kepler's Equation

For Newton's method, we seek the roots of a function, $f(E) = 0$. In this case, we can rearrange Kepler's equation as:

:::{math}
:label:
f(E) = E - e\sin E - M_e
:::

It is also convenient to supply the derivative, when it is available, since this improves the convergence rate of the algorithm. The derivative is:

:::{math}
:label:
\frac{d f(E)}{d E} = f'(E) = 1 - e\cos E
:::

These equations can be provided to standard computational solvers for root finding algorithms.

### Infinite Series Solutions of Kepler's Equation

Although there are no analytical solutions for Kepler's equation, several people have developed infinite series solutions. The first was developed by Lagrange:

:::{math}
:label:
E = M_e + \sum_{n = 1}^{\infty}a_n e^n
:::

where the coefficients $a_n$ are given by:

:::{math}
:label:
a_n = \frac{1}{2^{n - 1}} \sum_{k=0}^{\mathrm{floor}(n/2)}(-1)^k\frac{1}{\left(n - k\right)!k!}\left(n - 2k\right)^{n - 1}\sin\left[\left(n - 2k\right)M_e\right]
:::

and where $\mathrm{floor}(x)$ means to take the next lowest integer relative to $x$.

```{margin}
**Note:** Sacchetti {cite}`Sacchetti2020` states that Italian astronomer Francesco Carlini was the first to prove the existence of the convergence limit for the Lagrange series five years before Laplace completed his work. DRAMA!
```

This infinite series converges for $e < 0.6627434193$, a limit that was proven by Laplace, and is therefore typically called the Laplace limit. For larger values of $e$, the series diverges.

Another infinite series was developed by Bessel, which converges for all $e < 1$:

:::{math}
:label:
E = M_e + \sum_{n=1}^{\infty}\frac{2}{n} J_n(ne)\sin n M_e
:::

where $J_n$ are the **Bessel functions of the first kind**, defined by their own infinite series:

:::{math}
:label:
J_n(x) = \sum_{k=0}^{\infty}\frac{\left(-1\right)^k}{k!\left(n + k\right)!}\left(\frac{x}{2}\right)^{n+ k}
:::

There are other feasible series solutions to Kepler's equation, some of which are discussed by Colwell {cite}`Colwell1992`.
