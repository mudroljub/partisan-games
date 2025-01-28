import { platno } from '/game-engine/io/platno.js'
import Granata from '/game-engine/core/projektili/Granata.js'
import { randomInRange } from '/game-engine/utils.js'

export default class Djule extends Granata {
  constructor({ r = 4, ...rest } = {}) {
    super({ src: null, ...rest })
    this.r = r
    this.sirina = this.visina = r * 2
    this.steta = randomInRange(20, 30)
    this.ctx = platno.getContext('2d')
  }

  render() {
    if (!this.vidljiv) return

    this.ctx.fillStyle = 'black'
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    this.ctx.fill()

    this.plamicak.render()
  }
}