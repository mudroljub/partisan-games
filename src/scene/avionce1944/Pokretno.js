import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'

export default class Pokretno extends Predmet {
  constructor(src, { potisak, ...rest }) {
    super(src, { ...rest })
    this.potisak = potisak
    this.reset()
  }

  postaviBrzinu() {
    this.dy = this.potisak
    this.dx = 0
  }

  postaviPolozaj() {
    const x = Math.random() * platno.width
    this.polozaj = { x, y: -50 }
  }

  reset() {
    this.postaviBrzinu()
    this.postaviPolozaj()
  }

  proveriGranice() {
    if (this.y > platno.height) this.reset()
  }
}
