import {podloga} from '../io/platno'

export default class Kvadrat {

  constructor(x, y, sirina, visina, boja) {
    this.x = x
    this.y = y
    this.sirina = sirina
    this.visina = visina
    this.fillstyle = boja
  }

  crta() {
    podloga.fillStyle = this.fillstyle
    podloga.fillRect(this.x, this.y, this.sirina, this.visina)
  }
}
