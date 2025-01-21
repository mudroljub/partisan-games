import Predmet from '/game-engine/core/Predmet.js'
import Vreme from '/game-engine/core/Vreme.js'
import platno from '/game-engine/io/platno.js'

export default class Vracanje extends Predmet {
  constructor({ src, tlo, procenat = .25, x = Math.random() * platno.sirina, ...rest } = {}) {
    super(src, { x, ...rest })
    this.vreme = new Vreme()
    this.procenat = procenat
    if (tlo) this.onload = () => this.tlo(tlo)
  }

  reset() {
    this.ziv = true
  }

  umri() {
    this.ziv = false
  }

  proveriGranice() {
    if (this.vreme.proteklo < 1000) return

    if (Math.random() > 1 - this.procenat) this.vracaVodoravno(() => this.reset())

    this.vreme.reset()
  }
}
