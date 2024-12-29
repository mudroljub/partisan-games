import { keyboard } from '/game-engine/io/Keyboard.js'
import { ctx } from '/game-engine/io/platno.js'
import Slika from '/game-engine/core/Slika.js'
import Projektil from './Projektil.js'

const MIN_UGAO = 0
const MAX_UGAO = 45
const MIN_SILA = 300

export default class Top {

  constructor(x, y) {
    this.x = x
    this.y = y
    this.sila = MIN_SILA
    this.postolje = new Slika('/assets/slike/2d-bocno/top-postolje.gif')
    this.postolje.onload = () => {
      this.postolje.x = this.x + (this.postolje.sirina / 2)
      this.postolje.y = this.y + (this.postolje.visina / 2)
    }
    this.cev = new Slika('/assets/slike/2d-bocno/top-cev.gif')
    this.cev.onload = () => {
      this.cev.x = this.x + (this.cev.sirina / 2)
    }
    this.cev.y = this.y
    this.cev.ugaoStepeni = 20
    this.projektil = new Projektil(this.cev)
  }

  puca() {
    this.projektil.puca(this.sila, this.cev.ugao)
    this.sila = MIN_SILA
  }

  /* UNOS */

  proveriTipke() {
    if (!this.projektil.ispaljen && keyboard.space)
      this.sila += 10
    else if (this.sila > MIN_SILA)
      this.puca()

    if (keyboard.up) this.cev.ugaoStepeni += 0.5
    if (keyboard.down) this.cev.ugaoStepeni -= 0.5
    if (this.cev.ugaoStepeni >= MAX_UGAO) this.cev.ugaoStepeni = MAX_UGAO
    if (this.cev.ugaoStepeni <= MIN_UGAO) this.cev.ugaoStepeni = MIN_UGAO
  }

  /* RENDER */

  crtaPostolje() {
    ctx.drawImage(this.postolje.slika, this.x, this.y)
  }

  crtaCev() {
    ctx.save()
    ctx.translate(this.cev.x + this.cev.sirina / 4, this.cev.y + this.cev.visina / 2)
    ctx.rotate(-this.cev.ugao)
    ctx.drawImage(this.cev.slika, -this.cev.sirina / 4, -this.cev.visina / 2)
    ctx.restore()
  }

  update(dt) {
    this.proveriTipke()
    this.projektil.update(dt)
    this.crtaCev()
    // this.crtaPostolje()
    this.postolje.crta()
  }
}
