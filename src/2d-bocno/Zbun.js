import * as _ from '/game-engine/utils.js'
import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'
import { vracaVodoravno } from '/game-engine/utils/granice.js'

export default class Zbun extends Predmet {
  constructor(nivoTla = platno.height, src = '/assets/slike/2d-bocno/priroda/zbun.png') {
    super (src)
    this.procenatVracanja = 1
    this.onload = () => this.randomDoTla(nivoTla)
  }

  randomDoTla(nivoTla) {
    this.polozaj(Math.random() * platno.width, _.randomRange(nivoTla - this.visina / 2, platno.height))
  }

  proveriGranice() {
    vracaVodoravno(this)
  }
}
