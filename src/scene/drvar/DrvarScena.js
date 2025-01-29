import { elements } from './data.js'
import Predmet from '/core/actor/Predmet.js'
import { kamera } from '/core/actor/Kamera.js'
import Scena2D from '/core/actor/Scena2D.js'
import Panorama from './Panorama.js'

const randSpread = range => range * (Math.random() - Math.random())

export default class DrvarScena extends Scena2D {
  init() {
    elements.forEach(el => {
      for (let i = 0; i < el.number; ++i)
        this.praviPredmet(el, i)
    })
    this.pozadina = new Panorama()
  }

  praviPredmet(el, i) {
    const origin = el.origin ?? { x: 0, y: 0, z: 0 }
    const range = el.range ?? { x: 10, y: 0, z: 10 }
    const skalarRastojanja = 1
    const x = origin.x * skalarRastojanja + randSpread(range.x * skalarRastojanja)
    const y = origin.y * skalarRastojanja + randSpread(range.y * skalarRastojanja)
    const z = origin.z * skalarRastojanja + randSpread(range.z * skalarRastojanja)
    const src = el.urls[i % el.urls.length]
    this.predmeti.push(new Predmet(src, { x, y, z, nacinPrikaza: 'PROJEKCIJA' }))
  }

  update(dt, t) {
    super.update(dt, t)
    kamera.update()
  }
}
