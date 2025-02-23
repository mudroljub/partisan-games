import Predmet from '/core/actor/Predmet.js'
import platno from '/core/io/platno.js'

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
    this.postavi(x, -platno.height * Math.random() * this.faktorY)
  }

  reset() {
    this.postaviBrzinu()
    this.postaviPolozaj()
  }

  proveriGranice() {
    if (this.y > platno.height + this.visina) this.reset()
  }
}
