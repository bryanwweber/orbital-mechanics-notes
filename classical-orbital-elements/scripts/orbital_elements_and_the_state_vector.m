% [section-1]
r_vec = [1000, 5000, 7000]; % km
v_vec = [3.0, 4.0, 5.0]; % km/s
mu = 3.986E5; % km^3/s^2

r = norm(r_vec);
v = norm(v_vec);
v_r = dot(r_vec/r, v_vec);
v_p = sqrt(v^2 - v_r^2);

% [section-2]
h_vec = cross(r_vec, v_vec);
h = norm(h_vec);

% [section-3]
i = acos(h_vec(3) / h);

% [section-4]
K = [0, 0, 1];
N_vec = cross(K, h_vec);
N = norm(N_vec);
Omega = 2 * pi - acos(N_vec(1)/N);

% [section-5]
e_vec = cross(v_vec, h_vec) / mu - r_vec / r;
e = norm(e_vec);

% [section-6]
omega = 2 * pi - acos(dot(N_vec, e_vec) / (N * e));

% [section-7]
nu = acos(dot(e_vec, r_vec) / (e * r));

% [section-8]
r_w = h^2 / mu / (1 + e * cos(nu)) .* [cos(nu) sin(nu) 0];
v_w = mu / h .* [-sin(nu) e + cos(nu) 0];

% [section-9]
R1 = [cos(-omega) -sin(-omega) 0; sin(-omega) cos(-omega) 0; 0 0 1];
R2 = [1 0 0; 0 cos(-i) -sin(-i); 0 sin(-i) cos(-i)];
R3 = [cos(-Omega) -sin(-Omega) 0; sin(-Omega) cos(-Omega) 0; 0 0 1];
r_rot = r_w * R1 * R2 * R3;
v_rot = v_w * R1 * R2 * R3;

% [section-10]
