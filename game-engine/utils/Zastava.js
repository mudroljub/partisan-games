import { ctx } from '/game-engine/io/platno.js'

export default class Zastava {
  constructor({
    zastavaX = -8, zastavaY = 250, sirina = 100, visina = 50, drskaX = 33, drskaY = 17
  } = {}) {
    this.zastavaX = zastavaX
    this.zastavaY = zastavaY
    this.sirina = sirina
    this.visina = visina
    this.drskaX = drskaX
    this.drskaY = drskaY
    this.t = 0
  }

  crtaDrsku() {
    ctx.fillStyle = '#704F32'
    ctx.fillRect(
      this.drskaX - 8 + this.zastavaX,
      this.drskaY + this.zastavaY,
      8,
      this.visina + 100
    )
  }

  crtaZastavu() {
    ctx.beginPath()
    for (let y = 0; y <= this.visina; y++) {
      const wave = Math.sin((y / this.visina) * 2 * Math.PI + this.t) * 5
      const x = this.drskaX + wave + this.sirina + this.zastavaX
      if (y === 0)
        ctx.moveTo(this.drskaX + this.zastavaX, this.drskaY + y + this.zastavaY)
      ctx.lineTo(x, this.drskaY + y + this.zastavaY)
    }
    ctx.lineTo(
      this.drskaX + this.zastavaX,
      this.drskaY + this.visina + this.zastavaY
    )
    ctx.closePath()

    ctx.fillStyle = 'red'
    ctx.fill()
  }

  render(dt) {
    this.crtaDrsku()
    this.crtaZastavu()
    this.t += 4 * dt
  }
}
