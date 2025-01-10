import platno, { crtaNeboZemlju } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import Top from './Top.js'
import Strelac from './Strelac.js'
import Zastavnik from './Zastavnik.js'
import Posada from './Posada.js'
import TenkDesno from '../tenkici/TenkDesno.js'
import { progresBar } from '/game-ui/components.js'
import { randomInRange } from '/game-engine/utils.js'

const tlo = platno.height * .75

const callback = predmet => {
  predmet.dodajSilu(10, predmet.ugao + Math.PI)
  predmet.skiniEnergiju(randomInRange(5, 15))
}

export default class TopScena extends Scena {
  init() {
    const zastavnik = new Zastavnik(40, tlo + 1)
    this.top = new Top({ x: 230, y: tlo - 32, callback })
    const posada = new Posada(110, tlo + 8)
    const strelac = new Strelac(300, tlo + 8)
    this.tenk = new TenkDesno({
      y: tlo, cilj: this.top, skalar: .6, callback: p => p.skiniEnergiju(randomInRange(1, 2)), vremePunjenjaAI: 3000 }
    )
    this.top.ciljevi.push(this.tenk)
    this.dodaj(this.tenk, this.top, strelac, posada, zastavnik)
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
    <div class='komande komande1'>
    ${progresBar(this.top.energija)}
    <progress value="${this.top.sila}" max="${this.top.minSila * 2}"></progress>
  </div>

  <div class='komande komande2'>
    ${progresBar(this.tenk.energija)}
  </div>
    `
  }
}
