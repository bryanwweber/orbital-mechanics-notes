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

# Classical Orbital Elements and the State Vector

As we saw in the [last section](./classical-orbital-elements.md), we can replace the six elements in the state vector with six orbital elements which describe the orbit. If the position and velocity vectors are known, we need to be able to convert them to the classical orbital elements. Likewise, if we have six independent orbital elements, we might want to convert them into a state vector.

```{code-cell} python3
:tags: [remove-cell]
from scripts import orbital_elements_and_the_state_vector
```

## State Vector → Orbital Elements

Let's assume that we are given the state vector, composed of $\vector{r}$ and $\vector{v}$ at some time $t_0$. We would like to determine the six classical orbital elements:

1. $h$
2. $e$
3. $i$
4. $\Omega$
5. $\omega$
6. $\nu$

As we discussed previously, this set of six elements is not unique; for instance, the orbital angular momentum $h$ can be replaced by the semi-major axis distance, $a$. Nonetheless, this set of six is a convenient set to calculate and other elements can be determined from this set.

### Step 1—Position and Velocity Magnitudes

The first step in the conversion is to calculate $r$, $v$, $v_r$, and $v_{\perp}$. Recall that the radial velocity is the projection of the velocity vector onto the unit radial vector:

:::{math}
:label: orbital-elements-radial-velocity
v_r = \vector{v} \cdot \frac{\vector{r}}{r}
:::

and we can subsequently find the azimuthal velocity by the Pythagorean theorem:

:::{math}
:label: orbital-elements-perpendicular-velocity
v\_{\perp} = \sqrt{v^2 - v_r^2}
:::

::::{tab} Python
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.py
:start-after: "[section-1]"
:end-before: "[section-2]"
:::
::::

::::{tab} MATLAB
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.m
:start-after: "[section-1]"
:end-before: "[section-2]"
:language: matlab
:::
::::

For this example, we find $r =$ {glue:text}`orbital-elements-radius:.3F` km, $v =$ {glue:text}`orbital-elements-velocity:.3f` km/s, $v_r =$ {glue:text}`orbital-elements-v_r:.3f` km/s, and $v_{\perp} =$ {glue:text}`orbital-elements-v_p:.3f` km/s.

### Step 2—Orbital Angular Momentum

Next, we need to calculate the orbital angular momentum. By definition, $\vector{h} = \vector{r}\cross\vector{v}$. We also need the magnitude of the angular momentum.

::::{tab} Python
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.py
:start-after: "[section-2]"
:end-before: "[section-3]"
:::
::::

::::{tab} MATLAB
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.m
:start-after: "[section-2]"
:end-before: "[section-3]"
:language: matlab
:::
::::

We find $\vector{h} =$ {glue:text}`orbital-elements-h_vec-I:.0f` $\uvec{I}$ + {glue:text}`orbital-elements-h_vec-J:.0f` $\uvec{J}$ - {glue:text}`orbital-elements-h_vec-K:.0f` $\uvec{K}$ km<sup>2</sup>/s and $h =$ {glue:text}`orbital-elements-h:.3f` km<sup>2</sup>/s. Notice that the $Z$ component of the angular momentum is negative. This means the momentum vector is pointing down and the orbit is retrograde. The magnitude of the orbital angular momentum is the first orbital element.

### Step 3—Inclination

Once the angular momentum is calculated, we can calculate the inclination, $i$. Let's form a right triangle with one leg as the $Z$ component of the angular momentum and the hypotenuse as the magnitude of the angular momentum. Then the inclination is the angle adjacent to $h_Z$ and can be found by the inverse cosine, as shown in Eq. {eq}`eq:orbital-elements-inclination`.

:::{math}
:label: eq:orbital-elements-inclination
i = \cos^{-1}\left(\frac{h_Z}{h}\right)
:::

Since the inclination is restricted to lie between 0° and 180°, we do not need to worry about the quadrant ambiguity inherent in the inverse cosine function.

