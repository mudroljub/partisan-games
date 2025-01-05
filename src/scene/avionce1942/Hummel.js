import VoziloBocno from '/game-engine/core/VoziloBocno.js'

export default class Hummel extends VoziloBocno {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/hummel.png', x, y, .75)
  }

  update(dt) {
    super.update(dt)
    // this.povremenoPucaPratecu()
  }
}
