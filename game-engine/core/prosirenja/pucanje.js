import Metak from '/game-engine/core/projektili/Metak.js'
import Vreme from '/game-engine/core/Vreme.js'

export function praviPucanje({ vremePunjenja = 100, ugloviPucanja = [-13, 0, 13] } = {}) {
  return {
    meci: [],
    ciljevi: [],
    vreme: new Vreme(),

    novMetak() {
      const metak = new Metak()
      this.meci.push(metak)
      this.predmeti.push(metak)
      return metak
    },

    pali(polozaj, ugao) {
      if (this.vreme.proteklo <= vremePunjenja) return

      ugloviPucanja.forEach(ofset => {
        const metak = this.meci.find(g => !g.vidljiv) || this.novMetak()
        metak.pali(polozaj, ugao + ofset)
      })
      this.vreme.reset()
    },

    proveriPogodak(cilj, callback) {
      if (cilj.nijePrikazan || cilj.mrtav) return

      this.meci.forEach(metak => metak.proveriPogodak(cilj, callback))
    },

    proveriPogotke(callback) {
      this.ciljevi.forEach(cilj => this.proveriPogodak(cilj, callback))
    }
  }
}
