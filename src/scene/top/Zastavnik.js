import Slika from '/game-engine/core/Slika.js'
import Zastava from '/game-engine/utils/Zastava.js'

export default class Zastavnik extends Slika {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/partizani/vojnici/savo.png', { x, y })
    this.zastava = new Zastava()
  }

  update(dt, proteklo) {
    this.y += Math.cos(proteklo) * dt
    this.zastava.render(dt, { zastavaY: this.y - 150 })
  }
}