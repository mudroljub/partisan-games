import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'

export default class Planina extends Predmet {

  constructor(nivoTla, dx = 0) {
    super ('/assets/slike/oblak.gif')
    this.x = Math.random() * platno.width
    this.tlo(nivoTla + 3)
    this.dx = dx
  }

  proveriGranice() {
    this.kruzi()
  }
}
