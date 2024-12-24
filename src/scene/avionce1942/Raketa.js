import Predmet from 'core/Predmet'
import {nestani} from 'akcije/granice'
import slikaRaketa from 'slike/raketa.png'

export default class Raketa extends Predmet {

  constructor(vlasnik) {
    super(slikaRaketa, 30, 20)
    this.vlasnik = vlasnik
    this.granice = nestani
    this.pocetniUgao = this.vlasnik.ugao + 19
    this.ispaljena = false
    this.oznake.raketa = true
    this.cilj = 'neprijatelj'
    this.sakrij()
  }

  update() {
    super.update()
    if (!this.ispaljena) this.pripremi()
    if (this.ispaljena) this.proveriSudare()
  }

  reset() {
    this.ispaljena = false
    this.pripremi()
  }

  pripremi() {
    this.polozaj(this.vlasnik.x + 5, this.vlasnik.y + 15)
    this.ugao = this.pocetniUgao
  }

  pali() {
    this.pokazi()
    this.brzina = 20
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
    this.vlasnik.scena.predmeti.map(predmet => {
      if (this.nijeValidnaMeta(predmet)) return

      const razmak = this.razmakDo(predmet)
      if (!minRazmak) minRazmak = razmak
      if (!najblizaMeta) najblizaMeta = predmet
      if (razmak < minRazmak) minRazmak = razmak
      if (najblizaMeta) this.nisani(najblizaMeta)
    })
  }

  nijeValidnaMeta(predmet) {
    return predmet === this || !(this.cilj in predmet.oznake) || !predmet.ziv || !predmet.vidljiv || !predmet.naEkranu
  }

  proveriSudare() {
    this.vlasnik.scena.predmeti.map(predmet => {
      if (!(this.cilj in predmet.oznake) || !this.sudara(predmet)) return
      predmet.umri()
      this.nestani()
    })
  }
}
