import { podloga } from '../io/platno.js'

export default class Slika {

  constructor(src, sirina, visina, x = 200, y = 200) {
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

  /* VELICINA */

  velicina(sirina, visina) {
    this.sirina = sirina
    this.visina = visina
  }

  prevelicaj(procenat) {
    this.sirina *= procenat
    this.visina *= procenat
  }

  crta() {
    podloga.save()
    podloga.translate(this.x, this.y)
    podloga.rotate(this.ugao)
    podloga.scale(this.skalarX, this.skalarY)
    podloga.drawImage(this.slika, -this.sirina / 2, -this.visina / 2, this.sirina, this.visina)
    podloga.restore()
  }
}
