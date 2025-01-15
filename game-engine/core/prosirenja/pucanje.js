import Metak from '/game-engine/core/projektili/Metak.js'
import Vreme from '/game-engine/core/Vreme.js'

// TODO: možda export nekih prekonfigurisanih

export function praviPucanje({
  projektil = Metak, vremePunjenja = 100, ugloviPucanja = [0], potisakMetka = 1000, zastoj = 3, // sec
  gravitacija = 0, src, skalar
} = {}) {
  return {
    meci: [],
    ciljevi: [],
    vreme: new Vreme(),
    pripucao: false,
    // automatsko
    zadnjiInterval: 0,
    // rafalno
    ispaljenih: 0,
    duzinaRafala: 5,

    /* OSNOVNO */

    novMetak() {
      const metak = new projektil({ gravitacija, src, skalar })
      this.meci.push(metak)
      this.predmeti.push(metak)
      return metak
    },

    pali(polozaj, ugao, potisak = potisakMetka) {
      if (this.pripucao && this.vreme.proteklo <= vremePunjenja) return

      ugloviPucanja.forEach(ofset => {
        const metak = this.meci.find(g => !g.vidljiv) || this.novMetak()
        metak.pali(polozaj, ugao + ofset, potisak)
      })
      this.vreme.reset()
      this.pripucao = true
    },

    proveriPogodak(cilj, callback) {
      if (!cilj.prikazan || cilj.mrtav) return

      this.meci.forEach(metak => {
        if (!metak.prikazan) return

        metak.proveriPogodak(cilj, callback)
      })
    },

    proveriPogotke(callback) {
      this.ciljevi.forEach(cilj => this.proveriPogodak(cilj, callback))
    },

    /* CILJANO */

    pucaCiljano() {
      if (!this.ciljevi.some(cilj => cilj.ziv)) return

      const meta = this.traziNajblizuMetu()
      if (!meta) return

      this.pali(this.polozaj, this.ugaoKa(meta))
    },

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
    },

    /* AUTOMATSKO */

    pucaPovremeno(t) {
      if (t - this.zadnjiInterval > zastoj) {
        this.pucaCiljano()
        this.zadnjiInterval = t
      }
    },

    rafalPovremeno(t) {
      if (t - this.zadnjiInterval > zastoj && this.vreme.proteklo > vremePunjenja) {
        this.pucaCiljano()
        this.ispaljenih++
        this.vreme.reset()
        if (this.ispaljenih >= this.duzinaRafala) {
          this.ispaljenih = 0
          this.zadnjiInterval = t
        }
      }
    },
  }
}
