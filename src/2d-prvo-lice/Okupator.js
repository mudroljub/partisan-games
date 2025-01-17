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
    this.smer = this.ugao
  }

  patroliraj() {
    if (this.x <= this.limitLevo) this.smer = 0
    if (this.x >= this.limitDesno) this.smer = Math.PI
    this.hodaj(this.smer == 0 ? 'nadesno' : 'nalevo', this.smer)
  }

  hodaj(naziv, ugao) {
    this.dodeliAnimaciju(naziv)
    this.skreni(ugao)
  }

  proveriPogodak() {
    if (mish.iznad(this)) this.umri()
  }

  umri() {
    super.umri()
    this.dodeliAnimaciju('umire', false)
  }

  update(dt) {
    super.update(dt)
    if (this.ziv)
    this.patroliraj()
  }
}
