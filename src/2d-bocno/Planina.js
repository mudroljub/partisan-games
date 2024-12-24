import Predmet from 'core/Predmet'
import platno from 'io/platno'
import {kruzi} from 'akcije/granice'
import oblakPlanina from 'slike/oblak.gif'

export default class Planina extends Predmet {

  constructor(nivoTla, src = oblakPlanina) {
    super (src)
    this.x = Math.random() * platno.width
    this.tlo(nivoTla + 3)
    this.granice = kruzi
  }

}
