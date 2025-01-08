import Raketa from '../Raketa.js'

export function praviAutoPucanje({ zastoj = 3, kolicina = 5, src, potisak, skalar } = {}) {

  const autoPucanje = {
    i: 0,
    zastoj, // sekundi
    ispaljeno: 0,
    duzinaRafala: 5,
    zastojRafala: .1,

    initRakete(...ciljevi) {
      this.zadnjiPucanj = 0
      this.zadnjiPucanjRafala = 0
      this.meci = Array.from({ length: kolicina }, () => new Raketa(src, { potisak, skalar }))
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
      if (t - this.zadnjiPucanj > this.zastoj && t - this.zadnjiPucanjRafala > this.zastojRafala) {
        this.puca()
        this.ispaljeno++
        this.zadnjiPucanjRafala = t
        if (this.ispaljeno >= this.duzinaRafala) {
          this.ispaljeno = 0
          this.zadnjiPucanj = t
        }
      }
    },

    puca() {
      const raketa = this.meci[this.i++ % this.meci.length]
      raketa.pucaCiljano(this, this.ugao)
    },
  }

  return autoPucanje
}
