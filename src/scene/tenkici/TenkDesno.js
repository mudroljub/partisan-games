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
    this.cev.ugao = Math.PI * 1.1
  }

  proveriGranice() {
    this.x = Math.min(Math.max(this.x, platno.width / 2), platno.width)
  }

  proveriPucanje() {
    super.proveriPucanje('Enter')
  }

  diziCev() {
    if (this.cev.ugao <= Math.PI * 1.2) this.cev.ugao += 0.01
  }

  spustajCev() {
    if (this.cev.ugao >= Math.PI) this.cev.ugao -= 0.01
  }

  proveriTipke() {
    if (keyboard.pressed.ArrowLeft && this.x > platno.width / 2)
      this.dodajSilu(this.potisak, Math.PI)
    if (keyboard.pressed.ArrowRight && this.x < platno.width)
      this.dodajSilu(this.potisak * 0.6, 0)
    if (keyboard.pressed.ArrowUp)
      this.diziCev()
    if (keyboard.pressed.ArrowDown)
      this.spustajCev()
  }

  azurirajCev() {
    this.cev.x = this.x - this.sirina * 0.14
    this.cev.y = this.y - this.visina * 0.2
  }
}