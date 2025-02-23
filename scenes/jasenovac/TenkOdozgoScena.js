import Scena2D from '/core/Scena2D.js'
import Pozadina from '/core/objects/Pozadina.js'
import VoziloIgracOdozgo from '/core/actor/VoziloIgracOdozgo.js'

export default class TenkOdozgoScena extends Scena2D {
  init() {
    this.pozadina = new Pozadina('armies/shumarak-pozadina.png')
    this.player = new VoziloIgracOdozgo('armies/tenk-rdjavi.gif', { skalar: .5 })
    this.add(this.player)
  }
}