::::{tab} Python
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.py
:start-after: "[section-3]"
:end-before: "[section-4]"
:::
::::

::::{tab} MATLAB
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.m
:start-after: "[section-3]"
:end-before: "[section-4]"
:language: matlab
:::
::::

The inclination of this orbit is $i =$ {glue:text}`orbital-elements-i:.2f`°. We know for retrograde orbits, the inclination must be between 90° and 180°, which is the case here. The inclination is the second orbital element.

### Step 4—Right Ascension of the Ascending Node

Next, we will calculate the right ascension of the ascending node. The ascending node is the point on the line of nodes where the spacecraft ascends above the reference plane. Since the line of nodes is defined by the intersection of the orbital plane and the reference plane, it must lie in both planes.

Therefore, the node line is perpendicular to the normal vectors of both the reference plane and the orbital plane. We can find the perpendicular vector by taking the cross product of a vector normal to the reference plane and a vector normal to the orbital plane. For convenience, we choose the $\uvec{K}$ vector and the $\vector{h}$ vector, as shown in Eq. {eq}`eq:orbital-elements-node-line`.

:::{math}
:label: eq:orbital-elements-node-line
\vector{N} = \uvec{K}\cross\vector{h}
:::

Then, similar to the inclination, we form a right triangle where the $X$ component of $\vector{N}$ is one leg and the magnitude of $\vector{N}$ is the hypotenuse. The right ascension of the ascending node is the angle adjacent to $N_X$ so it can be found by the inverse cosine, as shown in Eq. {eq}`eq:orbital-elements-Omega`.

:::{math}
:label: eq:orbital-elements-Omega
\Omega = \cos^{-1}\left(\frac{N_X}{N}\right)
:::

However, unlike the inclination, $\Omega$ can vary from 0° to 360°, so we need to determine the appropriate quadrant for the resulting angle. We can do this by comparing the sign of the $Y$ component of $\vector{N}$.

If $N_Y \geq 0$, then $\vector{N}$ must be pointing to the first or second quadrant and 0° ≤ $\Omega$ ≤ 180°. If $N_Y < 0$, then $\vector{N}$ must be pointing to the third or fourth quadrant, so 180° < $\Omega$ < 360°. We can express this fully with the conditions in Eq. {eq}`eq:orbital-elements-raan`.

:::{math}
:label: eq:orbital-elements-raan
\Omega = \begin{cases}
\cos^{-1}\left(\frac{N_X}{N}\right) & N_Y \geq 0 \\
2\pi - \cos^{-1}\left(\frac{N_X}{N}\right) & N_Y < 0
\end{cases}
:::

::::{tab} Python
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.py
:start-after: "[section-4]"
:end-before: "[section-5]"
:::
::::

::::{tab} MATLAB
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.m
:start-after: "[section-4]"
:end-before: "[section-5]"
:language: matlab
:::
::::

For this problem, we find $N_Y =$ {glue:text}`orbital-elements-N_Y:.0F`, so the right ascension of the ascending node is in the third or fourth quadrant. Then, we find $\Omega =$ {glue:text}`orbital-elements-raan:.2F`°. The right ascension of the ascending node is the third orbital element.

### Step 5—Eccentricity

The fourth orbital element is the eccentricity. Way back in Eq. {eq}`eq:vector-orbit-equation`, we found the eccentricity vector as the constant of integration of the equation of motion. Repeating the equation here:

:::{math}
\vector{e} = \frac{\dot{\vector{r}}\cross\vector{h}}{\mu} - \frac{\vector{r}}{r}
:::

If you're using a computer to do calculations, this form is the simplest to use. However, we can replace the cross product and simplify Eq. {eq}`eq:vector-orbit-equation` somewhat.

:::{math}
:label: eq:simplified-eccentricity-vector
\vector{e} = \frac{1}{\mu}\left[\left(v^2 - \frac{\mu}{r}\right)\vector{r} - r v_r \vector{v}\right]
:::

