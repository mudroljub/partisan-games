import Scena from './Scena.js'
import Renderer2D from './Renderer.js'
import { platno } from '/core/io/platno.js'

export default class Scena2D extends Scena {
  constructor(manager) {
    super(manager)
    this.bojaPozadine = null
    this.renderer = new Renderer2D()
    this.init()
  }

  start() {
    super.start()
    platno.style.display = 'block'
  }

  end() {
    super.end()
    platno.style.display = 'none'
  }

  cisti() {
    this.renderer.cisti({ pozadina: this.pozadina, bojaPozadine: this.bojaPozadine })
  }

  render() {
    this.renderer.crtaPredmete(this.predmeti)
  }
}
