import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'
import Vreme from '/game-engine/core/Vreme.js'
import Tenk from './Tenk.js'
import Cev2 from './Cev2.js'
import { gravitacija } from './konstante.js'

const vremePunjenja = 1500

const vremeGasa = new Vreme()
const vremeSmera = new Vreme()
const vremePucanja = new Vreme()

export default class Tenk2 extends Tenk {
  constructor(skalar) {
    super('/assets/slike/2d-bocno/nemacki-tenk-bez-cevi.png', skalar)
    this.cev = new Cev2(this, '/assets/slike/2d-bocno/nemacki-tenk-cev.png', skalar)
    this.x = platno.width - Math.random() * platno.width * 0.3 - 100
    this.ime = 'Nemački tenk'
    this.smer = this.ugao = Math.PI
    this.granate = this.praviGranate()
    this.odrazX = this.odrazY = -1
    this.predmeti = [this.cev, ...this.granate]
  }

  automatuj(predmet) {
    if (this.mrtav) return
    this.mrdajNasumicno()
    if (predmet.mrtav) return
    this.nisani(predmet)
    this.pucajNasumicno()
  }

  nisani(predmet) {
    this.cev.ugao = Math.PI + this.razmakDo(predmet) / (gravitacija * gravitacija * 0.8)
  }

  mrdajNasumicno() {
    const random = Math.random()
    if (vremeGasa.proteklo > 70) {
      this.dodajSilu((random * this.potisak), this.smer)
      vremeGasa.reset()
    }
    if (vremeSmera.proteklo > 300) {
      this.smer = random > 0.55 ? Math.PI : 0
      vremeSmera.reset()
    }
    if (this.x > platno.width * 0.9) this.smer = 0
    if (this.x < platno.width / 2) this.smer = Math.PI
  }

  proveriGranice() {
    if (this.x < platno.width / 2) this.x = platno.width / 2
    if (this.x > platno.width) this.x = platno.width
  }

  pucajNasumicno() {
    if (vremePucanja.proteklo < vremePunjenja) return
    this.pucaj()
    vremePucanja.reset()
  }

  proveriTipke() {
    if (this.mrtav) return

    if (keyboard.pressed.ArrowLeft && this.x > platno.width / 2)
      this.dodajSilu(this.potisak, Math.PI)
    if (keyboard.pressed.ArrowRight && this.x < platno.width)
      this.dodajSilu(this.potisak * 0.6, 0)
    if (keyboard.pressed.ArrowUp)
      this.cev.nagore()
    if (keyboard.pressed.ArrowDown)
      this.cev.nadole()

    this.proveriPucanje('enter')
  }
}
