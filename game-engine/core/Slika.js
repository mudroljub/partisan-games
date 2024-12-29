import { ctx } from '../io/platno.js'

export default class Slika {

  constructor(src, x = 200, y = 200, sirina, visina) {
    this.slika = new Image()
    this.sirina = sirina
    this.visina = visina
    this.x = x
    this.y = y
    this.ugao = 0
    this.skalarX = 1
    this.skalarY = 1

    this.slika.onload = () => {
      if (!sirina && !visina) {
        this.sirina = this.slika.naturalWidth
        this.visina = this.slika.naturalHeight
      }
      this.onload() // implementiraju naslednici kad im trebaju širina i visina
      this.slika.onload = null
    }
    this.slika.src = src
  }

  onload() {}

  polozaj(x, y) {
    this.x = x
    this.y = y
  }

  zameniSliku(src) {
    this.slika.src = src
  }

  get ugao() {
    return this._ugao
  }

  set ugao(noviUgao) {
    this._ugao = noviUgao % (Math.PI * 2)
    // this.azurirajSilu()
  }

  get ugaoStepeni() {
    return this.ugao * 180 / Math.PI
  }

  set ugaoStepeni(ugaoRadijani) {
    this.ugao = ugaoRadijani * Math.PI / 180
  }

  /* VELICINA */

  set skalar(procenat) {
    this.skalarX = this.skalarY = procenat
  }

  velicina(sirina, visina) {
    this.sirina = sirina
    this.visina = visina
  }

  prevelicaj(procenat) {
    this.sirina *= procenat
    this.visina *= procenat
  }

  crta() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.ugao)
    ctx.scale(this.skalarX, this.skalarY)
    ctx.drawImage(this.slika, -this.sirina / 2, -this.visina / 2, this.sirina, this.visina)
    ctx.restore()
  }
}
