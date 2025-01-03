import TenkBocnoIgrac from './TenkBocnoIgrac.js'

export default class TenkPartizanski extends TenkBocnoIgrac {

  constructor(x = 100, nivoTla = 450) {
    super('/assets/slike/2d-bocno/partizanski-tenk-bez-cevi.png', true, 75, 32)
    this.postaviCev('/assets/slike/2d-bocno/partizanski-tenk-cev.png', 100, 7)
    this.polozaj(x, nivoTla)
  }
}
