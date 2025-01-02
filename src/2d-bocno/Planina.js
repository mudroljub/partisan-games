import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'

export default class Planina extends Predmet {

  constructor(nivoTla = platno.height, dx = 0) {
    super ('/assets/slike/2d-bocno/priroda/planine.png')
    this.x = Math.random() * platno.width
    this.dx = dx
    this.nivoTla = nivoTla
  }

  onload() {
    this.tlo(this.nivoTla + 3)
  }

  proveriGranice() {
    this.kruzi()
  }
}
