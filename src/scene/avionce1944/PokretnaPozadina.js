import Predmet from '/game-engine/core/Predmet.js'

export default class PokretnaPozadina extends Predmet {

  constructor(brzina = 10, sirina = window.innerWidth) {
    super('/assets/slike/teksture/okean.gif', { sirina })
    this.dx = 0
    this.dy = brzina
  }

  onload() {
    this.polozaj(this.sirina / 2, 0)
  }

  proveriGranice() {
    if (this.y > this.visina / 2)
      this.y -= this.visina / 2
  }
}
