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
}