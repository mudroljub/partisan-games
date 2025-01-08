import Raketa from '../Raketa.js'

export function dodajAutoPucanje(intervalPucanja = 3, brojRaketa = 5) {

  const AutoPucanje = {
    i: 0,
    intervalPucanja, // sekundi

    // mozda preimenovati u initRakete?
    dodajCiljeve(...x) {
      this.zadnjiPucanj = 0
      this.rakete = Array.from({ length: brojRaketa }, () => new Raketa())
      this.rakete.forEach(r => r.dodajCiljeve(...x))
      this.predmeti = [...this.rakete]
    },

    pucaPovremeno(t) {
      if (t - this.zadnjiPucanj > this.intervalPucanja) {
        this.puca()
        this.zadnjiPucanj = t
      }
    },

    puca() {
      const raketa = this.rakete[this.i++ % this.rakete.length]
      raketa.pucaCiljano(this, this.ugao)
    },
  }

  return AutoPucanje
}
