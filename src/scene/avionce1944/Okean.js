import Predmet from '/game-engine/core/Predmet.js'

export class Okean extends Predmet {

  constructor(brzinaPozadine = 10, sirina = window.innerWidth, visina = 1440) {
    super('/assets/slike/teksture/okean.gif', { sirina, visina })
    this.dx = 0
    this.dy = brzinaPozadine
    this.polozaj(sirina / 2, 0)
  }

  proveriGranice() {
    this.ponavljaSliku()
  }

  ponavljaSliku() {
    if (this.y > this.visina / 2) this.polozaj(this.sirina / 2, -this.visina / 12)
  }
}
