import VoziloBocno from '/game-engine/core/VoziloBocno.js'

export default class Tenk extends VoziloBocno {
  constructor(nivoTla) {
    super(nivoTla, '/assets/slike/2d-bocno/nemci/tenkovi/panzer3-l60.png', 150, 70)
  }

  update(dt) {
    super.update(dt)
    this.patroliraj()
    // this.povremenoPucaPratecu(dt)
  }
}
