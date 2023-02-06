import csv
from myst_nb.ext.glue import GLUE_PREFIX
from IPython.display import display

# Data source: https://link.springer.com/article/10.1007/s10569-017-9805-5/tables/5
planet_data = """\
Planet,Mean radius (km),Equatorial radius (km),Polar radius (km),RMS deviation from spheroid (km),Maximum elevation (km),Maximum depression (km)
Sun,,695700,,,,
Mercury,2439.4 ± 0.1,2440.53 ± 0.04,2438.26 ± 0.04,1.0,4.6,2.5
Venus,6051.8 ± 1.0,Same,Same,1.0,11,2
Earth,6371.0084 ± 0.0001,6378.1366 ± 0.0001,6356.7519 ± 0.0001,3.57,8.85,11.52
Mars,3389.50 ± 0.2,3396.19 ± 0.1,3376.20 ± 0.1,3.0,22.64 ± 0.1,7.55 ± 0.1
Mars,3389.50 ± 0.2,3396.19 ± 0.1,N 3373.19 ± 0.1,3.0,22.64 ± 0.1,7.55 ± 0.1
Mars,3389.50 ± 0.2,3396.19 ± 0.1,S 3379.21 ± 0.1,3.0,22.64 ± 0.1,7.55 ± 0.1
Jupiter,69911 ± 6,71492 ± 4,66854 ± 10,62.1,31,102
Saturn,58232 ± 6,60268 ± 4,54364 ± 10,102.9,8,205
Uranus,25362 ± 7,25559 ± 4,24973 ± 20,16.8,28,0
Neptune,24622 ± 19,24764 ± 15,24341 ± 30,8.0,14,0
"""

