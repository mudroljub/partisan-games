import Predmet from './Predmet.js'
import { praviPucanje } from './prosirenja/pucanje.js'

export default class VoziloBocno extends Predmet {
  constructor(src, params) {
    super(src, { brzina: 120, zapaljiv: true, ...params })
    this.oznake.add('neprijatelj')
    Object.assign(this, praviPucanje({ zastoj: 10, src: 'raketa.png', skalar: .55, potisakMetka: 500 }))
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

    this.azurirajSliku()
  }

  azurirajSliku() {
    this.odrazX = this.ugao === Math.PI ? -1 : 1
  }

  update(dt, t) {
    super.update(dt, t)
    this.pucaPovremeno(t)
    this.proveriPogotke()
  }
}
