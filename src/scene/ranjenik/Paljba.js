import Predmet from '/game-engine/core/Predmet.js'
import { platno } from '/game-engine/io/platno.js'
import { randomInRange } from '/game-engine/utils.js'

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
