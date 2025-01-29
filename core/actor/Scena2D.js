import Scena from './Scena.js'
import Renderer2D from './Renderer.js'

export default class Scena2D extends Scena {
  constructor(manager) {
    super(manager)
    this.bojaPozadine = null
    this.renderer = new Renderer2D()
    this.init()
  }

  cisti() {
    this.renderer.cisti({ pozadina: this.pozadina, bojaPozadine: this.bojaPozadine })
  }

  render() {
    this.renderer.crtaPredmete(this.predmeti)
  }
}
