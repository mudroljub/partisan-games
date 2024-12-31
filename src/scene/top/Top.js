import { keyboard } from '/game-engine/io/Keyboard.js'
import Kompozit from '/game-engine/core/Kompozit.js'
import TopPostolje from './TopPostolje.js'
import TopCev from './TopCev.js'
import Posada from './Posada.js'

const skalar = .75

export default class Top extends Kompozit {
  constructor(x, y) {
    super(x, y)
    this.pocetniX = x
    this.sila = this.minSila = 800

    this.cev = new TopCev(40, -32, skalar)
    const postolje = new TopPostolje(0, 0, skalar)
    this.posada = new Posada(-80, 8)
    this.dodaj(this.cev, postolje, this.posada)
  }

  trza() {
    this.x -= 5
    this.posada.trza()
  }

  pali() {
    this.cev.pali(this.sila)
    this.trza()
    this.sila = this.minSila
  }

  proveriTipke() {
    if (keyboard.space)
      this.posada.puni = true

    if (keyboard.space && this.cev.spremno)
      this.sila += 10
    else if (this.sila > this.minSila)
      this.pali()
  }

  update(dt) {
    this.proveriTipke(dt)
    if (this.x < this.pocetniX) this.x += 20 * dt
  }
}
