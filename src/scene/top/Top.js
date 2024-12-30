import Kompozit from '/game-engine/core/Kompozit.js'
import TopPostolje from './TopPostolje.js'
import TopCev from './TopCev.js'

const skalar = .75

export default class Top extends Kompozit {
  constructor(x, y) {
    super(x, y)
    this.izvorniX = x
    this.cev = new TopCev(40, -32, skalar, () => this.trzaj())
    this.postolje = new TopPostolje(0, 0, skalar)
    this.dodaj(this.cev, this.postolje)
  }

  trzaj() {
    this.x -= 5
  }

  update(dt) {
    if (this.x < this.izvorniX) this.x += 20 * dt
  }
}
