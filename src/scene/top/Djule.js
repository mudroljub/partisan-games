import Predmet from '/game-engine/core/Predmet.js'
import { platno, ctx } from '/game-engine/io/platno.js'

const gravitacija = 9.8 * 33

export default class Djule extends Predmet {
  constructor(x = 0, y = 0) {
    super(null, { x, y })
    this.reset()
  }

  proveriGranice() {
    if (this.x > platno.width || this.y > platno.height) this.reset()
  }

  reset() {
    this.nestani()
    this.ispaljeno = false
  }

  pali(polozaj, sila, ugao) {
    this.x = polozaj.x
    this.y = polozaj.y
    this.ispaljeno = true
    this.dx = sila * Math.cos(ugao)
    this.dy = sila * Math.sin(ugao)
  }

  /* LOOP */

  render() {
    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2)
    ctx.fill()
  }

  update(dt) {
    if (!this.ispaljeno) return
    this.dodajSilu(gravitacija * dt, Math.PI / 2)
    super.update(dt)
  }
}