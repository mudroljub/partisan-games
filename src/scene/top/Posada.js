import Slika from '/game-engine/core/Slika.js'

export default class Posada extends Slika {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/partizani/artiljerija/posada-01.png', { x, y })
  }

  update(dt, t) {
    this.x += Math.sin(t) * dt
  }
}