Eq. {eq}`eq:simplified-eccentricity-vector` is useful if you're doing calculations out by hand, since you don't have to do any cross products, only scalar multiplications of the vectors.

The magnitude of the eccentricity can be found in the usual method programmatically, or with a form simplified from Eq. {eq}`eq:simplified-eccentricity-vector`, as shown in Eq. {eq}`eq:simplified-eccentricity-magnitude`.

:::{math}
:label: eq:simplified-eccentricity-magnitude
e = \sqrt{1 + \frac{h^2}{\mu}\left(v^2 - \frac{2\mu}{r}\right)}
:::

Again, Eq. {eq}`eq:simplified-eccentricity-magnitude` is useful for hand calculations.

::::{tab} Python
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.py
:start-after: "[section-4]"
:end-before: "[section-6]"
:::
::::

::::{tab} MATLAB
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.m
:start-after: "[section-4]"
:end-before: "[section-6]"
:language: matlab
:::
::::

The eccentricity of this orbit is $e =$ {glue:text}`orbital-elements-e:.3f`, so the orbit is a very eccentric ellipse.

### Step 6—Argument of Periapsis

The last two orbital elements are found using the algebraic definition of the dot product, Eq. {eq}`eq:dot-product-definition`.

:::{math}
:label: eq:dot-product-definition
\vector{A}\cdot\vector{B} = A B \cos\theta
:::

where $\vector{A}$ and $\vector{B}$ are arbitrary vectors, $A$ and $B$ are their magnitudes, and $\theta$ is the angle between the vectors.

By definition, the eccentricity vector points towards periapsis. Moreover, the argument of periapsis is the angle from the ascending node to periapsis following around the orbit. In other words, the argument of periapsis is the angle between the eccentricity vector $\vector{e}$ and the node line $\vector{N}$. We can solve for $\omega$ by using Eq. {eq}`eq:dot-product-definition`.

:::{math}
:label: eq:orbital-elements-omega-lowercase
\omega = \cos^{-1}\left(\frac{\vector{e}\cdot\vector{N}}{e N}\right)
:::

Like the right ascension of the ascending node, the argument of periapsis can vary from 0° to 360°. To determine the appropriate quadrant, we can inspect the sign of the $Z$ component of $\vector{e}$.

If $e_Z \geq 0$, then $\vector{e}$ points up and periapsis must be between the ascending node and descending node, so 0° ≤ $\omega$ ≤ 180°. On the other hand, if $e_Z < 0$, then periapsis must be between the descending and ascending nodes, and 180° < $\omega$ < 360°. We can express this fully with the conditions in Eq. {eq}`eq:orbital-elements-aop`.

:::{math}
:label: eq:orbital-elements-aop
\omega = \begin{cases}
\cos^{-1}\left(\frac{\vector{e}\cdot\vector{N}}{e N}\right)) & e_Z \geq 0 \\
2\pi - \cos^{-1}\left(\frac{\vector{e}\cdot\vector{N}}{e N}\right)) & e_Z < 0
\end{cases}
:::

::::{tab} Python
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.py
:start-after: "[section-6]"
:end-before: "[section-7]"
:::
::::

::::{tab} MATLAB
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.m
:start-after: "[section-6]"
:end-before: "[section-7]"
:language: matlab
:::
::::

For this problem, we find $e_Z =$ {glue:text}`orbital-elements-e_Z:.4F`, so the argument of periapsis is in the third or fourth quadrant. Then, we find $\omega =$ {glue:text}`orbital-elements-aop:.2F`°. The argument of periapsis is the fifth orbital element.

### Step 7—True Anomaly

The final orbital element is the true anomaly, $\nu$. The true anomaly is the angle from the apse line to the position vector. In other words, it is the angle between $\vector{e}$ and $\vector{r}$. We can solve for $\nu$ by using Eq. {eq}`eq:dot-product-definition`.

:::{math}
:label: eq:orbital-elements-nu
\nu = \cos^{-1}\left(\frac{\vector{e}\cdot\vector{r}}{e r}\right)
:::

