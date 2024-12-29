import { keyboard } from '/game-engine/io/Keyboard.js'
import Kvadrat from '/game-engine/core/Kvadrat.js'
import Projektil from './Projektil.js'

const POMERAJ_UGLA = 0.008
const KORAK_SILE = 3

export default class Minobacac extends Kvadrat {

  constructor(x, y, sirina, visina, boja = 'rgb(40,40,0)') {
    super(x, y, sirina, visina, boja)
    this.ugao = 0.5
    this.sila = 500
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
  }

  proveriTipke() {
    if (keyboard.space) this.pali()
    if (keyboard.up) this.ugao += POMERAJ_UGLA
    if (keyboard.down) this.ugao -= POMERAJ_UGLA

    if (keyboard.left) this.sila -= KORAK_SILE
    if (keyboard.right) this.sila += KORAK_SILE
    if (this.sila <= 0) this.sila = 0
  }

  update(dt) {
    this.proveriTipke()
    this.projektil.update(dt)
    this.render()
  }
}
