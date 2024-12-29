// dodati metu
// smanjiti malo top
// srediti trajektoriju
// sila progres bar
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
      ugao: ${this.top.ugao}<br>
      sila: ${this.top.sila}
    </div>
    `
  }
}
