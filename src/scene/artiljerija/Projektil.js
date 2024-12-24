import {podloga} from 'io/platno'

const GRAVITACIJA = 0.9

export default class Projektil {
  constructor(vlasnik, poluprec, boja='rgb(250,0,0)') {
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
    this.dx = this.vlasnik.dajDx()
    this.dy = this.vlasnik.dajDy()
    this.x = this.vlasnik.dajVrhCeviX() - this.dx
    this.y = this.vlasnik.dajVrhCeviY() - this.dy
  }

  pali() {
    this.pripremi()
    this.ispaljeno = true
  }

  leti() {
    this.dy = this.dy + GRAVITACIJA
    this.x += this.dx
    this.y += this.dy
  }

  crta() {
    podloga.fillStyle = this.boja
    podloga.beginPath()
    podloga.arc(this.x, this.y, this.poluprec, 0, Math.PI * 2, true)
    podloga.fill()
  }

  sudara(predmet) {
    return (this.x >= predmet.x) && (this.x <= (predmet.x + predmet.sirina)) &&
      (this.y >= predmet.y) && (this.y <= (predmet.y + predmet.visina))
  }
}
