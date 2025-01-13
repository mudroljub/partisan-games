import { randomInRange } from '/game-engine/utils.js'
import Pokretno from './Pokretno.js'

export default class Oblak extends Pokretno {
  constructor(potisak) {
    super('oblak.gif', { potisak })
  }

  postaviBrzinu() {
    this.dy = randomInRange(this.potisak * .75, this.potisak * 1.25)
    this.dx = Math.random() * 10 - 5
  }
}
