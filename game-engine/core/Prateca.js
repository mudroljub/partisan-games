import Predmet from '/game-engine/core/Predmet.js'
import { izasaoIgde } from '/game-engine/utils/granice.js'

export default class Prateca extends Predmet {
  constructor(src = 'raketa.png', { potisak = 625, skalar = .55 } = {}) {
    super(src, { skalar })
    this.potisak = potisak
    this.ciljevi = []
    this.reset()
  }

  dodajCiljeve(...args) {
    this.ciljevi.push(...args)
  }

  reset() {
    this.nestani()
    this.ispaljeno = false
  }

  postavi(polozaj, ugao) {
    this.polozaj = polozaj
    this.ugao = ugao
  }

  pali(polozaj, ugao, potisak = this.potisak) {
    this.postavi(polozaj, ugao)
    this.pokazi()
    this.brzina = potisak
    this.ispaljeno = true
  }

  proveriGranice() {
    if (izasaoIgde(this)) this.reset()
  }

  /* PRATECA */

  pucaCiljano(polozaj, ugao) {
    if (!this.ciljevi.some(cilj => cilj.ziv)) return

    this.postavi(polozaj, ugao)
    const meta = this.traziNajblizuMetu()
    if (!meta) return

    this.pali(polozaj, this.ugaoKa(meta))
  }

  traziNajblizuMetu() {
    let minRazmak
    let najblizaMeta
    this.ciljevi.forEach(cilj => {
      const razmak = this.razmakDo(cilj)
      if (!minRazmak) minRazmak = razmak
      if (!najblizaMeta) najblizaMeta = cilj
      if (razmak < minRazmak) minRazmak = razmak
    })
    return najblizaMeta
  }

  /* SUDAR */

  proveriSudare() {
    this.ciljevi.forEach(cilj => {
      if (!this.sudara(cilj)) return

      this.povredi(cilj)
    })
  }

  povredi(cilj) {
    if (cilj.reagujNaPogodak)
      cilj.reagujNaPogodak(this.steta)
    else
      cilj.umri()
    this.reset()
  }

  /* LOOP */

  update(dt) {
    if (!this.ispaljeno) return
    super.update(dt)
    this.proveriSudare()
  }
}
