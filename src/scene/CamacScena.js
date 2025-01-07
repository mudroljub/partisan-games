import Scena from '/game-engine/core/Scena.js'
import CamacIgracOdozgo from '../2d-odozgo/CamacIgracOdozgo.js'

export default class CamacScena extends Scena {
  init() {
    this.bojaPozadine = '#000066'
    const camac = new CamacIgracOdozgo()
    this.dodaj(camac)
  }
}
