import Predmet from 'core/Predmet'
import {vracaVodoravno} from 'akcije/granice'
import slikaRuina from 'slike/2d-bocno/zgrade/ruina.png'

export default class Zgrada extends Predmet {
  constructor(nivoTla, src = slikaRuina) {
    super(src)
    this.tlo(nivoTla)
    this.procenatVracanja = 1
  }

  proveriGranice() {
    vracaVodoravno(this)
  }
}
