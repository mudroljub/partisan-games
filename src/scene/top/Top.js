import TopPostolje from './TopPostolje.js'
import TopCev from './TopCev.js'

const skalar = .75

export default class Top {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.postolje = new TopPostolje(0, 0, skalar)
    this.cev = new TopCev(40, -32, skalar)
    this.predmeti = []
    this.dodaj(this.cev, this.postolje)
  }

  dodaj(...premeti) {
    for (const predmet of premeti) {
      predmet.parent = this
      this.predmeti.push(predmet)
    }
  }
}
