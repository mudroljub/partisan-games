import Predmet from '/game-engine/core/Predmet.js'

export default class Bunker extends Predmet {
  constructor({ x, y } = {}) {
    super('2d-bocno/kuca-bunker.png', { skalar: .5, x, y, zapaljiv: true })
    this.slikaMrtav = '2d-bocno/kuca-bunker-gori.png'
  }
}
