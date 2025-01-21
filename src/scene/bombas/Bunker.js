import Predmet from '/game-engine/core/Predmet.js'
import Vreme from '/game-engine/core/Vreme.js'

export default class Bunker extends Predmet {
  constructor({ x, y, skalar = .5, zapaljiv = true, ...rest } = {}) {
    super('2d-bocno/kuca-bunker.png', { x, y, skalar, zapaljiv, ...rest })
    this.vreme = new Vreme()
  }

  reset() {
    this.ziv = true
  }

  umri() {
    this.ziv = false
  }

  proveriGranice() {
    if (this.vreme.proteklo < 1000) return

    if (Math.random() > .75) this.vracaVodoravno(() => this.reset())

    this.vreme.reset()
  }
}
