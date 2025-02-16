import Scena from './Scena.js'
import Renderer2D from './Renderer2D.js'
import { platno } from '/core/io/platno.js'

export default class Scena2D extends Scena {
  constructor(manager, params) {
    super(manager, params)
    this.bojaPozadine = null
    this.renderer = new Renderer2D()
    platno.style.display = 'block'
  }

  end() {
    super.end()
    platno.style.display = 'none'
    if (this.player) this.player.end()
  }

  clear() {
    this.renderer.clear({ pozadina: this.pozadina, bojaPozadine: this.bojaPozadine })
  }

  render() {
    this.renderer.crtaPredmete(this.predmeti)
  }
}
