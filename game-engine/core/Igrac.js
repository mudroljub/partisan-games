import { KRUZNICA } from '/game-engine/konstante.js'
import { keyboard } from '/game-engine/io/Keyboard.js'
import Predmet from './Predmet.js'

const OKRET = 0.087

export default class Igrac extends Predmet {
  constructor(src, { sirina, visina, skalar } = {}) {
    super(src, { sirina, visina, skalar })
    this.oznake.add('igrac')
    this.potisak = 31
    this.prohodnost = 0.9
    this.komandeNapredne = false // da se okreće oko svoje ose
    this.neprijatelji = []
    this.cvrstaTela = []
  }

  proveriTipke() {
    if (!this.ziv || !(this.oznake.has('igrac'))) return
    if (keyboard.left) this.nalevo()
    if (keyboard.right) this.nadesno()
    if (keyboard.up) this.nagore()
    if (keyboard.down) this.nadole()
    if (keyboard.space) this.puca()
  }

  nalevo() {
    if (this.komandeNapredne)
      this.ugao -= OKRET
    else
      this.dodajSilu(this.potisak, KRUZNICA / 2)
  }

  nadesno() {
    if (this.komandeNapredne)
      this.ugao += OKRET
    else
      this.dodajSilu(this.potisak, 0)
  }

  nagore() {
    const ugao = this.komandeNapredne ? this.ugao : -KRUZNICA / 4
    this.dodajSilu(this.potisak, ugao)
  }

  nadole() {
    const ugao = this.komandeNapredne ? this.ugao : KRUZNICA / 4
    const potisak = this.komandeNapredne ? (-this.potisak / 10) : this.potisak
    this.dodajSilu(potisak, ugao)
  }

  puca() {
    console.log('puca')
  }

  praviTrenje() {
    this.dx *= this.prohodnost
    this.dy *= this.prohodnost
  }

  update(dt) {
    super.update(dt)
    this.proveriTipke()
    this.praviTrenje()
  }
}
