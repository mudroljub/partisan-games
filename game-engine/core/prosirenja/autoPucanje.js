import Prateca from '../projektili/Prateca.js'
import Vreme from '/game-engine/core/Vreme.js'

export function praviAutoPucanje({ zastoj = 3, src, skalar, ciljevi } = {}) {
  return {
    meci: [],
    vreme: new Vreme(),
    zastoj, // sekundi
    ispaljenih: 0,
    duzinaRafala: 5,
    vremePunjenja: 100,
    zadnjiInterval: 0,

    novMetak() {
      const metak = new Prateca({ src, skalar, ciljevi })
      this.meci.push(metak)
      this.predmeti.push(metak)
      return metak
    },

    pucaPovremeno(t) {
      if (t - this.zadnjiInterval > this.zastoj) {
        this.pucaCiljano()
        this.zadnjiInterval = t
      }
    },

    rafalPovremeno(t) {
      if (t - this.zadnjiInterval > this.zastoj && this.vreme.proteklo > this.vremePunjenja) {
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
