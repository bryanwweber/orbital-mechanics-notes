---
jupytext:
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.3-dev
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---
# Classical Orbital Elements

We know that the solution to the 3-D vector orbit equation requires six independent elements to find a solution. So far, we have worked with $\vector{r}$ and $\vector{v}$ and their scalar components when determining orbits. In this section, we introduce the six classical orbital elements, which can also be used as a set of independent components of the orbit.

The six elements are also known as Keplerian orbital elements:

1. $a$, the semi-major axis—a constant defining the size of the conic.
2. $e$, the eccentricity—a constant defining the shape of the conic.
3. $i$, the inclination—the constant angle between $\uvec{K}$ in the reference frame and $\uvec{h}$ in the orbital plane.
4. $\Omega$, right ascension (or longitude) of the ascending node—the right ascension of the point where the spacecraft crosses from below to above the fundamental plane of the reference frame. The crossing point is called the ascending node.
5. $\omega$, argument of periapsis—the angular distance along the orbit from the ascending node to periapsis.
6. $T$, time of periapsis passage—the time when the spacecraft passed periapsis.

Each of these six elements will be developed in the following subsections. This choice of six elements is not unique and equivalent parameters will be discussed below as well.

## $a$, the Semi-Major Axis

The semi-major axis determines the size of the conic section. For a circle, it is the radius, while for an ellipse, it describes the width of the ellipse. For a hyperbola, the semi-major axis describes the distance from the origin of the Cartesian coordinate system.

The semi-latus rectum may specified instead of the semi-major axis, since with $a$ and $e$, $p$ can be calculated. This is convenient for parabolic trajectories where the semi-major axis is not as meaningful.

Finally, the specific angular momentum, $h$, can also be used in place of the semi-major axis.

## $e$, the Eccentricity

The eccentricity describes the deviation of the trajectory from a circle. When $e=0$, the orbit is circular; for values of $e < 1$, the orbit is elliptical. When $e = 1$, the trajectory is parabolic and for $e > 1$, the trajectory is hyperbolic.

## $i$, the Inclination

