import Predmet from './Predmet.js'
import { praviAutoPucanje } from './prosirenja/autoPucanje.js'

export default class VoziloBocno extends Predmet {
  constructor(src, { ciljevi, ...rest }) {
    super(src, { brzina: 120, zapaljiv: true, ...rest })
    this.oznake.add('neprijatelj')
    Object.assign(this, praviAutoPucanje({ zastoj: 10, ciljevi }))
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
  }
}
