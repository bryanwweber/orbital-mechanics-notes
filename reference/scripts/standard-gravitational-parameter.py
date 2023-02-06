from dataclasses import dataclass
from typing import Optional

import pint
from IPython.display import display
from myst_nb.ext.glue import GLUE_PREFIX

units = pint.UnitRegistry()
Q_ = units.Quantity


@dataclass
class CelestialObject:
    G = 6.67428e-11 * units("m**3 / (kg * s**2)")
    identifier: str
    name: str
    GM_in_au: pint.Quantity
    GM_ratio: pint.Quantity
    GM_in_km: pint.Quantity
    mass: Optional[pint.Quantity] = None
    mass_fraction: Optional[pint.Quantity] = None

    def compute_mass(self):
        self.mass = (self.GM_in_km / self.G).to("kg")

    def format_units(self, obj):
        initial_format = format(obj, ".5~EH")
        mantissa, remainder = initial_format.split("E")
        remainder = remainder.split(" ", maxsplit=1)
        exponent = remainder[0]
        if len(remainder) == 1:
            units = ""
        else:
            units = " " + remainder[1]

        sign = exponent[0] if exponent[0] == "-" else ""
        value = int(exponent[1:])
        return f"{mantissa} × 10<sup>{sign}{value}</sup>{units}"

    def glue(self):
        assert self.mass is not None, "Mass has not been computed"
        assert self.mass_fraction is not None, "Mass fraction has not been computed"
        metadata = {"scrapbook": {"mime_prefix": GLUE_PREFIX}}
        for attr in ("GM_in_km", "mass", "mass_fraction"):
            metadata["scrapbook"]["name"] = f"{self.name}_{attr}"
            display(
                {GLUE_PREFIX + "text/html": self.format_units(getattr(self, attr))},
                raw=True,
                metadata=metadata,
            )


object_identifier_map = {
    "GM1": "Mercury",
    "GM2": "Venus",
    "GM3": "Earth",
    "GM4": "Mars",
    "GM5": "Jupiter",
    "GM6": "Saturn",
    "GM7": "Uranus",
    "GM8": "Neptune",
    "GM9": "Pluto",
    "GMS": "Sun",
    "GMM": "Moon",
    "GMB": "Earth-Moon-Barycenter",
}

celestial_objects = {}

# https://naif.jpl.nasa.gov/pub/naif/generic_kernels/spk/planets/de440_tech-comments.txt
# Mass parameter (GM) for Sun, Moon, and Planets:

#           AU**3/DAY**2                    GMSun/GM(I)         KM**3/SEC**2

data = """\
   GM1     4.9125001948893182e-11        6023657.944929           22031.868551
   GM2     7.2434523326441187e-10         408523.718656          324858.592000
   GM3     8.8876924467071022e-10         332946.048773          398600.435507
   GM4     9.5495488297258119e-11        3098703.546737           42828.375816
   GM5     2.8253458252257917e-07           1047.348631       126712764.100000
   GM6     8.4597059933762903e-08           3497.901801        37940584.841800
   GM7     1.2920265649682399e-08          22902.950783         5794556.400000
   GM8     1.5243573478851939e-08          19412.259776         6836527.100580
   GM9     2.1750964648933581e-12      136045556.167380             975.500000
   GMS     2.9591220828411956e-04              1.000000    132712440041.279419
   GMM     1.0931894624024351e-11       27068702.952351            4902.800118
   GMB     8.9970113929473466e-10         328900.559708          403503.235625
"""

for line in data.splitlines():
    identifier, GM_in_au, GM_ratio, GM_in_km = line.split()
    name = object_identifier_map[identifier]
    c_object = CelestialObject(
        identifier,
        name,
        Q_(GM_in_au + "au**3/day**2"),
        Q_(GM_ratio + "kg/kg"),
        Q_(GM_in_km + "km**3/s**2"),
    )
    c_object.compute_mass()
    celestial_objects[name] = c_object

total_mass = sum(c.mass for c in celestial_objects.values())
for c in celestial_objects.values():
    c.mass_fraction = c.mass / total_mass
    c.glue()
