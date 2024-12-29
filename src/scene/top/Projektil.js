import { platno, ctx } from '/game-engine/io/platno.js'

const g = 9.8

export default class Projektil {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
    this.ispaljen = false
  }

  get jeVanEkrana() {
    return this.x > platno.width || this.y > platno.height
  }

  reset() {
    this.ispaljen = false
  }

  pali(sila, ugao) {
    this.ispaljen = true
    this.dx = sila * Math.cos(ugao)
    this.dy = sila * Math.sin(ugao)
  }

  leti(dt) {
    this.dy += g
    this.x += this.dx * dt
    this.y += this.dy * dt
  }

  crta() {
    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2)
    ctx.fill()
  }

  update(dt) {
    if (!this.ispaljen) return
    this.leti(dt)
    this.crta()
    if (this.jeVanEkrana) this.reset()
  }
}