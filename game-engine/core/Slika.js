import { ctx } from '../io/platno.js'
import Kompozit from '/game-engine/core/Kompozit.js'

export default class Slika extends Kompozit {

  constructor(src, { sirina, visina, x = 200, y = 200, skalar = 1 } = {}) {
    super(x, y)
    this.slika = new Image()
    this.ugao = 0
    this.sirina = sirina
    this.visina = visina

    this.slika.onload = () => {
      if (!sirina && !visina) {
        this.sirina = this.slika.naturalWidth * skalar
        this.visina = this.slika.naturalHeight * skalar
      }
      this.onload()
      this.slika.onload = null
    }
    this.slika.src = src
  }

  onload() {} // implementiraju naslednici

  zameniSliku(src) {
    this.slika.src = src
  }

  /* POLOZAJ */

  polozaj(x, y) {
    this.x = x
    this.y = y
  }

  tlo(y) {
    this.y = y - this.visina / 2
  }

  /* UGAO */

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

  velicina(sirina, visina) {
    this.sirina = sirina
    this.visina = visina
  }

  prevelicaj(procenat) {
    this.sirina *= procenat
    this.visina *= procenat
  }

  render() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.ugao)
    ctx.drawImage(this.slika, -this.sirina / 2, -this.visina / 2, this.sirina, this.visina)
    ctx.restore()
  }

  update() {
    this.render()
  }
}
