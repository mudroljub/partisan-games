import { keyboard } from '/game-engine/io/Keyboard.js'
import { ctx } from '/game-engine/io/platno.js'
import Kvadrat from '/game-engine/core/Kvadrat.js'
import Projektil from './Projektil.js'

const POMERAJ_UGLA = 0.008
const POMERAJ_BRZINE = 0.3
const DJULE_POLUPRECNIK = 10

export default class Minobacac extends Kvadrat {

  constructor(x, y, sirina, visina, boja = 'rgb(40,40,0)') {
    super(x, y, sirina, visina, boja)
    this.ugao = 0.5
    this.brzina = 20
    this.projektil = new Projektil(this, DJULE_POLUPRECNIK)
  }

  update() {
    this.proveriTipke()
    this.projektil.update()
    this.crta()
  }

  crta() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(-this.ugao)
    ctx.translate(-this.x, -this.y)
    super.crta()
    ctx.restore()
  }

  dajDx() {
    return this.brzina * Math.cos(this.ugao)
  }

  dajDy() {
    return -this.brzina * Math.sin(this.ugao)
  }

  dajVrhCeviX() {
    return this.x + this.sirina * Math.cos(this.ugao)
  }

  dajVrhCeviY() {
    return this.y + (this.visina * 0.5) - this.sirina * Math.sin(this.ugao)
  }

  pali() {
    this.projektil.pali()
  }

  proveriTipke() {
    if (keyboard.space) this.pali()
    if (keyboard.up) this.ugao += POMERAJ_UGLA
    if (keyboard.down) this.ugao -= POMERAJ_UGLA
    if (keyboard.left) this.brzina -= POMERAJ_BRZINE
    if (keyboard.right) this.brzina += POMERAJ_BRZINE
    if (this.brzina <= 0) this.brzina = 0
  }
}
