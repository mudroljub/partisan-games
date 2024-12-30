// preslikati https://mudroljub.github.io/partizani-animacija/
// da posada puni nakon pucanja
// dodati metu
import platno, { crtaNeboZemlju } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import Top from './Top.js'
import Posada from './Posada.js'
import Strelac from './Strelac.js'
import Zastavnik from './Zastavnik.js'

export default class TopScena extends Scena {
  init() {
    this.top = new Top(160, platno.height * .75)
    const zastavnik = new Zastavnik(20, platno.height * .75)
    const posada = new Posada(70, platno.height * .75 + 8)
    const strelac = new Strelac(280, platno.height * .75 + 8)
    this.dodaj(this.top, posada, strelac, zastavnik)
  }

  cisti() {
    crtaNeboZemlju(platno.height * .75)
  }

  sablon() {
    return `
      <div class="komande">
        <progress value="${this.top.sila}" max=1600></progress>
      </div>
    `
  }
}
