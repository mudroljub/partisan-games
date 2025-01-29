import * as THREE from 'three'
import Scena3D from '/core/actor/Scena3D.js'
import { elements } from './data.js'
import { createGround } from '/core/3d/ground.js'
import { praviPanoramu } from './utils.js'

const textureLoader = new THREE.TextureLoader()

const randSpread = range => range * (Math.random() - Math.random())

export default class DrvarScena extends Scena3D {
  init() {
    this.bojaPozadine = 0x440033
    this.dodaj(createGround())
    elements.forEach(el => {
      for (let i = 0; i < el.number; ++i)
        this.dodajSprite(el, i)
    })
    this.scene.add(praviPanoramu())
    this.avioni = []
    this.padobranci = []
    this.vozila = []
  }

  dodajSprite(el, i) {
    const src = el.urls[i % el.urls.length]
    textureLoader.load('/assets/slike/' + src, texture => {
      texture.minFilter = THREE.NearestFilter // pikselizovano iz daleka
      texture.magFilter = THREE.NearestFilter // glatko blizu

      const material = new THREE.SpriteMaterial({ map: texture })
      const object = new THREE.Sprite(material)

      const skalarSlike = .05
      object.scale.set(texture.image.width * skalarSlike, texture.image.height * skalarSlike, 1)

      const origin = el.origin ?? { x: 0, y: 0, z: 0 }
      const range = el.range ?? { x: 100, y: 0, z: 100 }
      const x = origin.x + randSpread(range.x)
      const y = origin.y + randSpread(range.y)
      const z = origin.z + randSpread(range.z)
      object.position.set(x, y + texture.image.height * skalarSlike * .5, z)
      this.dodaj(object)

      if (el.type) this[el.type].push(object)
    })
  }

  update(dt) {
    super.update(dt)
    this.camera.lookAt(0, 10, 0)

    this.avioni.forEach(avion => {
      avion.position.x -= dt * 20
      if (avion.position.x <= -150)
        avion.position.x = 150
    })

    this.padobranci.forEach(padobranac => {
      padobranac.position.y -= dt * 5
      if (padobranac.position.y <= 0)
        padobranac.position.y = 35
    })

    this.vozila.forEach(vozilo => {
      vozilo.position.x += dt * 10
      if (vozilo.position.x >= 150)
        vozilo.position.x = -150
    })
  }
}
