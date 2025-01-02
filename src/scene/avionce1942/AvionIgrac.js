import { keyboard } from '/game-engine/io/Keyboard.js'
import Igrac from '/game-engine/core/Igrac.js'
import Raketa from './Raketa.js'

const OKRET = 0.01
const DOZVOLJEN_UGAO = 0.066
const GRAVITACIJA = 0.3

export default class AvionIgrac extends Igrac {
  constructor(nivoTla, src = '/assets/slike/2d-bocno/partizani/potez-25.png', sirina = 200, visina = 87) {
    super(src, sirina, visina)
    this.brzina = 0
    this.granice = this.ogranici
    this.nivoTla = nivoTla
    this.oznake.add('igrac')
    this.raketa = new Raketa(this)
    this.zapaljiv = true
  }

  update() {
    super.update()
    this.proveriTlo()
    this.proveriSudare()
    this.proveriGranice()
    this.proveriGravitaciju()
    this.ispraviAvion()
    this.raketa.update()
  }

  /** * KOMANDE ***/

  proveriTipke() {
    super.proveriTipke()
    if (keyboard.pressed.Enter && !this.raketa.ispaljena)
      this.raketa.pucaPratecu()
  }

  nalevo() {
    if (!this.jePrizemljen()) super.nalevo()
  }

  nagore() {
    super.nagore()
    if (!this.jeNaVrhu() && this.ugao >= -DOZVOLJEN_UGAO) this.ugao -= OKRET
  }

  nadole() {
    super.nadole()
    if (!this.jePrizemljen() && this.ugao <= DOZVOLJEN_UGAO) this.ugao += OKRET
  }

  puca() {
    if (!this.raketa.ispaljena)
      this.raketa.puca()
  }

  /** * OSTALO ***/

  ispraviAvion() {
    if (keyboard.keyPressed) return
    if (this.ugao > 0) this.ugao -= OKRET
    if (this.ugao < 0) this.ugao += OKRET
  }

  jeNaVrhu() {
    return this.y <= this.visina / 2
  }

  jePrizemljen() {
    return this.y + this.visina / 2 >= this.nivoTla
  }

  proveriTlo() {
    if (!this.jePrizemljen()) return
    if (this.ugao > DOZVOLJEN_UGAO / 2) return this.umri()
  }

  proveriGravitaciju() {
    if (!this.jePrizemljen()) this.y += GRAVITACIJA
    if (this.mrtav && !this.jePrizemljen()) this.y += GRAVITACIJA * 70
  }

  proveriSudare() {
    this.cvrstaTela.forEach(predmet => {
      if (this.sudara(predmet)) {
        this.umri()
        predmet.umri()
      }
    })
  }
}
