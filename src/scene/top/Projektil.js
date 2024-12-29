import { platno, podloga } from '/game-engine/io/platno.js'

export default class Projektil {
  constructor(cev) {
    this.x = 0
    this.y = 0
    this.ispaljen = false
  }

  get jeVanEkrana() {
    return this.x > platno.width || this.y > platno.height
  }

  reset() {
    this.ispaljen = false
  }

}