import { keyboard } from '/game-engine/io/Keyboard.js'
import Slika from '/game-engine/core/Slika.js'
import Projektil from './Projektil.js'

const MIN_UGAO = -0.02
const MAX_UGAO = -0.7
const MIN_SILA = 300

export default class Top {

  constructor(x, y) {
    this.x = x
    this.y = y
    this.sila = MIN_SILA
    this.postolje = new Slika('/assets/slike/2d-bocno/top-postolje.gif', this.x, this.y, .75)
    this.cev = new Slika('/assets/slike/2d-bocno/top-cev.gif', this.x + 30, this.y - 30, .75)
    this.cev.ugao = -0.2
    this.projektil = new Projektil(this.cev)
  }

  puca() {
    this.projektil.puca(this.sila, this.cev.ugao)
    this.sila = MIN_SILA
  }

  /* UNOS */

  proveriTipke(dt) {
    if (!this.projektil.ispaljen && keyboard.space)
      this.sila += 10
    else if (this.sila > MIN_SILA)
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
