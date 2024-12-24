import Igrac from 'core/Igrac'
import slikaRanjenik from 'slike/2d-odozgo/ranjeni-partizan.png'

const OKRET = 0.035

export default class Ranjenik extends Igrac {

  constructor() {
    super (slikaRanjenik, 70, 30)
    this.korak = 1
    this.pogodjen = 0
  }

  nalevo() {
    this.ugao -= OKRET
  }

  nadesno() {
    this.ugao += OKRET
  }

  nagore() {
    this.pomeri(this.korak)
  }

  nadole() {
    this.pomeri(-this.korak/5)
  }
}
