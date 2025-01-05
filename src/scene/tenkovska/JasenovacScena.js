import Scena from '/game-engine/core/Scena.js'
import Predmet from '/game-engine/core/Predmet.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import TenkOdozgo from './TenkOdozgo.js'

export default class JasenovacScena extends Scena {
  init() {
    this.pozadina = new Pozadina('/assets/slike/teksture/beton.gif')
    this.tenk = new TenkOdozgo(100, 200)
    const zica = new Predmet('/assets/slike/2d-bocno/stvari/bodljikava-zica.gif', { x: 400, y: 100 })
    this.dodaj(zica, this.tenk)
  }

  cisti() {
    this.pozadina.render()
  }

  update(dt) {
    super.update(dt)
    this.tenk.patroliraj()
  }

  sablon() {
    return `
      <h1 class="absolute full centar">Bekstvo iz Jasenovca</h1>
    `
  }
}
