import Slika from '/game-engine/core/Slika.js'

export default class Posada extends Slika {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/partizani/artiljerija/posada-01.png', { x, y })
    this.ucestalost = 2
    this.poslednje = 0
    this.napred = true
  }

  update(dt, proteklo) {
    const sekunde = Math.round(proteklo)

    if (sekunde % this.ucestalost === 0 && this.poslednje !== sekunde) {
      this.x += this.napred ? 1 : -1
      this.napred = !this.napred
      this.poslednje = sekunde
    }
  }
}