import Predmet from 'core/Predmet'
import slikaKrater from 'slike/oblak.gif'

export default class Paljba extends Predmet {

  constructor() {
    super(slikaKrater, 100, 74)
    this.postaviRandom()
  }

}
