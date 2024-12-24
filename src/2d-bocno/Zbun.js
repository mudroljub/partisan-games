import * as _ from 'utils'
import Predmet from 'core/Predmet'
import platno from 'io/platno'
import {vracaVodoravno} from 'akcije/granice'
import slikaZbun from 'slike/2d-bocno/priroda/zbun.png'

export default class Zbun extends Predmet {
  constructor(nivoTla = platno.height, src = slikaZbun) {
    super (src)
    this.procenatVracanja = 1
    this.randomDoTla(nivoTla)
  }

  randomDoTla(nivoTla) {
    this.polozaj(Math.random() * platno.width, _.randomRange(nivoTla - this.visina/2, platno.height))
  }

  proveriGranice() {
    vracaVodoravno(this)
  }
}
