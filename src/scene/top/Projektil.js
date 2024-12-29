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

  puca(sila, ugao) {
    this.ispaljen = true
    this.vx = sila * Math.cos(ugao)
    this.vy = sila * Math.sin(ugao)
  }

  leti(dt) {
    this.vy += g
    this.x += this.vx * dt
    this.y += this.vy * dt
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