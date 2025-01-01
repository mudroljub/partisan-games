import Igrac from '/game-engine/core/Igrac.js'
import Granata from './Granata.js'

export default class VoziloIgracOdozgo extends Igrac {

  constructor(src, sirina, visina) {
    super(src, sirina, visina)
    this.potisak = 2
    this.prohodnost = 0.85
    this.granata = new Granata(this)
    this.komandeNapredne = true
    this.granice = this.odbij
  }

  update() {
    super.update()
    this.granata.update()
  }

  puca() {
    this.granata.puca()
  }
}