# Data source: https://link.springer.com/article/10.1007/s10569-017-9805-5/tables/6
moon_data = """\
Planet,Unnamed: 1,Satellite,Mean radius (km),Subplanetary equatorial radius (km),Along orbit equatorial radius (km),Polar radius (km),RMS deviation from ellipsoid (km),Maximum elevation (km),Maximum depression (km)
Earth,,Moon,1737.4,Same,Same,Same,2.5,7.5,5.6
Mars,I,Phobos,11.08 ± 0.04,13.0,11.4,9.1,0.5,,
Mars,II,Deimos,6.2 ± 0.25,7.8,6.0,5.1,0.2,,
Jupiter,XVI,Metis,21.5 ± 4,30,20,17,,,
Jupiter,XV,Adrastea,8.2 ± 4,10,8,7,,,
Jupiter,V,Amalthea,83.5 ± 3,125,73,64,3.2,,
Jupiter,XIV,Thebe,49.3 ± 4,58,49,42,,,
Jupiter,I,Io,1821.49,1829.4,1819.4,1815.7,,13.0,3.0
Jupiter,II,Europa,1560.8 ± 0.3,1562.6,1560.3,1559.5,0.32,,
Jupiter,III,Ganymede,2631.2± 1.7,Same,Same,Same,,,
Jupiter,IV,Callisto,2410.3± 1.5,Same,Same,Same,0.6,,
Jupiter,XIII,Leda,5,,,,,,
Jupiter,VI,Himalia,85 ± 10,,,,,,
Jupiter,X,Lysithea,12,,,,,,
Jupiter,VII,Elara,40 ± 10,,,,,,
Jupiter,XII,Ananke,10,,,,,,
Jupiter,XI,Carme,15,,,,,,
Jupiter,VIII,Pasiphae,18,,,,,,
Jupiter,IX,Sinope,14,,,,,,
Saturn,XVIII,Pan,14.0 ± 1.2,17.2 ± 1.7,15.4 ± 1.2,10.4 ± 0.9,,,
Saturn,XXXV,Daphnis,3.8 ± 0.8,4.6 ± 0.7,4.5 ± 0.9,2.8 ± 0.8,,,
Saturn,XV,Atlas,15.1 ± 0.8,20.5 ± 0.9,17.8 ± 0.7,9.4 ± 0.8,,,
Saturn,XVI,Prometheus,43.1 ± 1.2,68.2 ± 0.8,41.6 ± 1.8,28.2 ± 0.8,,,
Saturn,XVII,Pandora,40.6 ± 1.5,52.2 ± 1.8,40.8 ± 2.0,31.5 ± 0.9,,,
Saturn,XI,Epimetheus,58.2 ± 1.2,64.9 ± 1.3,57.3 ± 2.5,53.0 ± 0.5,,,
Saturn,X,Janus,89.2 ± 0.8,101.7 ± 1.6,93.0 ± 0.7,76.3 ± 0.4,,,
Saturn,I,Mimas,198.2 ± 0.4,207.8 ± 0.5,196.7 ± 0.5,190.6 ± 0.3,,,
Saturn,LIII,Aegaeon,0.33 ± 0.06,0.7 ± 0.05,0.25 ± 0.06,0.2 ± 0.08,,,
Saturn,XXXII,Methone,1.45 ± 0.03,1.94 ± 0.02,1.29 ± 0.04,1.21 ± 0.02,,,
Saturn,XLIX,Anthe,0.5,,,,,,
Saturn,XXXIII,Pallene,2.23 ± 0.07,2.88 ± 0.07,2.08 ± 0.07,1.8 ± 0.07,,,
Saturn,II,Enceladus,252.1 ± 0.2,256.6 ± 0.6,251.4 ± 0.2,248.3 ± 0.2,0.4,,
Saturn,III,Tethys,531.0 ± 0.6,538.4± 0.3,528.3 ± 1.1,526.3 ± 0.6,,,
Saturn,XIII,Telesto,12.4 ± 0.4,16.3 ± 0.5,11.8 ± 0.3,9.8 ± 0.3,,,
Saturn,XIV,Calypso,9.6 ± 0.6,15.3 ± 0.3,9.3 ± 2.2,6.3 ± 0.6,,,
Saturn,IV,Dione,561.4 ± 0.4,563.4 ± 0.6,561.3 ± 0.5,559.6 ± 0.4,0.5,,
Saturn,XII,Helene,18.0 ± 0.4,22.5 ± 0.5,19.6 ± 0.3,13.3 ± 0.2,,,
Saturn,XXXIV,Polydeuces,1.3 ± 0.4,1.5 ± 0.6,1.2 ± 0.4,1.0 ± 0.2,,,
Saturn,V,Rhea,763.5 ± 0.6,765.0 ± 0.7,763.1 ± 0.6,762.4 ± 0.6,,,
Saturn,VI,Titan,2575.0,2575.15 ± 0.02,2574.78 ± 0.06,2574.47 ± 0.06,0.26,,
Saturn,VII,Hyperion,135 ± 4,180.1 ± 2.0,133.0 ± 4.5,102.7 ± 4.5,,,
Saturn,VIII,Iapetus,734.3 ± 2.8,745.7 ± 2.9,745.7 ± 2.9,712.1 ± 1.6,,,
Saturn,IX,Phoebe,106.5 ± 0.7,109.4 ± 1.4,108.5 ± 0.6,101.8 ± 0.3,,,
Uranus,VI,Cordelia,13 ± 2,,,,,,
Uranus,VII,Ophelia,15 ± 2,,,,,,
Uranus,VIII,Bianca,21 ± 3,,,,,,
Uranus,IX,Cressida,31 ± 4,,,,,,
Uranus,X,Desdemona,27 ± 3,,,,,,
Uranus,XI,Juliet,42 ± 5,,,,,,
Uranus,XII,Portia,54 ± 6,,,,,,
Uranus,XIII,Rosalind,27 ± 4,,,,,,
Uranus,XIV,Belinda,33 ± 4,,,,,,
Uranus,XV,Puck,77 ± 51.9,,,,1.9,,
Uranus,V,Miranda,235.8 ± 0.7,240.4 ± 0.6,234.2 ± 0.9,232.9 ± 1.2,1.6,5.0,8.0
Uranus,I,Ariel,578.9 ± 0.6,581.1 ± 0.9,577.9 ± 0.6,577.7 ± 1.0,0.9,4.0,4.0
Uranus,II,Umbriel,584.7 ± 2.8,Same,Same,Same,2.6,,6.0
Uranus,III,Titania,788.9 ± 1.8,Same,Same,Same,1.3,4.0,
Uranus,IV,Oberon,761.4 ± 2.6,Same,Same,Same,1.5,12.0,2.0
Neptune,III,Naiad,29 ± 6,,,,,,
Neptune,IV,Thalassa,40 ± 8,,,,,,
Neptune,V,Despina,74 ± 10,,,,,,
Neptune,VI,Galatea,79 ± 12,,,,,,
Neptune,VII,Larissa,96 ± 7,104,,89,2.9,6.0,5.0
Neptune,VIII,Proteus,208 ± 8,218,208,201,7.9,18.0,13.0
Neptune,I,Triton,1352.6 ± 2.4,,,,,,
Neptune,II,Nereid,170 ± 25,,,,,,
"""

