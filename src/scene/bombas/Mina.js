import Predmet from '/game-engine/core/Predmet.js'

export default class Mina extends Predmet {
  constructor(params) {
    super('/assets/slike/2d-bocno/stvari/nagazna.png', { skalar: .75, zapaljiv: true, ...params })
  }

  proveriSudar(telo) {
    if (this.sudara(telo)) {
      this.umri()
      telo.umri()
    }
  }
}