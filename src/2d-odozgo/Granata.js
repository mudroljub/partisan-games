import Predmet from '/game-engine/core/Predmet.js'

export default class Granata extends Predmet {

  constructor(vlasnik, src = 'granata.gif') {
    super(src)
    this.sakrij()
    this.vlasnik = vlasnik
  }

  puca() {
    this.pokazi()
    this.brzina = 20
    this.pozicija = this.vlasnik.pozicija
    this.ugao = this.vlasnik.ugao
  }

}
