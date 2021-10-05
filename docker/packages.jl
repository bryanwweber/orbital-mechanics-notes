using Pkg

dependencies = [
    "Luxor",
    "IJulia",
    "Thebes",
    "LightXML",
    "NLsolve",
    "DifferentialEquations",
    "Plots",
    "Colors",
    "Rotations",
]

Pkg.add(dependencies)
Pkg.precompile()
