import { keyboard } from '/game-engine/io/Keyboard.js'
import Predmet from '/game-engine/core/Predmet.js'
import Djule from './Djule.js'

const skalar = .75
const MIN_UGAO = 5.68
const MAX_UGAO = 6.18

export default class Top extends Predmet {
  constructor({ x, y, ciljevi = [] } = {}) {
    super('2d-bocno/top-cev.gif', { x, y, skalar, zapaljiv: true })
    this.postolje = new Predmet('2d-bocno/top-postolje.gif', { x: x - 40, y: y + 32, skalar })
    this.pocetniX = x
    this.ugao = -0.2
    this.energija = 100
    this.sila = this.minSila = 500
    this.projektili = Array.from({ length: 5 }, () => new Djule())
    this.predmeti = [...this.projektili]
    this.ciljevi = ciljevi
  }

  get vrhX() {
    return this.x + this.sirina * 0.5 * Math.cos(-this.ugao)
  }

  get vrhY() {
    return this.y - this.sirina * 0.5 * Math.sin(-this.ugao) + 8
  }

  pali() {
    const projektil = this.projektili.find(p => !p.ispaljen)
    if (!projektil) return

    const pozicija = { x: this.vrhX, y: this.vrhY }
    projektil.pali(pozicija, this.sila, this.ugao)
    this.trza()
    this.sila = this.minSila
  }

  proveriTipke(dt) {
    if (keyboard.space)
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
    super.update(dt)
    if (this.x < this.pocetniX) this.x += 20 * dt
    this.ziv = this.energija > 0
  }

  render() {
    super.render()
    this.postolje.render()
  }
}
