import Predmet from '/game-engine/core/Predmet.js'
import { izasaoIgde } from '/game-engine/utils/granice.js'

export default class Raketa extends Predmet {
  constructor(vlasnik) {
    super('/assets/slike/raketa.png', { skalar: .55 })
    this.vlasnik = vlasnik
    this.pocetniUgao = this.vlasnik.ugao + Math.PI / 16
    this.oznake.add('raketa')
    this.cilj = 'neprijatelj'
    this.reset()
  }

  proveriGranice() {
    if (izasaoIgde(this)) this.reset()
  }

  reset() {
    this.ispaljena = false
    this.sakrij()
  }

  pripremi() {
    this.polozaj(this.vlasnik.x + 5, this.vlasnik.y + 15)
    this.ugao = this.pocetniUgao
  }

  pali() {
    this.pokazi()
    this.dodajSilu(625)
    this.ispaljena = true
  }

  puca() {
    this.pripremi()
    this.pali()
  }

  pucaPratecu() {
    this.pripremi()
    this.traziNajblizuMetu()
    this.pali()
  }

  nisani(predmet) {
    this.ugao = this.ugaoKa(predmet)
  }

  traziNajblizuMetu() {
    let minRazmak
    let najblizaMeta
    this.vlasnik.neprijatelji.forEach(predmet => {
      if (this.nijeValidnaMeta(predmet)) return

      const razmak = this.razmakDo(predmet)
      if (!minRazmak) minRazmak = razmak
      if (!najblizaMeta) najblizaMeta = predmet
      if (razmak < minRazmak) minRazmak = razmak
      if (najblizaMeta) this.nisani(najblizaMeta)
    })
  }

  nijeValidnaMeta(predmet) {
    return predmet === this || !(predmet.oznake.has(this.cilj)) || !predmet.ziv || !predmet.vidljiv
  }

  proveriSudare() {
    this.vlasnik.neprijatelji.forEach(predmet => {
      if (!(predmet.oznake.has(this.cilj)) || !this.sudara(predmet)) return
      predmet.umri()
      this.nestani()
    })
  }

  update(dt) {
    super.update(dt)
    if (this.ispaljena) this.proveriSudare()
  }
}
