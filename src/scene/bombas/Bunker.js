import Predmet from '/game-engine/core/Predmet.js'
import { praviAutoPucanje } from '/game-engine/core/prosirenja/autoPucanje.js'

export default class Bunker extends Predmet {
  constructor({ x, y } = {}) {
    super('/assets/slike/2d-bocno/kuca-bunker.png', { skalar: .5, x, y })
    this.slikaMrtav = '/assets/slike/2d-bocno/kuca-bunker-gori.png'
    this.zapaljiv = true
  }

  update(dt, t) {
    super.update(dt, t)
    this.rafalPovremeno(t)
  }
}

const autoPucanje = praviAutoPucanje({ zastoj: 2, kolicina: 100, src: '/assets/slike/granata.gif', skalar: .4, potisak: 400 })

Object.assign(Bunker.prototype, autoPucanje)