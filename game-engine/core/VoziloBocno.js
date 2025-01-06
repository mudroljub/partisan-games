import Predmet from '/game-engine/core/Predmet.js'
import Vreme from '/game-engine/core/Vreme.js'
import Raketa from '../../src/scene/avionce1942/Raketa.js'

export default class VoziloBocno extends Predmet {
  constructor(src, { x, y, skalar }) {
    super(src, { x, y, skalar })
    this.brzina = 120
    this.zapaljiv = true
    this.sansaPucnja = 0.5
    this.oznake.add('neprijatelj')
    this.neprijatelji = [] // treba raketi
    this.raketa = new Raketa(this)
    this.raketa.cilj = 'igrac'
    this.vreme = new Vreme()
    this.zadnjeVreme = 0
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

  get spremno() {
    return (this.vreme.proteklo - this.zadnjeVreme > 3000)
  }

  povremenoPucaPratecu() {
    if (!this.ziv) return

    if (this.spremno && Math.random() < this.sansaPucnja) {
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
    this.raketa.update(dt)
    this.lastX = this.x
  }
}
