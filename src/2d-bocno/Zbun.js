import { randomRange } from '/game-engine/utils.js'
import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'

export default class Zbun extends Predmet {
  constructor(nivoTla, dx = 0) {
    super ('/assets/slike/2d-bocno/priroda/zbun.png')
    this.dx = dx
    this.onload = () => this.randomDoTla(nivoTla)
  }

  randomDoTla(nivoTla) {
    this.polozaj(Math.random() * platno.width, randomRange(nivoTla - this.visina / 2, platno.height))
  }

  proveriGranice() {
    this.vracaVodoravno(1)
  }
}
