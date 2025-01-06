import Predmet from '/game-engine/core/Predmet.js'

export default class Bunker extends Predmet {

  constructor() {
    super('/assets/slike/2d-bocno/kuca-bunker.png', { skalar: .5 })
    this.slikaMrtav = '/assets/slike/2d-bocno/kuca-bunker-gori.png'
    this.zapaljiv = true
  }

  nemojPreko(predmet) {
    this.postaviRandom(this.sirina / 2, this.visina / 2)
    if (this.razmakDo(predmet) < 150)
      this.nemojPreko(predmet)
  }
}
