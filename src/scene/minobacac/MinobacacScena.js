// ubaciti sliku minobacača
// bodovi, mozda pogoci prema pokušajima, mozda dva igraca

import Scena from '/game-engine/core/Scena.js'
import Kvadrat from '/game-engine/core/Kvadrat.js'
import Minobacac from './Minobacac.js'

export default class MinobacacScena extends Scena {
  constructor(...args) {
    super(...args)
    this.init()
  }

  init() {
    this.brdo = new Kvadrat(600, 0, 100, 250, 'black')
    this.tlo = new Kvadrat(0, 300, 600, 30, 'green')
    this.minobacac = new Minobacac(10, 280, 200, 20)
  }

  update() {
    this.cisti()
    this.brdo.crta()
    this.tlo.crta()
    this.minobacac.update()
    this.proveriPogodak()
  }

  proveriPogodak() {
    if (this.minobacac.projektil.sudara(this.brdo))
      console.log('pogodak')
  }
}
