import Predmet from '/game-engine/core/Predmet.js'
import { randomInRange } from '/game-engine/utils.js'

export default class Metak extends Predmet {
  constructor({ src = 'granata.gif', skalar = .5, gravitacija = 0, ...rest } = {}) {
    super(src, { skalar, ...rest })
    this.gravitacija = gravitacija
    this.steta = randomInRange(10, 20)
    this.reset()
  }

  reset() {
    this.nestani()
  }

  postavi(polozaj, ugao) {
    this.polozaj = polozaj
    this.ugao = ugao
  }

  pali(polozaj, ugao, potisak) {
    this.postavi(polozaj, ugao)
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
    if (this.nijePrikazan) return

    if (this.gravitacija) {
      this.dodajSilu(this.gravitacija * dt, Math.PI / 2)
      this.azurirajUgao()
    }
    super.update(dt)
  }
}
