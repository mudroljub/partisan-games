import Igrac from '/game-engine/core/Igrac.js'
import platno from '/game-engine/io/platno.js'
import { praviPucanje } from '/game-engine/core/prosirenja/pucanje.js'

export class Avionce extends Igrac {
  constructor() {
    super('2d-odozgo/avionce.gif', { skalar: .75, zapaljiv: true })
    this.brzina = 0
    this.poeni = 0
    Object.assign(this, praviPucanje({ potisakMetka: 1000, vremePunjenja: .1, ugloviPucanja: [-.33, 0, .33] }))
  }

  onload() {
    this.polozaj = { x: platno.width / 2, y: platno.height - this.visina }
  }

  proveriGranice() {
    this.ogranici()
  }

  puca() {
    const polozaj = { x: this.x, y: this.y - this.visina / 4 }
    this.pali(polozaj, Math.PI * 1.5)
  }

  update(dt) {
    super.update(dt)
    this.proveriPogotke(() => this.poeni++)
  }
}
