import Predmet from '/game-engine/core/Predmet.js'
import { keyboard } from '/game-engine/io/Keyboard.js'

export default class Posada extends Predmet {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/partizani/artiljerija/posada-01.png', { x, y })
    this.pocetniX = x
    this.maxX = x + 10
  }

  proveriTipke(dt) {
    if (keyboard.space)
      this.x = Math.min(this.x + 20 * dt, this.maxX)
    else
      this.x = this.pocetniX
  }

  update(dt, t) {
    this.x += Math.sin(t) * dt
  }
}