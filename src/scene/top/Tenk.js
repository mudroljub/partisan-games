import VoziloBocno from './VoziloBocno.js'

export default class Tenk extends VoziloBocno {
  constructor(nivoTla) {
    super(nivoTla, '/assets/slike/2d-bocno/hummel.png', 150, 70)
  }

  update(dt) {
    super.update(dt)
    // this.povremenoPucaPratecu(dt)
  }
}
