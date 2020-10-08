# Chapter 3.2 - Time Since Periapsis

In the last chapter, we derived equations for the position of an object in a two-body system as a function of the true anomaly. However, humans don't really think in terms of true anomaly, we think in terms of time. The only place time appeared in the last chapter was in the calculation of the orbital period.

As we'll find in this chapter, the equations to relate the orbital position to time are **transcendental** for all but the circular orbit. This means we will need to use Newton's method to solve them. Initially, we will derive separate equations each for the elliptical, parabolic, and hyperbolic orbits. Next, we will combine these using a universal variable formulation.

## Time Since Periapsis

Recall the orbit formula, defined in terms of the true anomaly:

$$r = \frac{h^2}{\mu} \frac{1}{1 + e\cos\theta}$$

We now want to relate the true anomaly, $\theta$, to time. We have one equation where this is done, in the definition of the specific angular momentum:

$$h = r^2\dot{\theta} \Rightarrow \frac{d\theta}{dt} = \frac{h}{r^2}$$

Substituting the orbit equation here and separating variables, we find:

$$\frac{\mu^2}{h^3}dt = \frac{d\theta}{\left(1 + e\cos\theta\right)^2}$$

Since $\mu$ and $h$ are constant, the left side can be directly integrated:

$$\frac{\mu^2}{h^3}\int_{t_p}^{t} dt = \int_{0}^{\theta}\frac{d\theta}{\left(1 + e\cos\theta\right)^2}$$

where $t_p$ is defined as the time since periapsis, when $\theta = 0$. Typically, we will set $t_p = 0$, such that:

$$\frac{\mu}{h^3}t = \int_{0}^{\theta}\frac{d\theta}{\left(1 + e\cos\theta\right)^2}$$(time-since-periapsis)

The integral on the right-hand side can be found in standard tables of integrals {cite}`Gradshtein2007,Zwillinger2003`. In {cite}`Gradshtein2007` (available [here](http://fisica.ciens.ucv.ve/~svincenz/TISPISGIMR.pdf)), the appropriate integrals are found on pages 172 and 173, No. 2.554-3 and related integrals for the first and third equations. In {cite}`Zwillinger2003` (available [here](https://www.google.com/books/edition/CRC_Standard_Mathematical_Tables_and_For/gE_MBQAAQBAJ?hl=en&gbpv=1&pg=PA434&printsec=frontcover)), the appropriate integrals are found on pages 433 and 434, No. 354 and 324 for the first and third equations. I couldn't find the form for the middle equation.

```{margin}
**Note:** There seems to be a typo in Eq. 3.3 and 3.5 in the book here, where the $\sin x$ does not belong inside the square root.
```

$$\begin{aligned}\int\frac{dx}{\left(a + b\cos x\right)^2} &= \frac{1}{\left(a^2 - b^2\right)^{3/2}}\left[2a\tan^{-1}\left(\sqrt{\frac{a - b}{a + b}}\tan\frac{x}{2}\right)-\frac{b\sqrt{a^2 - b^2}\sin x}{a + b \cos x}\right] & \left(b < a\right)\\ \int\frac{dx}{\left(a + b\cos x\right)^2} &= \frac{1}{a^2}\left(\frac{1}{2}\tan \frac{x}{2}+\frac{1}{6}\tan^{3}\frac{x}{2}\right) & \left(b = a\right)\\ \int\frac{dx}{\left(a + b\cos x\right)^2} &= \frac{1}{\left(b^2 - a^2\right)^{3/2}}\left[\frac{b\sqrt{b^2 - a^2}\sin x}{a + b\cos x} - a\ln\left(\frac{\sqrt{b + a} + \sqrt{b - a}\tan\frac{x}{2}}{\sqrt{b + 1} - \sqrt{b - a}\tan\frac{x}{2}}\right)\right] & \left(b > a\right)\end{aligned}$$

From these equations, we can see that we will have 4 cases, depending on the value of $e$, one each for the circular, elliptical, parabolic, and hyperbolic orbits.

## References

```{bibliography} ../references.bib
:style: unsrt
:filter: docname in docnames
```
