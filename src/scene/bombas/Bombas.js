import Igrac from '/game-engine/core/Igrac.js'

export default class Bombas extends Igrac {

  constructor({ x = 100, y = 100 } = {}) {
    super('/assets/slike/2d-bocno/partizani/vojnici/bombasi/partizan-bombas.gif', { x, y })
    this.potisak = 75
    this.faktorTrenja = 0.3
  }

  puca() {
    console.log('bacaBombu')
  }

  reset() {
    this.polozaj(Math.random() * 800, Math.random() * 600)
    this.brzina = 0
  }
}
