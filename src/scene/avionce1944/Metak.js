import Predmet from '/game-engine/core/Predmet.js'

export default class Metak extends Predmet {

  constructor(vlasnik) {
    super('granata.gif', { skalar: .5 })
    this.vlasnik = vlasnik
    this.ugao = this.vlasnik.ugao + Math.PI * 1.5
    this.sakrij()
  }

  puca(polozaj, ugao) {
    this.pokazi()
    this.polozaj = polozaj
    this.ugao = ugao
    this.brzina = 1000
  }

  proveriGranice() {
    this.nestaje()
  }
}
