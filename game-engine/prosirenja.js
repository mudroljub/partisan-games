// TODO: prebaciti i raketu, tj. niz raketa

export const Pucanje = {
  pucaPovremeno(t) {
    if (t - this.zadnjiPucanj > this.intervalPucanja) {
      this.raketa.pucaPratecu()
      this.zadnjiPucanj = t
    }
  },
  zadnjiPucanj: 0,
  intervalPucanja: 3 // sekundi
}
