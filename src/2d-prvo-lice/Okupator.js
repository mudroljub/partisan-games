import Animiran from 'core/Animiran'
import platno from 'io/platno'
import mish from 'io/mish'
import okupatorSprite from 'slike/sprajtovi/okupator-sprite.png'

export default class Okupator extends Animiran {

  constructor() {
    super (okupatorSprite, ['nagore', 'nadole', 'nalevo', 'nadesno', 'umire'], 5)
    this.sirina = 50
    this.visina = 180
    this.brzina = 4
    this.limitLevo = platno.width * 1/6
    this.limitDesno = platno.width * 5/6
    this.polozaj(this.limitLevo, 450)
    this.duzinaAnimacije = 500
  }

  patroliraj() {
    if (this.x <= this.limitLevo) this.hodaj('nadesno', 0)
    if (this.x >= this.limitDesno) this.hodaj('nalevo', 180)
  }

  hodaj(imeAnimacije, ugao) {
    this.postaviAnimaciju(imeAnimacije)
    this.ugaoKretanja = ugao
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
