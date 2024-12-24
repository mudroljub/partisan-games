import TenkBocnoIgrac from './TenkBocnoIgrac'
import slikaTenkPodnozje from 'slike/2d-bocno/partizanski-tenk-bez-cevi.png'
import slikaTenkCev from 'slike/2d-bocno/partizanski-tenk-cev.png'

export default class TenkPartizanski extends TenkBocnoIgrac  {

  constructor(x = 100, nivoTla = 450) {
    super(slikaTenkPodnozje, true, 75, 32)
    this.postaviCev(slikaTenkCev, 100, 7)
    this.polozaj(x, nivoTla)
  }

}
