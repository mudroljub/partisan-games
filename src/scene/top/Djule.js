import Predmet from '/game-engine/core/Predmet.js'
import { platno, ctx } from '/game-engine/io/platno.js'
import { izasaoIgde } from '/game-engine/utils/granice.js'

const gravitacija = 98
const trajanjeEksplozije = 150

const blizuTla = () => platno.height - Math.random() * platno.height * 0.2

export default class Djule extends Predmet {
  constructor({ x = 0, y = 0, r = 4, nivoTla = blizuTla() } = {}) {
    super(null, { x, y })
    this.r = r
    this.sirina = this.visina = r * 2
    this.nivoTla = nivoTla
    this.plamicak = new Predmet('plamen.gif', { skalar: 0.4 })
    this.reset()
  }

  reset() {
    this.nestani()
    this.plamicak.sakrij()
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
  /* SUDAR */

  proveriPogodak(predmet, callback) {
    if (!this.sudara(predmet)) return

    this.eksplodiraj()
    if (this.timerId === null)
      this.timerId = setTimeout(() => {
        this.reset()
        this.timerId = null
      }, trajanjeEksplozije)

    if (callback) callback(predmet)
    else predmet.umri()
  }

  eksplodiraj() {
    this.plamicak.x = this.x
    this.plamicak.y = this.y
    this.plamicak.pokazi()
  }

  /* LOOP */

  render() {
    if (!this.vidljiv) return

    ctx.fillStyle = 'black'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fill()

    this.plamicak.render()
  }

  update(dt) {
    if (!this.ispaljeno) return
    this.dodajSilu(gravitacija * dt, Math.PI / 2)
    super.update(dt)
  }
}