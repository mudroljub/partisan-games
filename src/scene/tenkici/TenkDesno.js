import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'
import { randomInRange } from '/game-engine/utils.js'

import Tenk from './Tenk.js'

export default class TenkDesno extends Tenk {
  constructor({
    src = '2d-bocno/nemacki-tenk-bez-cevi.png',
    cevSlika = '2d-bocno/nemacki-tenk-cev.png',
    ...rest
  }) {
    super(src, { cevSlika, ...rest })
    this.x = randomInRange(platno.width * 0.7, platno.width) - 100
    this.ugao = Math.PI
    this.odrazX = this.odrazY = -1
    this.ime = 'Nemački tenk'
  }

  proveriPucanje() {
    super.proveriPucanje('Enter')
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