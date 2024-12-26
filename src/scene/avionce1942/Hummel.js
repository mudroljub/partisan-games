import VoziloBocno from './VoziloBocno'
import Raketa from './Raketa'

const SANSA_PUCNJA = 0.01

export default class Hummel extends VoziloBocno {
  constructor(nivoTla) {
    super(nivoTla, '/assets/slike/2d-bocno/hummel.png', 150, 70)
    this.slikaMrtav = '/assets/slike/2d-bocno/unisten-tenk-gori.png'
    this.oznake.add('neprijatelj')
    this.raketa = new Raketa(this)
    this.raketa.cilj = 'igrac'
    this.neprijatelji = []
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
