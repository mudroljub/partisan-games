// scena kao velika mapa lavirint
// kretanje u svim pravcima, kamera prati igraca
// razlicite podloge ubrzavaju/usporavaju tenk
// pobeda/poraz - prepreke ili vreme

import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import { TenkIgracOdozgo } from './TenkIgracOdozgo.js'

export default class TenkOdozgoScena extends Scena {
  constructor(...args) {
    super(...args)
    this.pozadina = new Pozadina('/assets/slike/2d-odozgo/shumarak-pozadina.png')
    this.tenk = new TenkIgracOdozgo()
  }

  update() {
    this.pozadina.update()
    this.tenk.update()
  }
}
