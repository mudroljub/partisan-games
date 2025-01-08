import Predmet from '/game-engine/core/Predmet.js'
import { dodajAutoPucanje } from '/game-engine/core/prosirenja/AutoPucanje.js'
import Raketa from '/game-engine/core/Raketa.js'

export default class Bunker extends Predmet {
  constructor({ x, y } = {}) {
    super('/assets/slike/2d-bocno/kuca-bunker.png', { skalar: .5, x, y })
    this.slikaMrtav = '/assets/slike/2d-bocno/kuca-bunker-gori.png'
    this.zapaljiv = true
    this.rakete = Array.from({ length: 5 }, () => new Raketa())
  }

  get predmeti() {
    return [...this.rakete]
  }

  update(dt, t) {
    this.pucaPovremeno(t)
  }
}

Object.assign(Bunker.prototype, dodajAutoPucanje(1))