Like the right ascension of the ascending node, the argument of periapsis can vary from 0° to 360°. To determine the appropriate quadrant, we can inspect the sign of the radial component of the velocity, $v_r$.

If $v_r \geq 0$, then $\vector{r}$ is increasing in length and the spacecraft must be flying away from periapsis, so 0° ≤ $\nu$ < 180°. On the other hand, if $v_r < 0$, then $\vector{r}$ must be getting shorter and the spacecraft must be flying towards periapsis, such that 180° ≤ $\nu$ < 360°. We can express this fully with the conditions in Eq. {eq}`eq:orbital-elements-true-anomaly`.

:::{math}
:label: eq:orbital-elements-true-anomaly
\nu = \begin{cases}
\cos^{-1}\left(\frac{\vector{e}\cdot\vector{r}}{e r}\right) & v_r \geq 0 \\
2\pi - \cos^{-1}\left(\frac{\vector{e}\cdot\vector{r}}{e r}\right) & v_r < 0
\end{cases}
:::

::::{tab} Python
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.py
:start-after: "[section-7]"
:end-before: "[section-8]"
:::
::::

::::{tab} MATLAB
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.m
:start-after: "[section-7]"
:end-before: "[section-8]"
:language: matlab
:::
::::

For this problem, we find $v_r =$ {glue:text}`orbital-elements-v_r:.4F` km/s, so the argument of periapsis is in the third or fourth quadrant. Then, we find $\nu =$ {glue:text}`orbital-elements-true-anomaly:.2F`°. The true anomaly is the sixth and final orbital element.

## Orbital Elements → State Vector

The algorithm to convert from the orbital elements back to the state vector is somewhat more involved, so we do not include the complete derivation here. There are two steps in this algorithm:

1. Use the orbital elements $e$, $\nu$, and $h$ to represent $\vector{r}$ and $\vector{v}$ in the [perifocal frame](./perifocal-frame.md)
2. Rotate the perifocal frame so that the axes align with the inertial axes using the orbital elements $\Omega$, $\omega$, and $i$.

