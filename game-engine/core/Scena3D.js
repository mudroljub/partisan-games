import * as THREE from 'three'
import Scena from './Scena.js'

export default class Scena3D extends Scena {
  constructor(manager) {
    super(manager, '3d')
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 5
  }

  dodaj(predmet) {
    this.scene.add(predmet)
  }

  cisti() {}

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}
