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

# Time Since Periapsis, Mean Anomaly, and Eccentric Anomaly

In the last chapter, we derived equations for the position of an object in a two-body system as a function of the true anomaly. However, humans don't really think in terms of true anomaly, we think in terms of time. The only place time appeared in the last chapter was in the calculation of the orbital period.

As we'll find in this chapter, the equations to relate the orbital position to time are [**transcendental**](https://en.wikipedia.org/wiki/Transcendental_equation) for all but the circular orbit. This means we will need to use an approximation such as Newton's method to solve them. Initially, we will derive separate equations each for the elliptical, parabolic, and hyperbolic orbits. Then, we will combine these using a universal variable formulation.

## Time Since Periapsis

The goal of this chapter is to relate the time since periapsis, $t$, to an object's position in the orbit defined by the true anomaly, $\nu$. We know that the direct relationship between $t$ and $\nu$ is complex because the object speeds up near periapsis and slows down near apoapsis. This phenomenon is one of the insights from Kepler's second law, which states that equal areas are swept out in equal times.

Instead of trying to find this direct relationship between $t$ and $\nu$, we're going to take a different route that has three main steps:

1. Calculate an auxiliary angle from the true anomaly
2. Calculate another auxiliary angle from the orbital parameters such as the period, eccentricity, angular momentum, and time since periapsis
3. Relate these angle to each other so we can solve in either direction

### Mean and Eccentric Anomalies

Without providing any particular motivation yet for why these are useful, let's define the two auxiliary angles for any orbit. They will be called the:

1. **Mean anomaly**
2. **Eccentric anomaly**

:::{note}
Conceptually, it is easiest to understand the mean and eccentric anomalies in the context of an elliptical orbit. Just remember that they also apply to parabolic and hyperbolic trajectories as well.
:::

For an ellipse, we know that the angular speed of the spacecraft is a function of the true anomaly. This is a result of Kepler's second law, that equal areas are swept in equal times—the spacecraft must move faster near periapsis and slower near apoapsis to sweep the same area in a given time interval. Thus, the rate of change of the true anomaly is not constant!

:::{margin}
Such a circle is said to **circumscribe** the ellipse.
:::

The **mean anomaly** for an ellipse is defined such that it is a constant rate that gives the same period as the true anomaly. If we draw a circle that touches the ellipse at periapsis and apoapsis, then the rate of change of the mean anomaly is the rate at which a point must move around this circle to meet the spacecraft at periapsis and apoapsis.

The **eccentric anomaly** is defined slightly differently. Imagine the same circle that touches the ellipse at periapsis and apoapsis. Now draw a line perpendicular to the semimajor axis from the orbit to the circle, at the current true anomaly. The angle to the point defined in this way on the circle is the eccentric anomaly.

The three anomalies: true, mean, and eccentric, are shown in @fig:true-mean-eccentric-anomalies.

:::{html-figure} assets/true-mean-eccentric-anomalies.html
:name: fig:true-mean-eccentric-anomalies
:title: True, mean, and eccentric anomalies
:placeholder: assets/true-mean-eccentric-anomalies.svg

The true, mean, and eccentric anomalies for an elliptical orbit. The true anomaly is shown in blue, the mean anomaly is shown in orange, and the eccentric anomaly is shown in green. The mean anomaly proceeds around the orange circle at a constant rate, while the rates of the true and eccentric anomalies vary with position. Nonetheless, they all meet at periapsis and apoapsis. Note the vertical line connecting the true and eccentric anomalies.
:::

(sec:time-since-periapsis-solution-procedures)=

## Solution Procedures

There are now two cases that we want to consider:

1. We know the current true anomaly and want to find the time since periapsis
2. We know the current time since periapsis and want to know the true anomaly

Each case is solved slightly differently, and the equations depend on the type of trajectory, so specific solutions for each type of trajectory will be shown in the following sections.

### Given True Anomaly, Find Time Since Periapsis

1. Use the true anomaly to find the eccentric anomaly
2. Use the eccentric anomaly to find the mean anomaly
3. Use the mean anomaly to find the time since periapsis

### Given Time Since Periapsis, Find True Anomaly

1. Use the time since periapsis to find the mean anomaly
2. Use the mean anomaly to find the eccentric anomaly
3. Use the eccentric anomaly to find the true anomaly

In the next sections, we will develop equations that relate the three anomalies and time since periapsis to each other.