The first step is rather simple, but the derivation of the second step requires a long digression on the topic of [coordinate transformations](https://en.wikipedia.org/wiki/Rotation_of_axes). So, we'll skip the derivation and get right to the point.

### Step 1—Transform to Perifocal Frame

Remember that the perifocal frame is defined in the orbital plane with the unit vectors $\uvec{p}$, $\uvec{q}$, and $\uvec{w}$, as shown in {numref}`fig:definition-of-perifocal-frame`. The position and velocity components in the perifocal frame are given by Eq. {eq}`eq:perifocal-vector-orbit-equation` and Eq. {eq}`eq:perifocal-simplified-velocity-vector`, respectively.

::::{tab} Python
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.py
:start-after: "[section-8]"
:end-before: "[section-9]"
:::
::::

::::{tab} MATLAB
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.m
:start-after: "[section-8]"
:end-before: "[section-9]"
:language: matlab
:::
::::

For this example, we find $\vector{r}_{\omega} =$ {glue:text}`orbital-elements-r_w-I:.4f` $\uvec{p}$ + {glue:text}`orbital-elements-r_w-J:.4f` $\uvec{q}$ km and $\vector{v}_{\omega} =$ {glue:text}`orbital-elements-v_w-I:.4f` $\uvec{p}$ + {glue:text}`orbital-elements-v_w-J:.4f` $\uvec{q}$ km/s.

### Step 2—Rotate the Perifocal Frame

The second step of this algorithm is to apply the set of coordinate transformations that converts the perifocal frame into the inertial frame. It turns out that a set of three rotations applied sequentially will accomplish this goal. These steps are shown in {numref}`fig:euler-angle-rotation`.

1. Rotate around the $\uvec{w}$ axis until the $\uvec{p}$ axis is aligned with the node line
2. Rotate around the node line until the $\uvec{w}$ axis is aligned with the $Z$ axis
3. Rotate around the $Z$ axis until the $\uvec{p}$ axis is aligned with the $X$ axis

:::{figure} ../images/Euler.gif
:name: fig:euler-angle-rotation

The sequence of rotations to convert from the perifocal frame to the inertial frame. Adapted from [Juansempere](https://commons.wikimedia.org/wiki/File:Euler2.gif), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), via Wikimedia Commons.
:::

:::{panels}
:column: col-lg-12 p-2

Step 2.1—Rotate Until $\uvec{p}$ is Aligned With the Node Line
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By definition, the $\uvec{p}$ vector points towards periapsis. Therefore, it is also aligned with the eccentricity vector. If we rotate the frame around the $\uvec{w}$ axis until $\uvec{p}$ is aligned with the node line, this will align $\vector{e}$ with $\vector{N}$. This rotation is the negative of the argument of periapsis, $\omega$.

---

Step 2.2—Rotate Until $\uvec{w}$ is Aligned With the $Z$ Axis
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

At this point, the node line and the eccentricity are aligned. Rotating around the node line changes the inclination of the orbit. When $\uvec{w}$ is aligned with the $Z$ axis, then the inclination, $i$, has been accounted for.

---

Step 2.3—Rotate Until $\uvec{p}$ is Aligned With the $X$ Axis
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The last step is to account for the right ascension of the ascending node. Since $\uvec{p}$ is now aligned with the node line, we can rotate around the $Z$ axis to turn the orbital plane until it aligns with the $X$ axis. This is the negative of the right ascension of the ascending node.

:::

These three angles ($\omega$, $i$, and $\Omega$) are called [**Euler angles**](https://en.wikipedia.org/wiki/Euler_angles). Transformations based on the Euler angles are well known and can be calculated in many ways. Here, we'll use a computing environment to simplify the calculations.

::::{tab} Python
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.py
:start-after: "[section-9]"
:end-before: "[section-10]"
:::

In Python, the SciPy library includes a class to automatically compute the rotation matrix. The class takes the three angles and the axes about which the rotations should be done. In this case, our rotations are around the $\uvec{w}$ axis (the $z$ axis of the perifocal frame), the $x$ axis that is present after the first rotation, and finally, the $z$ axis which is present after the second rotation.

Notice that the rotation is right-handed by default, positive clockwise. Since we are reversing the rotations, the angles all have to be negative.

To actually perform the rotation, we need to multiply the position and velocity vectors in the perifocal frame by the rotation matrix. The `@` symbol in Python performs matrix multiplication, instead of scalar multiplication.
::::

::::{tab} MATLAB
:::{literalinclude} scripts/orbital_elements_and_the_state_vector.m
:start-after: "[section-9]"
:end-before: "[section-10]"
:language: matlab
:::

In Matlab, there is no built-in way to compute rotation matrices. Instead, the easiest step is to compose the rotation matrices for each direction and multiply the position and velocity vectors by the matrices.

The order that the multiplication occurs is important! This is because the rotation has to occur first around the $\uvec{w}$ axis, then about the new $x$ axis generated by the first rotation, and finally around the new $z$ axis created by the second rotation. If the rotations are specified in a different order, you will not get the right result.

In addition, notice that the angles must be specified as negative, since we are reversing the rotation from the perifocal frame to the inertial frame.
::::

In the end, we find $\vector{r} =$ {glue:text}`orbital-elements-r_rot-I:.0f` $\uvec{I}$ + {glue:text}`orbital-elements-r_rot-J:.0f` $\uvec{J}$ + {glue:text}`orbital-elements-r_rot-K:.0f` $\uvec{K}$ km and $\vector{v} =$ {glue:text}`orbital-elements-v_rot-I:.0f` $\uvec{I}$ + {glue:text}`orbital-elements-v_rot-J:.0f` $\uvec{J}$ + {glue:text}`orbital-elements-v_rot-K:.0f` $\uvec{K}$ km/s. This is exactly the same as the initial condition, showing that we did the conversion correctly.
