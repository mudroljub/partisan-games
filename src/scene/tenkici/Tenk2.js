import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'
import Tenk from './Tenk.js'
import Cev2 from './Cev2.js'

export default class Tenk2 extends Tenk {
  constructor(params) {
    super('/assets/slike/2d-bocno/nemacki-tenk-bez-cevi.png', params)
    this.cev = new Cev2(this, '/assets/slike/2d-bocno/nemacki-tenk-cev.png', params.skalar)
    this.x = platno.width - Math.random() * platno.width * 0.3 - 100
    this.ime = 'Nemački tenk'
    this.smer = this.ugao = Math.PI
    this.granate = this.praviGranate(10, params.callback)
    this.odrazX = this.odrazY = -1
    this.predmeti = [...this.granate]
  }

  proveriGranice() {
    if (this.x < platno.width / 2) this.x = platno.width / 2
    if (this.x > platno.width) this.x = platno.width
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
