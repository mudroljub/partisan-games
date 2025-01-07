import Predmet from '/game-engine/core/Predmet.js'
import Raketa from '/src/scene/avionce1942/Raketa.js'
import { Pucanje } from '/game-engine/prosirenja.js'

export default class Bunker extends Predmet {
  constructor({ x, y } = {}) {
    super('/assets/slike/2d-bocno/kuca-bunker.png', { skalar: .5, x, y })
    this.slikaMrtav = '/assets/slike/2d-bocno/kuca-bunker-gori.png'
    this.zapaljiv = true
    this.rakete = Array.from({ length: 5 }, () => new Raketa(this))
    this.predmeti.push(...this.rakete)
    this.i = 0
  }

  dodajCiljeve(...x) {
    this.rakete.forEach(r => r.dodajCiljeve(...x))
  }

  puca() {
    const raketa = this.rakete[this.i++ % this.rakete.length]
    raketa.pucaCiljano()
  }

  update(dt, t) {
    this.pucaPovremeno(t)
  }
}

Object.assign(Bunker.prototype, Pucanje)