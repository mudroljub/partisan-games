import Predmet from '/game-engine/core/Predmet.js'
import { ctx } from '/game-engine/io/platno.js'

export default class Cev extends Predmet {
  constructor(vlasnik, src, skalar) {
    super(src, { skalar })
    this.vlasnik = vlasnik
    this.ugao = Math.PI + Math.PI * 0.9
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

  render() {
    if (!this.vidljiv) return
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.ugao)
    ctx.scale(this.vlasnik.z, this.vlasnik.z)
    ctx.drawImage(this.slika, 0, 0, this.sirina, this.visina)
    ctx.restore()
  }
}
