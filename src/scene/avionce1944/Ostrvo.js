import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'

export class Ostrvo extends Predmet {

  constructor(brzina = 10) {
    super('/assets/slike/2d-odozgo/ostrvo.gif')
    this.brzina = brzina
    this.reset()
  }

  reset() {
    this.dy = this.brzina
    this.dx = 0
    const x = Math.random() * platno.width
    this.polozaj(x, -50)
  }

  proveriGranice() {
    if (this.y > platno.height) this.reset()
  }
}
