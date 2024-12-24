import * as $ from 'konstante'
import tipke from 'io/tipke'
import Igrac from 'core/Igrac'
import Raketa from './Raketa'
import {ogranici} from 'akcije/granice'
import avionSrc from 'slike/2d-bocno/spitfire.png'
import slikaMrtav from 'slike/2d-bocno/spitfire-gori.png'

const OKRET = 0.01
const DOZVOLJEN_UGAO = 0.066
const GRAVITACIJA = 0.3

export default class AvionIgrac extends Igrac {
  // treba scena zbog pratecih
  constructor(scena, src = avionSrc, sirina = 200, visina = 60) {
    super(src, sirina, visina)
    this.scena = scena
    this.brzina = 0
    this.granice = ogranici
    this.nivoTla = scena.nivoTla
    this.oznake.igrac = true
    this.raketa = new Raketa(this)
    this.slikaMrtav = slikaMrtav
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

  /*** KOMANDE ***/

  proveriTipke() {
    super.proveriTipke()
    if (tipke.stisnute[$.ENTER]) {
      this.raketa.pucaPratecu()
    }
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
    this.raketa.puca()
  }

  /*** OSTALO ***/

  ispraviAvion() {
    if (tipke.stisnute[$.W] || tipke.stisnute[$.S]) return
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
    // this.dodajOtporTla()
  }

  proveriGravitaciju() {
    if (!this.jePrizemljen()) this.y += GRAVITACIJA
    if (this.mrtav && !this.jePrizemljen()) this.y += GRAVITACIJA * 70
  }

  sviOstali(callback) {
    for (const predmet of this.scena.predmeti) {
      if ('igrac' in predmet.oznake || 'raketa' in predmet.oznake) continue
      callback(predmet)
    }
  }

  proveriSudare() {
    this.sviOstali(predmet => {
      if ('neprijatelj' in predmet.oznake && this.sudara(predmet)) {
        this.umri()
        predmet.umri()
      }
    })
  }
}
