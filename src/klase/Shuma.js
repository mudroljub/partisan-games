import Predmet from '/core/actor/Predmet.js'
import platno from '/core/io/platno.js'

export default class Shuma extends Predmet {

  constructor(nivoTla = platno.height, dx = 0) {
    super('priroda/shumarak.png')
    this.nivoTla = nivoTla
    this.x = Math.random() * platno.width
    this.dx = dx
  }

  onload() {
    this.tlo(this.nivoTla + 5)
  }

  proveriGranice() {
    this.vracaVodoravno()
  }
}
