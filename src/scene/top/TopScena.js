// smanjiti malo top
// srediti trajektoriju
// dodati progres bar
// dodati metu
import Scena from '/game-engine/core/Scena.js'
import Top from './Top.js'
import { platno } from '/game-engine/io/platno.js'

export default class TopScena extends Scena {
  constructor(...args) {
    super(...args)
    this.top = new Top(10, platno.height * .75)
    this.dodaj(this.top)
  }

  sablon() {
    return `
    <div class="komande">
      ugao: ${Math.round(this.top.cev.ugaoStepeni)}<br>
      sila: ${this.top.sila}
    </div>
    `
  }
}
