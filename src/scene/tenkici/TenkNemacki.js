import TenkBocnoIgrac from './TenkBocnoIgrac.js'

export default class TenkNemacki extends TenkBocnoIgrac {

  constructor(x = 650, y = 450) {
    super('/assets/slike/2d-bocno/nemacki-tenk-bez-cevi.png', false, 82, 32)
    this.postaviCev('/assets/slike/2d-bocno/nemacki-tenk-cev.png', 100, 7)
    this.polozaj(x, y)
  }

}
