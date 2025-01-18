import Sprite from '/game-engine/core/Sprite.js'
import platno from '/game-engine/io/platno.js'
import mish from '/game-engine/io/mish.js'

export default class Okupator extends Sprite {
  constructor({ callback } = {}) {
    super ('sprajtovi/vojnici/okupator-sprite.png', {
      imena: ['nagore', 'nadole', 'nalevo', 'nadesno', 'umire'], brojKadrova: 5, sirina: 50, visina: 180
    })
    this.brzina = 200
    this.limitLevo = platno.width * .15
    this.limitDesno = platno.width * .85
    this.polozaj = { x: this.limitLevo, y: platno.height * .75 }
    this.smer = this.ugao
    this.callback = callback
  }

  proveriPogodak() {
    if (mish.iznad(this)) this.umri()
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

  pucaj() {
    this.dodeliAnimaciju('nadole', false)
    this.stani()
    if (this.callback) this.callback()
  }

  umri() {
    super.umri()
    this.dodeliAnimaciju('umire', false)
  }

  update(dt, t) {
    super.update(dt, t)
    if (!this.ziv) return

    if (t < 3)
      this.patroliraj()
    else
      this.pucaj()
  }
}
