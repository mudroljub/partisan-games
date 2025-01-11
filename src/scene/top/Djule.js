import { ctx } from '/game-engine/io/platno.js'
import Granata from '/game-engine/core/Granata.js'

export default class Djule extends Granata {
  constructor({ r = 4, ...rest } = {}) {
    super({ src: null, ...rest })
    this.r = r
    this.sirina = this.visina = r * 2
  }

  render() {
    if (!this.vidljiv) return

    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fill()

    this.plamicak.render()
  }
}