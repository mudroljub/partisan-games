import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'
import Vreme from '/game-engine/core/Vreme.js'
import Predmet from '/game-engine/core/Predmet.js'
import Cev from './Cev.js'
import Granata from './Granata.js'

const statickoTrenje = 0.3
const kinetickoTrenje = 0.1
const vremePunjenja = 1000

export default class Tenk extends Predmet {
  constructor(src = '/assets/slike/2d-bocno/partizanski-tenk-bez-cevi.png', skalar) {
    super(src, { skalar })
    this.potisak = 25
    this.cev = new Cev(this, '/assets/slike/2d-bocno/partizanski-tenk-cev.png', skalar)
    this.vreme = new Vreme()
    this.x = Math.random() * platno.width * 0.3
    this.ime = 'Partizanski tenk'
    this.spremno = false
    this.granate = this.praviGranate()
    this.energija = 100
    this.zapaljiv = true
    this.zapaljivost = 20
    this.predmeti = [this.cev, ...this.granate]
  }

  get zapaljen() {
    return this.energija <= this.zapaljivost
  }

  praviGranate(length = 10) {
    return Array.from({ length }, () => new Granata(this.cev))
  }

  skiniEnergiju(steta) {
    this.energija -= steta
    if (this.energija <= 0) this.energija = 0
  }

  proveriSmrt() {
    if (this.energija <= 0) this.umri()
  }

  proveriPogodak(predmet) {
    this.granate
      .filter(granata => granata.ispaljena)
      .forEach(granata => granata.proveriPogodak(predmet))
  }

  proveriPucanje(key = 'space') {
    if (keyboard[key]) this.spremno = true
    if (this.spremno && !keyboard[key]) {
      this.pucaj()
      this.spremno = false
    }
  }

  proveriTipke() {
    if (this.mrtav) return

    if (keyboard.pressed.KeyA && this.x > 0)
      this.dodajSilu(this.potisak * 0.6, Math.PI)
    if (keyboard.pressed.KeyD && this.x < platno.width / 2)
      this.dodajSilu(this.potisak, 0)
    if (keyboard.pressed.KeyW)
      this.cev.nagore()
    if (keyboard.pressed.KeyS)
      this.cev.nadole()

    this.proveriPucanje()
  }

  proveriGranice() {
    if (this.x < 0) this.x = 0
    if (this.x > platno.width / 2) this.x = platno.width / 2
  }

  pucaj() {
    if (this.vreme.proteklo < vremePunjenja || !this.granate.length) return

    const granata = this.granate.find(g => !g.ispaljena)
    if (!granata) return

    granata.pucaj()
    this.trzaj()
    this.vreme.reset()
  }

  trzaj() {
    this.dodajSilu(this.potisak, this.ugao + Math.PI)
  }

  update(dt) {
    super.update(dt)
    this.trenje(this.brzina > 0.1 ? kinetickoTrenje : statickoTrenje)
    this.proveriSmrt()
  }
}
