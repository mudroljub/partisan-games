import Scena from '/game-engine/core/Scena.js'
import CamacIgracOdozgo from '../klase/CamacIgracOdozgo.js'
import Obala from './Obala.js'

export default class CamacScena extends Scena {
  init() {
    this.camac = new CamacIgracOdozgo()
    this.obala = new Obala()
    this.dodaj(this.obala, this.camac)
    this.poslednjiX = this.camac.x
    this.bojaPozadine = '#000066'
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
