import { platno } from '/game-engine/io/platno.js'
import { kamera } from '/game-engine/core/Kamera.js'

export default class Panorama {
  constructor() {
    this.slika = new Image()
    this.slika.src = '/assets/slike/planine.png'
    this.bojaNeba = '#403'
    this.bojaTla = '#030'
    this.granicaTla = platno.height * 0.55
    this.faktorPomeranja = 500
    this.ctx = platno.getContext('2d')
  }

  get bgOffsetX() {
    return (kamera.rotacija * this.faktorPomeranja + this.slika.width) % this.slika.width
  }

  render() {
    if (!this.slika.complete) return

    this.ctx.fillStyle = this.bojaNeba
    this.ctx.fillRect(0, 0, platno.width, this.granicaTla)

    for (let x = this.bgOffsetX - this.slika.width; x < window.innerWidth; x += this.slika.width)
      this.ctx.drawImage(this.slika, x, this.granicaTla - this.slika.height, this.slika.width, this.slika.height)

    this.ctx.fillStyle = this.bojaTla
    this.ctx.fillRect(0, this.granicaTla, platno.width, platno.height)
  }
}
