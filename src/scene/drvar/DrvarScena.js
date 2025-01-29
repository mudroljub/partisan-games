import * as THREE from 'three'
import Scena3D from '/core/actor/Scena3D.js'
import { elements } from './data.js'
import { createGround } from '/core/3d/ground.js'
import { praviPanoramu } from './utils.js'

const textureLoader = new THREE.TextureLoader()

const randSpread = range => range * (Math.random() - Math.random())

export default class DrvarScena3D extends Scena3D {
  init() {
    this.bojaPozadine = 0x440033
    this.dodaj(createGround())
    elements.forEach(el => {
      for (let i = 0; i < el.number; ++i)
        this.dodajSprite(el, i)
    })
    this.scene.add(praviPanoramu())
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = .5
  }

  dodajSprite(el, i) {
    const src = el.urls[i % el.urls.length]
    textureLoader.load('/assets/slike/' + src, texture => {
      texture.minFilter = THREE.NearestFilter // pikselizovano iz daleka
      texture.magFilter = THREE.LinearFilter // glatko blizu

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
    super.update(dt)
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
