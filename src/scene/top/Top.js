import TopPostolje from './TopPostolje.js'
import TopCev from './TopCev.js'

export default class Top {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.postolje = new TopPostolje(0, 0)
    this.cev = new TopCev(this.x + 40, this.y - 32)
    this.predmeti = []
    this.dodaj(this.postolje)
  }

  get sila() {
    return this.cev.sila
  }

  dodaj(...premeti) {
    for (const predmet of premeti) {
      predmet.parent = this
      this.predmeti.push(predmet)
    }
  }

  update(dt) {
    this.cev.proveriTipke(dt)
    this.cev.render()
    this.cev.projektil.update(dt)
  }
}
