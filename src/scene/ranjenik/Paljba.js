import Predmet from '/game-engine/core/Predmet.js'

export default class Paljba extends Predmet {
  constructor() {
    super('/assets/slike/2d-odozgo/krateri/krater.gif')
    this.postaviRandom()
  }
}
