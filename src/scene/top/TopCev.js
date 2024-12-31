import { keyboard } from '/game-engine/io/Keyboard.js'
import Slika from '/game-engine/core/Slika.js'
import Projektil from './Projektil.js'

const MIN_UGAO = -0.1
const MAX_UGAO = -0.6

export default class TopCev extends Slika {
  constructor(x, y, skalar) {
    super('/assets/slike/2d-bocno/top-cev.gif', { x, y, skalar })
    this.ugao = -0.2
    this.projektil = new Projektil()
    this.predmeti.push(this.projektil)
  }

  get vrhX() {
    return this.x + this.sirina * 0.5 * Math.cos(-this.ugao)
  }

  get vrhY() {
    return this.y - this.sirina * 0.5 * Math.sin(-this.ugao) + 8
  }

  get spremno() {
    return !this.projektil.ispaljen
  }

  pripremi() {
    this.projektil.x = this.vrhX
    this.projektil.y = this.vrhY
  }

  pali(sila) {
    this.pripremi()
    this.projektil.pali(sila, this.ugao)
  }

  proveriTipke(dt) {
    if (keyboard.up) this.ugao = Math.max(this.ugao - 0.5 * dt, MAX_UGAO)
    if (keyboard.down) this.ugao = Math.min(this.ugao + 0.5 * dt, MIN_UGAO)
  }

  update(dt) {
    this.proveriTipke(dt)
  }
}
