from dataclasses import dataclass
from pathlib import Path


@dataclass
class Config:
    math_cli: Path | None = None


config: Config | None = None


def get_config() -> Config:
    global config
    if config is None:
        config = Config()
    return config
