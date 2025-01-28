import * as THREE from 'three'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/controls/OrbitControls.js'

import Scena from './Scena.js'

export default class Scena3D extends Scena {
  constructor(manager) {
    super(manager, '3d')
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 2, 20)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.init3D()

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    })
  }

  init3D() {}

  dodaj(predmet) {
    this.scene.add(predmet)
  }

  cisti() {}

  update() {
    this.controls.update()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}
