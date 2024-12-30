import { keyboard } from '/game-engine/io/Keyboard.js'
import TopPostolje from './TopPostolje.js'
import TopCev from './TopCev.js'

const MIN_UGAO = -0.02
const MAX_UGAO = -0.6

export default class Top {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.postolje = new TopPostolje(0, 0)
    this.cev = new TopCev(this.x + 40, this.y - 32)
    this.predmeti = []
    this.dodaj(this.postolje)
  }

  get sila() {
    return this.cev.sila
  }

  dodaj(...premeti) {
    for (const predmet of premeti) {
      predmet.parent = this
      this.predmeti.push(predmet)
    }
  }

  proveriTipke(dt) {
    if (!this.cev.projektil.ispaljen && keyboard.space)
      this.cev.sila += 10
    else if (this.cev.sila > this.cev.minSila)
      this.cev.pali()

    if (keyboard.up) this.cev.ugao = Math.max(this.cev.ugao - 0.5 * dt, MAX_UGAO)
    if (keyboard.down) this.cev.ugao = Math.min(this.cev.ugao + 0.5 * dt, MIN_UGAO)
  }

  update(dt) {
    this.proveriTipke(dt)
    this.cev.render()
    this.cev.projektil.update(dt)
  }
}
