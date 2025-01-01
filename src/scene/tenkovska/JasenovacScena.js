// h1: Bekstvo iz Jasenovca

import Scena from '/game-engine/core/Scena.js'
import Predmet from '/game-engine/core/Predmet.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import TenkOdozgo from './TenkOdozgo.js'

/** * INIT ***/

const pozadina = new Pozadina('/assets/slike/teksture/beton.gif')
const tenk = new TenkOdozgo(100, 200)
const zica = new Predmet('/assets/slike/2d-bocno/stvari/bodljikava-zica.gif')

/** * EXPORT ***/

export default class JasenovacScena extends Scena {
  constructor(...args) {
    super(...args)
    zica.polozaj(400, 100)
  }

  update() {
    this.cisti()
    pozadina.render()
    zica.update()
    tenk.patroliraj()
    tenk.update()
  }
}
