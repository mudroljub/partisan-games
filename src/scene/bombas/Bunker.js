import Predmet from '/game-engine/core/Predmet.js'

export default class Bunker extends Predmet {
  constructor({ x, y, skalar = .5, zapaljiv = true, ...rest } = {}) {
    super('2d-bocno/kuca-bunker.png', { x, y, skalar, zapaljiv, ...rest })
  }

  umri() {
    this.ziv = false
  }
}
