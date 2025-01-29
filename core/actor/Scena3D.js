import * as THREE from 'three'
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@latest/examples/jsm/controls/OrbitControls.js'
import Scena from './Scena.js'

export const platno = document.getElementById('platno-3d')
const renderer = new THREE.WebGLRenderer({ canvas: platno })
renderer.setSize(window.innerWidth, window.innerHeight)

export default class Scena3D extends Scena {
  constructor(manager) {
    super(manager)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 2, 20)
    this.controls = new OrbitControls(this.camera, renderer.domElement)
    this.init()

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight)
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    })
  }

  dodaj(object3D) {
    this.scene.add(object3D)
  }

  update() {
    this.controls.update()
  }

  render() {
    renderer.render(this.scene, this.camera)
  }
}
