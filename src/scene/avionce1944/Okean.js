import Predmet from 'core/Predmet'
import slikaOkean from 'slike/teksture/okean.gif'

export class Okean extends Predmet {

  constructor(brzinaPozadine = 10, sirina = window.innerWidth, visina = 1440) {
    super(slikaOkean, sirina, visina)
    this.dx = 0
    this.dy = brzinaPozadine
    this.polozaj(sirina/2, 0)
  }

  proveriGranice() {
    this.ponavljaSliku()
  }

  ponavljaSliku() {
    if (this.y > this.visina/2) this.polozaj(this.sirina/2, -this.visina/12)
  }
}
