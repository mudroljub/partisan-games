import Predmet from '/core/actor/Predmet.js'
import platno from '/core/io/platno.js'

export default class Planina extends Predmet {

  constructor(nivoTla = platno.height, dx = 0) {
    super ('nature/planine.png')
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
