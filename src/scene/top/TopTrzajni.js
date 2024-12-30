import { keyboard } from '/game-engine/io/Keyboard.js'
import Slika from '/game-engine/core/Slika.js'
import Projektil from './Projektil.js'

const MIN_UGAO = -0.02
const MAX_UGAO = -0.6

/**
 * Kompozitna klasa
 * kada promeni poziciju, da se automatski promeni i deci
 * još bolje, deca imaju getere za računanje pozicije odnosno na roditelja
 */
export default class Top {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.sila = this.minSila = 800
    this.postolje = new Slika('/assets/slike/2d-bocno/top-postolje.gif', { x: this.x, y: this.y, skalar: .75 })
    this.cev = new Slika('/assets/slike/2d-bocno/top-cev.gif', { x: this.x + 40, y: this.y - 32, skalar: .75 })
    this.cev.ugao = -0.2
    this.projektil = new Projektil()

    this.originalX = x
    this.trzaj = false
    this.trzajStart = 0
    this.trzajIntenzitet = -10
    this.trzajTrajanje = 0.5
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

  pali(protekloVreme) {
    this.pripremi()
    this.projektil.pali(this.sila, this.cev.ugao)
    this.sila = this.minSila

    if (!this.trzaj) {
      this.trzaj = true
      this.trzajStart = protekloVreme
      this.originalX = this.x
    }
  }

  proveriTipke(dt, protekloVreme) {
    if (!this.projektil.ispaljen && keyboard.space)
      this.sila += 10
    else if (this.sila > this.minSila)
      this.pali(protekloVreme)

    if (keyboard.up) this.cev.ugao = Math.max(this.cev.ugao - 0.5 * dt, MAX_UGAO)
    if (keyboard.down) this.cev.ugao = Math.min(this.cev.ugao + 0.5 * dt, MIN_UGAO)
  }

  trzajniEfekat(protekloVreme) {
    const progres = (protekloVreme - this.trzajStart) / this.trzajTrajanje
    if (progres >= 1) {
      this.x = this.originalX
      this.trzaj = false
    } else
      this.x = this.originalX + Math.sin(progres * Math.PI) * this.trzajIntenzitet
  }

  update(dt, protekloVreme) {
    this.proveriTipke(dt, protekloVreme)
    this.postolje.render()
    this.cev.render()
    this.projektil.update(dt)

    if (this.trzaj)
      this.trzajniEfekat(protekloVreme)
  }
}
