import Predmet from '/game-engine/core/Predmet.js'
import Vreme from '/game-engine/core/Vreme.js'

export default class Vracanje extends Predmet {
  constructor({ src, tlo, procenat = .5, ...rest } = {}) {
    super(src, rest)
    this.vreme = new Vreme()
    this.procenat = procenat
    if (tlo) this.onload = () => this.tlo(tlo)
  }

  proveriGranice() {
    if (this.vreme.proteklo < 1000) return

    if (Math.random() > 1 - this.procenat) this.vracaVodoravno()

    this.vreme.reset()
  }
}
