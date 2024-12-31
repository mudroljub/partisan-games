import Slika from '/game-engine/core/Slika.js'

export default class Posada extends Slika {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/partizani/artiljerija/posada-01.png', { x, y })
    this.pocetniX = x
    this.trza()
  }

  trza() {
    this.x -= 10
    this.puni = false
  }

  update(dt, t) {
    this.x += Math.sin(t) * dt
    if (this.x < this.parent.x + this.pocetniX && this.puni) this.x += 20 * dt
    this.render()
  }
}