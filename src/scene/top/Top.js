import { keyboard } from '/game-engine/io/Keyboard.js'
import { platno, podloga } from '/game-engine/io/platno.js'
import Slika from '/game-engine/core/Slika.js'
import Projektil from './Projektil.js'

const MIN_UGAO = 0
const MAX_UGAO = 65
const MIN_BRZINA = 20

export default class Top {

  constructor(x = platno.width / 8, y = platno.height / 2) {
    this.x = x
    this.y = y
    this.ugao = 20
    this.brzina = 30
    this.postolje = new Slika('/assets/slike/2d-bocno/top-postolje.gif')
    this.cev = new Slika('/assets/slike/2d-bocno/top-cev.gif')
    this.cev.onload = () => {
      this.cev.x = this.x + (this.cev.slika.width / 2)
    }
    this.cev.y = this.y
    this.projektil = new Projektil(this)
  }

  puca() {
    this.projektil.ispaljen = true
  }

  /* UNOS */

  proveriTipke() {
    if (keyboard.space) this.puca()

    if (keyboard.left && !this.projektil.ispaljen) this.brzina--
    if (keyboard.right && !this.projektil.ispaljen) this.brzina++
    if (this.brzina <= MIN_BRZINA) this.brzina = MIN_BRZINA

    if (keyboard.up) this.ugao += 0.5
    if (keyboard.down) this.ugao -= 0.5
    if (this.ugao >= MAX_UGAO) this.ugao = MAX_UGAO
    if (this.ugao <= MIN_UGAO) this.ugao = MIN_UGAO
  }

  /* RENDER */

  crtaPostolje() {
    podloga.drawImage(this.postolje.slika, this.x, this.y)
  }

  crtaCev() {
    podloga.save()
    podloga.translate(this.cev.x + this.cev.sirina / 4, this.cev.y + this.cev.visina / 2)
    podloga.rotate(-this.ugao * Math.PI / 180)
    podloga.drawImage(this.cev.slika, -this.cev.sirina / 4, -this.cev.visina / 2)
    podloga.restore()
  }

  update() {
    this.proveriTipke()
    this.projektil.update()
    this.projektil.crta()
    this.crtaCev()
    this.crtaPostolje()
  }
}
