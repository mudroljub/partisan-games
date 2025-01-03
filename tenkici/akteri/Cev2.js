import Cev from './Cev.js'

export default class Cev2 extends Cev {

  constructor(vlasnik, src, skalar) {
    console.log(skalar)
    super(vlasnik, src, { skalar })
    this.ugao = Math.PI * 1.1
  }

  pratiTenk() {
    this.x = this.vlasnik.x - this.vlasnik.sirina * 0.16
    this.y = this.vlasnik.y - this.vlasnik.visina * 0.2
  }

  nagore() {
    if (this.ugao > Math.PI * 1.2) return
    this.ugao += 0.01
  }

  nadole() {
    if (this.ugao < Math.PI) return
    this.ugao -= 0.01
  }
}
