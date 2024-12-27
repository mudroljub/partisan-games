import VoziloIgracOdozgo from '../2d-odozgo/VoziloIgracOdozgo.js'

const JACINA_STRUJE = 0.1

export default class CamacIgracOdozgo extends VoziloIgracOdozgo {

  constructor(src = '/assets/slike/2d-odozgo/camac.png', sirina = 100, visina = 50) {
    super(src, sirina, visina)
    this.potisak = 0.8
  }

  update() {
    super.update()
    this.dodajStruju()
  }

  dodajStruju() {
    if (this.x > this.sirina) this.dodajSilu(JACINA_STRUJE, Math.PI)
  }

}
