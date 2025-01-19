import Sprite from '/game-engine/core/Sprite.js'
import platno, { ctx } from '/game-engine/io/platno.js'
import mish from '/game-engine/io/mish.js'
import Vreme from '/game-engine/core/Vreme.js'
import { randomInRange } from '/game-engine/utils.js'

export default class Okupator extends Sprite {
  constructor({ callback } = {}) {
    super ('sprajtovi/vojnici/okupator-sprite.png', {
      imena: ['nagore', 'nadole', 'nalevo', 'nadesno', 'umire'], brojKadrova: 5, sirina: 50, visina: 180
    })
    this.y = platno.height * .75
    this.callback = callback
    this.pucanjeSlika = new Image()
    this.pucanjeSlika.src = 'assets/slike/pucanje.png'
    this.pokaziPucanje = false
    this.vreme = new Vreme()
    this.vremeHodanja = randomInRange(1000, 2500)
    this.postaviNasumicno()
  }

  proveriPogodak() {
    if (mish.iznad(this)) this.umri()
  }

  postaviNasumicno() {
    this.x = Math.random() * platno.sirina
    this.imeAnimacije = this.x < platno.sirina / 2 ? 'nadesno' : 'nalevo'
    this.brzina = this.x < platno.sirina / 2 ? 200 : -200
  }

  hodaj() {
    this.dodeliAnimaciju(this.imeAnimacije)
  }

  pucaj(dt) {
    this.dodeliAnimaciju('nadole', false)
    this.stani()
    this.pokaziPucanje = true
    if (this.callback) this.callback(dt)
  }

  umri() {
    super.umri()
    this.pokaziPucanje = false
    this.dodeliAnimaciju('umire', false)
  }

  render() {
    super.render()
    if (this.pokaziPucanje) ctx.drawImage(this.pucanjeSlika, this.x - 15, this.y - 25)
  }

  update(dt, t) {
    super.update(dt, t)
    if (!this.ziv) return

    if (this.vreme.proteklo < this.vremeHodanja)
      this.hodaj()
    else
      this.pucaj(dt)
  }
}
