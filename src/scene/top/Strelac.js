import Slika from '/game-engine/core/Slika.js'

export default class Strelac extends Slika {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/partizani/vojnici/partizan-30.png', { x, y })
    this.pocetniX = x
    this.ucestalost = 3
    this.poslednje = 0
  }

  trza() {
    this.x -= 5
  }

  update(dt, proteklo) {
    if (this.x < this.pocetniX) this.x += 20 * dt

    if (proteklo >= this.ucestalost + this.poslednje) {
      this.trza()
      this.poslednje = proteklo
    }
  }
}