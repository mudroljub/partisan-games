import Predmet from '/game-engine/core/Predmet.js'

export default class Paljba extends Predmet {

  constructor() {
    super('/assets/slike/oblak.gif', 100, 74)
    this.postaviRandom()
  }

}
