# Chapter 4.6 - Transformation Between Geocentric Equatorial and Perifocal Frames

In Chapter 2, we defined the perifocal frame as the coordinate system with the $z$ axis perpendicular to the orbital plane (parallel to the angular momentum vector). In this plane, the position and velocity vectors are given by:

$$\begin{aligned}\vector{r} &= \pf{x}\uvec{p} + \pf{y}\uvec{q} = \frac{h^2}{\mu}\frac{1}{1 + e \cos\theta}\left(\cos\theta \uvec{p} + \sin\theta\uvec{q}\right)\\\vector{v} &= \dot{\pf{x}}\uvec{p} + \dot{\pf{y}}\uvec{q} = \frac{\mu}{h}\left[-\sin\theta \uvec{p} + \left(e + \cos\theta\right)\uvec{q}\right]\end{aligned}$$

In matrix notation, we can rewrite these as:

$$\begin{aligned}\left\{r\right\}_{\pf{x}} &= \frac{h^2}{\mu}\frac{1}{1 + e\cos\theta}\left\{\begin{matrix}\cos\theta\\\sin\theta\\0\end{matrix}\right\}\\\left\{v\right\}_{\pf{x}} &= \frac{\mu}{h}\left\{\begin{matrix}-\sin\theta\\ e + \cos\theta\\0\end{matrix}\right\}\end{aligned}$$

where the subscript $\pf{x}$ is a shorthand indicating that these vectors are applied to the perifocal frame.

Now, let the geocentric equatorial frame be denoted by capital letters $X$, $Y$, and $Z$. The transformation from the geocentric equatorial frame to the perifocal frame may be accomplished by the classical Euler angle sequence:

$$\mat{Q} = \mat{R_3(\gamma)}\mat{R_1(\beta)}\mat{R_3(\alpha)}$$

In this transformation, we associate the first angle ($\alpha$) with the right ascension of the ascending node, $\Omega$. This is because we know that $\Omega$ is defined by a rotation around the original $Z$ axis.

Following the first rotation, we cannot rotate around the same axis again. The second rotation is done to align the $z$ axis of the intermediate frame with the $\pf{z}$ axis of the perifocal frame. The amount of rotation is the inclination of the orbit, $i$.

At this point, the coordinate system is aligned with the $\pf{x}\pf{y}$ plane of the perifocal frame, and we need to rotate periapsis to be aligned with the $\pf{x}$ axis. This is done by a rotation around the $\pf{z}$ axis, in the amount of the argument of periapsis, $\omega$.

All together, the transform from the geocentric equatorial coordinates to the perifocal coordinates is given by:

$$\mat{Q}_{X\pf{x}} = \mat{R_3(\omega)}\mat{R_1(i)}\mat{R_3(\Omega)}$$

where the subscript $X\pf{x}$ indicates it is transforming from the geocentric frame into the perifocal frame.

Plugging in the various rotational transforms, we find:

$$\mat{Q} = \begin{bmatrix}-\sin\Omega\cos i\sin\omega + \cos\Omega\cos\omega & \cos\Omega\cos i\sin\omega + \sin\Omega\cos\omega & \sin i\sin\omega\\-\sin\Omega\cos i\sin\omega - \cos\Omega\cos\omega & \cos\Omega\cos i\sin\omega - \sin\Omega\cos\omega & \sin i\cos\omega \\\sin\Omega\sin i & -\cos\Omega\sin i & \cos i\end{bmatrix}$$

Therefore, if the components of the state vector are given in geocentric coordinates:

$$\begin{aligned}\left\{r\right\}_X &= \left\{\begin{matrix}X\\ Y\\ Z\end{matrix}\right\} & \left\{v\right\}_X &= \left\{\begin{matrix}\dot{X}\\\dot{Y}\\\dot{Z}\end{matrix}\right\}\end{aligned}$$

then we can find the components in the perifocal frame by doing the linear algebra:

$$\begin{aligned}\left\{r\right\}_{\pf{x}} &= \left\{\begin{matrix}\pf{x}\\\pf{y}\\ 0\end{matrix}\right\} = \mat{Q}_{X\pf{x}} \left\{r\right\}_{X} & \left\{v\right\}_{\pf{x}} &= \left\{\begin{matrix}\dot{\pf{x}}\\\dot{\pf{y}}\\ 0\end{matrix}\right\} = \mat{Q}_{X\pf{x}} \left\{v\right\}_{X}\end{aligned}$$

Similarly, the transform from perifocal to geocentric coordinates is done by taking the transpose of $\mat{Q}$. Let

$$\mat{Q}_{\pf{x}X} = \left(\mat{Q}_{X\pf{x}}\right)^{T}$$

Then:

$$\begin{aligned}\left\{r\right\}_{X} &= \mat{Q}_{\pf{x}X} \left\{r\right\}_{\pf{x}} & \left\{v\right\}_{X} &= \mat{Q}_{\pf{x}X} \left\{v\right\}_{\pf{x}}\end{aligned}$$
