# Chapter 4.5 - Coordinate Transformations

As we mentioned, we need a series of coordinate transformations to retrieve the position and velocity vector elements when given the six classical orbital elements:

1. $h$ or $a$ - specific orbital angular momentum or semimajor axis
2. $e$ - eccentricity
3. $\theta$ or $M$- true anomaly or mean anomaly
4. $i$ - inclination
5. $\Omega$ - right ascension of the ascending node
6. $\omega$ - argument of perigee

In this section, we will derive and discuss the background for such coordinate transformations, before applying them in the next section.

## Direction Cosines

```{margin}
[**Orthonormal**](https://en.wikipedia.org/wiki/Orthonormality) means the vectors are orthogonal and unit vectors. [**Basis**](https://en.wikipedia.org/wiki/Basis_(linear_algebra)) means that these vectors define the directions of the coordinate systems.
```

Consider a pair of right-handed Cartesian coordinate systems, defined by sets of three orthonormal basis vectors. Let the first set of basis vectors be denoted $\uvec{\imath}$, $\uvec{\jmath}$, and $\uvec{k}$, defining the $x$, $y$, and $z$ directions, respectively.

Then, let the second set of basis vectors be denoted by $\uvec{\lambda}$, $\uvec{\rho}$, and $\uvec{\sigma}$, defining the $\ell$, $m$, and $n$ directions.

By definition, the dot product of any unit vector with itself is one, and the dot product of any unit vector with another unit vector from the same coordinate system is zero.

The second, Greek, set of basis vectors can be rotated in any direction around the origin relative to the Latin basis vectors. This results in angles of the second set of basis vectors relative to the first set. Taking the cosines of these angles results in the distance that the vector is offset from the original basis set.

As an example, consider the two coordinate systems to be initially right on top of each other, totally coincident. Then, rotate the second basis set around the $z$/$n$ axis, such that the $\uvec{\lambda}$ vector forms an angle $\phi$ with respect to the $\uvec{\imath}$ vector.

The distance from the tip of the $\uvec{\lambda}$ vector to the $\uvec{\imath}$ axis, which is to say, in the $\uvec{\jmath}$ direction, is now $\sin\phi$. Similarly, the distance from the tip of the $\uvec{\lambda}$ vector to the $\uvec{\jmath}$ axis, in the $\uvec{\imath}$ direction, is now $\cos\phi$. Another way of writing this is:

$$\uvec{\lambda} = \cos\phi \uvec{\imath} + \sin\phi \uvec{\jmath} + 0 \uvec{k}$$

Similarly, for the $\uvec{\rho}$ vector:

$$\uvec{\rho} = -\sin\phi\uvec{\imath} + \cos\phi \uvec{\jmath} + 0 \uvec{k}$$

Because the rotation was about the $z$/$n$ axis, the $\uvec{k}$ and $\uvec{\sigma}$ vectors are unchanged.

