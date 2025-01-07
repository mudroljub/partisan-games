import Predmet from '/game-engine/core/Predmet.js'
import Raketa from '../../src/scene/avionce1942/Raketa.js'
import { Pucanje } from '/game-engine/prosirenja.js'

export default class VoziloBocno extends Predmet {
  constructor(src, { x, y, skalar }) {
    super(src, { x, y, skalar })
    this.brzina = 120
    this.zapaljiv = true
    this.oznake.add('neprijatelj')
    this.raketa = new Raketa(this)
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

  puca() {
    this.raketa.pucaCiljano(this, this.ugao)
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

Object.assign(VoziloBocno.prototype, Pucanje)