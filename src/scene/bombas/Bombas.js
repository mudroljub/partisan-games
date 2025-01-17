import Igrac from '/game-engine/core/Igrac.js'
import Sprite from '/game-engine/core/Sprite.js'

export default class Bombas extends Igrac {

  constructor({ x = 100, y = 100 } = {}) {
    super('2d-bocno/partizani/vojnici/bombasi/partizan-bombas.gif', { x, y })
    this.potisak = 75
    this.faktorTrenja = 0.3
    this.krv = new Sprite('sprajtovi/efekti/krv-mala.png', {
      imena: ['prska'], brojKadrova: 8, vremeAnimacije: .4,
    })
  }

  puca() {
    console.log('bacaBombu')
  }

  reagujNaPogodak() {
    super.umri()
    this.krv.dodeliAnimaciju('prska', false)
  }

  update(dt) {
    super.update(dt)
    this.krv.x = this.x + 5
    this.krv.y = this.y - 10
  }

  render(dt, t) {
    super.render()
    if (!this.ziv)
      this.krv.render(dt, t)
  }
}
