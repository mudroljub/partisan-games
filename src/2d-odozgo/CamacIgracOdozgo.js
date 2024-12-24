import VoziloIgracOdozgo from '../2d-odozgo/VoziloIgracOdozgo'
import slikaCamac from 'slike/2d-odozgo/camac.png'

const JACINA_STRUJE = 0.1

export default class CamacIgracOdozgo extends VoziloIgracOdozgo {

  constructor(src = slikaCamac, sirina = 100, visina = 50) {
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
