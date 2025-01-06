import Predmet from '/game-engine/core/Predmet.js'
import Zastava from '/game-engine/utils/Zastava.js'

export default class Zastavnik extends Predmet {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/partizani/vojnici/savo.png', { x, y })
    this.zastava = new Zastava({ x: this.x - 14, y: this.y - 130 })
  }

  render(dt, t) {
    super.render()
    this.zastava.render(dt, t)
  }

  update(dt, t) {
    this.y += Math.cos(t * 4) * dt
  }
}