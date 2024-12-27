// predmet crta posredi, kvadrat od gore levo!
// ubaciti sliku minobacača
// bodovi, mozda pogoci prema pokušajima, mozda dva igraca

import Scena from '/game-engine/core/Scena.js'
import Predmet from '/game-engine/core/Predmet.js'
import Kvadrat from '/game-engine/core/Kvadrat.js'
import Minobacac from './Minobacac.js'

/** * KONFIG ***/

let brdo
let minobacac
let tlo

export default class MinobacacScena extends Scena {
  constructor(...args) {
    super(...args)
    this.init()
  }

  init() {
    brdo = new Predmet('/assets/slike/brdo.jpg', 85, 280, 500, 50)
    minobacac = new Minobacac(10, 280, 200, 20)
    tlo = new Kvadrat(0, 300, 600, 30, 'rgb(10,250,0)')
  }

  update() {
    this.cisti()
    brdo.crta()
    tlo.crta()
    minobacac.update()
    this.proveriPogodak()
  }

  proveriPogodak() {
    if (minobacac.projektil.sudara(brdo) || minobacac.projektil.sudara(tlo))
      // TODO: reset()
      this.stop()

  }
}
