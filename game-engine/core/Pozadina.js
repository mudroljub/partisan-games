import Predmet from '../core/Predmet'
import platno from '../io/platno'

export default class Pozadina extends Predmet {

  constructor(slika) {
    super(slika, platno.width, platno.height)
    this.x = platno.width / 2
    this.y = platno.height / 2
    this.oznake.pozadina = true
  }

}
