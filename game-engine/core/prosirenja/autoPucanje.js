import Raketa from '../Raketa.js'

export function praviAutoPucanje({ zastoj = 3, kolicina = 5, src, potisak, skalar, x = 0, y = 0 } = {}) {

  const autoPucanje = {
    i: 0,
    zastoj, // sekundi
    ispaljeno: 0,
    duzinaRafala: 5,
    proredRafala: .1,

    // TODO: prebaciti konfiguraciju ovde??
    initPucanje(...ciljevi) {
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
      if (t - this.zadnjiPucanj > this.zastoj && t - this.zadnjiPucanjRafala > this.proredRafala) {
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
      const polozaj = { x: this.x + x, y: this.y + y }
      raketa.pucaCiljano(polozaj, this.ugao)
    },
  }

  return autoPucanje
}
