import { platno } from '/core/io/platno.js'
import Scena2D from '/core/Scena2D.js'
import Pozadina from '/core/objects/Pozadina.js'
import { progresBar } from '/ui/components.js'
import TenkLevo from './TenkLevo.js'
import TenkDesno from './TenkDesno.js'
import Controls, { tankLeftControls, tankRightControls } from '/ui/Controls.js'

const nivoTla = platno.height * 0.8
let aiPlayer = true

export default class TenkiciScena extends Scena2D {
  constructor(manager) {
    super(manager, { controlKeys: tankLeftControls })
  }

  init() {
    this.pozadina = new Pozadina('background/razrusen-grad-savremen.jpg')
    this.tenk = new TenkLevo({ y: nivoTla })
    this.tenk2 = new TenkDesno({ y: nivoTla, ai: aiPlayer })
    this.tenk.ciljevi.push(this.tenk2)
    this.tenk2.ciljevi.push(this.tenk)
    this.predmeti = [this.tenk, this.tenk2]
    this.controls2UI = new Controls({ containerClass: 'bottom-right', controlKeys: tankRightControls })
  }

  handleClick(e) {
    super.handleClick(e)
    if (e.target.id == 'dva-igraca')
      this.tenk2.ai = aiPlayer = !aiPlayer
  }

  update(dt) {
    super.update(dt)
    if (this.tenk.mrtav || this.tenk2.mrtav) this.finish()
  }

  endScreen() {
    return /* html*/`
      <div class="central-screen bg-black">
        <p class="red">${this.tenk.mrtav ? this.tenk.ime : this.tenk2.ime} je uništen.</p>
        <p class="olive">${this.tenk.ziv ? this.tenk.ime : this.tenk2.ime} je pobedio ovu borbu.</p>
        <button id="igraj-opet">Play again</button><button id="menu">Main menu</button>
      </div>
    `
  }

  sceneUI() {
    return /* html*/`
      <div class='top-left'>
        ${this.tenk.ime}
        ${progresBar(this.tenk.energija, 'rpg')}
      </div>

      <div class='top-right'>
        ${this.tenk2.ime}
        ${progresBar(this.tenk2.energija, 'rpg')}
        <button id="dva-igraca" class="bg-olive full">
          ${this.tenk2.ai ? 'Dodaj igrača' : 'Uključi<br> neprijatelja'}
        </button>
      </div>
    `
  }
}
