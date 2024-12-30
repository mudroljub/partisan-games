import { keyboard } from '/game-engine/io/Keyboard.js'
import Projektil from './Projektil.js'
import TopPostolje from './TopPostolje.js'
import TopCev from './TopCev.js'

const MIN_UGAO = -0.02
const MAX_UGAO = -0.6

export default class Top {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.sila = this.minSila = 800
    this.postolje = new TopPostolje(0, 0)
    this.cev = new TopCev(this.x + 40, this.y - 32)
    this.projektil = new Projektil()
    this.predmeti = []
    this.dodaj(this.postolje)
  }

  dodaj(...premeti) {
    for (const predmet of premeti) {
      predmet.parent = this
      this.predmeti.push(predmet)
    }
  }

  pripremi() {
    this.projektil.x = this.cev.vrhX
    this.projektil.y = this.cev.vrhY
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
    this.cev.render()
    this.projektil.update(dt)
  }
}
