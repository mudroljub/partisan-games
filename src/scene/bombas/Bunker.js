import Predmet from '/game-engine/core/Predmet.js'
import { dodajAutoPucanje } from '/game-engine/core/prosirenja/AutoPucanje.js'

export default class Bunker extends Predmet {
  constructor({ x, y } = {}) {
    super('/assets/slike/2d-bocno/kuca-bunker.png', { skalar: .5, x, y })
    this.slikaMrtav = '/assets/slike/2d-bocno/kuca-bunker-gori.png'
    this.zapaljiv = true
  }

  update(dt, t) {
    this.pucaPovremeno(t)
  }
}

Object.assign(Bunker.prototype, dodajAutoPucanje({ interval: 1, brojRaketa: 5, src: '/assets/slike/granata.gif' }))