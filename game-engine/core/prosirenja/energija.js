export function praviEnergiju() {
  return {
    energija: 100,
    zapaljivost: 20,

    get ziv() {
      return this.energija > 0
    },

    set ziv(bul) {
      this.energija = bul ? 100 : 0
    },

    get zapaljen() {
      return this.energija <= this.zapaljivost
    },

    skiniEnergiju(steta = 30) {
      this.energija = Math.max(this.energija - steta, 0)
    },
  }
}
