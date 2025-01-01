import Animiran from '/game-engine/core/Animiran.js'
import platno from '/game-engine/io/platno.js'
import mish from '/game-engine/io/mish.js'

export default class Okupator extends Animiran {
  constructor() {
    super ('/assets/slike/sprajtovi/okupator-sprite.png', ['nagore', 'nadole', 'nalevo', 'nadesno', 'umire'], 5)
    this.sirina = 50
    this.visina = 180
    this.brzina = 4
    this.limitLevo = platno.width * 1 / 6
    this.limitDesno = platno.width * 5 / 6
    this.polozaj(this.limitLevo, 450)
    this.duzinaAnimacije = 500
  }

  patroliraj() {
    if (this.x <= this.limitLevo) this.hodaj('nadesno', 0)
    if (this.x >= this.limitDesno) this.hodaj('nalevo', Math.PI)
  }

  hodaj(imeAnimacije, ugao) {
    if (!this.animacije) return
    this.postaviAnimaciju(imeAnimacije)
    this.skreni(ugao)
  }

  proveriPogodak() {
    if (mish.iznad(this)) this.umri()
  }

  umri() {
    super.umri()
    this.postaviAnimaciju('umire')
    this.nePonavljaAnimaciju('umire')
  }
}
