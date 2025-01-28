import Scena3D from '/game-engine/core/Scena3D.js'
import * as THREE from 'three'

export default class Scena3DProba extends Scena3D {
  constructor() {
    super()
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    this.dodaj(cube)
  }

  sablon(t) {
    return /* html */`
      <div class='komande bg-poluprovidno komande1'>
        Vreme: ${Math.floor(t)} <br>
      </div>
    `
  }
}
