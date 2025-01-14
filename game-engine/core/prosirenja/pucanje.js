import Metak from '/game-engine/core/projektili/Metak.js'
import Vreme from '/game-engine/core/Vreme.js'

export function praviPucanje({ pauzaPaljbe = 100, ugloviPucanja = [-13, 0, 13] } = {}) {
  return {
    meci: [],
    ciljevi: [],
    vreme: new Vreme(),
    ugaoPucanja: Math.PI * 1.5,

    novMetak() {
      const metak = new Metak()
      this.meci.push(metak)
      this.predmeti.push(metak)
      return metak
    },

    pali() {
      if (this.vreme.proteklo <= pauzaPaljbe) return
      const polozaj = { x: this.x, y: this.y - this.visina / 4 }

      ugloviPucanja.forEach(ugao => {
        const metak = this.meci.find(g => !g.vidljiv) || this.novMetak()
        metak.pali(polozaj, this.ugaoPucanja + ugao)
      })
      this.vreme.reset()
    },

    proveriPogodak(cilj, callback) {
      if (cilj.nijePrikazan || cilj.mrtav) return

      this.meci.forEach(metak => {
        if (metak.nijePrikazan) return

        if (metak.sudara(cilj)) {
          cilj.umri()
          metak.reset()
          if (callback) callback()
        }
      })
    },

    proveriPogotke(callback) {
      this.ciljevi.forEach(cilj => this.proveriPogodak(cilj, callback))
    }
  }
}
