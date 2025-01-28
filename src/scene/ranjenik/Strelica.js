import { platno } from '/core/io/platno.js'
import Vreme from '/core/actor/Vreme.js'

const trajanjeStrelice = 500
const pauzaCrtanja = 3000

export default class Strelica {
  constructor() {
    this.vidljiva = false
    this.vreme = new Vreme()
    this.ctx = platno.getContext('2d')
  }

  update() {
    if (!this.vidljiva && this.vreme.proteklo < pauzaCrtanja) return
    if (this.vidljiva && this.vreme.proteklo < trajanjeStrelice) return

    this.vidljiva = !this.vidljiva
    this.vreme.reset()
  }

  render() {
    if (!this.vidljiva) return
    this.ctx.lineWidth = 5
    this.ctx.strokeStyle = 'red'
    this.ctx.beginPath()
    this.ctx.moveTo(platno.width * 0.6, platno.height * 0.5)
    this.ctx.lineTo(platno.width * 0.9, platno.height * 0.5)
    this.ctx.moveTo(platno.width * 0.8, platno.height * 0.4)
    this.ctx.lineTo(platno.width * 0.9, platno.height * 0.5)
    this.ctx.lineTo(platno.width * 0.8, platno.height * 0.6)
    this.ctx.stroke()
  }
}
