import { elements } from './data.js'
import Predmet from '/game-engine/core/Predmet.js'
import { kamera } from '/game-engine/core/Kamera.js'
import Scena from '/game-engine/core/Scena.js'
// import Panorama from './Panorama.js'

const randSpread = range => range * (Math.random() - Math.random())

// const pozadina = new Panorama()

export default class DrvarScena extends Scena {
  init() {
    // this.sprites = []
    const createSprites = el => {
      for (let i = 0; i < el.number; ++i) {
        const origin = el.origin ?? { x: 0, y: 0, z: 0 }
        const range = el.range ?? { x: 10, y: 0, z: 10 }
        const x = origin.x + randSpread(range.x)
        const y = origin.y + randSpread(range.y)
        const z = origin.z + randSpread(range.z)
        this.predmeti.push(new Predmet(el.urls[i % el.urls.length], { x, y, z }))
      }
    }
    elements.forEach(createSprites)
  }

  render() {
    super.render()
    // pozadina.render()
  }

  update(dt, t) {
    super.update(dt, t)
    kamera.update()
  }
}
