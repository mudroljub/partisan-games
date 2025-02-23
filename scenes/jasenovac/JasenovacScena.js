import Scena2D from '/core/Scena2D.js'
import Predmet from '/core/actor/Predmet.js'
import Pozadina from '/core/objects/Pozadina.js'
import TenkOdozgo from './TenkOdozgo.js'
import Ranjenik from '../sutjeska/Ranjenik.js'

export default class JasenovacScena extends Scena2D {
  init() {
    this.pozadina = new Pozadina('textures/terrain/beton.gif')
    this.tenk = new TenkOdozgo(100, 200)
    this.player = new Ranjenik(this.sirina / 4, this.visina / 2)

    const zica = new Predmet('items/bodljikava-zica.gif', { x: 400, y: 100 })
    this.add(zica, this.player, this.tenk)
  }

  update(dt) {
    super.update(dt)
    this.tenk.patroliraj()
  }
}
