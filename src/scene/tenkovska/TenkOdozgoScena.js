import Scena2D from '/core/actor/Scena2D.js'
import Pozadina from '/core/actor/Pozadina.js'
import VoziloIgracOdozgo from '/src/klase/VoziloIgracOdozgo.js'

export default class TenkOdozgoScena extends Scena2D {
  init() {
    this.pozadina = new Pozadina('2d-odozgo/shumarak-pozadina.png')
    this.tenk = new VoziloIgracOdozgo('2d-odozgo/tenk-rdjavi.gif', { skalar: .5 })
    this.dodaj(this.tenk)
  }
}
