// dodati neprijatelja
import platno, { crtaNeboZemlju } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import Top from './Top.js'
import Strelac from './Strelac.js'
import Zastavnik from './Zastavnik.js'
import Tenk from './Tenk.js'

const tlo = platno.height * .75

export default class TopScena extends Scena {
  init() {
    const zastavnik = new Zastavnik(40, tlo + 1)
    this.top = new Top(190, tlo)
    const strelac = new Strelac(300, tlo + 8)
    this.tenk = new Tenk(250, tlo)
    this.dodaj(this.top, strelac, zastavnik, this.tenk)
  }

  cisti() {
    crtaNeboZemlju(tlo)
  }

  sablon() {
    return `
      <div class="komande">
        <progress value="${this.top.sila}" max=1600></progress>
      </div>
    `
  }
}
