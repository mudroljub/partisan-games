import Kompozit from '/game-engine/core/Kompozit.js'
import { ctx } from '../io/platno.js'
import {pitagora} from '../utils.js'

export default class Slika extends Kompozit {
  #ugao = 0
  #odrazY = 1
  #odrazX = 1

  constructor(src, { sirina, visina, x = 200, y = 200, skalar = 1 } = {}) {
    super(x, y)
    this.slika = new Image()
    this.slika.onload = () => {
      this.srediVelicinu(sirina, visina, skalar)
      this.onload()
      this.slika.onload = null
    }
    this.slika.src = src
    this.centrirano = true
    this.vidljiv = true
    this.ziv = true
    this.brzina = 0
    this.oznake = new Set()
    this.debug = false
  }

  srediVelicinu = (sirina, visina, skalar) => {
    if (!sirina && !visina) {
      this.sirina = this.slika.naturalWidth * skalar
      this.visina = this.slika.naturalHeight * skalar
    } else if (sirina && !visina)
      this.visina = (sirina / this.slika.naturalWidth) * this.slika.naturalHeight
    else if (!sirina && visina)
      this.sirina = (visina / this.slika.naturalHeight) * this.slika.naturalWidth
  }

  onload() {} // callback

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
    return this.#ugao
  }

  set ugao(noviUgao) {
    this.#ugao = (noviUgao + Math.PI * 2) % (Math.PI * 2)
  }

  get ugaoStepeni() {
    return this.ugao * 180 / Math.PI
  }

  set ugaoStepeni(ugaoRadijani) {
    this.ugao = ugaoRadijani * Math.PI / 180
  }

  /* VELICINA */

  get dijagonala() {
    return pitagora(0, this.sirina, 0, this.visina)
  }

  /* VIDLJIVOST */

  pokazi() {
    this.vidljiv = true
  }

  sakrij() {
    this.vidljiv = false
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

  /* LOOP */

  crtaOblik() {
    ctx.fillStyle = 'black'
    if (this.centrirano)
      ctx.fillRect(-this.sirina / 2, -this.visina / 2, this.sirina, this.visina)
    else
      ctx.fillRect(0, 0, this.sirina, this.visina)
  }

  crtaSliku() {
    if (this.centrirano)
      ctx.drawImage(this.slika, -this.sirina / 2, -this.visina / 2, this.sirina, this.visina)
    else
      ctx.drawImage(this.slika, 0, 0, this.sirina, this.visina)
  }

  render() {
    if (!this.vidljiv) return

    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.ugao)
    ctx.scale(this.odrazY, this.odrazX)
    if (this.debug)
      this.crtaOblik()
    else
      this.crtaSliku()
    ctx.restore()
  }

  update() {
    this.render()
  }
}
