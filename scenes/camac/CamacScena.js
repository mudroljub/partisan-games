import Scena2D from '/core/Scena2D.js'
import CamacIgracOdozgo from '/core/actor/CamacIgracOdozgo.js'
import Obala from './Obala.js'

export default class CamacScena extends Scena2D {
  init() {
    this.camac = new CamacIgracOdozgo()
    this.obala = new Obala()
    this.dodaj(this.obala, this.camac)
    this.poslednjiX = this.camac.x
    this.bojaPozadine = 0x000066
  }

  update(dt, t) {
    super.update(dt, t)
    if (this.camac.x > this.poslednjiX + 25) {
      this.obala.napred()
      this.poslednjiX = this.camac.x
    }
    if (this.camac.x + 25 < this.poslednjiX) {
      this.obala.nazad()
      this.poslednjiX = this.camac.x
    }
  }
}
