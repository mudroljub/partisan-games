import Kompozit from '/game-engine/core/Kompozit.js'
import TopPostolje from './TopPostolje.js'
import TopCev from './TopCev.js'

const skalar = .75

export default class Top extends Kompozit {
  constructor(x, y) {
    super(x, y)
    this.cev = new TopCev(40, -32, skalar)
    this.postolje = new TopPostolje(0, 0, skalar)
    this.dodaj(this.cev, this.postolje)
  }
}
