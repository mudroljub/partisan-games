import Kompozit from '/game-engine/core/Kompozit.js'
import TopPostolje from './TopPostolje.js'
import TopCev from './TopCev.js'
import Posada from './Posada.js'

const skalar = .75

export default class Top extends Kompozit {
  constructor(x, y) {
    super(x, y)
    this.pocetniX = x
    this.cev = new TopCev(40, -32, skalar, () => this.trza())
    const postolje = new TopPostolje(0, 0, skalar)
    this.posada = new Posada(-80, 8)
    this.dodaj(this.cev, postolje, this.posada)
  }

  get sila() {
    return this.cev.sila
  }

  trza() {
    this.x -= 5
    this.posada.trza()
  }

  update(dt) {
    if (this.x < this.pocetniX) this.x += 20 * dt
  }
}
