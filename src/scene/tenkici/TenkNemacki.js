import TenkBocnoIgrac from './TenkBocnoIgrac'
import slikaTenkPodnozje from 'slike/2d-bocno/nemacki-tenk-bez-cevi.png'
import slikaTenkCev from 'slike/2d-bocno/nemacki-tenk-cev.png'

export default class TenkNemacki extends TenkBocnoIgrac  {

  constructor(x = 650, y = 450) {
    super(slikaTenkPodnozje, false, 82, 32)
    this.postaviCev(slikaTenkCev, 100, 7)
    this.polozaj(x, y)
  }

}
