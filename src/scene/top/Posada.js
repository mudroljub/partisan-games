import Predmet from '/game-engine/core/Predmet.js'
import { keyboard } from '/game-engine/io/Keyboard.js'

export default class Posada extends Predmet {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/partizani/artiljerija/posada-01.png', { x, y })
    this.pocetniX = x
    this.trza()
  }

  trza() {
    this.x -= 10
    this.puni = false
  }

  proveriTipke() {
    if (keyboard.space)
      this.puni = true
  }

  update(dt, t) {
    this.x += Math.sin(t) * dt
    if (this.puni && this.x < this.pocetniX)
      this.x += 20 * dt
  }
}