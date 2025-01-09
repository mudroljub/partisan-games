import Predmet from '/game-engine/core/Predmet.js'

export default class Cev extends Predmet {
  constructor(vlasnik, src, skalar) {
    super(src, { skalar, ishodiste: 'GORE_LEVO' })
    this.vlasnik = vlasnik
    this.ugao = this.vlasnik.tenkDesno ? Math.PI * 1.1 : Math.PI * 1.9
  }

  pratiTenk() {
    if (this.vlasnik.tenkDesno) {
      this.x = this.vlasnik.x - this.vlasnik.sirina * 0.14
      this.y = this.vlasnik.y - this.vlasnik.visina * 0.2
    } else {
      this.x = this.vlasnik.x * 1.01
      this.y = this.vlasnik.y - this.vlasnik.visina * 0.33
    }
  }

  nagore() {
    if (this.vlasnik.tenkDesno) {
      if (this.ugao <= Math.PI * 1.2) this.ugao += 0.01
    } else
      if (this.ugao <= Math.PI || this.ugao >= Math.PI * 1.8) this.ugao -= 0.01
  }

  nadole() {
    if (this.ugao >= Math.PI)
      this.ugao += this.vlasnik.tenkDesno ? -0.01 : 0.01
  }

  update() {
    this.pratiTenk()
  }
}
