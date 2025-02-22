import Predmet from '/core/actor/Predmet.js'

export default class TenkOdozgo extends Predmet {
  constructor(x = 100, y = 200) {
    super('armies/tenk-rdjavi.gif', { x, y, skalar: .5 })
    this.zvuk = new Audio('/assets/sounds/zvuk-tenka.mp3')
    this.dodajSilu(66, 0)
  }

  patroliraj() {
    if (this.x > 600) this.skreni(Math.PI)
    if (this.x < 150) this.skreni(0)
  }
}
