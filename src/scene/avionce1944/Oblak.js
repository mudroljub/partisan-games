import { randomInRange } from '/core/utils.js'
import Pokretno from './Pokretno.js'

export default class Oblak extends Pokretno {
  constructor(potisak) {
    super('oblak.gif', { potisak, senka: true })
  }

  postaviBrzinu() {
    this.dy = randomInRange(this.potisak * .75, this.potisak * 1.25)
    this.dx = Math.random() * 10 - 5
  }
}
