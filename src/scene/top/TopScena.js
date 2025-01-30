import platno, { crtaNeboZemlju } from '/core/io/platno.js'
import Scena2D from '/core/Scena2D.js'
import Top from './Top.js'
import Strelac from './Strelac.js'
import Zastavnik from './Zastavnik.js'
import Posada from './Posada.js'
import TenkDesno from '../tenkici/TenkDesno.js'
import { progresBar, topKomande, komande2 } from '/game-ui/components.js'

const tlo = platno.height * .75

export default class TopScena extends Scena2D {
  init() {
    const zastavnik = new Zastavnik(40, tlo + 1)
    this.top = new Top({ x: 230, y: tlo - 32 })
    const posada = new Posada(110, tlo + 8)
    const strelac = new Strelac(300, tlo + 8)
    this.tenk = new TenkDesno({ y: tlo, skalar: .6, vremePunjenjaAI: 3000 })
    this.tenk.ciljevi.push(this.top)
    this.top.ciljevi.push(this.tenk)
    this.dodaj(this.tenk, this.top, strelac, posada, zastavnik)
  }

  handleClick = e => {
    super.handleClick(e)
    if (e.target.id == 'dva-igraca') this.tenk.ai = !this.tenk.ai
  }

  cisti() {
    crtaNeboZemlju(tlo, { linija: true })
  }

  update(dt, t) {
    super.update(dt, t)
    if (this.top.mrtav) this.zavrsi('Izgubio si ovu bitku.')
    if (this.tenk.mrtav) this.zavrsi('Okupator je poražen!')
  }

  sablon() {
    return /* html */`
    <div class='komande komande1 bg-poluprovidno'>
      ${progresBar(this.top.energija)}
      ${topKomande()}
      <progress value="${this.top.sila}" max="${this.top.minSila * 3}"></progress>
    </div>

    <div class='komande komande2 bg-poluprovidno'>
      ${progresBar(this.tenk.energija)}
      ${!this.tenk.ai ? komande2() : ''}
      <button id="dva-igraca" class="bg-avocado full dva-igraca">
        ${this.tenk.ai ? 'Dodaj igrača' : 'Uključi<br> neprijatelja'}
      </button>
    </div>
    `
  }
}
