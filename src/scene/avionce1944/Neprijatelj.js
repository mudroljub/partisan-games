import Pokretno from './Pokretno.js'
import { randomInRange } from '/game-engine/utils.js'
import { praviPucanje } from '/game-engine/core/prosirenja/pucanje.js'

export default class Neprijatelj extends Pokretno {
  constructor(src, { potisak }) {
    super(src, {
      skalar: .66, odrazX: -1, zapaljiv: true,
      potisak: potisak * randomInRange(1.1, 1.4), faktorY: randomInRange(3, 5),
    })
    Object.assign(this, praviPucanje({ vremePunjenja: .1, ugloviPucanja: [-.33, 0, .33] }))
  }

  puca() {
    const polozaj = { x: this.x, y: this.y + this.visina / 4 }
    this.pali(polozaj, Math.PI * .5)
  }

  update(dt, t) {
    super.update(dt, t)
    this.puca()
  }
}
