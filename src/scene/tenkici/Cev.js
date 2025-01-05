import Predmet from '/game-engine/core/Predmet.js'

export default class Cev extends Predmet {
  constructor(vlasnik, src, skalar) {
    super(src, { skalar })
    this.vlasnik = vlasnik
    this.ugao = Math.PI + Math.PI * 0.9
    this.centrirano = false
  }

  update() {
    this.pratiTenk()
  }

  pratiTenk() {
    this.x = this.vlasnik.x * 1.01
    this.y = this.vlasnik.y - this.vlasnik.visina * 0.33
  }

  nagore() {
    if (this.ugao > Math.PI && this.ugao < Math.PI * 1.8) return
    this.ugao -= 0.01
  }

  nadole() {
    if (this.ugao < Math.PI) return
    this.ugao += 0.01
  }
}
