import platno from '/game-engine/io/platno.js'
import TenkBocnoIgrac from './TenkBocnoIgrac.js'

export default class TenkNemacki extends TenkBocnoIgrac {

  constructor(x = 650, y = 450) {
    super('/assets/slike/2d-bocno/nemacki-tenk-bez-cevi.png', false, 82, 32)
    this.postaviCev('/assets/slike/2d-bocno/nemacki-tenk-cev.png', 100, 7)
    this.polozaj(x, y)
    this.oznake.delete('igrac')
  }

  mrdaNasumicno() {
    this.brzina = Math.random() * 10 - 5
    if (this.x >= 600) {
      this.brzina = Math.random() * 10 - 5
      this.skreni(Math.PI)
    }
    if (this.x >= platno.width - 10)
      this.x = platno.width - 10

    if (this.x <= 450) {
      this.brzina = Math.random() * 10 - 5
      this.skreni(0)
    }
  }
}
