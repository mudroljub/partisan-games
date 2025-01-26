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
    this.pripucao = false
    this.vreme = new Vreme()
    this.vremeHodanja = randomInRange(700, 3200)
    this.kreni()
  }

  kreni() {
    const izlaziLevo = Math.random() > .5
    this.x = izlaziLevo ? 0 : platno.width
    this.defaultAnimacija = izlaziLevo ? 'nadesno' : 'nalevo'
    this.brzina = izlaziLevo ? 200 : -200
  }

  pucaj(dt) {
    this.dodeliAnimaciju('nadole', false)
    this.stani()
    this.pripucao = true
    if (this.callback) this.callback(dt)
  }

  proveriPogodak(callback) {
    if (!mish.iznad(this)) return
    this.umri()
    if (callback) callback()
  }

  umri() {
    super.umri()
    this.pripucao = false
    this.dodeliAnimaciju('umire', false)
  }

  render() {
    super.render()
    if (this.pripucao)
      ctx.drawImage(this.pucanjeSlika, this.x - 15, this.y - 25)
  }

  update(dt, t) {
    super.update(dt, t)
    if (!this.ziv) return

    if (this.vreme.proteklo > this.vremeHodanja)
      this.pucaj(dt)
  }
}
