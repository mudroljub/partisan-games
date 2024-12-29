import { platno, ctx } from '/game-engine/io/platno.js'

export default class Projektil {
  constructor(vlasnik) {
    this.x = 0
    this.y = 0
    this.ispaljen = false
    this.vlasnik = vlasnik
  }

  get jeVanEkrana() {
    return this.x > platno.width || this.y > platno.height
  }

  puca(sila, ugaoStepeni) {
    this.sila = sila
    this.ugaoStepeni = ugaoStepeni
    this.ispaljen = true
  }

  reset() {
    this.ispaljen = false
  }

  pozicioniraj() {
    const centarCeviX = this.vlasnik.cev.x + this.vlasnik.cev.sirina / 4
    const centarCeviY = this.vlasnik.cev.y + this.vlasnik.cev.visina * 0.71
    const dijagonalaCevi = this.vlasnik.cev.sirina * 3 / 4
    this.x = centarCeviX + dijagonalaCevi * Math.cos(this.vlasnik.ugaoStepeni * Math.PI / 180)
    this.y = centarCeviY - dijagonalaCevi * Math.sin(this.vlasnik.ugaoStepeni * Math.PI / 180)
  }

  leti(dt) {
    this.x += this.sila * Math.cos(this.ugaoStepeni * Math.PI / 180) * dt
    this.y -= this.sila * Math.sin(this.ugaoStepeni * Math.PI / 180) * dt
  }

  crta() {
    if (!this.ispaljen) return

    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
    ctx.fill()
  }

  update(dt) {
    if (!this.ispaljen) this.pozicioniraj()
    if (this.ispaljen) this.leti(dt)
    if (this.jeVanEkrana) this.reset()
    this.crta()
  }
}