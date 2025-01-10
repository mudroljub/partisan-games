import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'

import Tenk from './Tenk.js'

export default class TenkLevo extends Tenk {
  constructor(params) {
    super(params)
    
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