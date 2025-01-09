import platno, { crtaNeboZemlju } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import VoziloBocno from '/game-engine/core/VoziloBocno.js'
import Top from './Top.js'
import Strelac from './Strelac.js'
import Zastavnik from './Zastavnik.js'
import Posada from './Posada.js'
import Tenk2 from '../tenkici/Tenk2.js'

const tlo = platno.height * .75

const slike = ['/assets/slike/2d-bocno/nemci/tenkovi/panzer3-l60.png']

const praviTenk = () => {
  const konfig = { x: platno.sirina, y: tlo + 20, brzina: -80 }
  const slika = slike[0]
  return new VoziloBocno(slika, konfig)
}

export default class TopScena extends Scena {
  init() {
    const zastavnik = new Zastavnik(40, tlo + 1)
    this.top = new Top(230, tlo - 32)
    const posada = new Posada(110, tlo + 8)
    const strelac = new Strelac(300, tlo + 8)
    // this.tenk = praviTenk()
    this.tenk = new Tenk2({ y: tlo, skalar: .5 })
    this.dodaj(this.tenk, this.top, strelac, posada, zastavnik)
  }

  cisti() {
    crtaNeboZemlju(tlo, { linija: true })
  }

  update(dt, t) {
    super.update(dt, t)
    this.tenk.automatuj(this.top)
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
