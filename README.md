# Interactive Bloch Sphere

An interactive [bloch sphere](https://en.wikipedia.org/wiki/Bloch_sphere) implemented with [Three.js](https://threejs.org/).

## Features
* Setting qubit state to common states (|0⟩, |1⟩, |-⟩, |+⟩, |-i⟩ and |+i⟩)
* Applying gates, this includes:
  * Half turn gates:
    * X Gate
    * Y Gate
    * Z Gate
    * H Gate
  * Quater turn gates:
    * S Gate (√Z)
    * S^-1 Gate (Z^-½)
    * Y^½ Gate
    * Y^-½ Gate
    * X^½ Gate
    * X^-½ Gate
  * Eighth turn gates:
    * T Gate
    * T^-1 Gate
    * Y^¼ Gate
    * Y^-¼ Gate
    * X^¼ Gate
    * X^-¼ Gate

These gates can be applied in any order for example `H, T, Y^-¼` will result in this state:

![example qubit state](readme-resources/example-qubit-state.png)

