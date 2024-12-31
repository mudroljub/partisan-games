import { ctx } from '../io/platno.js'
import Kompozit from '/game-engine/core/Kompozit.js'

export default class Slika extends Kompozit {
  #ugao = 0
  #odrazY = 1
  #odrazX = 1

  constructor(src, { sirina, visina, x = 200, y = 200, skalar = 1 } = {}) {
    super(x, y)
    this.slika = new Image()
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

  /* ODRAZ */

  get odrazY() {
    return this.#odrazY
  }

  set odrazY(bul) {
    this.#odrazY = bul ? -1 : 1
  }

  get odrazX() {
    return this.#odrazX
  }

  set odrazX(bul) {
    this.#odrazX = bul ? -1 : 1
  }

  /* UGAO */

  get ugao() {
    return this.#ugao
  }

  set ugao(noviUgao) {
    this.#ugao = noviUgao % (Math.PI * 2)
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

  /* LOOP */

  render() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.ugao)
    ctx.scale(this.odrazY, this.odrazX)
    ctx.drawImage(this.slika, -this.sirina / 2, -this.visina / 2, this.sirina, this.visina)
    ctx.restore()
  }

  update() {
    this.render()
  }
}
