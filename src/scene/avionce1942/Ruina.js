import Predmet from '/game-engine/core/Predmet.js'
import Vreme from '/game-engine/core/Vreme.js'

export default class Ruina extends Predmet {
  constructor(nivoTla, src = '2d-bocno/zgrade/ruina.png') {
    super(src)
    this.x = -400
    this.onload = () => this.tlo(nivoTla)
    this.vreme = new Vreme()
  }

  proveriGranice() {
    if (this.vreme.proteklo < 1000) return

    if (Math.random() > .5) this.vracaVodoravno()

    this.vreme.reset()
  }
}
