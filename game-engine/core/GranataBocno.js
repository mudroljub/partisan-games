import Predmet from '/game-engine/core/Predmet.js'
import { platno } from '/game-engine/io/platno.js'
import { izasaoIgde } from '/game-engine/utils/granice.js'
import { randomInRange } from '/game-engine/utils.js'

const duzinaEksplozije = 150

const blizuTla = () => platno.height - Math.random() * platno.height * 0.2

export default class GranataBocno extends Predmet {
  constructor({ src = 'granata.gif', nivoTla = blizuTla(), gravitacija = 98 } = {}) {
    super(src, { skalar: .5 })
    this.nivoTla = nivoTla
    this.gravitacija = gravitacija
    this.plamicak = new Predmet('plamen.gif', { skalar: 0.4 })
    this.steta = randomInRange(10, 20)
    this.timerId = null
    this.reset()
  }

  reset() {
    this.nestani()
    this.ispaljeno = false
    this.plamicak.sakrij()
    this.timerId = null
  }

  postavi(polozaj, ugao) {
    this.polozaj(polozaj.x, polozaj.y)
    this.ugao = ugao
  }

  pali(polozaj, ugao, potisak = 500) {
    this.postavi(polozaj, ugao)
    this.pokazi()
    this.dodajSilu(potisak)
    this.ispaljeno = true
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
    this.plamicak.x = this.x
    this.plamicak.y = this.y
    this.plamicak.pokazi()
  }

  povredi(cilj) {
    if (cilj.reagujNaPogodak)
      cilj.reagujNaPogodak(this.steta)
    else
      cilj.umri()
    this.reset()
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
