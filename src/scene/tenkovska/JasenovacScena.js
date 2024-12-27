// h1: Bekstvo iz Jasenovca

import Scena from 'core/Scena'
import Predmet from 'core/Predmet'
import Pozadina from 'core/Pozadina'
import TenkOdozgo from './TenkOdozgo'

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
    pozadina.update()
    zica.update()
    tenk.patroliraj()
    tenk.update()
  }
}
