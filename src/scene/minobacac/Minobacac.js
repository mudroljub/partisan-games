import { keyboard } from '/game-engine/io/Keyboard.js'
import Kvadrat from '/game-engine/core/Kvadrat.js'
import Projektil from './Projektil.js'

const POMERAJ_UGLA = 0.008
const KORAK_SILE = 3

export default class Minobacac extends Kvadrat {

  constructor(x, y, sirina, visina, boja = 'rgb(40,40,0)') {
    super(x, y, sirina, visina, boja)
    this.ugao = 0.5
    this.sila = this.minSila = 400
    this.projektil = new Projektil()
  }

  get vrhCeviX() {
    return this.x + this.sirina * Math.cos(this.ugao)
  }

  get vrhCeviY() {
    return this.y + this.visina * 0.5 - this.sirina * Math.sin(this.ugao)
  }

  pripremi() {
    this.projektil.x = this.vrhCeviX
    this.projektil.y = this.vrhCeviY
  }

  pali() {
    this.pripremi()
    this.projektil.pali(this.sila, this.ugao)
    this.sila = this.minSila
  }

  proveriTipke() {
    if (!this.projektil.ispaljen && keyboard.space)
      this.sila += KORAK_SILE
    else if (this.sila > this.minSila)
      this.pali()

    if (keyboard.up || keyboard.left)
      this.ugao += POMERAJ_UGLA
    if (keyboard.down || keyboard.right)
      this.ugao -= POMERAJ_UGLA
  }

  update(dt) {
    this.proveriTipke()
    this.projektil.update(dt)
  }
}
