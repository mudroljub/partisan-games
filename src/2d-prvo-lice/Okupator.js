import Sprite from '/game-engine/core/Sprite.js'
import platno from '/game-engine/io/platno.js'
import mish from '/game-engine/io/mish.js'

export default class Okupator extends Sprite {
  constructor() {
    super ('sprajtovi/okupator-sprite.png', {
      imena: ['nagore', 'nadole', 'nalevo', 'nadesno', 'umire'], brojKadrova: 5, sirina: 50, visina: 180
    })
    this.brzina = 200
    this.limitLevo = platno.width * .15
    this.limitDesno = platno.width * .85
    this.polozaj = { x: this.limitLevo, y: platno.height * .75 }
  }

  patroliraj() {
    if (this.x <= this.limitLevo) this.hodaj('nadesno', 0)
    if (this.x >= this.limitDesno) this.hodaj('nalevo', Math.PI)
  }

  hodaj(naziv, ugao) {
    this.pustiAnimaciju(naziv)
    this.skreni(ugao)
  }

  proveriPogodak() {
    if (mish.iznad(this)) this.umri()
  }

  umri() {
    super.umri()
    this.pustiAnimaciju('umire', false)
  }
}
