import Slika from '/game-engine/core/Slika.js'
import { drawFlag } from '/game-engine/utils/zastava.js'

export default class Zastavnik extends Slika {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/partizani/vojnici/savo.png', { x, y })
  }

  update(dt, proteklo) {
    this.y += Math.cos(proteklo) * dt
    drawFlag(dt, { zastavaY: this.y - 150 })
  }
}