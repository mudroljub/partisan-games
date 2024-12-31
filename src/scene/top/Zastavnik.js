import Slika from '/game-engine/core/Slika.js'
import Zastava from '/game-engine/utils/Zastava.js'

export default class Zastavnik extends Slika {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/partizani/vojnici/savo.png', { x, y })
    this.zastava = new Zastava({ x: this.x - 14, y: this.y - 130 })
  }

  update(dt, t) {
    this.y += Math.cos(t * 4) * dt
    this.zastava.render(dt, t)
  }
}