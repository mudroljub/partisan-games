import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'
import { kruzi } from '/game-engine/utils/granice.js'

export default class Planina extends Predmet {

  constructor(nivoTla, src = '/assets/slike/oblak.gif') {
    super (src)
    this.x = Math.random() * platno.width
    this.tlo(nivoTla + 3)
    this.granice = kruzi
  }

}
