import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'
import { randomInRange } from '/game-engine/utils.js'

import Tenk from './Tenk.js'

export default class TenkLevo extends Tenk {
  constructor({
    src = '2d-bocno/partizanski-tenk-bez-cevi.png',
    cevSlika = '2d-bocno/partizanski-tenk-cev.png',
    ...rest
  } = {}) {
    super(src, { cevSlika, ...rest })

    this.x = randomInRange(0, platno.width * 0.3)
  }

  proveriTipke() {
    if (keyboard.pressed.KeyA && this.x > 0)
      this.dodajSilu(this.potisak * 0.6, Math.PI)
    if (keyboard.pressed.KeyD && this.x < platno.width / 2)
      this.dodajSilu(this.potisak, 0)
    if (keyboard.pressed.KeyW)
      this.cev.nagore()
    if (keyboard.pressed.KeyS)
      this.cev.nadole()
  }

}