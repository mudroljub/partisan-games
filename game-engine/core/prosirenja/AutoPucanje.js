/* očekuje da bazična klasa ima rakete */
export function dodajAutoPucanje(intervalPucanja = 3) {

  const AutoPucanje = {
    zadnjiPucanj: 0,
    intervalPucanja, // sekundi
    i: 0,

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

  return AutoPucanje
}
