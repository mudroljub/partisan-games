// brzina/sila da se puni na space
// dodati metu
// smanjiti malo top
// srediti trajektoriju
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
    <div>
      ugao: ${this.top.ugao}<br>
      brzina: ${this.top.brzina}
    </div>
    `
  }
}
