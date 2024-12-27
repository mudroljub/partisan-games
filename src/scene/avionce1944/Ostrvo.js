import Predmet from 'core/Predmet'
import platno from 'io/platno'

export class Ostrvo extends Predmet {

  constructor(brzina) {
    super('/assets/slike/oblak.gif', 100, 100)
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
