import * as THREE from 'three'
import Scena3D from '/game-engine/core/Scena3D.js'
import { elements } from '../drvar/data.js'

const randSpread = range => range * (Math.random() - Math.random())

export default class Scena3DProba extends Scena3D {
  init3D() {
    elements.forEach(el => {
      for (let i = 0; i < el.number; ++i)
        this.praviPredmet(el, i)
    })
  }

  praviPredmet(el, i) {
    const src = el.urls[i % el.urls.length]
    const map = new THREE.TextureLoader().load('/assets/slike/' + src)
    const material = new THREE.SpriteMaterial({ map })
    const sprite = new THREE.Sprite(material)

    const origin = el.origin ?? { x: 0, y: 0, z: 0 }
    const range = el.range ?? { x: 10, y: 0, z: 10 }
    const x = origin.x + randSpread(range.x)
    const y = origin.y + randSpread(range.y)
    const z = origin.z + randSpread(range.z)
    sprite.position.set(x, y, z)
    this.dodaj(sprite)
  }

  sablon(t) {
    return /* html */`
      <div class='komande bg-poluprovidno komande1'>
        Vreme: ${Math.floor(t)} <br>
      </div>
    `
  }
}
