import platno from '../io/platno.js'

export default class Pozadina {
  constructor(src) {
    this.slika = new Image()
    this.slika.src = '/assets/slike/' + src
    this.ctx = platno.getContext('2d')
  }

  render() {
    this.ctx.drawImage(this.slika, 0, 0, platno.width, platno.height)
  }
}
