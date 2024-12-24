import VoziloIgracOdozgo from 'src/2d-odozgo/VoziloIgracOdozgo'
import slikaTenk from 'slike/2d-odozgo/tenk-rdjavi.gif'

export class TenkIgracOdozgo extends VoziloIgracOdozgo {

  constructor() {
    super(slikaTenk, 168, 70)
    this.prohodnost = 0.7
  }

}
