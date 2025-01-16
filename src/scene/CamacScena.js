import Scena from '/game-engine/core/Scena.js'
import CamacIgracOdozgo from '../2d-odozgo/CamacIgracOdozgo.js'
import Obala from './Obala.js'

export default class CamacScena extends Scena {
  init() {
    this.bojaPozadine = '#000066'
    const camac = new CamacIgracOdozgo()
    this.obala = new Obala()
    this.dodaj(this.obala, camac)
  }
}
