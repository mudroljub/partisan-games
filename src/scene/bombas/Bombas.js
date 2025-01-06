import Igrac from '/game-engine/core/Igrac.js'

export default class Bombas extends Igrac {

  constructor() {
    super('/assets/slike/2d-bocno/partizani/vojnici/bombasi/partizan-bombas.gif')
    this.potisak = 75
    this.faktorTrenja = 0.3
    this.polozaj(100, 100)
  }

  puca() {
    console.log('bacaBombu')
  }

  reset() {
    this.polozaj(Math.random() * 800, Math.random() * 600)
    this.brzina = 0
  }
}
