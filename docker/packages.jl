using Pkg

dependencies = [
    "Luxor",
    "IJulia",
    "Thebes",
    "LightXML",
    "NLsolve",
    "DifferentialEquations",
    "Plots",
]

Pkg.add(dependencies)
Pkg.precompile()
