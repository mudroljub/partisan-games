import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'
import { randomInRange } from '/game-engine/utils.js'

export default class Oblak extends Predmet {
  constructor(nivoTla = platno.height, dx = 0) {
    super('oblak.gif')
    this.nivoTla = nivoTla
    this.dx = dx
    this.dy = Math.random() * 20 - 10
  }

  onload() {
    this.postavi(Math.random() * platno.width, randomInRange(0, this.nivoTla))
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
    this.vracaVodoravno()
  }
}
