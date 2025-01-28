import * as THREE from 'three'
import Scena3D from '/game-engine/core/Scena3D.js'
import { elements } from '../drvar/data.js'

console.log(elements)

const getSprite = src => {
  const map = new THREE.TextureLoader().load('/assets/slike/' + src)
  const material = new THREE.SpriteMaterial({ map })

  const sprite = new THREE.Sprite(material)
  sprite.position.set(0, 0, 0)
  return sprite
}

export default class Scena3DProba extends Scena3D {
  init3D() {
    const sprite = getSprite('priroda/drvece/Evergreen.png')
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
