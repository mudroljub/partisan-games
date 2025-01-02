import Predmet from '/game-engine/core/Predmet.js'

export default class Bunker extends Predmet {

  constructor() {
    super('/assets/slike/2d-bocno/kuca-bunker.png', { skalar: .5 })
  }

  nemojPreko(predmet) {
    this.postaviRandomUredno()
    if (this.razmakDo(predmet) < 150)
      this.nemojPreko(predmet)
  }

  gori() {
    this.slika.src = '/assets/slike/2d-bocno/kuca-bunker-gori.png'
  }
}