# Data source: https://link.springer.com/article/10.1007/s10569-017-9805-5/tables/7
dwarf_data = """\
Body,Mean radius (km),Radii measured along principal axes.x (km),Radii measured along principal axes.y (km),Radii measured along principal axes.z (km),Unnamed: 5
(1) Ceres,470,487.3,487.3,446,(a)
(4) Vesta,,289 ± 5,280 ± 5,229 ± 5,
(16) Psyche,113 ± 23,139.5 ± 10%,116 ± 10%,94.5 ± 10%,(b)
(21) Lutetia,52.5 ± 2.5,62.0 ± 2.5,50.5 ± 2.0,46.5 ± 6.5,
(52) Europa,157.5 ± 7,189.5 ± 16,165 ± 8,124.5 ± 10,
(243) Ida,15.65 ± 0.6,26.8,12.0,7.6,
(253) Mathilde,26.5 ± 1.3,33,24,23,
(433) Eros,8.45 ± 0.02,17.0,5.5,5.5,
(511) Davida,150,180,147,127,(c)
(951) Gaspr,6.1 ± 0.4,9.1,5.2,4.4,
(2867) Šteins,2.70,3.24,2.73,2.04,
(4179) Toutatis,,2.13,1.015,0.85,
(25143) Itokawa,,0.268,0.147,0.104,
(134340) Pluto,1188.3 ± 1.6,Same,Same,Same,
(134340) Pluto: I Charon,606.0 ± 1.0,Same,Same,Same,
1P/Halley,,8.0 ± 0.5,4.0 ± 0.25,4.0 ± 0.25,
9P/Tempel 1,3.0 ± 0.1,3.7,2.5,,(d)
19P/Borrelly,4.22 ± 0.05,3.5 ± 0.2,–,–,(e)
67P/Churyumov–Gerasimenko,1.65,2.40,1.55,1.20,(f)
81P/Wild 2,1.975,2.7,1.9,1.5,
103P/Hartley 2,0.58,0.34,1.16,1.16,(g)
"""


def glue(row: dict[str, str], name: str, object: str) -> None:
    meta_name = f"{object}_{name.replace(' ', '_').replace('(', '').replace(')', '')}"
    value = row[name]
    display(
        {GLUE_PREFIX + "text/html": value},
        raw=True,
        metadata={"scrapbook": {"mime_prefix": GLUE_PREFIX, "name": meta_name}},
    )


reader = csv.DictReader(planet_data.splitlines())
did_mars = False
for row in reader:
    if did_mars and row["Planet"] == "Mars":
        continue
    elif row["Planet"] == "Mars":
        did_mars = True
    glue(row, "Mean radius (km)", row["Planet"])
    glue(row, "Equatorial radius (km)", row["Planet"])
    glue(row, "Polar radius (km)", row["Planet"])

reader = csv.DictReader(moon_data.splitlines())
# Just want Earth's Moon
glue(next(reader), "Mean radius (km)", object="Moon")

reader = csv.DictReader(dwarf_data.splitlines())
for row in reader:
    body = row["Body"]
    if "Pluto" not in body or "Charon" in body:
        continue
    body = body.split()[1]
    glue(row, "Mean radius (km)", object="Pluto")
