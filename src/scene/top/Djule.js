import Predmet from '/game-engine/core/Predmet.js'
import { platno, ctx } from '/game-engine/io/platno.js'
import { izasaoIgde } from '/game-engine/utils/granice.js'

const gravitacija = 9.8 * 33

export default class Djule extends Predmet {
  constructor({ x = 0, y = 0, nivoTla = platno.height } = {}) {
    super(null, { x, y })
    this.nivoTla = nivoTla
    this.reset()
  }

  reset() {
    this.nestani()
    this.ispaljeno = false
  }

  postavi(polozaj, ugao) {
    this.x = polozaj.x
    this.y = polozaj.y
    this.ugao = ugao
  }

  pali(polozaj, sila, ugao) {
    this.pokazi()
    this.postavi(polozaj, ugao)
    this.dodajSilu(sila, ugao)
    this.ispaljeno = true
  }

  proveriGranice() {
    if (izasaoIgde(this) || this.y > this.nivoTla) this.reset()
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