import Predmet from 'core/Predmet'

export default class Granata extends Predmet {

  constructor(vlasnik, src = '/assets/slike/granata.gif') {
    super(src, 24, 6)
    this.sakrij()
    this.vlasnik = vlasnik
  }

  puca() {
    this.pokazi()
    this.brzina = 20
    this.polozaj(this.vlasnik.x, this.vlasnik.y)
    this.ugao = this.vlasnik.ugao
  }

}
