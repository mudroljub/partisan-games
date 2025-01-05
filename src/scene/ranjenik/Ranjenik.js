import Igrac from '/game-engine/core/Igrac.js'

const OKRET = 0.035

export default class Ranjenik extends Igrac {
  constructor(x, y) {
    super('/assets/slike/2d-odozgo/ranjeni-partizan.png', { x, y })
    this.korak = 4
  }

  nalevo() {
    this.ugao -= OKRET
  }

  nadesno() {
    this.ugao += OKRET
  }

  nagore() {
    this.dodajSilu(this.korak)
  }

  nadole() {
    this.dodajSilu(-this.korak / 5)
  }

  proveriGranice() {
    this.ograniciVodoravno()
  }
}
