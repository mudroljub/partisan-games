import Predmet from 'core/Predmet'
import {nestani} from 'akcije/granice'
import slikaGranata from 'slike/granata.gif'

export default class Metak extends Predmet {

  constructor(vlasnik) {
    super(slikaGranata)
    this.prevelicaj(0.5)
    this.vlasnik = vlasnik
    this.granice = nestani
    this.ugao = this.vlasnik.ugao
    this.sakrij()
  }

  puca(odstupanje = 0) {
    this.pokazi()
    this.polozaj(this.vlasnik.x, this.vlasnik.y - this.vlasnik.visina/4)
    this.ugao += odstupanje
    this.brzina = 20
  }

}
