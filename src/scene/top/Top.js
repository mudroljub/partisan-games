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

  get vrhCeviX() {
    return this.cev.x + this.cev.sirina * 0.5 * Math.cos(-this.cev.ugao)
  }

  get vrhCeviY() {
    return this.cev.y - this.cev.sirina * 0.5 * Math.sin(-this.cev.ugao) + 8
  }

  pripremi() {
    this.projektil.x = this.vrhCeviX
    this.projektil.y = this.vrhCeviY
  }

  pali() {
    this.pripremi()
    this.projektil.pali(this.sila, this.cev.ugao)
    this.sila = this.minSila
  }

  proveriTipke(dt) {
    if (!this.projektil.ispaljen && keyboard.space)
      this.sila += 10
    else if (this.sila > this.minSila)
      this.pali()

    if (keyboard.up) this.cev.ugao = Math.max(this.cev.ugao - 0.5 * dt, MAX_UGAO)
    if (keyboard.down) this.cev.ugao = Math.min(this.cev.ugao + 0.5 * dt, MIN_UGAO)
  }

  update(dt) {
    this.proveriTipke(dt)
    this.postolje.crta()
    this.cev.crta()
    this.projektil.update(dt)
  }
}
