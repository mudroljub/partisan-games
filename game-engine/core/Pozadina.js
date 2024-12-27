import Predmet from '../core/Predmet.js'
import platno from '../io/platno.js'

export default class Pozadina extends Predmet {
  constructor(slika) {
    super(slika, platno.width, platno.height)
    this.x = platno.width / 2
    this.y = platno.height / 2
    this.oznake.add('pozadina')
  }
}
