import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'

export default class Pokretno extends Predmet {
  constructor(src, { potisak, faktorY = .5, ...rest }) {
    super(src, { ...rest })
    this.potisak = potisak
    this.faktorY = faktorY
    this.reset()
  }

  postaviBrzinu() {
    this.dy = this.potisak
    this.dx = 0
  }

  postaviPolozaj() {
    const x = Math.random() * platno.width
    this.polozaj = { x, y: -platno.height * Math.random() * this.faktorY }
  }

  reset() {
    this.postaviBrzinu()
    this.postaviPolozaj()
  }

  proveriGranice() {
    if (this.y > platno.height + this.visina) this.reset()
  }
}
