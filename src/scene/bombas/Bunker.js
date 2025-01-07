import Predmet from '/game-engine/core/Predmet.js'

export default class Bunker extends Predmet {

  constructor({ x, y } = {}) {
    super('/assets/slike/2d-bocno/kuca-bunker.png', { skalar: .5, x, y })
    this.slikaMrtav = '/assets/slike/2d-bocno/kuca-bunker-gori.png'
    this.zapaljiv = true
  }
}
