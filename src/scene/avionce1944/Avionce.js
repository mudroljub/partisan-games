import Igrac from '/game-engine/core/Igrac.js'
import platno from '/game-engine/io/platno.js'
import { praviPucanje } from '/game-engine/core/prosirenja/pucanje.js'

export class Avionce extends Igrac {
  constructor() {
    super('2d-odozgo/avionce.gif', { skalar: .75, zapaljiv: true })
    this.brzina = 0
    this.poeni = 0
    this.ugaoPucanja = Math.PI * 1.5
  }

  onload() {
    this.polozaj = { x: platno.width / 2, y: platno.height - this.visina }
  }

  proveriGranice() {
    this.ogranici()
  }

  puca() {
    const polozaj = { x: this.x, y: this.y - this.visina / 4 }
    this.pali(polozaj, this.ugaoPucanja)
  }

  update(dt) {
    super.update(dt)
    this.proveriPogotke(() => this.poeni++)
  }
}

Object.assign(Avionce.prototype, praviPucanje({ vremePunjenja: 100, ugloviPucanja: [-13, 0, 13] }))