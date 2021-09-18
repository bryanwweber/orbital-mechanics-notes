# [section-1]
from scipy.integrate import solve_ivp
import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401, needed for 3d plots

# [section-2]
G = 6.67430e-20  # km**3/(kg * s**2)
m_1 = 5.97219e24  # kg
m_2 = 1000  # kg
mu = G * m_1
R_E = 6378.12  # km

r_0 = np.array((8000, 0, 6000))  # km
v_0 = np.array((0, 7, 0))  # km/s
Y_0 = np.hstack((r_0, v_0))


# [section-3]
def relative_motion(t, Y):
    """Calculate the motion of a two-body system relative to $m_1$.

    The state vector ``Y`` should be in the order:

    1. Coordinates of $m_2$ relative to $m_1$
    2. Velocity components of $m_2$ relative to $m_1$
    """
    # Get the three position components
    r_vec = Y[:3]

    # Create the derivative vector and copy the velocities into it
    Ydot = np.zeros_like(Y)
    Ydot[:3] = Y[3:]

    # Calculate the accelerations
    r = np.sqrt(np.sum(np.square(r_vec)))
    a_vec = -mu * r_vec / r ** 3
    Ydot[3:] = a_vec

    return Ydot


# [section-4]
t_0 = 0  # seconds
t_f = 14_709  # seconds, period of one orbit
t_points = np.linspace(t_0, t_f, 1000)
sol = solve_ivp(relative_motion, [t_0, t_f], Y_0, t_eval=t_points)

Y = sol.y.T
r = Y[:, :3]  # km
v = Y[:, 3:]  # km/s

# [section-5]
r_mag = np.sqrt(np.sum(np.square(r), axis=1))
# altitude is the distance above the surface of the Earth
altitude = r_mag - R_E

speed = np.sqrt(np.sum(np.square(v), axis=1))

# [section-6]
min_altitude = np.min(altitude)
i_min = np.argmin(altitude)

max_altitude = np.max(altitude)
i_max = np.argmax(altitude)

speed_at_min_alt = speed[i_min]
speed_at_max_alt = speed[i_max]
time_at_min_alt = sol.t[i_min]
time_at_max_alt = sol.t[i_max]

# [section-7]
print(
    f"""\
The minimum altitude during the orbit is: {min_altitude:.2F} km
The speed at the minimum altitude is: {speed_at_min_alt:.2F} km/s
The time at minimum altitude is: {time_at_min_alt:.2F} s
The maximum altitude during the orbit is: {max_altitude:.2F} km
The velocity at the maximum altitude is: {speed_at_max_alt:.4F} km/s
The time at maximum altitude is: {time_at_max_alt:.2F} s
"""
)

# [section-8]
fig = plt.figure()
ax = fig.add_subplot(111, projection="3d")
ax.plot(r[:, 0], r[:, 1], r[:, 2], label="Orbit")
ax.set_xlabel("km")
ax.set_ylabel("km")
ax.set_zlabel("km")

# This adds a sphere to the plot of the radius of the Earth
p = np.linspace(0, np.pi, 200)
t = np.linspace(0, 2 * np.pi, 200)
P, T = np.meshgrid(p, t)

X = R_E * np.cos(T) * np.sin(P)
Y = R_E * np.sin(T) * np.sin(P)
Z = R_E * np.cos(P)

ax.plot_surface(X, Y, Z)
ax.plot(r[i_min, 0], r[i_min, 1], r[i_min, 2], "ro", label="Min. Altitude")
ax.plot(r[i_max, 0], r[i_max, 1], r[i_max, 2], "go", label="Max. Altitude")
ax.legend()

# [section-9]
if __name__ == "__main__":
    from pathlib import Path

    HERE = Path(__file__).parent
    np.savez(
        HERE / "two-body-relative.npz",
        r=r,
        i_min=i_min,
        i_max=i_max,
    )
