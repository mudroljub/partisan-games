import Predmet from '/game-engine/core/Predmet.js'
import { platno, ctx } from '/game-engine/io/platno.js'

const gravitacija = 9.8

export default class Djule extends Predmet {
  constructor(x = 0, y = 0) {
    super(undefined, { x, y })
    this.ispaljen = false
  }

  get jeVanEkrana() {
    return this.x > platno.width || this.y > platno.height
  }

  reset() {
    this.ispaljen = false
  }

  pali(polozaj, sila, ugao) {
    this.x = polozaj.x
    this.y = polozaj.y
    this.ispaljen = true
    this.dx = sila * Math.cos(ugao)
    this.dy = sila * Math.sin(ugao)
  }

  leti(dt) {
    this.dy += gravitacija * dt * 33
  }

  render() {
    if (!this.ispaljen) return
    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2)
    ctx.fill()
  }

  update(dt) {
    if (!this.ispaljen) return
    super.update(dt)
    this.leti(dt)
    if (this.jeVanEkrana) this.reset()
  }
}