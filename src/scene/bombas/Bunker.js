import Predmet from '/game-engine/core/Predmet.js'
import Raketa from '/src/scene/avionce1942/Raketa.js'
import { Pucanje } from '/game-engine/prosirenja.js'

export default class Bunker extends Predmet {
  constructor({ x, y } = {}) {
    super('/assets/slike/2d-bocno/kuca-bunker.png', { skalar: .5, x, y })
    this.slikaMrtav = '/assets/slike/2d-bocno/kuca-bunker-gori.png'
    this.zapaljiv = true
    this.raketa = new Raketa(this)
    this.predmeti.push(this.raketa)
  }

  puca() {
    this.raketa.pucaPratecu()
  }

  update(dt, t) {
    this.pucaPovremeno(t)
  }
}

Object.assign(Bunker.prototype, Pucanje)