These $\cos\phi$ and $\sin\phi$ terms are known as the [**direction cosines**](https://en.wikipedia.org/wiki/Direction_cosine) - so called cosines because if we used the angle from another axis to the vector, we could replace the $\sin$ with $\cos$.

In principle, we can generalize this idea of rotating around axes and defining cosines of the relevant angles to three dimensions. The terms now will involve products of cosines of several different angles.

Rather than write them all out, we just assume that they have been calculated and give them new names. This is also because the rotations can occur in any order, any number of times, as we'll see later.

In three dimensions, with arbitrary rotations around any axis, we can transform between the coordinate systems with:

$$\begin{aligned}\uvec{\lambda} &= Q_{11}\uvec{\imath} + Q_{12}\uvec{\jmath} + Q_{13}\uvec{k}\\\uvec{\rho} &= Q_{21}\uvec{\imath} + Q_{22}\uvec{\jmath} + Q_{23}\uvec{k}\\\uvec{\sigma} &= Q_{31}\uvec{\imath} + Q_{32}\uvec{\jmath} + Q_{33}\uvec{k}\end{aligned}$$

In these equations, $Q_{ab}$ is the direction cosine, or the result of computing the various trigonometric functions for each angle. The subscripts refer to the different directions in the different coordinate systems. The first number refers to the unit vector in the Greek coordinate system, and the second number refers to the unit vector in the Latin coordinate system:

* $a = 1$: $\uvec{\lambda}$
* $b = 1$: $\uvec{\imath}$
* $a = 2$: $\uvec{\rho}$
* $b = 2$: $\uvec{\jmath}$
* $a = 3$: $\uvec{\sigma}$
* $b = 3$: $\uvec{k}$

Thus, $Q_{11}$ is the direction cosine of $\uvec{\lambda}$ along the $\uvec{\imath}$ direction, or $\sin\phi$ in our previous example. Similarly, $Q_{21}$ is the direction cosine of $\uvec{\rho}$ along the $\uvec{\imath}$ direction, or $-\cos\phi$ in our previous example.

By taking the dot product of each of these basis equations with the first set of basis vectors, we can reverse the transformation:

$$\begin{aligned}\uvec{\imath} &= Q_{11}\uvec{\lambda} + Q_{21}\uvec{\rho} + Q_{31}\uvec{\sigma}\\\uvec{\jmath} &= Q_{12}\uvec{\lambda} + Q_{22}\uvec{\rho} + Q_{32}\uvec{\sigma}\\\uvec{k} &= Q_{13}\uvec{\lambda} + Q_{23}\uvec{\rho} + Q_{33}\uvec{\sigma}\end{aligned}$$

Notice that all the direction cosines have transposed.

## Direction Cosine Matrix

This property, that the direction cosines transpose when we reverse the transformation, suggests that we can form a matrix out of the direction cosines. Let:

$$\mat{Q} = \begin{bmatrix}Q_{11} & Q_{12} & Q_{13}\\Q_{21} & Q_{22} & Q_{23}\\Q_{31} & Q_{32} & Q_{33}\end{bmatrix}$$

Then, the transpose of $\mat{Q}$, denoted as $\mat{Q}^T$, is found by interchanging the row and column of each element of $\mat{Q}$. Thus:

$$\mat{Q}^T = \begin{bmatrix}Q_{11} & Q_{21} & Q_{31}\\Q_{12} & Q_{22} & Q_{32}\\Q_{13} & Q_{23} & Q_{33}\end{bmatrix}$$

We can show that:

$$\mat{Q}^T \mat{Q} = \mat{1}$$

where $\mat{1}$ is the **identity matrix**:

$$\mat{1} = \begin{bmatrix}1 & 0 & 0\\0 & 1 & 0\\0 & 0 & 1\end{bmatrix}$$

We can also show that:

$$\mat{Q}\mat{Q}^T = \mat{1}$$

Since $\mat{Q}$ satisfies both of these equations, we can say that $\mat{Q}$ is an [**orthogonal matrix**](https://en.wikipedia.org/wiki/Orthogonal_matrix). This means many things, but one important property is that orthogonal matrices preserve the size of vectors when they are multiplied together. This is critical, because we do not want the size of, say, the velocity vector to change when we transform coordinates. We only want the coordinates to change.

Now, let $\vector{v}$ be an arbitrary vector. We can represent its coordinates in the $x$-$y$-$z$ space:

$$\vector{v}_{xyz} = v_x\uvec{\imath} + v_y\uvec{\jmath} + v_z\uvec{k}$$

or in the $\ell$-$m$-$n$ space:

$$\vector{v}_{\ell mn} = v_{\ell}\uvec{\lambda} + v_m\uvec{\rho} + v_n\uvec{\sigma}$$

Since the two vectors must be equal, we can write the transform of coordinates as:

```{margin}
This is known as **matrix notation**. Vectors, which have one dimension, are surrounded by mustache braces. Matrices, which have 2 dimensions, are surrounded by square brackets.
```

$$\{\vector{v}_{\ell mn}\} = \mat{Q}\{\vector{v}_{xyz}\}$$

or, going the other direction:

$$\{\vector{v}_{xyz}\} = \mat{Q}^T\{\vector{v}_{\ell mn}\}$$

These transformations allow us to apply linear algebra principles to do the coordinate transformations, something that computers are particularly efficient at.

## Rotations

Now, we will consider the special case when the transformation involves a rotation around one axis at a time. It turns out that we can represent any arbitrary angle relative to each of the 3 Cartesian axes by a sequence of rotations around single axes. In this section, we will develop the direction cosine matrix for rotations around the $x$, $y$, and $z$ axes.

### $x$ Axis

If the rotation is about the $x$-axis, then the $\uvec{\imath}$ and $\uvec{\lambda}$ vectors will remain pointing in the same direction. On the other hand, the $\uvec{\rho}$ and $\uvec{\sigma}$ vectors will rotate relative to the $y$ and $z$ axes, respectively. If the rotation is by the angle $\phi$, then the direction cosine matrix is:

$$\mat{R_1(\phi)} = \begin{bmatrix}1 & 0 & 0\\0 & \cos\phi & \sin\phi\\0 & -\sin\phi & \cos\phi\end{bmatrix}$$

where $\mat{R_1(\phi)}$ indicates this rotation is about the first axis, the $x$ axis.

### $y$ Axis

If the rotation is about the $y$-axis, then the $\uvec{\jmath}$ and $\uvec{\rho}$ vectors will remain pointing in the same direction. On the other hand, the $\uvec{\lambda}$ and $\uvec{\sigma}$ vectors will rotate relative to the $x$ and $z$ axes, respectively. If the rotation is by the angle $\phi$, then the direction cosine matrix is:

$$\mat{R_2(\phi)} = \begin{bmatrix}\cos\phi & 0 & -\sin\phi\\0 & 1 & 0\\\sin\phi & 0 & \cos\phi\end{bmatrix}$$

where $\mat{R_2(\phi)}$ indicates this rotation is about the second axis, the $y$ axis.

### $z$ Axis

If the rotation is about the $z$-axis, then the $\uvec{k}$ and $\uvec{\sigma}$ vectors will remain pointing in the same direction. On the other hand, the $\uvec{\lambda}$ and $\uvec{\rho}$ vectors will rotate relative to the $x$ and $y$ axes, respectively. If the rotation is by the angle $\phi$, then the direction cosine matrix is:

$$\mat{R_3(\phi)} = \begin{bmatrix}\cos\phi & \sin\phi & 0\\-\sin\phi & \cos\phi & 0\\0 & 0 & 1\end{bmatrix}$$

where $\mat{R_3(\phi)}$ indicates this rotation is about the third axis, the $z$ axis. Compare this result with the result we derived geometrically in the example earlier.

## Euler Angle Sequences

As we said earlier, the general transformation from $x$-$y$-$z$ coordinates to $\ell$-$m$-$n$ coordinates can be accomplished by a sequence of rotations about the three axes. For a 3-dimensional coordinate system, three rotations are sufficient to achieve any combination of angles relative to the axes.

There are two rules that must be satisfied for this to be possible:

1. Each successive rotation is done around one of the axes of the resulting coordinate system from the previous rotation
2. Consecutive rotations cannot be about the same axis, since this would be equivalent to a single rotation of the sum of the angles

Consider the following case as an example. We begin with the $x$-$y$-$z$ axes, and we want to achieve the $\ell$-$m$-$n$ axes. The $\ell$ axis is rotated by angle $\theta_1$ relative to the $x$ axis. Similarly, the $m$ axis is rotated by angle $\theta_2$ relative to the $y$ axis, and the $n$ axis is rotated by angle $\theta_3$ relative to the $z$ axis.

First, rotate the coordinate system around the $x$ axis by the angle $\alpha$. This results in the intermediate coordinate system $x_1$-$y_1$-$z_1$, where $\mat{R_1(\alpha)}$ is used to obtain the unit vectors in this coordinate system from the originals.

Second, rotate the $x_1$-$y_1$-$z_1$ coordinate system around the $y_1$ axis by angle $\beta$. This results in the second intermediate coordinate system $x_2$-$y_2$-$z_2$, where $\mat{R_2(\beta)}$ is used to obtain the unit vectors in this coordinate system from the unit vectors in the subscript $1$ coordinate system.

Finally, rotate the $x_2$-$y_2$-$z_2$ coordinate system around the $z_2$ axis by angle $\gamma$. This results in the final coordinate system, $\ell$-$m$-$n$, where $\mat{R_3(\gamma)}$ is used to obtain the unit vectors $\uvec{\lambda}$, $\uvec{\rho}$, and $\uvec{\sigma}$ from the unit vectors in the subscript $2$ coordinate system.

This sequence of 3 rotations is know as an [**Euler angle sequence**](https://en.wikipedia.org/wiki/Euler_angles). There are 12 possible Euler angle sequences, which are the result of three individual axis rotations. Six of the sequences are symmetric and six are asymmetric.

### Symmetric Euler Angle Sequences

There are six symmetric sequences, which begin and end with the same axis:

$$\begin{aligned}&\mat{R_1(\gamma)}\mat{R_2(\beta)}\mat{R_1(\alpha)} & &\mat{R_1(\gamma)}\mat{R_3(\beta)}\mat{R_1(\alpha)}\\&\mat{R_2(\gamma)}\mat{R_1(\beta)}\mat{R_2(\alpha)} & &\mat{R_2(\gamma)}\mat{R_3(\beta)}\mat{R_2(\alpha)}\\&\mat{R_3(\gamma)}\mat{R_1(\beta)}\mat{R_3(\alpha)} & &\mat{R_3(\gamma)}\mat{R_2(\beta)}\mat{R_3(\alpha)}\end{aligned}$$

Notice that the application of these transformations is noted right-to-left, due to the way that matrix multiplication works.

The bottom left of these sequences is known as the **classical Euler angle sequence**, and has frequent application in space mechanics. It is also known as the **$z$-$x$-$z$ sequence**. The direction cosine matrix for this transformation is:

$$\mat{Q} = \mat{R_3(\gamma)}\mat{R_1(\beta)}\mat{R_3(\alpha)}$$

where $0° \leq \alpha < 360°$, $0° \leq \beta \leq 180°$, and $0°\leq\gamma < 360°$.

Applying the matrix multiplication for the three rotation transforms, we find:

$$\mat{Q} = \begin{bmatrix}-\sin\alpha\cos\beta\sin\gamma + \cos\alpha\cos\gamma & \cos\alpha\cos\beta\sin\gamma + \sin\alpha\cos\gamma & \sin\beta\sin\gamma\\-\sin\alpha\cos\beta\sin\gamma - \cos\alpha\cos\gamma & \cos\alpha\cos\beta\sin\gamma - \sin\alpha\cos\gamma & \sin\beta\cos\gamma \\\sin\alpha\sin\beta & -\cos\alpha\sin\beta & \cos\beta\end{bmatrix}$$

Therefore, given the direction cosine matrix $\mat{Q}$, we can find the three Euler angles by:

1. $\alpha = \tan^{-1}\left(-Q_{31}/Q_{32}\right)$. Note that since $\alpha$ varies from 0° to 360°, we must use the `atan2` or `arctan2` functions to account for the sign.
2. $\beta = \cos^{-1} Q_{33}$. There is no quadrant ambiguity, since $0°\leq\beta\leq 180°$
3. $\gamma = \tan^{-1}\left(Q_{13} / Q_{23}\right)$. Like $\alpha$, $\gamma$ must be calculated with `atan2` or `arctan2`.

### Asymmetric Euler Angle Sequences

There are six asymmetric sequences, which begin and end with different axes:

$$\begin{aligned}&\mat{R_1(\gamma)}\mat{R_2(\beta)}\mat{R_3(\alpha)} & &\mat{R_1(\gamma)}\mat{R_3(\beta)}\mat{R_2(\alpha)}\\&\mat{R_2(\gamma)}\mat{R_3(\beta)}\mat{R_1(\alpha)} & &\mat{R_2(\gamma)}\mat{R_1(\beta)}\mat{R_3(\alpha)}\\&\mat{R_3(\gamma)}\mat{R_1(\beta)}\mat{R_2(\alpha)} & &\mat{R_3(\gamma)}\mat{R_2(\beta)}\mat{R_1(\alpha)}\end{aligned}$$

Of these sequences, the upper left one is useful and is typically called the **yaw-pitch-roll sequence**, or the [**Tait-Bryan sequence**](https://en.wikipedia.org/wiki/Euler_angles#Tait%E2%80%93Bryan_angles). In many cases, the angles are called by different Greek letters in applications of this sequence, but we will keep the same letters here for consistency.

The direction cosine matrix for the Tait-Bryan sequence is:

$$\mat{Q} = \mat{R_1(\gamma)}\mat{R_2(\beta)}\mat{R_3(\alpha)}$$

where $0° \leq \alpha < 360°$, $-90° \leq \beta \leq 90°$, and $0°\leq\gamma < 360°$. Carrying out the matrix multiplication, we find:

$$\mat{Q} = \begin{bmatrix}\cos\alpha\cos\beta & \sin\alpha\cos\beta & -\sin\beta\\\cos\alpha\sin\beta\sin\gamma - \sin\alpha\cos\beta & \sin\alpha\sin\beta\sin\gamma + \cos\alpha\cos\gamma & \cos\beta\sin\gamma\\\cos\alpha\sin\beta\cos\gamma + \sin\alpha\sin\gamma & \sin\alpha\sin\beta\cos\gamma - \cos\alpha\sin\gamma & \cos\beta\cos\gamma\end{bmatrix}$$

Therefore, given the direction cosine matrix $\mat{Q}$, we can find the yaw, pitch, and roll angles by:

1. $\alpha = \tan^{-1}\left(Q_{12}/Q_{11}\right)$. Note that since $\alpha$ varies from 0° to 360°, we must use the `atan2` or `arctan2` functions to account for the sign.
2. $\beta = \sin^{-1} -Q_{13}$. There is no quadrant ambiguity, since $-90° \leq \beta \leq 90°$
3. $\gamma = \tan^{-1}\left(Q_{23} / Q_{33}\right)$. Like $\alpha$, $\gamma$ must be calculated with `atan2` or `arctan2`.
