import Predmet from '/core/actor/Predmet.js'
import { randomInRange } from '/core/utils.js'

export default class Metak extends Predmet {
  constructor({ src = 'granata.gif', skalar = .5, gravitacija = 0, potisak = 500, ...rest } = {}) {
    super(src, { skalar, ...rest })
    this.gravitacija = gravitacija
    this.potisak = potisak
    this.steta = randomInRange(10, 20)
    this.reset()
  }

  reset() {
    this.nestani()
  }

  pali(poz, ugao, potisak = this.potisak) {
    this.postavi(poz.x, poz.y)
    this.ugao = ugao
    this.pokazi()
    this.dodajSilu(potisak)
  }

  proveriGranice() {
    if (this.vanEkrana) this.reset()
  }

  proveriPogodak(cilj, callback) {
    if (cilj.sudara(this))
      this.povredi(cilj, callback)
  }

  povredi(cilj, callback) {
    if (cilj.reagujNaPogodak)
      cilj.reagujNaPogodak(this.steta)
    else
      cilj.umri()
    this.reset()
    if (callback) callback()
  }

  /* LOOP */

  azurirajUgao() {
    this.ugao = Math.atan2(this.dy, this.dx)
  }

  update(dt) {
    if (!this.prikazan) return

    if (this.gravitacija) {
      this.dodajSilu(this.gravitacija * dt, Math.PI / 2)
      this.azurirajUgao()
    }
    super.update(dt)
  }
}
