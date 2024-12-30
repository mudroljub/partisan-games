import Slika from '/game-engine/core/Slika.js'

export default class Posada extends Slika {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/partizani/artiljerija/posada-01.png', { x, y })
    this.ucestalost = 1
    this.poslednje = 0
    this.napred = true
  }

  update(dt, proteklo) {
    this.x += Math.sin(proteklo) * dt
  }
}