import Prateca from '../projektili/Prateca.js'
import Vreme from '/game-engine/core/Vreme.js'

export function praviAutoPucanje({ zastoj = 3, src, potisakMetka = 600, skalar, x = 0, y = 0, ciljevi } = {}) {
  return {
    meci: [],
    vreme: new Vreme(),
    zastoj, // sekundi
    ispaljenih: 0,
    duzinaRafala: 5,
    vremePunjenja: 100,
    zadnjiRafal: 0,
    zadnjiMetak: 0,

    novMetak() {
      const metak = new Prateca({ src, skalar, ciljevi })
      this.meci.push(metak)
      this.predmeti.push(metak)
      return metak
    },

    pucaPovremeno(t) {
      if (t - this.zadnjiRafal > this.zastoj) {
        this.puca()
        this.zadnjiRafal = t
      }
    },

    rafalPovremeno(t) {
      if (t - this.zadnjiRafal > this.zastoj && this.vreme.proteklo > this.vremePunjenja) {
        this.puca()
        this.ispaljenih++
        this.vreme.reset()
        if (this.ispaljenih >= this.duzinaRafala) {
          this.ispaljenih = 0
          this.zadnjiRafal = t
        }
      }
    },

    puca() {
      const metak = this.meci.find(g => !g.vidljiv) || this.novMetak()
      const polozaj = { x: this.x + x, y: this.y + y }
      metak.pucaCiljano(polozaj, this.ugao, potisakMetka)
    },
  }
}
