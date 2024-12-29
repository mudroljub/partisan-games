import { ctx } from '/game-engine/io/platno.js'

const GRAVITACIJA = 0.9

export default class Projektil {
  constructor() {
    this.poluprecnik = 9
    this.boja = 'black'
    this.ispaljeno = false
  }

  pali(sila, ugao) {
    this.ispaljeno = true
    this.dx = sila * Math.cos(ugao)
    this.dy = -sila * Math.sin(ugao)
  }

  leti(dt) {
    this.dy += GRAVITACIJA
    this.x += this.dx
    this.y += this.dy
  }

  sudara(predmet) {
    return (this.x >= predmet.x) && (this.x <= (predmet.x + predmet.sirina)) &&
      (this.y >= predmet.y) && (this.y <= (predmet.y + predmet.visina))
  }

  crta() {
    ctx.fillStyle = this.boja
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.poluprecnik, 0, Math.PI * 2, true)
    ctx.fill()
  }

  update(dt) {
    if (!this.ispaljeno) return
    this.leti(dt)
    this.crta()
  }
}
