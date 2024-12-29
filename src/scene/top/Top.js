import { keyboard } from '/game-engine/io/Keyboard.js'
import Slika from '/game-engine/core/Slika.js'
import Projektil from './Projektil.js'

const MIN_UGAO = -0.02
const MAX_UGAO = -0.6

export default class Top {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.sila = this.minSila = 700
    this.postolje = new Slika('/assets/slike/2d-bocno/top-postolje.gif', { x: this.x, y: this.y, skalar: .75 })
    this.cev = new Slika('/assets/slike/2d-bocno/top-cev.gif', { x: this.x + 40, y: this.y - 32, skalar: .75 })
    this.cev.ugao = -0.2
    this.projektil = new Projektil()
  }

  puca() {
    this.projektil.puca(this.sila, this.cev.ugao)
    this.sila = this.minSila
  }

  /* UNOS */

  proveriTipke(dt) {
    if (!this.projektil.ispaljen && keyboard.space)
      this.sila += 10
    else if (this.sila > this.minSila)
      this.puca()

    if (keyboard.up) this.cev.ugao = Math.max(this.cev.ugao - 0.5 * dt, MAX_UGAO)
    if (keyboard.down) this.cev.ugao = Math.min(this.cev.ugao + 0.5 * dt, MIN_UGAO)
  }

  pozicionirajProjektil() {
    const poluprecnik = this.cev.sirina * 0.5
    this.projektil.x = this.cev.x + poluprecnik * Math.cos(-this.cev.ugao)
    this.projektil.y = this.cev.y - poluprecnik * Math.sin(-this.cev.ugao) + 8
  }

  update(dt) {
    this.proveriTipke(dt)
    this.postolje.crta()
    this.cev.crta()
    if (!this.projektil.ispaljen) this.pozicionirajProjektil()
    this.projektil.update(dt)
  }
}
