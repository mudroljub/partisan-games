// top trza, mozda i posada
// dodati metu
import Scena from '/game-engine/core/Scena.js'
import Posada from './Posada.js'
import Top from './Top.js'
import platno, { crtaNeboZemlju } from '/game-engine/io/platno.js'

export default class TopScena extends Scena {
  init() {
    this.top = new Top(160, platno.height * .75)
    this.posada = new Posada(70, platno.height * .75 + 8)
    this.dodaj(this.top, this.posada)
  }

  cisti() {
    crtaNeboZemlju(platno.height * .75)
  }

  sablon() {
    const max = 1500
    const procenat = (this.top.sila - this.top.minSila) / (max - this.top.minSila) * 100

    return `
      <div class="komande">
        <progress value="${procenat}" max=100></progress>
      </div>
    `
  }
}
