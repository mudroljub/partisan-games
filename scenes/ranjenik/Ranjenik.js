import Igrac from '/core/actor/Igrac.js'

export default class Ranjenik extends Igrac {
  constructor(x, y) {
    super('slicice/ranjeni-partizan.png', { x, y })
    this.komandeNapredne = true
    this.potisak = 3
    this.okret = 0.01
  }

  proveriGranice() {
    this.ograniciUspravno()
  }
}
