import { randomRange } from '/game-engine/utils.js'
import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'

export default class Oblak extends Predmet {

  constructor(nivoTla, dx) {
    super('/assets/slike/oblak.gif')
    this.nivoTla = nivoTla
    this.dx = dx
    this.dy = Math.random() * 2 - 1
  }

  onload() {
    this.polozaj(Math.random() * platno.width, randomRange(0, this.nivoTla))
  }

  proveriGranice() {
    if (this.y < -100) {
      this.y = -100
      this.dy = -this.dy
    }
    if (this.y > this.nivoTla) {
      this.y = this.nivoTla
      this.dy = -this.dy
    }
    this.vracaVodoravno(1)
  }
}
