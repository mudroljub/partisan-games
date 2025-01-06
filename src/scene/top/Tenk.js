import VoziloBocno from '/game-engine/core/VoziloBocno.js'

export default class Tenk extends VoziloBocno {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/nemci/tenkovi/panzer3-l60.png', { x, y })
    this.odrazY = -1
  }
}
