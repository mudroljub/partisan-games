import { platno, ctx } from '/game-engine/io/platno.js'

export default class Projektil {
  constructor(cev) {
    this.x = 0
    this.y = 0
    this.ispaljen = false
    this.cev = cev
  }

  get jeVanEkrana() {
    return this.x > platno.width || this.y > platno.height
  }

  puca(sila, ugao) {
    this.sila = sila
    this.ugao = ugao
    this.ispaljen = true
  }

  reset() {
    this.ispaljen = false
  }

  leti(dt) {
    this.x += this.sila * Math.cos(-this.ugao) * dt
    this.y -= this.sila * Math.sin(-this.ugao) * dt
  }

  crta() {
    if (!this.ispaljen) return
    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2)
    ctx.fill()
  }

  update(dt) {
    if (this.ispaljen) this.leti(dt)
    if (this.jeVanEkrana) this.reset()
    this.crta()
  }
}