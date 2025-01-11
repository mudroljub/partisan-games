import Predmet from '/game-engine/core/Predmet.js'
import { gravitacija } from './konstante.js'
import { platno } from '/game-engine/io/platno.js'
import { izasaoIgde } from '/game-engine/utils/granice.js'

const trajanjeEksplozije = 150

const blizuTla = () => platno.height - Math.random() * platno.height * 0.2

export default class Granata extends Predmet {
  constructor({ src = 'granata.gif', nivoTla = blizuTla() } = {}) {
    super(src, { skalar: .5 })
    this.nivoTla = nivoTla
    this.plamicak = new Predmet('plamen.gif', { skalar: 0.4 })
    this.timerId = null
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

  pali(polozaj, ugao, potisak = 500) {
    this.pokazi()
    this.postavi(polozaj, ugao)
    this.dodajSilu(potisak)
    this.ispaljeno = true
  }

  proveriGranice() {
    if (izasaoIgde(this) || this.y > this.nivoTla) this.reset()
  }

  /* SUDAR */

  proveriPogodak(cilj, callback) {
    if (!this.sudara(cilj)) return

    this.eksplodiraj()
    if (this.timerId === null)
      this.timerId = setTimeout(() => {
        this.reset()
        this.timerId = null
      }, trajanjeEksplozije)

    if (callback) callback(cilj)
    else cilj.umri()
  }

  eksplodiraj() {
    this.plamicak.x = this.x
    this.plamicak.y = this.y
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
    this.dodajSilu(gravitacija * dt, Math.PI / 2)
    this.azurirajUgao()
    super.update(dt)
  }
}
