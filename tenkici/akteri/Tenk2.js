import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'
import Vreme from '/game-engine/core/Vreme.js'
import Tenk from './Tenk.js'
import Cev2 from './Cev2.js'
import stanje from '../stanje.js'
import { gravitacija } from '../konstante.js'

const vremePunjenja = 1500
let pripremi = false

const vremeGasa = new Vreme()
const vremeSmera = new Vreme()
const vremePucanja = new Vreme()

export default class Tenk2 extends Tenk {

  constructor(skalar) {
    super('/assets/slike/2d-bocno/nemacki-tenk-bez-cevi.png', skalar)
    this.napred = Math.PI
    this.nazad = 0
    this.cev = new Cev2(this, '/assets/slike/2d-bocno/nemacki-tenk-cev.png', skalar)
    this.ime = 'Desni tenk'
    this.init()
  }

  init() {
    this.ugao = Math.PI
    this.x = platno.width - Math.random() * platno.width * 0.3 - 100
    this.granate = []
    this.praviGranate()
    this.energija = 100
    this.ziv = true
  }

  automatuj(predmet) {
    if (this.mrtav) return
    this.mrdajNasumicno()
    this.ograniciPolozaj()
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
      this.dodajSilu((random * this.potisak))
      vremeGasa.reset()
    }
    if (vremeSmera.proteklo > 300) {
      this.ugao = random > 0.55 ? this.nazad : this.napred
      vremeSmera.reset()
    }
    if (this.x > platno.width * 0.9) this.ugao = this.napred
    if (this.x < platno.width / 2) this.ugao = this.nazad
  }

  ograniciPolozaj() {
    if (this.x < platno.width / 2) this.x = platno.width / 2
    if (this.x > platno.width) this.x = platno.width
  }

  pucajNasumicno() {
    if (vremePucanja.proteklo < vremePunjenja) return
    this.pucaj()
    vremePucanja.reset()
  }

  proveriTipke() {
    if (this.mrtav || !stanje.dvaIgraca) return
    if (keyboard.pressed.ArrowLeft && this.x > platno.width / 2) this.dodajSilu(this.potisak, this.napred)
    if (keyboard.pressed.ArrowRight && this.x < platno.width) this.dodajSilu(this.potisak * 0.6, this.nazad)
    if (keyboard.pressed.ArrowUp) this.cev.nagore()
    if (keyboard.pressed.ArrowDown) this.cev.nadole()

    if (keyboard.space) pripremi = true
    if (pripremi && !keyboard.space) {
      this.pucaj()
      pripremi = false
    }
    this.ograniciPolozaj()
  }

  trzaj() {
    this.dodajSilu(this.potisak, this.nazad)
  }
}
