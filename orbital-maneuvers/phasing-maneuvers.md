# Phasing Maneuvers

When two spacecraft want to rendezvous in space, they must simultaneously have the same position and velocity vectors. Common examples of rendezvous are resupply craft for the ISS or the Lunar Module (LM) with the Command and Service Module (CSM) during the Apollo missions.

For two spacecraft to rendezvous, there are typically two stages to the maneuver:

1. **Phasing maneuver**: The two spacecraft may begin the maneuver very far apart. The first stage of the rendezvous is to bring the two spacecraft into close proximity by performing a phasing maneuver, usually by one of the spacecraft.
2. **Final approach**: Once the spacecraft are in close proximity, the final approach maneuver requires small adjustments to the approaching craft's velocity so that the two can match.

In this section, we are going to focus on the first stage, the phasing maneuver. A phasing maneuver, in general, is a two-impulse transfer from an orbit into a different orbit, then back to the original orbit. The period of the transfer orbit is different from the original orbit, so the spacecraft will arrive back at the original impulse point at a different time than if it had stayed on the original orbit.

We assume that the velocity change is applied parallel to the velocity vector at the impulse point. This gives the minimum propellant usage for such a maneuver, but is relatively slow. More general orbital transfers, including rendezvous maneuvers that require less than a full orbit, will be covered in [](./non-hohmann-transfers.md).

## Returning At A Later Time

As shown in @fig:phasing-orbit-increase-period, two spacecraft are initially on Orbit 1. The chase or interceptor spacecraft is at the point marked _Impulse Point_ and the target spacecraft is _behind_ the chase craft in the orbit.

:::{figure} ../images/phasing-orbit-increase-period.svg
:width: 75%
:name: fig:phasing-orbit-increase-period

A phasing orbit to allow a target spacecraft to catch up to the interceptor spacecraft. The semi-major axis of the phasing orbit (Orbit 2, blue) is larger than the initial orbit, so the period of the phasing orbit is longer.
:::

At the impulse point, the interceptor spacecraft increases its velocity to place itself on Orbit 2. The period of Orbit 2 is:

:::{math}
:label: eq:phasing-orbit-2-period

T_2 = \frac{2\pi}{\sqrt{\mu}} a_2^{3/2}
:::

while the period of Orbit 1 is:

:::{math}
:label: eq:phasing-orbit-1-period

T_1 = \frac{2\pi}{\sqrt{\mu}} a_1^{3/2}
:::

Since $a_1 < a_2$, the period of Orbit 2 is greater. Therefore, while the interceptor craft travels 360° of true anomaly in time $T_2$, the target spacecraft travels _more than_ 360° of true anomaly. This allows the target spacecraft to catch up and reach the impulse point at the same time that the interceptor returns there.

## Returning At An Earlier Time

As shown in @fig:phasing-orbit-decrease-period, two spacecraft are initially on Orbit 1. The chase or interceptor spacecraft is at the point marked _Impulse Point_ and the target spacecraft is _behind_ the chase craft in the orbit.

:::{figure} ../images/phasing-orbit-decrease-period.svg
:width: 75%
:name: fig:phasing-orbit-decrease-period

A phasing orbit to allow an interceptor spacecraft to catch up to the target spacecraft. The semi-major axis of the phasing orbit (Orbit 2, blue) is smaller than the initial orbit, so the period of the phasing orbit is shorter.
:::

At the impulse point, the interceptor spacecraft decreases its velocity to place itself on Orbit 2. The period of Orbit 2 is given by @eq:phasing-orbit-2-period while the period of Orbit 1 is given by @eq:phasing-orbit-1-period.

Since $a_1 > a_2$, the period of Orbit 2 is smaller. Therefore, while the interceptor craft travels 360° of true anomaly in time $T_2$, the target spacecraft travels less than_ 360° of true anomaly. This allows the interceptor spacecraft to catch up and reach the impulse point at the same time that the target returns there.
