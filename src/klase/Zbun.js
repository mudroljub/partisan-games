import { randomInRange } from '/core/utils.js'
import Predmet from '/core/actor/Predmet.js'
import platno from '/core/io/platno.js'

export default class Zbun extends Predmet {
  constructor(nivoTla = platno.height, dx = 0) {
    super ('priroda/zbun.png')
    this.dx = dx
    this.onload = () => this.randomDoTla(nivoTla)
  }

  randomDoTla(nivoTla) {
    this.postavi(Math.random() * platno.width, randomInRange(nivoTla - this.visina / 2, platno.height))
  }

  proveriGranice() {
    this.vracaVodoravno()
  }
}
