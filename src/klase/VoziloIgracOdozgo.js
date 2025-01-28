import Igrac from '/core/actor/Igrac.js'

export default class VoziloIgracOdozgo extends Igrac {

  constructor(src, param = {}) {
    super(src, param)
    this.potisak = 125
    this.faktorTrenja = 0.3
    this.komandeNapredne = true
  }

  proveriGranice() {
    this.odbija()
  }
}
