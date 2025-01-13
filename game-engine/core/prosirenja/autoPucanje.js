import Prateca from '../Prateca.js'

export function praviAutoPucanje({ zastoj = 3, kolicina = 5, src, potisak, skalar, x = 0, y = 0 } = {}) {
  return {
    i: 0,
    zastoj, // sekundi
    ispaljenih: 0,
    duzinaRafala: 5,
    proredRafala: .1,

    initPucanje({ ciljevi }) {
      this.zadnjiPucanj = 0
      this.zadnjiPucanjRafala = 0
      this.meci = Array.from({ length: kolicina }, () => new Prateca({ src, potisak, skalar }))
      this.meci.forEach(r => r.dodajCiljeve(...ciljevi))
      this.predmeti = [...this.meci]
    },

    pucaPovremeno(t) {
      if (t - this.zadnjiPucanj > this.zastoj) {
        this.puca()
        this.zadnjiPucanj = t
      }
    },

    rafalPovremeno(t) {
      if (t - this.zadnjiPucanj > this.zastoj && t - this.zadnjiPucanjRafala > this.proredRafala) {
        this.puca()
        this.ispaljenih++
        this.zadnjiPucanjRafala = t
        if (this.ispaljenih >= this.duzinaRafala) {
          this.ispaljenih = 0
          this.zadnjiPucanj = t
        }
      }
    },

    puca() {
      const metak = this.meci[this.i++ % this.meci.length]
      const polozaj = { x: this.x + x, y: this.y + y }
      metak.pucaCiljano(polozaj, this.ugao)
    },
  }
}
