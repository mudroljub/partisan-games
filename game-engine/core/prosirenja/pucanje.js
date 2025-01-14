import Metak from '/game-engine/core/projektili/Metak.js'
import Vreme from '/game-engine/core/Vreme.js'

const PAUZA_PALJBE = 100
const ugloviPucanja = [-13, 0, 13]

export function praviPucanje() {
  return {
    meci: [],
    ciljevi: [],
    vreme: new Vreme(),
    ugaoPucanja: Math.PI * 1.5,

    novMetak() {
      const metak = new Metak()
      this.meci.push(metak)
      return metak
    },

    puca() {
      if (this.vreme.proteklo <= PAUZA_PALJBE) return
      const polozaj = { x: this.x, y: this.y - this.visina / 4 }

      ugloviPucanja.forEach(ugao => {
        const metak = this.meci.find(g => !g.vidljiv) || this.novMetak()
        metak.pali(polozaj, this.ugaoPucanja + ugao)
      })
      this.vreme.reset()
    },

    proveriPucanje(callback) {
      this.ciljevi.forEach(neprijatelj => {
        if (neprijatelj.nijeVidljiv || neprijatelj.mrtav) return

        this.meci.forEach(metak => {
          if (metak.nijeVidljiv) return

          if (metak.sudara(neprijatelj)) {
            neprijatelj.umri()
            metak.reset()
            if (callback) callback()
          }
        })
      })
    }
  }
}
