import { KRUZNICA } from '/game-engine/konstante.js'
import { keyboard } from '/game-engine/io/Keyboard.js'
import Predmet from './Predmet.js'

export default class Igrac extends Predmet {
  constructor(src, params = {}) {
    super(src, params)
    this.oznake.add('igrac')
    this.potisak = 31
    this.komandeNapredne = false // da se okreće oko svoje ose
    this.cvrstaTela = []
    this.okret = 0.047
    this.faktorTrenja = .1
  }

  proveriTipke() {
    if (keyboard.left) this.nalevo()
    if (keyboard.right) this.nadesno()
    if (keyboard.up) this.nagore()
    if (keyboard.down) this.nadole()
    if (keyboard.space) this.puca()
  }

  nalevo() {
    if (this.komandeNapredne)
      this.ugao -= this.okret
    else
      this.dodajSilu(this.potisak, KRUZNICA / 2)
  }

  nadesno() {
    if (this.komandeNapredne)
      this.ugao += this.okret
    else
      this.dodajSilu(this.potisak, 0)
  }

  nagore() {
    const ugao = this.komandeNapredne ? this.ugao : -KRUZNICA / 4
    this.dodajSilu(this.potisak, ugao)
  }

  nadole() {
    const ugao = this.komandeNapredne ? this.ugao : KRUZNICA / 4
    const potisak = this.komandeNapredne ? (-this.potisak / 2) : this.potisak
    this.dodajSilu(potisak, ugao)
  }

  puca() {
    console.log('puca')
  }

  update(dt) {
    super.update(dt)
    this.trenje(this.faktorTrenja)
  }
}
