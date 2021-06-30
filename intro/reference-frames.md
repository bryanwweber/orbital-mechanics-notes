# Reference Frames

In orbital mechanics, we track the motion of particles through a [Euclidean space](https://en.wikipedia.org/wiki/Euclidean_space). This means we need a **frame of reference**, also known as a reference frame, in which the motion is tracked. The frame of reference consists of a **clock** to count time and a non-rotating Cartesian coordinate system to track the $x$, $y$, and $z$ position of the particle. We are going to assume that relativity is not important in this course, so a single universal clock is sufficient to specify the time for all Cartesian coordinate systems.

## Types of Reference Frames

The two types of reference frames are:

1. **Inertial** frames
2. **Non-Inertial** frames

Profound.

### Inertial Reference Frame

An **inertial** reference frame is one that is not _accelerating_. It may be moving at constant velocity, but there can be absolutely no acceleration, _including rotation!_

:::{margin}
An object in motion tends to stay in motion unless acted upon by an external force.
:::

Therefore, in an inertial reference frame, an object obeys Newton's First Law of Motion and its velocity remains constant unless an external force acts on it. Inertial reference frames are always our first choice if possible, because the laws of mechanics tend to take their simplest form in this frame.

In orbital mechanics, we usually define an inertial reference frame with respect to the **fixed stars**. Of course, the stars are not really fixed—our Sun orbits the center of the galaxy, as do other stars in the Milky Way, and other galaxies may be approaching or receding at some velocity.

:::{margin}
According to Graneau and Graneau {cite}`Graneau2006` (pg. 147), the centrifugal acceleration due to the sun's orbit around the galactic center is about thirty million times less than that of the earth about the sun. The effect of the motion of other stars is presumably even smaller still.
:::

However, on the scale of most orbital mechanics problems we have to deal with (on the order of a few days to a few years), assuming the stars are fixed is reasonable.

### Non-Inertial Reference Frame

By contrast to the inertial reference frame, the [**non-inertial** reference frame](https://en.wikipedia.org/wiki/Non-inertial_reference_frame) does accelerate. This gives rise to the so-called **fictitious forces**, such as the centrifugal force, Coriolis force, and others.

One common example of an accelerating reference frame that you may have seen in Physics is the idea of a ball attached to a string rotating around a point—for instance, spinning a ball on a string above your head. In this case, a reference frame attached to a point which is not spinning would be considered inertial. On the other hand, a reference frame attached to the ball would be rotating and thus accelerating. It would be a non-inertial reference frame (specifically, a [rotating reference frame](https://en.wikipedia.org/wiki/Rotating_reference_frame)) and would need to include a "fictitious" centrifugal force to satisfy the equations of motion.

:::{figure} ../images/Centripetal_force_and_reaction.svg
:name: fig-centripetal-force
:alt: Centripetal force and reaction

Centripetal force and reaction. Attributed to [Richard F. Lyon based on work of en:User:Cburnett](https://commons.wikimedia.org/wiki/File:Centripetal_force_and_reaction.svg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), via Wikimedia Commons
:::

As another example, consider a ball moving on a frictionless, rotating plate. An observer in an inertial frame would see the ball move in a straight line, since the ball does not experience any forces. However, an observer rotating with the frame would see the ball follow a curved path, implying the existence of a force. Since the force is not present in the inertial frame, this is termed a [fictitious force](https://en.wikipedia.org/wiki/Fictitious_force).

:::{figure} ../images/Corioliskraftanimation.gif
:name: fig-coriolis-force
:alt: Coriolis force

Demonstration of the Coriolis force. The observer is shown as the red dot. Attributed to [Hubi](https://commons.wikimedia.org/wiki/File:Corioliskraftanimation.gif), [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0), via Wikimedia Commons
:::

## Earth Reference Frames

With respect to the Earth, we will define three separate reference frames. For now, we will assume that the Earth is a sphere.

### Earth-Centered Inertial

First is an inertial frame, with the origin fixed to the center of the Earth, $C$. This frame uses capital letters for the axes and unit vectors. The $Z$ axis points towards the North pole. This is called the Earth-centered inertial (ECI) frame.

### Earth-Centered, Earth-Fixed

Second is a non-inertial frame, but with the origin still fixed at the center of the Earth. In this case, the frame uses lower case, primed letters for the axes and unit vectors. This is the Earth-centered, Earth-fixed (ECEF) frame. The $z'$ axis points towards the North pole, and the $x'$ axis intersects the equator and the prime meridian.

This frame of reference rotates with the Earth. The angular distance between $X$ and $x'$ is $\theta_G$, and $\theta_G$ increases at the rate $\Omega$, the rotation rate of the Earth such that there are 24 hours in the day.

### Topocentric-Horizon

The final coordinate system determines the position of a particle $P$ moving arbitrarily above the surface of the Earth. This could be a person, car, airplane, or spacecraft.

```{margin}
I remember the difference between latitude and longitude by thinking of lines of latitude like a ladder that I would use to climb towards the North pole.
```

The origin, $O$, of this coordinate system is fixed to the particle. At a given instant, the position of this coordinate system can be determined relative to the ECEF frame by specifying the **longitude** angle ($\Lambda$) and the **latitude** angle ($\phi$), which are positive in the East and North directions respectively. These specify the $x$ and $y$ axes of a **topocentric-horizon** coordinate system, respectively.

The third direction, $z$, is directly up from the surface of the Earth and is called the **zenith**. Note that the direction of "up" changes as you move over the surface of the sphere.
