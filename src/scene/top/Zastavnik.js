import Slika from '/game-engine/core/Slika.js'

export default class Zastavnik extends Slika {
  constructor(x, y) {
    // /assets/slike/2d-bocno/partizani/zastava.gif
    super('/assets/slike/2d-bocno/partizani/vojnici/savo.png', { x, y })
  }

  update(dt, proteklo) {
    this.y += Math.cos(proteklo) * dt
  }
}