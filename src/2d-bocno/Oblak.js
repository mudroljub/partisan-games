import * as _ from '/game-engine/utils.js'
import Predmet from '/game-engine/core/Predmet.js'
import platno from '/game-engine/io/platno.js'

export default class Oblak extends Predmet {

  constructor(sirina, visina, src = '/assets/slike/oblak.gif') {
    super(src, sirina, visina)
    this.dy = Math.random() * 2 - 1
    this.procenatVracanja = 1
  }

  onload() {
    this.polozaj(Math.random() * platno.width, _.randomRange(0, platno.height - this.visina))
  }

  proveriGranice() {
    if (this.y < -platno.height) this.dy = -this.dy  // dozvoljena visina dve scene
    if (this.y > platno.height - this.visina) this.dy = -this.dy
    this.vracaVodoravno()
  }
}
