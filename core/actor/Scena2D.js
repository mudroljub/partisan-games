import Scena from './Scena.js'
import { renderer } from './Renderer.js'

export default class Scena2D extends Scena {
  constructor(manager) {
    super(manager)
    this.bojaPozadine = null
    this.init()
  }

  cisti() {
    renderer.cisti({ pozadina: this.pozadina, bojaPozadine: this.bojaPozadine })
  }

  render() {
    renderer.crtaPredmete(this.predmeti)
  }
}
