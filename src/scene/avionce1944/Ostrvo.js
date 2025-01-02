import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'

export class Ostrvo extends Predmet {

  constructor(brzina) {
    super('/assets/slike/oblak.gif')
    this.reset(brzina)
  }

  reset(brzina) {
    this.dy = brzina || 10
    this.dx = 0
    const newX = Math.random() * platno.width
    this.polozaj(newX, 50)
  }

  proveriGranice() {
    if (this.y > platno.height) this.reset()
  }
}
