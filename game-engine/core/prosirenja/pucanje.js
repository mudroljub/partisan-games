import Metak from '/game-engine/core/projektili/Metak.js'
import Vreme from '/game-engine/core/Vreme.js'

export function praviPucanje({
  projektil = Metak, vremePunjenja = 100, ugloviPucanja = [0], gravitacija = 0, potisakMetka = 1000
} = {}) {
  return {
    meci: [],
    ciljevi: [],
    vreme: new Vreme(),

    novMetak() {
      const metak = new projektil({ gravitacija })
      this.meci.push(metak)
      this.predmeti.push(metak)
      return metak
    },

    pali(polozaj, ugao, potisak = potisakMetka) {
      if (this.vreme.proteklo <= vremePunjenja) return

      ugloviPucanja.forEach(ofset => {
        const metak = this.meci.find(g => !g.vidljiv) || this.novMetak()
        metak.pali(polozaj, ugao + ofset, potisak)
      })
      this.vreme.reset()
    },

    proveriPogodak(cilj, callback) {
      if (cilj.nijePrikazan || cilj.mrtav) return

      this.meci.forEach(metak => {
        if (metak.nijePrikazan) return

        metak.proveriPogodak(cilj, callback)
      })
    },

    proveriPogotke(callback) {
      this.ciljevi.forEach(cilj => this.proveriPogodak(cilj, callback))
    }
  }
}
