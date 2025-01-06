// dodati neprijatelja
import platno, { crtaNeboZemlju } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import Top from './Top.js'
import Strelac from './Strelac.js'
import Zastavnik from './Zastavnik.js'
import Posada from './Posada.js'
import Tenk from './Tenk.js'

const tlo = platno.height * .75

export default class TopScena extends Scena {
  init() {
    const zastavnik = new Zastavnik(40, tlo + 1)
    this.top = new Top(190, tlo)
    const posada = new Posada(110, tlo + 8)
    const strelac = new Strelac(300, tlo + 8)
    this.tenk = new Tenk(250, tlo)
    this.dodaj(this.tenk, this.top, strelac, posada, zastavnik)
  }

  cisti() {
    crtaNeboZemlju(tlo, { linija: true })
  }

  sablon() {
    return /* html */`
      <div class="komande">
        <progress value="${this.top.sila}" max=1600></progress>
      </div>
    `
  }
}
