import Predmet from '/game-engine/core/Predmet.js'
import { platno } from '/game-engine/io/platno.js'
import { izasaoIgde } from '/game-engine/utils/granice.js'
import Metak from './Metak.js'

const duzinaEksplozije = 150

const blizuTla = () => platno.height - Math.random() * platno.height * 0.2

export default class Granata extends Metak {
  constructor({ skalar = .5, potisak = 500, nivoTla = blizuTla(), gravitacija = 98, ...rest } = {}) {
    super({ skalar, potisak, ...rest })
    this.nivoTla = nivoTla
    this.gravitacija = gravitacija
    this.plamicak = new Predmet('plamen.gif', { skalar: 0.4 })
    this.timerId = null
    this.reset()
  }

  reset() {
    super.reset()
    this.timerId = null
    this.plamicak?.sakrij()
  }

  proveriGranice() {
    if (izasaoIgde(this) || this.y > this.nivoTla) this.reset()
  }

  /* SUDAR */

  proveriPogodak(cilj) {
    if (!cilj.sudara(this)) return

    this.eksplodiraj()

    if (!this.timerId)
      this.timerId = setTimeout(() => this.povredi(cilj), duzinaEksplozije)
  }

  eksplodiraj() {
    this.plamicak.polozaj = this.polozaj
    this.plamicak.pokazi()
  }

  /* LOOP */

  azurirajUgao() {
    this.ugao = Math.atan2(this.dy, this.dx)
  }

  render() {
    super.render()
    this.plamicak.render()
  }

  update(dt) {
    if (!this.ispaljeno) return
    this.dodajSilu(this.gravitacija * dt, Math.PI / 2)
    this.azurirajUgao()
    super.update(dt)
  }
}
