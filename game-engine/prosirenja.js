export const Pucanje = {
  pucaPovremeno(t) {
    if (t - this.zadnjiPucanj > this.intervalPucanja) {
      this.puca()
      this.zadnjiPucanj = t
    }
  },
  zadnjiPucanj: 0,
  intervalPucanja: 1 // sekundi
}
