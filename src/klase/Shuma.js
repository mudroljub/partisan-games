import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'

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