The [inclination](https://en.wikipedia.org/wiki/Orbital_inclination) is the angle from the $\uvec{K}$ axis in the reference frame to the angular momentum vector, $\vector{h}$, as shown in @fig:definition-of-inclination. The inclination ranges from 0° to 180°.

```{code-cell} python
:tags: [remove-cell]
import numpy as np
import plotly.graph_objects as go
from scipy.spatial.transform import Rotation as R


def arrow(start, end, fig=None, **kwargs):
    start_offset = kwargs.get("start_offset") or 0.98
    tip_ratio = kwargs.get("tip_ratio") or 0.1
    x_0, y_0, z_0 = start + start_offset * (end - start)
    u_0, v_0, w_0 = tip_ratio * (end - start)
    cone = go.Cone(
        x=[x_0],
        y=[y_0],
        z=[z_0],
        u=[u_0],
        v=[v_0],
        w=[w_0],
        showlegend=False,
        showscale=False,
        sizemode="absolute",
        sizeref=10,
        **kwargs.get("cone", {}),
    )
    coords = np.vstack((start, end))
    line = go.Scatter3d(
        x=coords[:, 0],
        y=coords[:, 1],
        z=coords[:, 2],
        mode="lines+text",
        line=kwargs.get("line"),
        text=["", "h"],
        textfont=dict(size=30, family="sans-serif", color="black"),
        textposition="top center",
    )
    if fig is not None:
        fig.add_trace(line)
        fig.add_trace(cone)
    else:
        return line, cone


colors = dict(
    green="rgb(102,194,165)",
    red="rgb(252,141,98)",
    blue="rgb(141,160,203)",
    pink="rgb(231,138,195)",
    lime="rgb(166,216,84)",
    yellow="rgb(255,217,47)",
)

a = 100
e = 0.4
b = a * np.sqrt(1 - e**2)
r_p = a * (1 - e)

inclination = 30
raan = 0
omega = 0

rot = R.from_euler("zxy", [0, 0, inclination], degrees=True)

theta = np.arange(0, 2 * np.pi, step=0.01)
phi = 0
r = a * (1 - e**2) / (1 - e * np.cos(theta - phi))
x = r * np.cos(theta)
y = r * np.sin(theta)
z = np.zeros_like(x)
r = np.vstack((x, y, z)).T
rotated = rot.apply(r)

vector_scale = 100
h_vec = np.zeros((2, 3), dtype=float)
h_vec[1, 2] = vector_scale
rot_vec = rot.apply(h_vec)

periapsis = np.array(((0, 0, 0), (-r_p, 0, 0)))
peri_rot = rot.apply(periapsis)

plane_size = 100
plane = np.array(
    (
        (-plane_size, -plane_size, 0),
        (-plane_size, plane_size, 0),
        (plane_size, -plane_size, 0),
        (plane_size, plane_size, 0),
    )
)
inclination_range = np.arange(0, np.radians(inclination), step=0.01)
arc = (
    vector_scale
    / 2
    * np.vstack(
        (
            np.sin(inclination_range),
            np.zeros_like(inclination_range),
            np.cos(inclination_range),
        )
    ).T
)
arc_2 = (
    -r_p
    * np.vstack(
        (
            np.cos(inclination_range),
            np.zeros_like(inclination_range),
            -np.sin(inclination_range),
        )
    ).T
)

data = go.Scatter3d(
    x=rotated[:, 0],
    y=rotated[:, 1],
    z=rotated[:, 2],
    mode="lines",
    line=dict(color=colors["blue"], width=10),
)
d2 = go.Mesh3d(
    x=rotated[:, 0], y=rotated[:, 1], z=rotated[:, 2], color="gray", opacity=1.0
)

d3 = go.Mesh3d(
    x=plane[:, 0], y=plane[:, 1], z=plane[:, 2], opacity=0.7, color="lightgray"
)

d4 = go.Scatter3d(
    x=[0],
    y=[0],
    z=[0],
    mode="markers",
    marker=dict(color="black", size=[40], sizeref=1, sizemode="diameter"),
    text="m1",
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="top right",
)
d5 = go.Scatter3d(
    x=[0, 0],
    y=[0, 0],
    z=[0, 100],
    mode="lines+text",
    line={"width": 10},
    text=["", "Z"],
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="top center",
)
d6 = go.Scatter3d(
    x=[0, 0],
    y=[0, 100],
    z=[0, 0],
    mode="lines+text",
    line={"width": 10},
    text=["", "Y"],
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="middle right",
)
d7 = go.Scatter3d(
    x=[0, 100],
    y=[0, 0],
    z=[0, 0],
    mode="lines+text",
    line={"width": 10},
    text=["", "X"],
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="middle right",
)

mid = arc.shape[0] // 2
label = [""] * arc.shape[0]
label[mid] = "i"
arcline = go.Scatter3d(
    x=arc[:, 0],
    y=arc[:, 1],
    z=arc[:, 2],
    mode="lines+text",
    line={"width": 8, "color": "black"},
    text=label,
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="top center",
)

arcline_2 = go.Scatter3d(
    x=arc_2[:, 0],
    y=arc_2[:, 1],
    z=arc_2[:, 2],
    mode="lines+text",
    line={"width": 8, "color": "black"},
    text=label,
    textfont=dict(size=20, family="sans-serif", color="black"),
    textposition="middle left",
)

periline = go.Scatter3d(
    x=peri_rot[:, 0],
    y=peri_rot[:, 1],
    z=peri_rot[:, 2],
    mode="lines+markers+text",
    line={"width": 8, "color": "black"},
    marker={"symbol": "circle-open", "size": [0, 20]},
    text=["", "periapsis"],
    textfont=dict(size=20, family="sans-serif", color="black"),
    textposition="top left",
)

layout = dict(
    width=600,
    height=500,
    autosize=False,
    xaxis={
        "showgrid": False,  # thin lines in the background
        "zeroline": False,  # thick line at x=0
        "visible": False,  # numbers below
    },
    yaxis={
        "showgrid": False,  # thin lines in the background
        "zeroline": False,  # thick line at x=0
        "visible": False,  # numbers below
    },
    scene=dict(
        hovermode=False,
        camera=dict(
            up=dict(
                x=0,
                y=0,
                z=1,
            ),
            eye=dict(
                x=1.0707,
                y=-1.0707,
                z=1,
            ),
        ),
        # aspectratio = dict( x=1, y=1, z=0.7 ),
        aspectmode="manual",
        xaxis={"showgrid": False, "zeroline": False, "visible": False},
        yaxis={"showgrid": False, "zeroline": False, "visible": False},
        zaxis={"showgrid": False, "zeroline": False, "visible": False},
    ),
    showlegend=False,
    margin={"b": 0, "t": 0, "r": 0, "l": 0},
)
fig = go.Figure(layout=layout)

fig.add_trace(data)
fig.add_trace(d2)
fig.add_trace(d3)
fig.add_trace(d4)
fig.add_trace(d5)
fig.add_trace(d6)
fig.add_trace(d7)
arrow(
    start=rot_vec[0, :],
    end=rot_vec[1, :],
    fig=fig,
    line={"width": 10.0, "color": colors["red"]},
    cone={"colorscale": [[0, colors["red"]], [1, colors["red"]]]},
)
fig.add_trace(arcline)
fig.add_trace(arcline_2)
fig.add_trace(periline)
```

```{code-cell} ipython3
:label: code:definition_of_inclination
:tags: [remove-cell]

fig.show()
```

:::{figure} #code:definition_of_inclination
:name: fig:definition-of-inclination

The inclination of a planar orbit with respect to a reference plane.
:::

An inclination of 0° is an equatorial orbit. Orbits with inclinations from 0° to 90° are called **prograde** orbits because they rotate counterclockwise when viewed from above the north pole. This is the same direction as the surface of the Earth rotates and the same direction that planets orbit around the Sun.

An orbit with an inclination of 90° is called a polar orbit because it passes directly over the north and south poles of the primary object.

Orbits from 90° to 180° are called **retrograde** orbits because they rotate clockwise when viewed from above the north pole. This is the opposite direction of the surface of the Earth or the planets.

## $\Omega$, the Right Ascension of the Ascending Node

Consider an orbit inclined at angle $i$ to the reference plane of the coordinate system, as shown in @fig:definition-of-raan. The spacecraft spends part of its time above the reference plane and part of the time below the reference plane.

```{code-cell} python
:tags: [remove-cell]

a = 100
e = 0.4
b = a * np.sqrt(1 - e**2)
r_p = a * (1 - e)
p = a * (1 - e**2)

inclination = 30
raan = 30
omega = 0

rot = R.from_euler("ZY", [raan, inclination], degrees=True)

theta = np.arange(0, 2 * np.pi, step=0.01)
phi = 0
# https://math.stackexchange.com/a/819533
r = a * (1 - e**2) / (1 - e * np.cos(theta - phi))
x = r * np.cos(theta)
y = r * np.sin(theta)
z = np.zeros_like(x)
r = np.vstack((x, y, z)).T
rotated = rot.apply(r)

vector_scale = 100
h_vec = np.zeros((2, 3), dtype=float)
h_vec[1, 2] = vector_scale
rot_vec = rot.apply(h_vec)

periapsis = np.array(((0, 0, 0), (-r_p, 0, 0)))
peri_rot = rot.apply(periapsis)

plane_size = 100
plane = np.array(
    (
        (-plane_size, -plane_size, 0),
        (-plane_size, plane_size, 0),
        (plane_size, -plane_size, 0),
        (plane_size, plane_size, 0),
    )
)
inclination_range = np.arange(0, np.radians(inclination), step=0.01)
arc = (
    vector_scale
    / 2
    * np.vstack(
        (
            np.sin(inclination_range),
            np.zeros_like(inclination_range),
            np.cos(inclination_range),
        )
    ).T
)
arc_rot = R.from_euler("Z", [raan], degrees=True)
arc = arc_rot.apply(arc)
arc_2 = (
    -r_p
    * np.vstack(
        (
            np.cos(inclination_range),
            np.zeros_like(inclination_range),
            -np.sin(inclination_range),
        )
    ).T
)
arc_2 = arc_rot.apply(arc_2)
N_vec = np.cross([0, 0, 1], rot_vec[1, :])
N = np.linalg.norm(N_vec)
u_N = N_vec / N
node_line = np.vstack(
    (
        np.linspace(-75, 75, 2),
        u_N[1] / u_N[0] * np.linspace(-75, 75, 2),
        np.zeros(2),
    )
).T

nodes = np.array(((0, p, 0), (0, -p, 0)))
nodes = rot.apply(nodes)

raan_range = np.arange(0, np.radians(90 + raan), step=0.01)
raan_arc = (
    vector_scale
    / 2
    * np.vstack((np.cos(raan_range), np.sin(raan_range), np.zeros_like(raan_range))).T
)

data = go.Scatter3d(
    x=rotated[:, 0],
    y=rotated[:, 1],
    z=rotated[:, 2],
    mode="lines",
    line=dict(color=colors["blue"], width=10),
)
d2 = go.Mesh3d(
    x=rotated[:, 0], y=rotated[:, 1], z=rotated[:, 2], color="gray", opacity=1.0
)

d3 = go.Mesh3d(
    x=plane[:, 0], y=plane[:, 1], z=plane[:, 2], opacity=0.7, color="lightgray"
)

d4 = go.Scatter3d(
    x=[0],
    y=[0],
    z=[0],
    mode="markers",
    marker=dict(color="black", size=[40], sizeref=1, sizemode="diameter"),
    text="m1",
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="top right",
)
d5 = go.Scatter3d(
    x=[0, 0],
    y=[0, 0],
    z=[0, 100],
    mode="lines+text",
    line={"width": 10},
    text=["", "Z"],
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="top center",
)
d6 = go.Scatter3d(
    x=[0, 0],
    y=[0, 100],
    z=[0, 0],
    mode="lines+text",
    line={"width": 10},
    text=["", "Y"],
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="middle right",
)
d7 = go.Scatter3d(
    x=[0, 100],
    y=[0, 0],
    z=[0, 0],
    mode="lines+text",
    line={"width": 10},
    text=["", "X"],
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="middle right",
)

mid = arc.shape[0] // 2
label = [""] * arc.shape[0]
label[mid] = "i"
arcline = go.Scatter3d(
    x=arc[:, 0],
    y=arc[:, 1],
    z=arc[:, 2],
    mode="lines+text",
    line={"width": 8, "color": "black"},
    text=label,
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="top center",
)

arcline_2 = go.Scatter3d(
    x=arc_2[:, 0],
    y=arc_2[:, 1],
    z=arc_2[:, 2],
    mode="lines+text",
    line={"width": 8, "color": "black"},
    text=label,
    textfont=dict(size=20, family="sans-serif", color="black"),
    textposition="middle left",
)

periline = go.Scatter3d(
    x=peri_rot[:, 0],
    y=peri_rot[:, 1],
    z=peri_rot[:, 2],
    mode="lines+markers+text",
    line={"width": 8, "color": "black"},
    marker={"symbol": "circle-open", "size": [0, 20]},
    text=["", "periapsis"],
    textfont=dict(size=20, family="sans-serif", color="black"),
    textposition="top left",
)

nodeline = go.Scatter3d(
    x=node_line[:, 0],
    y=node_line[:, 1],
    z=node_line[:, 2],
    mode="lines+text",
    line={"width": 8, "color": "black"},
    text=["", "Node Line"],
    textfont=dict(size=20, family="sans-serif", color="black"),
    textposition="top center",
)

nodesmarks = go.Scatter3d(
    x=nodes[:, 0],
    y=nodes[:, 1],
    z=nodes[:, 2],
    mode="markers+text",
    marker={"size": [15, 15]},
    text=["Ascending Node", "Descending Node"],
    textfont=dict(size=15, family="sans-serif", color="black"),
    textposition="top center",
)
mid = raan_arc.shape[0] // 2
label = [""] * raan_arc.shape[0]
label[mid] = "Ω"
raanarc = go.Scatter3d(
    x=raan_arc[:, 0],
    y=raan_arc[:, 1],
    z=raan_arc[:, 2],
    mode="lines+text",
    line={"width": 8, "color": "black"},
    text=label,
    textfont=dict(size=20, family="sans-serif", color="black"),
    textposition="middle right",
)

layout = dict(
    width=600,
    height=500,
    autosize=False,
    xaxis={
        "showgrid": False,  # thin lines in the background
        "zeroline": False,  # thick line at x=0
        "visible": False,  # numbers below
    },
    yaxis={
        "showgrid": False,  # thin lines in the background
        "zeroline": False,  # thick line at x=0
        "visible": False,  # numbers below
    },
    scene=dict(
        hovermode=False,
        camera=dict(
            up=dict(
                x=0,
                y=0,
                z=1,
            ),
            eye=dict(
                x=1.0707,
                y=-1.0707,
                z=1,
            ),
        ),
        # aspectratio = dict( x=1, y=1, z=0.7 ),
        aspectmode="manual",
        xaxis={"showgrid": False, "zeroline": False, "visible": False},
        yaxis={"showgrid": False, "zeroline": False, "visible": False},
        zaxis={"showgrid": False, "zeroline": False, "visible": False},
    ),
    showlegend=False,
    margin={"b": 0, "t": 0, "r": 0, "l": 0},
)
fig = go.Figure(layout=layout)

fig.add_trace(data)
fig.add_trace(d2)
fig.add_trace(d3)
fig.add_trace(d4)
fig.add_trace(d5)
fig.add_trace(d6)
fig.add_trace(d7)
arrow(
    start=rot_vec[0, :],
    end=rot_vec[1, :],
    fig=fig,
    line={"width": 10.0, "color": colors["red"]},
    cone={"colorscale": [[0, colors["red"]], [1, colors["red"]]]},
)
# fig.add_trace(arcline)
# fig.add_trace(arcline_2)
fig.add_trace(periline)
fig.add_trace(nodeline)
fig.add_trace(nodesmarks)
fig.add_trace(raanarc)
```

```{code-cell} ipython3
:label: code:definition_of_raan
:tags: [remove-cell]

fig.show()
```

:::{figure} #code:definition_of_raan
:name: fig:definition-of-raan

The right ascension of the ascending node is the angle from the $X$ axis to the ascending node.
:::

The intersection of these two planes is a line, called the **node line**. This line will appear in calculations later. Since the orbit follows the perimeter of th orbital plane, this implies there are two crossing points:

1. The **descending node**: The point when the spacecraft goes from above to below the reference plane
2. The **ascending node**: The point when the spacecraft goes from below to above the reference plane

The right ascension of the ascending node is defined as the [right ascension](./right-ascension-declination.md) of the point where the spacecraft goes from below the reference plane to above it. This is therefore also the angle from the $\uvec{I}$ axis to the crossing point of the orbit.

The right ascension of the ascending node (abbreviated RAAN) can range from 0° to 360°, inclusive.

If the orbit has an inclination of 0° or 180°, the right ascension of the ascending node is not defined. For these inclinations the orbit is coplanar with the reference plane and does not go above or below it.

## $\omega$, the Argument of Periapsis

In the [perifocal reference frame](./perifocal-frame.md), periapsis occurs at a true anomaly of 0°. The argument of periapsis determines how far around the orbit you have to go, starting at the ascending node, before you get to periapsis. This definition is shown in @fig:definition-of-argument-of-periapsis.

```{code-cell} python
:tags: ["remove-cell"]

a = 100
e = 0.4
b = a * np.sqrt(1 - e**2)
r_p = a * (1 - e)
p = a * (1 - e**2)

inclination = 30
raan = 30
omega = 60

rot = R.from_euler("ZYZ", [raan, inclination, omega], degrees=True)

theta = np.arange(0, 2 * np.pi, step=0.01)
phi = 0
# https://math.stackexchange.com/a/819533
r = a * (1 - e**2) / (1 - e * np.cos(theta - phi))
x = r * np.cos(theta)
y = r * np.sin(theta)
z = np.zeros_like(x)
r = np.vstack((x, y, z)).T
rotated = rot.apply(r)

vector_scale = 100
h_vec = np.zeros((2, 3), dtype=float)
h_vec[1, 2] = vector_scale
rot_vec = rot.apply(h_vec)

periapsis = np.array(((0, 0, 0), (-r_p, 0, 0)))
peri_rot = rot.apply(periapsis)

plane_size = 150
plane = np.array(
    (
        (-plane_size, -plane_size, 0),
        (-plane_size, plane_size, 0),
        (plane_size, -plane_size, 0),
        (plane_size, plane_size, 0),
    )
)
inclination_range = np.arange(0, np.radians(inclination), step=0.01)
arc = (
    vector_scale
    / 2
    * np.vstack(
        (
            np.sin(inclination_range),
            np.zeros_like(inclination_range),
            np.cos(inclination_range),
        )
    ).T
)
arc_rot = R.from_euler("Z", [raan], degrees=True)
arc = arc_rot.apply(arc)
arc_2 = (
    -r_p
    * np.vstack(
        (
            np.cos(inclination_range),
            np.zeros_like(inclination_range),
            -np.sin(inclination_range),
        )
    ).T
)
arc_2 = arc_rot.apply(arc_2)
N_vec = np.cross([0, 0, 1], rot_vec[1, :])
N = np.linalg.norm(N_vec)
u_N = N_vec / N
node_line = np.vstack(
    (
        np.linspace(-100, 100, 2),
        u_N[1] / u_N[0] * np.linspace(-100, 100, 2),
        np.zeros(2),
    )
).T

ascending_node = rotated[52]
descending_node = rotated[367]
nodes = np.vstack((ascending_node, descending_node))
# nodes = rot.apply(nodes)

raan_range = np.arange(0, np.radians(90 + raan), step=0.01)
raan_arc = (
    vector_scale
    / 2
    * np.vstack((np.cos(raan_range), np.sin(raan_range), np.zeros_like(raan_range))).T
)

r_rot = np.linalg.norm(rotated, axis=1) + 5
t_rot = np.arctan2(np.linalg.norm(rotated[:, :2], axis=1), rotated[:, 2])
p_rot = np.arctan2(rotated[:, 1], rotated[:, 0])
x_new = r_rot * np.cos(p_rot) * np.sin(t_rot)
y_new = r_rot * np.sin(p_rot) * np.sin(t_rot)
z_new = r_rot * np.cos(t_rot)

data = go.Scatter3d(
    x=rotated[:, 0],
    y=rotated[:, 1],
    z=rotated[:, 2],
    mode="lines",
    line=dict(color=colors["blue"], width=10),
)
d2 = go.Mesh3d(
    x=rotated[:, 0], y=rotated[:, 1], z=rotated[:, 2], color="gray", opacity=1.0
)

d3 = go.Mesh3d(
    x=plane[:, 0], y=plane[:, 1], z=plane[:, 2], opacity=0.7, color="lightgray"
)

d4 = go.Scatter3d(
    x=[0],
    y=[0],
    z=[0],
    mode="markers",
    marker=dict(color="black", size=[40], sizeref=1, sizemode="diameter"),
    text="m1",
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="top right",
)
d5 = go.Scatter3d(
    x=[0, 0],
    y=[0, 0],
    z=[0, 100],
    mode="lines+text",
    line={"width": 10},
    text=["", "Z"],
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="top center",
)
d6 = go.Scatter3d(
    x=[0, 0],
    y=[0, 100],
    z=[0, 0],
    mode="lines+text",
    line={"width": 10},
    text=["", "Y"],
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="middle right",
)
d7 = go.Scatter3d(
    x=[0, 100],
    y=[0, 0],
    z=[0, 0],
    mode="lines+text",
    line={"width": 10},
    text=["", "X"],
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="middle right",
)

mid = arc.shape[0] // 2
label = [""] * arc.shape[0]
label[mid] = "i"
arcline = go.Scatter3d(
    x=arc[:, 0],
    y=arc[:, 1],
    z=arc[:, 2],
    mode="lines+text",
    line={"width": 8, "color": "black"},
    text=label,
    textfont=dict(size=30, family="sans-serif", color="black"),
    textposition="top center",
)

arcline_2 = go.Scatter3d(
    x=arc_2[:, 0],
    y=arc_2[:, 1],
    z=arc_2[:, 2],
    mode="lines+text",
    line={"width": 8, "color": "black"},
    text=label,
    textfont=dict(size=20, family="sans-serif", color="black"),
    textposition="middle left",
)

periline = go.Scatter3d(
    x=peri_rot[:, 0],
    y=peri_rot[:, 1],
    z=peri_rot[:, 2],
    mode="lines+markers+text",
    line={"width": 8, "color": "black"},
    marker={"symbol": "circle-open", "size": [0, 20]},
    text=["", "periapsis"],
    textfont=dict(size=20, family="sans-serif", color="black"),
    textposition="middle left",
)

nodeline = go.Scatter3d(
    x=node_line[:, 0],
    y=node_line[:, 1],
    z=node_line[:, 2],
    mode="lines+text",
    line={"width": 8, "color": "black"},
    text=["", "Node Line"],
    textfont=dict(size=20, family="sans-serif", color="black"),
    textposition="top center",
)

nodesmarks = go.Scatter3d(
    x=nodes[:, 0],
    y=nodes[:, 1],
    z=nodes[:, 2],
    mode="markers+text",
    marker={"size": [15, 15]},
    text=["Ascending Node", "Descending Node"],
    textfont=dict(size=15, family="sans-serif", color="black"),
    textposition=["middle right", "middle left"],
)
mid = raan_arc.shape[0] // 2
label = [""] * raan_arc.shape[0]
label[mid] = "Ω"
raanarc = go.Scatter3d(
    x=raan_arc[:, 0],
    y=raan_arc[:, 1],
    z=raan_arc[:, 2],
    mode="lines+text",
    line={"width": 8, "color": "black"},
    text=label,
    textfont=dict(size=20, family="sans-serif", color="black"),
    textposition="middle right",
)

mid = x_new[52:312].shape[0] // 2
label = [""] * x_new[52:312].shape[0]
label[mid] = "ω"
omegaarc = go.Scatter3d(
    x=x_new[52:312],
    y=y_new[52:312],
    z=z_new[52:312],
    mode="lines+text",
    line={"width": 8, "color": "black"},
    text=label,
    textfont=dict(size=20, family="sans-serif", color="black"),
    textposition="middle left",
)

layout = dict(
    width=600,
    height=500,
    autosize=False,
    xaxis={
        "showgrid": False,  # thin lines in the background
        "zeroline": False,  # thick line at x=0
        "visible": False,  # numbers below
    },
    yaxis={
        "showgrid": False,  # thin lines in the background
        "zeroline": False,  # thick line at x=0
        "visible": False,  # numbers below
    },
    scene=dict(
        hovermode=False,
        camera=dict(
            up=dict(
                x=0,
                y=0,
                z=1,
            ),
            eye=dict(
                x=1.0707,
                y=-1.0707,
                z=1,
            ),
        ),
        # aspectratio = dict( x=1, y=1, z=0.7 ),
        aspectmode="manual",
        xaxis={"showgrid": False, "zeroline": False, "visible": False},
        yaxis={"showgrid": False, "zeroline": False, "visible": False},
        zaxis={"showgrid": False, "zeroline": False, "visible": False},
    ),
    showlegend=False,
    margin={"b": 0, "t": 0, "r": 0, "l": 0},
)
fig = go.Figure(layout=layout)

fig.add_trace(data)
fig.add_trace(d2)
fig.add_trace(d3)
fig.add_trace(d4)
fig.add_trace(d5)
fig.add_trace(d6)
fig.add_trace(d7)
arrow(
    start=rot_vec[0, :],
    end=rot_vec[1, :],
    fig=fig,
    line={"width": 10.0, "color": colors["red"]},
    cone={"colorscale": [[0, colors["red"]], [1, colors["red"]]]},
)
# fig.add_trace(arcline)
# fig.add_trace(arcline_2)
fig.add_trace(periline)
# fig.add_trace(nodeline)
fig.add_trace(nodesmarks)
# fig.add_trace(raanarc)
fig.add_trace(omegaarc)
```

```{code-cell} ipython3
:label: code:definition_of_argument_of_periapsis
:tags: [remove-cell]

fig.show()
```

:::{figure} #code:definition_of_argument_of_periapsis
:name: fig:definition-of-argument-of-periapsis

The right ascension of the ascending node is the angle from the $X$ axis to the ascending node.
:::

Alternatively, the right ascension of periapsis (abbreviated RAP or $\Pi$) may be specified. In this case, the angle given is the sum of the right ascension of the ascending node and the argument of periapsis:

:::{math}
:label: eq:right-ascension-of-periapsis

\Pi = \Omega + \omega
:::

If there is no periapsis, as in a circular orbit, then $\Pi$ and $\omega$ are both undefined.

## $T$, the Time At Periapsis

The time since periapsis gives the location of the spacecraft on the orbit at some known time, $t_0$. This can be specified in a number of ways. The time at periapsis, $T$, is simply the time when the spacecraft crossed periapsis. If this is known, along with the other orbital parameters and the current time, the current position of the spacecraft on the orbit can be determined.

Equivalently, the **true anomaly at the epoch** can be specified. The epoch is simply some known time; it is often conveniently chosen to be zero but this may not always be the case when using observational data. The true anomaly at this time can then be used as the sixth orbital element.
