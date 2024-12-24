import Predmet from 'core/Predmet'
import slikaGranata from 'slike/granata.gif'

export default class Granata extends Predmet {

  constructor(vlasnik, src = slikaGranata) {
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
