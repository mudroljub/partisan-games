import Predmet from '/game-engine/core/Predmet.js'
import { izasaoIgde } from '/game-engine/utils/granice.js'

export default class Raketa extends Predmet {
  constructor(src = '/assets/slike/raketa.png', { potisak = 625, skalar = .55, callback } = {}) {
    super(src, { skalar })
    this.potisak = potisak
    this.callback = callback
    this.ciljevi = []
    this.reset()
  }

  dodajCiljeve(...args) {
    this.ciljevi.push(...args)
  }

  proveriGranice() {
    if (izasaoIgde(this)) this.reset()
  }

  reset() {
    this.ispaljena = false
    this.nestani()
  }

  pripremi(polozaj, ugao) {
    this.polozaj(polozaj.x, polozaj.y)
    this.ugao = ugao
  }

  pali() {
    this.pokazi()
    this.brzina = this.potisak
    this.ispaljena = true
  }

  puca(polozaj, ugao) {
    this.pripremi(polozaj, ugao)
    this.pali()
  }

  pucaCiljano(polozaj, ugao) {
    if (!this.ciljevi.some(cilj => cilj.ziv)) return

    this.pripremi(polozaj, ugao)
    this.traziNajblizuMetu()
    this.pali()
  }

  nisani(cilj) {
    this.ugao = this.ugaoKa(cilj)
  }

  traziNajblizuMetu() {
    let minRazmak
    let najblizaMeta
    this.ciljevi.forEach(cilj => {
      const razmak = this.razmakDo(cilj)
      if (!minRazmak) minRazmak = razmak
      if (!najblizaMeta) najblizaMeta = cilj
      if (razmak < minRazmak) minRazmak = razmak
      if (najblizaMeta) this.nisani(najblizaMeta)
    })
  }

  proveriSudare() {
    this.ciljevi.forEach(cilj => {
      if (!this.sudara(cilj)) return

      if (this.callback) this.callback()
      else cilj.umri()
      this.reset()
    })
  }

  render() {
    if (!this.ispaljena) return
    super.render()
  }

  update(dt) {
    if (this.ispaljena) {
      super.update(dt)
      this.proveriSudare()
    }
  }
}
