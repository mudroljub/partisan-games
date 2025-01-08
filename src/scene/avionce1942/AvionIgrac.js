import { keyboard } from '/game-engine/io/Keyboard.js'
import Igrac from '/game-engine/core/Igrac.js'
import Raketa from '/game-engine/core/Raketa.js'

const OKRET = 0.01
const MOGUCNOST_OKRETA = 0.066
const gravitacija = 3

export default class AvionIgrac extends Igrac {
  constructor(nivoTla, src = '/assets/slike/2d-bocno/partizani/potez-25.png') {
    super(src, { skalar: .55, zapaljiv: true })
    this.brzina = 0
    this.nivoTla = nivoTla
    this.oznake.add('igrac')
    this.raketa = new Raketa()
    this.predmeti = [this.raketa]
  }

  proveriGranice() {
    this.ogranici()
  }

  /** * KOMANDE ***/

  proveriTipke() {
    super.proveriTipke()
    if (keyboard.pressed.Enter && !this.raketa.ispaljena)
      this.raketa.pucaCiljano(this, this.ugao)
  }

  nalevo() {
    if (!this.jePrizemljen()) super.nalevo()
  }

  nagore() {
    if (this.jeNaVrhu()) return

    super.nagore()
    if (this.ugao === 0 || this.ugao >= 2 * Math.PI - MOGUCNOST_OKRETA)
      this.ugao -= OKRET
  }

  nadole() {
    if (this.jePrizemljen()) return

    super.nadole()
    if (this.ugao <= MOGUCNOST_OKRETA)
      this.ugao += OKRET
  }

  puca() {
    if (this.raketa.ispaljena) return

    const polozaj = { x: this.x + 5, y: this.y + 15 }
    this.raketa.puca(polozaj, this.ugao + Math.PI / 16)
  }

  /** * OSTALO ***/

  ispraviAvion() {
    if (keyboard.up || keyboard.down || this.ugao === 0) return
    this.ugao += this.ugao < Math.PI ? -OKRET : OKRET
  }

  jeNaVrhu() {
    return this.y <= this.visina / 2
  }

  jePrizemljen() {
    return this.y + this.visina / 2 >= this.nivoTla
  }

  proveriTlo() {
    if (!this.jePrizemljen()) return
    if (this.ugao > MOGUCNOST_OKRETA / 2) return this.umri()
  }

  proveriGravitaciju() {
    if (this.jePrizemljen()) return

    const teza = this.mrtav ? gravitacija * 100 : gravitacija
    this.dodajSilu(teza, Math.PI * .5)
  }

  proveriSudare() {
    this.cvrstaTela.forEach(predmet => {
      if (!this.sudara(predmet)) return
      this.umri()
      predmet.umri()
    })
  }

  update(dt, t) {
    super.update(dt, t)
    this.proveriTlo()
    this.proveriSudare()
    this.proveriGravitaciju()
    this.ispraviAvion()
  }
}
