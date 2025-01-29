import * as THREE from 'three'
import Scena3D from '/core/actor/Scena3D.js'
import { elements } from './data.js'
import { createGround } from '/core/3d/ground.js'

const textureLoader = new THREE.TextureLoader()

const randSpread = range => range * (Math.random() - Math.random())

let angle = 0

export default class DrvarScena3D extends Scena3D {
  init() {
    this.bojaPozadine = 0x440033
    this.dodaj(createGround())
    elements.forEach(el => {
      for (let i = 0; i < el.number; ++i)
        this.dodajSprite(el, i)
    })
  }

  dodajSprite(el, i) {
    const src = el.urls[i % el.urls.length]
    textureLoader.load('/assets/slike/' + src, texture => {
      texture.magFilter = texture.minFilter = THREE.NearestFilter

      const material = new THREE.SpriteMaterial({ map: texture })
      const sprite = new THREE.Sprite(material)

      const skalarSlike = .05
      sprite.scale.set(texture.image.width * skalarSlike, texture.image.height * skalarSlike, 1)

      const origin = el.origin ?? { x: 0, y: 0, z: 0 }
      const range = el.range ?? { x: 10, y: 0, z: 10 }
      const skalarRastojanja = 10
      const x = origin.x * skalarRastojanja + randSpread(range.x * skalarRastojanja)
      const y = origin.y * skalarRastojanja + randSpread(range.y * skalarRastojanja)
      const z = origin.z * skalarRastojanja + randSpread(range.z * skalarRastojanja)
      sprite.position.set(x, y + texture.image.height * skalarSlike * .5, z)
      this.dodaj(sprite)
    })
  }

  update(dt) {
    angle += dt * .1
    this.camera.position.x = 10 * Math.cos(angle)
    this.camera.position.z = 10 * Math.sin(angle)
    this.camera.lookAt(0, 10, 0)
  }

  sablon(t) {
    return `
      <div class='komande bg-poluprovidno komande1'>
        Vreme: ${Math.floor(t)} <br>
      </div>
    `
  }
}
