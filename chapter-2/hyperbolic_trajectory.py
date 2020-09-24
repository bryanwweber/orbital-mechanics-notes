import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

plt.ioff()


def plot_figure():
    fig, ax = plt.subplots(figsize=(12, 9))

    ax.set_xlim((-2, 2))
    ax.set_ylim((-1, 1))
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    # Show ticks on the left and lower axes only
    ax.xaxis.set_tick_params(bottom=False, top=False, which="both", labelbottom=False)
    ax.yaxis.set_tick_params(left=False, right=False, which="both", labelleft=False)

    # Move remaining spines to the center
    ax.spines["bottom"].set_position("zero")  # spine for xaxis
    #    - will pass through the center of the y-values (which is 0)
    ax.spines["left"].set_position("zero")  # spine for yaxis
    #    - will pass through the center of the x-values (which is 5)

    ann = ax.annotate("", xy=(0.8, 0.75), ha="center", va="center", fontsize=20)
    ann_2 = ax.annotate(
        "Real Trajectory", xy=(-0.8, -0.75), ha="center", va="center", fontsize=20
    )
    ann_3 = ax.annotate(
        "Virtual Trajectory", xy=(0.8, -0.75), ha="center", va="center", fontsize=20
    )

    e = 1.1
    theta_inf = np.arccos(-1 / e)
    a = 1
    b = a * np.sqrt(e ** 2 - 1)
    r_p = a * (e - 1)

    (m1,) = ax.plot(-a - r_p, 0, "ko")

    x = np.linspace(a, 2 * a, 1000)
    y = b / a * np.sqrt(x ** 2 - a ** 2)
    (r_pos,) = ax.plot(x, y, color="C0")
    (r_neg,) = ax.plot(x, -y, color="C0")
    (l_neg,) = ax.plot(-x, -y, color="C1")
    (l_pos,) = ax.plot(-x, y, color="C1")

    (point,) = ax.plot([], [], "ko")

    ann_4 = ax.annotate(
        r"$\theta_{\infty}$" f" = {np.degrees(theta_inf):.2F}°\n$e$ = {e}\n$a$ = {a}",
        xy=(-0.8, 0.75),
        ha="center",
        va="center",
        fontsize=20,
    )

    def init():
        point.set_data([], [])
        ann.set_text("")
        return (r_pos, r_neg, l_neg, l_pos, ann_2, ann_3, ann_4, m1, point, ann)

    def animate(t):
        r = a * (e ** 2 - 1) / (1 + e * np.cos(t))
        point.set_data(-a - r_p + r * np.cos(t), r * np.sin(t))
        ann.set_text(rf"$\theta$ = {np.degrees(t):.2F}°")
        return (point, ann)

    f_1 = np.linspace(-theta_inf + 1.0e-6, theta_inf - 1.0e-6, 100)
    f_2 = np.linspace(theta_inf - 1.0e-6, 2 * np.pi - theta_inf + 1.0e-6, 100)
    anim = animation.FuncAnimation(
        fig, animate, init_func=init, frames=np.hstack((f_1, f_2)), blit=True
    )

    return anim
