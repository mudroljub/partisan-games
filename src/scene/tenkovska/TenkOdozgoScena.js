import Scena2D from '/core/Scena2D.js'
import Pozadina from '/core/objects/Pozadina.js'
import VoziloIgracOdozgo from '/core/actor/VoziloIgracOdozgo.js'

export default class TenkOdozgoScena extends Scena2D {
  init() {
    this.pozadina = new Pozadina('slicice/shumarak-pozadina.png')
    this.tenk = new VoziloIgracOdozgo('slicice/tenk-rdjavi.gif', { skalar: .5 })
    this.dodaj(this.tenk)
  }
}
