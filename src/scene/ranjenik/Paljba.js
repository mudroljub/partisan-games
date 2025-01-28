import Predmet from '/core/actor/Predmet.js'
import { platno } from '/core/io/platno.js'
import { randomInRange } from '/core/utils.js'

export default class Paljba extends Predmet {
  constructor() {
    super('2d-odozgo/krateri/krater.gif')
    this.postaviRandom()
  }

  randomX(marginaX) {
    this.x = randomInRange(marginaX, platno.width - marginaX)
  }

  randomY(marginaY) {
    this.y = randomInRange(marginaY, platno.height - marginaY)
  }

  postaviRandom(marginaX = 10, marginaY = 10) {
    this.randomX(marginaX)
    this.randomY(marginaY)
  }
}
