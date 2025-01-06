import VoziloIgracOdozgo from '../2d-odozgo/VoziloIgracOdozgo.js'

const JACINA_STRUJE = 6

export default class CamacIgracOdozgo extends VoziloIgracOdozgo {

  constructor(src = '/assets/slike/2d-odozgo/camac.png') {
    super(src, { skalar: .5 })
    this.potisak = 50
    this.faktorTrenja = 0.15
  }

  dodajStruju() {
    if (this.x > this.sirina) this.dodajSilu(JACINA_STRUJE, Math.PI)
  }

  update(dt) {
    super.update(dt)
    this.dodajStruju()
  }
}
