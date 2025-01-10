import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'
import Tenk from './Tenk.js'

export default class TenkDesno extends Tenk {
  constructor(params) {
    super(params)
  }

  proveriTipke() {
    if (keyboard.pressed.ArrowLeft && this.x > platno.width / 2)
      this.dodajSilu(this.potisak, Math.PI)
    if (keyboard.pressed.ArrowRight && this.x < platno.width)
      this.dodajSilu(this.potisak * 0.6, 0)
    if (keyboard.pressed.ArrowUp)
      this.cev.nagore()
    if (keyboard.pressed.ArrowDown)
      this.cev.nadole()
  }

}