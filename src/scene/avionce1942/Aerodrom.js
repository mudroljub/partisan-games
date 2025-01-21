import Predmet from '/game-engine/core/Predmet.js'
import Vreme from '/game-engine/core/Vreme.js'

export default class Aerodrom extends Predmet {
  constructor(nivoTla, src = '2d-bocno/zgrade/aerodrom.png') {
    super(src)
    this.onload = () => this.tlo(nivoTla)
    this.vreme = new Vreme()
  }

  proveriGranice() {
    if (this.vreme.proteklo < 1000) return

    if (Math.random() > .75) this.vracaVodoravno()

    this.vreme.reset()
  }
}
