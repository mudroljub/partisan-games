import VoziloIgracOdozgo from '../2d-odozgo/VoziloIgracOdozgo.js'
import platno from '/game-engine/io/platno.js'

const JACINA_STRUJE = 6

export default class CamacIgracOdozgo extends VoziloIgracOdozgo {
  constructor(src = '2d-odozgo/camac.png') {
    super(src, { skalar: .5 })
    this.potisak = 50
    this.faktorTrenja = 0.15
  }

  nadole() {}

  proveriGranice() {
    const ofset = 75
    if (this.y < 0 + ofset || this.y > platno.height - ofset) {
      this.skreni(2 * Math.PI - this.ugao)
      this.dodajSilu(5)
    }
    this.ograniciVodoravno()
  }

  dodajStruju() {
    if (this.x > this.sirina) this.dodajSilu(JACINA_STRUJE, Math.PI)
  }

  update(dt) {
    super.update(dt)
    this.dodajStruju()
  }
}
