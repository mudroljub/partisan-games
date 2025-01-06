import Predmet from '/game-engine/core/Predmet.js'
import Sprite from '/game-engine/core/Sprite.js'

export default class Zastavnik extends Predmet {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/partizani/vojnici/savo.png', { x, y })
    this.zastava = new Sprite('/assets/slike/sprajtovi/zastava.png', {
      imena: ['vijori'], brojKadrova: 4, x: x + 28, y: y - 76
    })
    this.zastava.pustiAnimaciju('vijori')
  }

  render(dt, t) {
    super.render()
    this.zastava.render(dt, t)
  }

  update(dt, t) {
    this.y += Math.cos(t * 4) * dt
  }
}