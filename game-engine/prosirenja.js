import Raketa from '../../src/scene/avionce1942/Raketa.js'

export function prosiriPucanjem(intervalPucanja = 3, length = 5) {

  const rakete = Array.from({ length }, () => new Raketa())

  const Pucanje = {
    zadnjiPucanj: 0,
    intervalPucanja, // sekundi
    rakete,
    i: 0,
    predmeti: [...rakete],

    dodajCiljeve(...x) {
      this.rakete.forEach(r => r.dodajCiljeve(...x))
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

  return Pucanje
}
