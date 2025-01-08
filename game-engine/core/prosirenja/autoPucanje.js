import Raketa from '../Raketa.js'

export function praviAutoPucanje({ interval = 3, brojRaketa = 5, src, potisak, skalar } = {}) {

  const autoPucanje = {
    i: 0,
    interval, // sekundi

    initRakete(...ciljevi) {
      this.zadnjiPucanj = 0
      this.rakete = Array.from({ length: brojRaketa }, () => new Raketa(src, { potisak, skalar }))
      this.rakete.forEach(r => r.dodajCiljeve(...ciljevi))
      this.predmeti = [...this.rakete]
    },

    pucaPovremeno(t) {
      if (t - this.zadnjiPucanj > this.interval) {
        this.puca()
        this.zadnjiPucanj = t
      }
    },

    puca() {
      const raketa = this.rakete[this.i++ % this.rakete.length]
      raketa.pucaCiljano(this, this.ugao)
    },
  }

  return autoPucanje
}
