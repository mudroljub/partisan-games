import { ctx } from '/game-engine/io/platno.js'

export default class Zastava {
  constructor({
    x = 0, y = 0, sirina = 100, visina = 50, drskaX = 0, drskaY = 0
  } = {}) {
    this.x = x
    this.y = y
    this.sirina = sirina
    this.visina = visina
    this.drskaX = drskaX
    this.drskaY = drskaY
  }

  crtaDrsku() {
    ctx.fillStyle = '#704F32'
    ctx.fillRect(
      this.drskaX - 8 + this.x,
      this.drskaY + this.y,
      8,
      this.visina + 100
    )
  }

  crtaZastavu(t) {
    ctx.beginPath()
    for (let y = 0; y <= this.visina; y++) {
      const wave = Math.sin((y / this.visina) * 2 * Math.PI + t * 4) * 5
      const x = this.drskaX + wave + this.sirina + this.x
      if (y === 0)
        ctx.moveTo(this.drskaX + this.x, this.drskaY + y + this.y)
      ctx.lineTo(x, this.drskaY + y + this.y)
    }
    ctx.lineTo(
      this.drskaX + this.x,
      this.drskaY + this.visina + this.y
    )
    ctx.closePath()

    ctx.fillStyle = 'red'
    ctx.fill()
  }

  render(dt, t) {
    this.crtaDrsku()
    this.crtaZastavu(t)
  }
}
