import * as THREE from 'three'
import Scena from './Scena.js'

const platno3D = document.getElementById('platno-3d')
platno3D.style.display = 'none'

export default class Scena3D extends Scena {
  constructor(manager, { toon = false, autostart = false, ...rest } = {}) {
    super(manager, { autostart, ...rest })
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.set(0, 5, 30)

    this.renderer = new THREE.WebGLRenderer({ canvas: platno3D, alpha: true, antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio)) // save battery by limit pixel ratio to 2
    this.renderer.shadowMap.enabled = true
    if (toon) this.createToonRenderer()

    platno3D.style.display = 'block'

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    })
  }

  set bojaPozadine(boja) {
    this.scene.background = new THREE.Color(boja)
  }

  async createToonRenderer(defaultThickness = 0.0025) {
    const { OutlineEffect } = await import('three/examples/jsm/effects/OutlineEffect.js')
    this.renderer = new OutlineEffect(this.renderer, { defaultThickness })
  }

  dodaj(...predmeti) {
    this.predmeti.push(...predmeti)
    this.scene.add(...predmeti.map(arg => arg.mesh))
  }

  dodajMesh(...predmeti) {
    this.scene.add(...predmeti)
  }

  end() {
    super.end()
    platno3D.style.display = 'none'
  }

  proveriTipke(dt) {
    super.proveriTipke(dt)
    this.controls?.update(dt)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }
}
