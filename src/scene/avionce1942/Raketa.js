import Predmet from '/game-engine/core/Predmet.js'
import { izasaoIgde } from '/game-engine/utils/granice.js'

export default class Raketa extends Predmet {
  constructor(vlasnik) {
    super('/assets/slike/raketa.png', { skalar: .55 })
    this.vlasnik = vlasnik
    this.oznake.add('raketa')
    this.ciljevi = []
    this.reset()
    this.zadnjiPucanj = 0
    this.intervalPucanja = 0 // u sekundama
  }

  dodajCiljeve(...args) {
    this.ciljevi.push(...args)
  }

  proveriGranice() {
    if (izasaoIgde(this)) this.reset()
  }

  reset() {
    this.ispaljena = false
    this.sakrij()
  }

  pripremi(polozaj = this.vlasnik, ugao = this.vlasnik.ugao) {
    this.polozaj(polozaj.x, polozaj.y)
    this.ugao = ugao
  }

  pali() {
    this.pokazi()
    this.dodajSilu(625)
    this.ispaljena = true
  }

  puca(polozaj, ugao) {
    this.pripremi(polozaj, ugao)
    this.pali()
  }

  pucaPratecu() {
    this.pripremi()
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
      if (this.nijeValidnaMeta(cilj)) return

      const razmak = this.razmakDo(cilj)
      if (!minRazmak) minRazmak = razmak
      if (!najblizaMeta) najblizaMeta = cilj
      if (razmak < minRazmak) minRazmak = razmak
      if (najblizaMeta) this.nisani(najblizaMeta)
    })
  }

  nijeValidnaMeta(cilj) {
    return cilj === this || !cilj.ziv || !cilj.vidljiv
  }

  proveriSudare() {
    this.ciljevi.forEach(cilj => {
      if (!this.sudara(cilj)) return
      cilj.umri()
      this.nestani()
    })
  }

  pucaPovremeno(t) {
    if (t - this.zadnjiPucanj > this.intervalPucanja) {
      this.pucaPratecu()
      this.zadnjiPucanj = t
    }
  }

  render() {
    if (!this.ispaljena) return
    super.render()
  }

  update(dt, t) {
    if (this.ispaljena) {
      super.update(dt)
      this.proveriSudare()
    }
    if (this.intervalPucanja)
      this.pucaPovremeno(t)
  }
}
