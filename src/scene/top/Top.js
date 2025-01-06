import { keyboard } from '/game-engine/io/Keyboard.js'
import Predmet from '/game-engine/core/Predmet.js'
import Projektil from './Projektil.js'

const skalar = .75
const MIN_UGAO = 5.68
const MAX_UGAO = 6.18

export default class Top extends Predmet {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/top-cev.gif', { x, y, skalar })
    this.postolje = new Predmet('/assets/slike/2d-bocno/top-postolje.gif', { x: x - 40, y: y + 32, skalar })
    this.pocetniX = x
    this.ugao = -0.2
    this.sila = this.minSila = 600
    this.projektil = new Projektil()
    this.predmeti = [this.projektil]
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

  pali() {
    this.pripremi()
    this.projektil.pali(this.sila, this.ugao)
    this.trza()
    this.sila = this.minSila
  }

  proveriTipke(dt) {
    if (keyboard.space && this.spremno)
      this.sila += 10
    else if (this.sila > this.minSila)
      this.pali()

    if (keyboard.up)
      this.ugao = Math.max(this.ugao - 0.5 * dt, MIN_UGAO)
    if (keyboard.down)
      this.ugao = Math.min(this.ugao + 0.5 * dt, MAX_UGAO)
  }

  trza() {
    this.x -= 5
  }

  update(dt) {
    if (this.x < this.pocetniX) this.x += 20 * dt
  }

  render() {
    super.render()
    this.postolje.render()
  }
}
