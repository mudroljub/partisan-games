import Predmet from './Predmet.js'
import { prosiriPucanjem } from './prosirenja/AutoPucanje.js'

export default class VoziloBocno extends Predmet {
  constructor(src, { x, y, skalar }) {
    super(src, { x, y, skalar })
    this.brzina = 120
    this.zapaljiv = true
    this.oznake.add('neprijatelj')
  }

  onload() {
    this.y -= this.visina / 2
  }

  patroliraj() {
    if (this.mrtav) return

    if (this.x <= 150)
      this.skreni(0)

    if (this.x >= 600)
      this.skreni(Math.PI)
  }

  azurirajSliku() {
    this.odrazX = this.ugao === Math.PI ? -1 : 1
  }

  update(dt, t) {
    super.update(dt, t)
    this.patroliraj()
    this.azurirajSliku()
    this.pucaPovremeno(t)
  }
}

Object.assign(VoziloBocno.prototype, prosiriPucanjem(10, 1))