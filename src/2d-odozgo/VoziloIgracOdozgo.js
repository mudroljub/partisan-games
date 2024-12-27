import * as $ from '/game-engine/konstante.js'
import Igrac from '/game-engine/core/Igrac.js'
import Granata from './Granata.js'
import { odbij } from '/game-engine/akcije/granice.js'

export default class VoziloIgracOdozgo extends Igrac {

  constructor(src, sirina, visina) {
    super(src, sirina, visina)
    this.potisak = 2
    this.prohodnost = 0.85
    this.granata = new Granata(this)
    this.podesiTipke($.LEVO, $.DESNO, $.GORE, $.DOLE)
    this.komandeNapredne = true
    this.granice = odbij
  }

  update() {
    super.update()
    this.granata.update()
  }

  puca() {
    this.granata.puca()
  }
}
