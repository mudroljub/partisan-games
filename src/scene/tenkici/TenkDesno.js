import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'
import { randomInRange } from '/game-engine/utils.js'
import Tenk from './Tenk.js'

export default class TenkDesno extends Tenk {
  constructor({
    src = '2d-bocno/nemacki-tenk-bez-cevi.png',
    cevSlika = '2d-bocno/nemacki-tenk-cev.png',
    x = randomInRange(platno.width * 0.7, platno.width) - 100,
    ...rest
  }) {
    super(src, { cevSlika, x, ...rest })
    this.ugao = Math.PI
    this.ime = 'Nemački tenk'
    this.odrazX = this.odrazY = -1
    this.cev.ugao = Math.PI * 1.1
    this.cev.ishodiste = 'DOLE_DESNO'
    this.cev.odrazY = -1
    this.ai = true
  }

  proveriGranice() {
    this.x = Math.min(Math.max(this.x, platno.width / 2), platno.width)
  }

  diziCev() {
    if (this.cev.ugao <= Math.PI * 1.2) this.cev.ugao += 0.01
  }

  spustajCev() {
    if (this.cev.ugao >= Math.PI) this.cev.ugao -= 0.01
  }

  proveriTipke() {
    if (this.ai) return

    if (keyboard.pressed.ArrowLeft && this.x > platno.width / 2)
      this.dodajSilu(this.potisak, Math.PI)
    if (keyboard.pressed.ArrowRight && this.x < platno.width)
      this.dodajSilu(this.potisak * 0.6, 0)
    if (keyboard.pressed.ArrowUp)
      this.diziCev()
    if (keyboard.pressed.ArrowDown)
      this.spustajCev()

    this.pokusajPucanje('Enter')
  }

  azurirajCev() {
    this.cev.x = this.x - this.sirina * .12
    this.cev.y = this.y - this.visina * 0.35
  }
}