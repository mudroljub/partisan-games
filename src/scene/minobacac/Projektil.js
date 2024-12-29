import { ctx } from '/game-engine/io/platno.js'

const GRAVITACIJA = 0.9

export default class Projektil {
  constructor(vlasnik, poluprec, boja = 'rgb(250,0,0)') {
    this.vlasnik = vlasnik
    this.poluprec = poluprec
    this.boja = boja
    this.ispaljeno = false
  }

  update() {
    if (!this.ispaljeno) return
    this.leti()
    this.crta()
  }

  pripremi() {
    this.dx = this.vlasnik.dx
    this.dy = this.vlasnik.dy
    this.x = this.vlasnik.vrhCeviX - this.dx
    this.y = this.vlasnik.vrhCeviY - this.dy
  }

  pali() {
    this.pripremi()
    this.ispaljeno = true
  }

  leti() {
    this.dy += GRAVITACIJA
    this.x += this.dx
    this.y += this.dy
  }

  crta() {
    ctx.fillStyle = this.boja
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.poluprec, 0, Math.PI * 2, true)
    ctx.fill()
  }

  sudara(predmet) {
    return (this.x >= predmet.x) && (this.x <= (predmet.x + predmet.sirina)) &&
      (this.y >= predmet.y) && (this.y <= (predmet.y + predmet.visina))
  }
}
