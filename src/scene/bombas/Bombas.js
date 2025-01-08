import Igrac from '/game-engine/core/Igrac.js'
import { ctx } from '/game-engine/io/platno.js'

function crtajKruzic(x, y, r) {
  ctx.beginPath()
  ctx.arc(x, y, r, 0, Math.PI * 2)
  ctx.fillStyle = 'red'
  ctx.fill()
}

export default class Bombas extends Igrac {

  constructor({ x = 100, y = 100 } = {}) {
    super('/assets/slike/2d-bocno/partizani/vojnici/bombasi/partizan-bombas.gif', { x, y })
    this.potisak = 75
    this.faktorTrenja = 0.3
  }

  puca() {
    console.log('bacaBombu')
  }

  reset() {
    this.polozaj(Math.random() * 800, Math.random() * 600)
    this.brzina = 0
  }

  render() {
    super.render()
    if (!this.ziv)
      crtajKruzic(this.x + 6, this.y - 10, 5)
  }
}
