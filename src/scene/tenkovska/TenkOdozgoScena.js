import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import VoziloIgracOdozgo from '/src/klase/VoziloIgracOdozgo.js'

export default class TenkOdozgoScena extends Scena {
  init() {
    this.pozadina = new Pozadina('2d-odozgo/shumarak-pozadina.png')
    this.tenk = new VoziloIgracOdozgo('2d-odozgo/tenk-rdjavi.gif', { skalar: .5 })
    this.dodaj(this.tenk)
  }
}
