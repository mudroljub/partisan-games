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
    this.ime = 'Partizanski tenk'
    this.cev.ugao = Math.PI * 1.9
  }

  proveriGranice() {
    this.x = Math.min(Math.max(this.x, 0), platno.width / 2)
  }

  proveriPucanje() {
    super.proveriPucanje('Space')
  }

  diziCev() {
    if (this.cev.ugao <= Math.PI || this.cev.ugao >= Math.PI * 1.8) this.cev.ugao -= 0.01
  }

  spustajCev() {
    if (this.cev.ugao >= Math.PI) this.cev.ugao += 0.01
  }

  proveriTipke() {
    if (keyboard.pressed.KeyA && this.x > 0)
      this.dodajSilu(this.potisak * 0.6, Math.PI)
    if (keyboard.pressed.KeyD && this.x < platno.width / 2)
      this.dodajSilu(this.potisak, 0)
    if (keyboard.pressed.KeyW)
      this.diziCev()
    if (keyboard.pressed.KeyS)
      this.spustajCev()
  }

  azurirajCev() {
    this.cev.x = this.x * 1.01
    this.cev.y = this.y - this.visina * 0.33
  }
}