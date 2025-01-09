import platno, { crtaNeboZemlju } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import Top from './Top.js'
import Strelac from './Strelac.js'
import Zastavnik from './Zastavnik.js'
import Posada from './Posada.js'
import Tenk from '../tenkici/Tenk.js'

const tlo = platno.height * .75

export default class TopScena extends Scena {
  init() {
    const zastavnik = new Zastavnik(40, tlo + 1)
    this.top = new Top(230, tlo - 32)
    const posada = new Posada(110, tlo + 8)
    const strelac = new Strelac(300, tlo + 8)
    this.tenk = new Tenk('/assets/slike/2d-bocno/nemacki-tenk-bez-cevi.png', {
      skalar: .6, y: tlo, tenkDesno: true, cevSlika: '/assets/slike/2d-bocno/nemacki-tenk-cev.png'
    })
    this.dodaj(this.tenk, this.top, strelac, posada, zastavnik)
  }

  cisti() {
    crtaNeboZemlju(tlo, { linija: true })
  }

  update(dt, t) {
    super.update(dt, t)
    this.tenk.samohod(this.top)
    this.tenk.proveriPogodak(this.top)
  }

  sablon() {
    return /* html */`
      <div class="komande">
        <progress value="${this.top.sila}" max="${this.top.minSila * 2}"></progress>
      </div>
    `
  }
}
