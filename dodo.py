from pathlib import Path
from doit.action import CmdAction
import yaml
from textwrap import dedent

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
        "task_dep": [
            "svg_math",
            "execute_python_scripts",
            # "execute_matlab_scripts",
        ],
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


def read_toc():
    folders = set()
    TOC_file = HERE / "_toc.yml"
    TOC = yaml.safe_load(TOC_file.read_text())
    chapters = [p["chapters"] for p in TOC["parts"]]
    for chapter in chapters:
        for section in chapter:
            folder = Path(section["file"]).parent
            folders.add(folder)
    return folders


def task_execute_python_scripts():
    folders = read_toc()
    scripts = set()
    for folder in folders:
        script_folder = folder.joinpath("scripts")
        if script_folder.is_dir():
            scripts.update(script_folder.glob("*.py"))
    for script in scripts:
        yield {
            "actions": [CmdAction(f"python {script.name}", cwd=(HERE / script.parent))],
            "name": script.name,
            "verbosity": 2,
            "file_dep": [script],
        }


def task_execute_matlab_scripts():
    folders = read_toc()
    scripts = set()
    for folder in folders:
        script_folder = folder.joinpath("scripts")
        if script_folder.is_dir():
            scripts.update(script_folder.glob("*.m"))
    for script in scripts:
        yield {
            "actions": [
                CmdAction(
                    dedent(
                        f"""\
                            /Applications/MATLAB_R2021a.app/bin/matlab -nodisplay \
                           -nosplash -nodesktop -r 'try, run("{script.name}"); \
                           catch, quit(1, "force"); end; quit(0, "force");'
                        """
                    ),
                    cwd=(HERE / script.parent),
                )
            ],
            "name": script.name,
            "verbosity": 2,
            "file_dep": [script],
        }
