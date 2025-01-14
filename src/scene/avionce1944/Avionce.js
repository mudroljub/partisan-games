import Igrac from '/game-engine/core/Igrac.js'
import platno from '/game-engine/io/platno.js'
import { praviPucanje } from '/game-engine/core/prosirenja/pucanje.js'

export class Avionce extends Igrac {
  constructor() {
    super('2d-odozgo/avionce.gif', { skalar: .75, zapaljiv: true })
    this.brzina = 0
    this.predmeti = this.meci
    this.poeni = 0
  }

  onload() {
    this.polozaj = { x: platno.width / 2, y: platno.height - this.visina }
  }

  proveriGranice() {
    this.ogranici()
  }

  update(dt) {
    super.update(dt)
    this.proveriPogotke(() => this.poeni++)
  }
}

Object.assign(Avionce.prototype, praviPucanje())