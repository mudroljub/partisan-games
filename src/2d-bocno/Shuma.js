import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'

export default class Shuma extends Predmet {

  constructor(nivoTla = platno.height, src = '/assets/slike/2d-bocno/priroda/shumarak.png') {
    super(src)
    this.onload = () => {
      this.x = Math.random() * platno.width
      this.tlo(nivoTla + 5)
    }
  }

  proveriGranice() {
    this.vracaVodoravno(1)
  }
}
