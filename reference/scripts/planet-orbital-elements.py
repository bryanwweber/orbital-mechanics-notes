from pathlib import Path
import re
from datetime import datetime

from dateutil.rrule import rrule, DAILY
from dateutil import tz
from skyfield.iokit import load_file, Loader
from skyfield.elementslib import OsculatingElements, osculating_elements_of
from skyfield.framelib import build_ecliptic_matrix
from skyfield.units import Distance, Velocity
import numpy as np
from myst_nb.nb_glue import GLUE_PREFIX
from IPython.display import display


class CelestialObject:
    def __init__(
        self, identifier: int | None, name: str, elems: OsculatingElements
    ) -> None:
        self.identifier = identifier
        self.name = name
        self.aphelion: np.float64 = np.average(elems.apoapsis_distance.km)  # type: ignore
        self.semimajor_axis: np.float64 = np.average(elems.semi_major_axis.km)  # type: ignore
        self.perihelion: np.float64 = np.average(elems.periapsis_distance.km)  # type: ignore
        self.period_in_days: np.float64 = np.average(elems.period_in_days)  # type: ignore
        self.orbital_velocity: np.float64 = np.sqrt(elems._mu / self.semimajor_axis)  # type: ignore
        self.eccentricity: np.float64 = np.average(elems.eccentricity)  # type: ignore
        self.inclination: np.float64 = np.average(elems.inclination.degrees)  # type: ignore

    def format_units(self, obj: float):
        initial_format = format(obj, ".5E")
        mantissa, exponent = initial_format.split("E")
        sign = exponent[0] if exponent[0] == "-" else ""
        value = int(exponent[1:])
        return f"{mantissa} × 10<sup>{sign}{value}</sup>"

    def glue(self):
        metadata = {"scrapbook": {"mime_prefix": GLUE_PREFIX}}
        for attr in ("aphelion", "semimajor_axis", "perihelion"):
            metadata["scrapbook"]["name"] = f"{self.name}_{attr}"
            display(
                {GLUE_PREFIX + "text/html": self.format_units(getattr(self, attr))},
                raw=True,
                metadata=metadata,
            )
        for attr in (
            "period_in_days",
            "orbital_velocity",
            "inclination",
        ):
            metadata["scrapbook"]["name"] = f"{self.name}_{attr}"
            display(
                {GLUE_PREFIX + "text/html": f"{getattr(self, attr):.2F}"},
                raw=True,
                metadata=metadata,
            )
        metadata["scrapbook"]["name"] = f"{self.name}_eccentricity"
        display(
            {GLUE_PREFIX + "text/html": f"{self.eccentricity:.5F}"},
            raw=True,
            metadata=metadata,
        )


def parse_pck_file(filename: Path) -> dict[int | None, float]:
    m = re.compile(
        r"^\s+BODY(?P<identifier>\d+)_GM\s+=\s+\(\s(?P<value>[\d.ED+-]+)\s\)$"
    )
    lines = iter(filename.read_text().splitlines())
    for line in lines:
        if "begindata" in line:
            break
    GM_dict: dict[int | None, float] = {None: 0.0}
    for line in lines:
        mat = m.search(line)
        if mat is not None:
            identifier = mat.group("identifier")
            value = mat.group("value")
            if isinstance(value, str) and isinstance(identifier, str):
                identifier = int(identifier)
                value = value.replace("D", "E")
                GM_dict[identifier] = float(value)
            else:
                raise ValueError(value)

    return GM_dict


HERE = Path.cwd()  # .joinpath("reference", "scripts")
if HERE.name == "reference":
    HERE /= "scripts"
elif HERE.name == "orbital-mechanics":
    HERE = HERE.joinpath("reference", "scripts")
GM_dict = parse_pck_file(HERE / "gm_Horizons.pck")
planets = load_file(HERE / "excerpt.bsp")
load = Loader(HERE)
ts = load.timescale()
start_date = datetime(2021, 10, 29, tzinfo=tz.UTC)
end_date = datetime(2021, 12, 3, tzinfo=tz.UTC)
dates: list[datetime] = list(rrule(DAILY, dtstart=start_date, until=end_date))
t = ts.from_datetimes(dates)
ecliptic_frame = build_ecliptic_matrix(t)

sun = planets["Sun"]
for planet_name in (
    "Mercury",
    "Venus",
    "Earth",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Pluto",
):
    planet = planet_name + " Barycenter"
    position = (planets[planet] - sun).at(t)

    # This is broken, see
    # https://github.com/skyfielders/python-skyfield/issues/655#issuecomment-960377889
    # osculating_elements_of(position, ecliptic_frame)

    # So we have to do things manually
    elems = OsculatingElements(
        Distance(np.einsum("mnr,nr->mr", ecliptic_frame, position.position.au)),  # type: ignore
        Velocity(np.einsum("mnr,nr->mr", ecliptic_frame, position.velocity.au_per_d)),  # type: ignore
        position.t,
        GM_dict[position.center] + GM_dict[position.target],
    )
    c_object = CelestialObject(position.target, planet_name, elems)
    c_object.glue()

position = (planets["Moon"] - planets["Earth"]).at(t)
elems = osculating_elements_of(position)
c_object = CelestialObject(position.target, "Moon", elems)
c_object.glue()
