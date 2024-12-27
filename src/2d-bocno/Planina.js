import Predmet from 'core/Predmet'
import platno from 'io/platno'
import { kruzi } from 'akcije/granice'

export default class Planina extends Predmet {

  constructor(nivoTla, src = '/assets/slike/oblak.gif') {
    super (src)
    this.x = Math.random() * platno.width
    this.tlo(nivoTla + 3)
    this.granice = kruzi
  }

}
