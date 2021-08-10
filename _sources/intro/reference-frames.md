# Reference Frames

In orbital mechanics, we track the motion of particles through a [Euclidean space](https://en.wikipedia.org/wiki/Euclidean_space). This means we need a **frame of reference**, also known as a reference frame, in which the motion is tracked. The frame of reference consists of a **clock** to count time and a **non-rotating Cartesian coordinate system** to track the $x$, $y$, and $z$ position of the particle. We are going to assume that relativity is not important in this course, so a single universal clock is sufficient to specify the time for all Cartesian coordinate systems.

## Types of Reference Frames

The two types of reference frames are:

1. **Inertial** frames
2. **Non-Inertial** frames

Profound.

(sec:inertial-reference-frame)=
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

All reference frames are either inertial or non-inertial, and deciding which type of frame we want to work with is our first choice. The second choice we need to make is where the origin of the frame should be placed.

With respect to the Earth, we will define three separate reference frames:

1. [](sec:earth-centered-inertial)
2. [](sec:earth-centered-earth-fixed)
3. [](sec:topocentric-horizon)

For now, we will assume that the Earth is a sphere. We use the Earth here since most human spaceflight takes place near the Earth.

(sec:earth-centered-inertial)=

### Earth-Centered Inertial

The [**Earth-Centered Inertial**](https://en.wikipedia.org/wiki/Earth-centered_inertial) (ECI) frame is an inertial frame with the origin fixed to the center of the Earth, $C$. This frame uses **capital letters** for the axes and unit vectors, as shown in {numref}`fig-earth-centered-inertial-frame`.

In the ECI, the $Z$ axis points towards the North pole and the $X$-$Y$ plane is in the same plane as the equator. Since this is an inertial frame, it is fixed in place with respect to the [**celestial sphere**](https://en.wikipedia.org/wiki/Celestial_sphere), the stars surrounding the earth.

:::{figure} ../images/Earth_Centered_Inertial_Coordinate_System.png
:name: fig-earth-centered-inertial-frame
:alt: Earth Centered Inertial coordinate system with satellite demonstrating position in this frame.

The Earth Centered Inertial coordinate system has its origin at the center of the earth and is fixed with respect to the celestial sphere. [U.S. Department of Transportation Federal Aviation Administration - Airway Facilities Division](https://commons.wikimedia.org/wiki/File:Earth_Centered_Inertial_Coordinate_System.png), Public domain, via Wikimedia Commons.
:::

In the ECI, the $X$ axis points towards the **March equinox**. The equinoxes are the points in space where the earth's equatorial plane and its ecliptic plane intersect. The March equinox occurs when the sun crosses the equatorial plane from below. This currently happens in the constellation Pisces, although in antiquity this occurred in the constellation Aries (the ram). Thus, the March equinox is also called the **First point of Aries**.

:::{margin}
For more about the equinoxes, see the page about the [Celestial Sphere](../reference/celestial-sphere.md).
:::

(sec:earth-centered-earth-fixed)=

### Earth-Centered, Earth-Fixed

The **Earth-centered, Earth-fixed** (ECEF) frame is a _non-inertial frame_, but with the origin still fixed at the center of the Earth. The main difference from the ECI is that the axes in the ECEF **rotate** at the same rate as the surface of the earth.

The ECEF uses lower case, primed letters for the axes and unit vectors. The $z'$ axis points towards the North pole, and the $x'$ axis intersects the equator and the prime meridian. Since the ECEF rotates with the earth, the $x'$ axis _always_ points through the equator and the prime meridian.

:::{figure} ../images/earth-centered-earth-fixed.svg
:name: fig:earth-centered-earth-fixed
:alt: The Earth-centered, Earth-fixed coordinate system
:width: 60%

The Earth-centered, Earth-fixed coordinate system is centered at the center of the earth and rotates with the same angular velocity, such that the $x'$ axis always points through the intersection of the prime meridian and the equator.
:::

Every 24 hours, the ECEF and ECI are aligned. Thus, the angular distance between $X$ and $x'$ is $\theta_G$, and $\theta_G$ increases at the rate $\Omega$, the rotation rate of the Earth such that there are 24 hours in the day.

:::{figure} ../images/ecef-to-eci.svg
:name: fig:ecef-to-eci
:alt: Conversion between the ECEF and ECI coordinate systems.
:width: 60%

The angle between the $X$ axis in the ECI and the $x'$ axis in the ECEF is $\theta_G$.
:::

(sec:topocentric-horizon)=

### Topocentric-Horizon

The final coordinate system determines the position of a particle $P$ moving arbitrarily above the surface of the Earth. This could be a person, car, airplane, or spacecraft.

```{margin}
I remember the difference between latitude and longitude by thinking of lines of latitude like a ladder that I would use to climb towards the North pole.
```

The origin, $O$, of this coordinate system is fixed to the particle. At a given instant, the position of this coordinate system can be determined relative to the ECEF frame by specifying the **longitude** angle ($\Lambda$) and the **latitude** angle ($\phi$), which are positive in the East and North directions respectively. These specify the $x$ and $y$ axes of a **topocentric-horizon** coordinate system, respectively.

The third direction, $z$, is directly up from the surface of the Earth and is called the **zenith**. Note that the direction of "up" changes as you move over the surface of the sphere.

:::{figure} ../images/topocentric-horizon.svg
:name: fig:topocentric-horizon
:alt: The topocentric-horizon coordinate system
:width: 60%

The topocentric-horizon coordinate system is centered at the object. The $x$ axis points east, the $y$ axis points north, and the $z$ axis points up from the earth. Modified from [Original: Brews ohare This Version: CheChe](https://commons.wikimedia.org/wiki/File:Earth_coordinates.svg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0), via Wikimedia Commons
:::
