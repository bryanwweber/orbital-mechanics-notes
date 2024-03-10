# [section-1]
import numpy as np

r_vec = np.array((1_000, 5_000, 7_000))  # km
v_vec = np.array((3.0, 4.0, 5.0))  # km/s
mu = 3.986e5  # km^3/s^2

r = np.linalg.norm(r_vec)
v = np.linalg.norm(v_vec)
v_r = np.dot(r_vec / r, v_vec)
v_p = np.sqrt(v**2 - v_r**2)

# [section-2]
h_vec = np.cross(r_vec, v_vec)
h = np.linalg.norm(h_vec)

# [section-3]
i = np.arccos(h_vec[2] / h)

# [section-4]
K = np.array((0, 0, 1))
N_vec = np.cross(K, h_vec)
N = np.linalg.norm(N_vec)
Omega = 2 * np.pi - np.arccos(N_vec[0] / N)

# [section-5]
e_vec = np.cross(v_vec, h_vec) / mu - r_vec / r
e = np.linalg.norm(e_vec)

# [section-6]
omega = 2 * np.pi - np.arccos(np.dot(N_vec, e_vec) / (N * e))

# [section-7]
nu = np.arccos(np.dot(r_vec / r, e_vec / e))

# [section-8]
r_w = h**2 / mu / (1 + e * np.cos(nu)) * np.array((np.cos(nu), np.sin(nu), 0))
v_w = mu / h * np.array((-np.sin(nu), e + np.cos(nu), 0))

# [section-9]
from scipy.spatial.transform import Rotation

R = Rotation.from_euler("ZXZ", [-omega, -i, -Omega])
r_rot = r_w @ R.as_matrix()
v_rot = v_w @ R.as_matrix()

# [section-10]
try:
    import warnings

    warnings.simplefilter("ignore")
    from myst_nb import glue

    glue("orbital-elements-radius", r, display=False)
    glue("orbital-elements-velocity", v, display=False)
    glue("orbital-elements-v_r", v_r, display=False)
    glue("orbital-elements-v_p", v_p, display=False)
    glue("orbital-elements-h_vec-I", h_vec[0], display=False)
    glue("orbital-elements-h_vec-J", h_vec[1], display=False)
    glue("orbital-elements-h_vec-K", abs(h_vec[2]), display=False)
    glue("orbital-elements-h", h, display=False)
    glue("orbital-elements-i", np.degrees(i), display=False)
    glue("orbital-elements-N_Y", N_vec[1], display=False)
    glue("orbital-elements-raan", np.degrees(Omega), display=False)
    glue("orbital-elements-e", e, display=False)
    glue("orbital-elements-e_Z", e_vec[2], display=False)
    glue("orbital-elements-aop", np.degrees(omega), display=False)
    glue("orbital-elements-true-anomaly", np.degrees(nu), display=False)
    glue("orbital-elements-r_w-I", r_w[0], display=False)
    glue("orbital-elements-r_w-J", r_w[1], display=False)
    glue("orbital-elements-r_w-K", r_w[2], display=False)
    glue("orbital-elements-v_w-I", v_w[0], display=False)
    glue("orbital-elements-v_w-J", v_w[1], display=False)
    glue("orbital-elements-v_w-K", v_w[2], display=False)
    glue("orbital-elements-r_rot-I", r_rot[0], display=False)
    glue("orbital-elements-r_rot-J", r_rot[1], display=False)
    glue("orbital-elements-r_rot-K", r_rot[2], display=False)
    glue("orbital-elements-v_rot-I", v_rot[0], display=False)
    glue("orbital-elements-v_rot-J", v_rot[1], display=False)
    glue("orbital-elements-v_rot-K", v_rot[2], display=False)
except ImportError:
    pass
