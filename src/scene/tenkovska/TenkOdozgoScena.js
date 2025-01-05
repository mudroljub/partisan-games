// scena kao velika mapa lavirint
// kretanje po vise ekrana, kamera prati igraca
// razlicite podloge ubrzavaju/usporavaju tenk
// pobeda/poraz - prepreke ili vreme

import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import VoziloIgracOdozgo from '/src/2d-odozgo/VoziloIgracOdozgo.js'

export default class TenkOdozgoScena extends Scena {
  init() {
    this.pozadina = new Pozadina('/assets/slike/2d-odozgo/shumarak-pozadina.png')
    this.tenk = new VoziloIgracOdozgo('/assets/slike/2d-odozgo/tenk-rdjavi.gif', { skalar: .5 })
    this.dodaj(this.tenk)
  }
}
