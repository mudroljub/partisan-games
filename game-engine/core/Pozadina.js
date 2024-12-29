import Slika from '../core/Slika.js'
import platno from '../io/platno.js'

export default class Pozadina extends Slika {
  constructor(slika) {
    super(slika, { sirina: platno.width, visina: platno.height })
    this.x = platno.width / 2
    this.y = platno.height / 2
  }
}
