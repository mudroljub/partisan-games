import Vector from './Vector.js'
import { platno } from '../io/platno.js'

const sensitivity = 0.02
const zoomSensitivity = 0.0001

export class Kamera extends Vector {
  constructor() {
    super(0, -.9, -2)
    this.rotacija = 0
    this.smerX = this.smerY = this.zoom = 0

    // document.addEventListener('mousemove', e => {
    //   const MOUSE_X = e.clientX - window.innerWidth / 2
    //   const MOUSE_Y = e.clientY - window.innerHeight / 2

    //   this.smerX = (-MOUSE_X / window.innerWidth) * sensitivity
    //   this.y += (MOUSE_Y / window.innerHeight) * sensitivity
    // })

    // document.addEventListener('wheel', e => {
    //   this.z += e.deltaY * zoomSensitivity
    // })
  }

  projektuj(polozaj) {
    const dz = platno.height / (this.z - polozaj.z) // dubina z, udaljenost od kamere
    const x = (this.x + polozaj.x) * dz + platno.width / 2
    const y = (this.y + polozaj.y) * dz + platno.height / 2
    const z = dz / platno.height
    return { x, y, z }
  }

  primeniRotaciju(polozaj) {
    const cos = Math.cos(this.rotacija)
    const sin = Math.sin(this.rotacija)
    return {
      x: polozaj.x * cos - polozaj.z * sin,
      z: polozaj.x * sin + polozaj.z * cos,
      y: polozaj.y,
    }
  }

  update() {
    this.rotacija += this.smerX
  }
}

export const kamera = new Kamera
