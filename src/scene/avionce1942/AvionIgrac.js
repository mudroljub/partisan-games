import * as $ from 'konstante'
import tipke from 'io/tipke'
import Igrac from 'core/Igrac'
import Raketa from './Raketa'
import { ogranici } from 'akcije/granice'

const OKRET = 0.01
const DOZVOLJEN_UGAO = 0.066
const GRAVITACIJA = 0.3

export default class AvionIgrac extends Igrac {
  constructor(nivoTla, src = '/assets/slike/2d-bocno/partizani/potez-25.png', sirina = 200, visina = 87) {
    super(src, sirina, visina)
    this.brzina = 0
    this.granice = ogranici
    this.nivoTla = nivoTla
    this.oznake.add('igrac')
    this.raketa = new Raketa(this)
    this.zapaljiv = true
    this.neprijatelji = []
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
    if (tipke.stisnute[$.ENTER] && !this.raketa.ispaljena)
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
    console.log(tipke.ukupnoStisnutih())
    if (tipke.ukupnoStisnutih()) return
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
    this.neprijatelji.forEach(neprijatelj => {
      if (this.sudara(neprijatelj)) {
        this.umri()
        neprijatelj.umri()
      }
    })
  }
}
