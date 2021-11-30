# Chapter 3.5 - Parabolic Trajectories ($e = 1$)

For the parabola, we set $a = b = 1$. Thus, the equation for the integral becomes:

$$\int_0^{\theta}\frac{d\theta}{\left(1 + \cos\theta\right)^2} = \frac{1}{2}\tan\frac{\theta}{2} + \frac{1}{6}\tan^3\frac{\theta}{2}$$

Then, Eq. {eq}`time-since-periapsis` becomes:

$$\frac{\mu^2}{h^3}t = \frac{1}{2}\tan\frac{\theta}{2} + \frac{1}{6}\tan^3\frac{\theta}{2}$$

Defining the left hand side as $M_p$, the mean anomaly of the parabolic trajectory, we find:

$$M_p = \frac{1}{2}\tan\frac{\theta}{2} + \frac{1}{6}\tan^3\frac{\theta}{2}$$

This is known as **Barker's equation** and gives us the time since periapsis in terms of the true anomaly. If, instead, we know the time since periapsis and want to solve for the true anomaly, we need to solve the cubic equation:

$$0 = \frac{1}{2}\tan\frac{\theta}{2} + \frac{1}{6}\tan^3\frac{\theta}{2} - M_p$$

which has one real root:

$$\tan\frac{\theta}{2} = z - \frac{1}{z}$$

where:

$$z = \sqrt[3]{3M_p + \sqrt{1 + \left(3 M_p\right)^2}}$$
