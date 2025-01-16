import Igrac from '/game-engine/core/Igrac.js'
import platno from '/game-engine/io/platno.js'
import { praviPucanje } from '/game-engine/core/prosirenja/pucanje.js'

export class Avionce extends Igrac {
  constructor() {
    super('2d-odozgo/avionce.gif', { skalar: .75, zapaljiv: true, senka: true })
    this.brzina = 0
    this.poeni = 0
    this.zivoti = 2
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

  reset() {
    this.ziv = true
    this.scaleX = this.scaleY = 1
  }

  umri() {
    this.ziv = false
    this.pada = true
    this.zivoti--
    setTimeout(() => {
      this.pada = false
      if (this.zivoti) this.reset()
    }, 2500)
  }

  update(dt, t) {
    super.update(dt, t)
    this.proveriPogotke(() => this.poeni++)

    if (this.pada)
      this.scaleX = this.scaleY = this.scaleX * Math.pow(0.8, dt)
  }
}
