import Predmet from 'core/Predmet'
import platno from 'io/platno'
import slikaOblak from 'slike/oblak.gif'

export default class Oblak extends Predmet {
  constructor(brzina) {
    super(slikaOblak, 150, 100)
    this.brzina = brzina
    this.reset()
  }

  reset() {
    this.dy = Math.random() * this.brzina + 5
    this.dx = Math.random() * 10 - 5
    const noviX = Math.random() * platno.width
    this.polozaj(noviX, 50)
  }

  proveriGranice() {
    if (this.y > platno.height) this.reset()
  }
}
