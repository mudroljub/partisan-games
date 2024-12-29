// smanjiti malo top
// srediti trajektoriju
// da ispaljuje više kugli
// dodati progres bar
// dodati metu
import Scena from '/game-engine/core/Scena.js'
import Top from './Top.js'

export default class TopScena extends Scena {
  constructor(...args) {
    super(...args)
    this.top = new Top()
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
