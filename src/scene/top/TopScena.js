// srediti trajektoriju
// dodati metu
import Scena from '/game-engine/core/Scena.js'
import Top from './Top.js'
import { platno } from '/game-engine/io/platno.js'

export default class TopScena extends Scena {
  constructor(...args) {
    super(...args)
    this.top = new Top(150, platno.height * .75)
    this.dodaj(this.top)
  }

  sablon() {
    const max = 1000
    const procenat = (this.top.sila - this.top.minSila) / (max - this.top.minSila) * 100

    return `
      <div class="komande">
        <progress value="${procenat}" max=100></progress>
      </div>
    `
  }
}
