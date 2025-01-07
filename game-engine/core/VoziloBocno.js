import Predmet from '/game-engine/core/Predmet.js'
import Vreme from '/game-engine/core/Vreme.js'
import Raketa from '../../src/scene/avionce1942/Raketa.js'

export default class VoziloBocno extends Predmet {
  constructor(src, { x, y, skalar }) {
    super(src, { x, y, skalar })
    this.brzina = 120
    this.zapaljiv = true
    this.oznake.add('neprijatelj')
    this.raketa = new Raketa(this)
    this.vreme = new Vreme()
    this.zadnjeVreme = 0
    this.predmeti = [this.raketa]
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

  pucaPratecu() {
    this.raketa.pucaPratecu()
  }

  povremenoPucaPratecu() {
    if (!this.ziv) return

    if ((this.vreme.proteklo - this.zadnjeVreme > 3000)) {
      this.pucaPratecu()
      this.zadnjeVreme = this.vreme.proteklo
    }
  }

  azurirajSliku() {
    this.odrazX = this.ugao === Math.PI ? -1 : 1
  }

  update(dt) {
    super.update(dt)
    this.patroliraj()
    this.azurirajSliku()
    this.lastX = this.x
  }
}
