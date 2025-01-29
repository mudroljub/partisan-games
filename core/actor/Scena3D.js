import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Scena from './Scena.js'
import { platno3D } from '/core/io/platno.js'

export default class Scena3D extends Scena {
  constructor(manager) {
    super(manager)
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 5, 30)

    this.renderer = new THREE.WebGLRenderer({ canvas: platno3D })
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.maxPolarAngle = Math.PI / 2 - 0.1

    this.init()

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    })
  }

  set bojaPozadine(boja) {
    this.scene.background = new THREE.Color(boja)
  }

  dodaj(...predmeti) {
    this.scene.add(...predmeti)
  }

  start() {
    super.start()
    platno3D.style.display = 'block'
  }

  end() {
    super.end()
    platno3D.style.display = 'none'
  }

  update() {
    this.controls.update()
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}
