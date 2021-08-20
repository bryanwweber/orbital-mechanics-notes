from pathlib import Path

from raw_svg import render_math_svg

HERE = Path(__file__).parent
DOIT_CONFIG = {"default_tasks": ["build_jb"]}


def task_svg_math():
    for svg_file in HERE.glob("raw_svg/*.svg"):
        target = render_math_svg.OUTPUT / svg_file.name
        yield {
            "name": svg_file.name,
            "actions": [(render_math_svg.main, [svg_file])],
            "targets": [target],
            "file_dep": [svg_file, render_math_svg.__file__],
        }


def task_clean_svg_cache():
    return {
        "actions": [(render_math_svg.clean_cache)],
        "file_dep": [render_math_svg.CACHE.resolve()],
    }


def task_build_jb():
    return {
        "actions": [["jb", "build", "."]],
        "task_dep": ["svg_math"],
        "uptodate": [False],
        "verbosity": 2,
    }


def task_clean_jb():
    return {
        "actions": [["jb", "clean", "."]],
        "verbosity": 2,
    }


def task_clean_all():
    return {
        "actions": [["jb", "clean", "-a", "."]],
        "verbosity": 2,
    }
