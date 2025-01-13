import Predmet from '/game-engine/core/Predmet.js'

export default class Metak extends Predmet {

  constructor(vlasnik) {
    super('granata.gif', { skalar: .5 })
    this.vlasnik = vlasnik
    this.ugao = this.vlasnik.ugao + Math.PI * 1.5
    this.sakrij()
  }

  puca(odstupanje = 0) {
    this.pokazi()
    this.polozaj(this.vlasnik.x, this.vlasnik.y - this.vlasnik.visina / 4)
    this.ugao += odstupanje
    this.brzina = 1000
  }

  proveriGranice() {
    this.nestaje()
  }
}
