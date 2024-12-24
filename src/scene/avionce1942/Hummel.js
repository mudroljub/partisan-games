import VoziloBocno from './VoziloBocno'
import Raketa from './Raketa'
import slikaHummel from 'slike/2d-bocno/hummel.png'
import slikaMrtav from 'slike/2d-bocno/unisten-tenk-gori.png'

const SANSA_PUCNJA = 0.01

export default class Hummel extends VoziloBocno {

  constructor(nivoTla) {
    super(nivoTla, slikaHummel, 150, 70)
    this.slikaMrtav = slikaMrtav
    this.oznake.neprijatelj = true
    this.raketa = new Raketa(this)
    this.raketa.cilj = 'igrac'
  }

  update() {
    super.update()
    // this.povremenoPuca()
    this.raketa.update()
  }

  povremenoPuca() {
    if (!this.ziv) return
    if (Math.random() < SANSA_PUCNJA) this.puca()
  }

  puca() {
    this.raketa.pucaPratecu()
  }

}
