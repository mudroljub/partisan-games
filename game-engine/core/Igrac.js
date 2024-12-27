import * as $ from '../konstante.js'
import { keyboard } from '/game-engine/io/Keyboard.js'
import Predmet from './Predmet.js'

const OKRET = 0.087

export default class Igrac extends Predmet {

  constructor(src, sirina, visina) {
    super(src, sirina, visina)
    this.oznake.add('igrac') // naslednik ako ukloni igrac nema tipke
    this.potisak = 0.5
    this.prohodnost = 0.9
    this.komandeNapredne = false // da se okreće oko svoje ose
    this.neprijatelji = []
    this.predmeti = []
  }

  update() {
    super.update()
    this.proveriTipke()
    this.praviTrenje()
  }

  // TODO: trenutno ne radi. popraviti ili brisati
  podesiTipke(tipkaLevo = $.A, tipkaDesno = $.D, tipkaGore = $.W, tipkaDole = $.S, tipkaPucanje = $.RAZMAK) {
    this.tipkaLevo = tipkaLevo
    this.tipkaDesno = tipkaDesno
    this.tipkaGore = tipkaGore
    this.tipkaDole = tipkaDole
    this.tipkaPucanje = tipkaPucanje
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
      this.dodajSilu(this.potisak, $.KRUZNICA / 2)
  }

  nadesno() {
    if (this.komandeNapredne)
      this.ugao += OKRET
    else
      this.dodajSilu(this.potisak, 0)
  }

  nagore() {
    const ugao = this.komandeNapredne ? this.ugao : -$.KRUZNICA / 4
    this.dodajSilu(this.potisak, ugao)
  }

  nadole() {
    const ugao = this.komandeNapredne ? this.ugao : $.KRUZNICA / 4
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
}
