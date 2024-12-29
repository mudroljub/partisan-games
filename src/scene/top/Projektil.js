import { platno, podloga } from '/game-engine/io/platno.js'

export default class Projektil {
  constructor(vlasnik) {
    this.x = 0
    this.y = 0
    this.ispaljen = false
    this.vlasnik = vlasnik
  }

  get jeVanEkrana() {
    return this.x > platno.width || this.y > platno.height
  }

  reset() {
    this.ispaljen = false
  }

  crta() {
    if (!this.ispaljen) return
    podloga.fillStyle = 'black'
    podloga.beginPath()
    podloga.arc(this.x, this.y, 5, 0, Math.PI * 2)
    podloga.fill()
  }

  leti() {
    this.x += this.vlasnik.brzina * Math.cos(this.vlasnik.ugao * Math.PI / 180)
    this.y -= this.vlasnik.brzina * Math.sin(this.vlasnik.ugao * Math.PI / 180)
  }

  pozicioniraj() {
    const centarCeviX = this.vlasnik.cev.x + this.vlasnik.cev.sirina / 4
    const centarCeviY = this.vlasnik.cev.y + this.vlasnik.cev.visina * 0.71
    const dijagonalaCevi = this.vlasnik.cev.sirina * 3 / 4
    this.x = centarCeviX + dijagonalaCevi * Math.cos(this.vlasnik.ugao * Math.PI / 180)
    this.y = centarCeviY - dijagonalaCevi * Math.sin(this.vlasnik.ugao * Math.PI / 180)
  }

  update() {
    if (!this.ispaljen) this.pozicioniraj()
    if (this.ispaljen) this.leti()
    if (this.jeVanEkrana) this.reset()
  }
}