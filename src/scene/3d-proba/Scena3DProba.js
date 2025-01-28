import * as THREE from 'three'
import Scena3D from '/game-engine/core/Scena3D.js'
import { elements } from '../drvar/data.js'

const textureLoader = new THREE.TextureLoader()

const randSpread = range => range * (Math.random() - Math.random())

const mapRange = (value, oldMin, oldMax, newMin, newMax) =>
  ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin

export default class Scena3DProba extends Scena3D {
  init3D() {
    elements.forEach(el => {
      for (let i = 0; i < el.number; ++i)
        this.dodajSprite(el, i)
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

  dodajSprite(el, i) {
    const src = el.urls[i % el.urls.length]
    textureLoader.load('/assets/slike/' + src, texture => {
      const material = new THREE.SpriteMaterial({ map: texture })

      const sprite = new THREE.Sprite(material)

      const { width } = texture.image
      const { height } = texture.image

      const aspectRatio = width / height
      const scaleX = 5 * aspectRatio
      const scaleY = 5
      sprite.scale.set(scaleX, scaleY, 1)

      const skalar = 4
      const origin = el.origin ?? { x: 0, y: 0, z: 0 }
      const range = el.range ?? { x: 10 * skalar, y: 0, z: 10 * skalar }
      const x = origin.x * skalar + randSpread(range.x * skalar)
      const y = origin.y * skalar + randSpread(range.y * skalar)
      const z = origin.z * skalar + randSpread(range.z * skalar)

      // const newX = mapRange(x, -10, 10, 0, this.sirina)
      // const newY = mapRange(y, 0, 3, this.visina, 0)
      // const newZ = mapRange(z, -10, 10, 0, this.sirina)
      // sprite.position.set(newX, newY, newZ)
      sprite.position.set(x, y, z)

      this.dodaj(sprite)
    })
  }

  sablon(t) {
    return `
      <div class='komande bg-poluprovidno komande1'>
        Vreme: ${Math.floor(t)} <br>
      </div>
    `
  }
}
