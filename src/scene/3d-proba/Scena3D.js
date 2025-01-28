import Scena from '/game-engine/core/Scena.js'
import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// const canvas = document.getElementById('platno')
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

export default class Scena3D extends Scena {
  init() {
  }

  update(dt, t) {
    // super.update(dt, t)
  }

  cisti() {}

  render() {
    renderer.render(scene, camera)
  }

  /* UI */

  sablon(t) {
    return /* html */`
      <div class='komande bg-poluprovidno komande1'>
        Vreme: ${Math.floor(t)} <br>
      </div>
    `
  }
}
