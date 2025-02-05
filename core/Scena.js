import { keyboard } from './io/Keyboard.js'
import { platno } from './io/platno.js'
import GameLoop from './GameLoop.js'
import UI from '../ui/UI.js'

export default class Scena {
  constructor(manager, { autostart, usePointerLock } = {}) {
    this.manager = manager
    this.gameLoop = new GameLoop(this.loop, autostart, usePointerLock)
    this.ui = new UI(this)
    this.predmeti = []
    this.handleClick = this.handleClick.bind(this)
  }

  init() {}

  dodaj(...predmeti) {
    this.predmeti.push(...predmeti)
  }

  /* VELIČINA */

  get sirina() {
    return platno.width
  }

  get visina() {
    return platno.height
  }

  /* UI */

  sablon() {
    return ''
  }

  handleClick(e) {
    if (e.target.id == 'igraj-opet')
      this.manager.start(this.constructor.name)

    if (e.target.id == 'menu')
      this.manager.start('GlavniMeni')

    if (e.target.id == 'cancel')
      this.nastaviIgru()
  }

  potvrdiIzlaz() {
    this.gameLoop.pause()
    this.ui.hoceVan = true
  }

  nastaviIgru() {
    this.gameLoop.unpause()
    this.ui.hoceVan = false
  }

  zavrsi(text = 'Igra je završena.') {
    this.ui.zavrsniTekst = text
    this.gameLoop.stopTime()
  }

  /* GLAVNA PETLJA */

  start() {
    this.gameLoop.start()
    document.addEventListener('click', this.handleClick)
  }

  end() {
    this.gameLoop.stop()
    this.predmeti = []
    this.ui.cisti()
    document.removeEventListener('click', this.handleClick)
  }

  proveriTipke(dt) {
    if (this.ui.zavrsniTekst) return

    if (keyboard.pressed.Escape) this.potvrdiIzlaz()

    this.predmeti.forEach(predmet => {
      if (predmet.ziv && predmet.proveriTipke) predmet.proveriTipke(dt)
    })
  }

  update(dt, t) {
    const rekurzivnoAzuriraj = predmet => {
      if (predmet.update) predmet.update(dt, t)
      if (predmet?.predmeti?.length) predmet.predmeti.forEach(rekurzivnoAzuriraj)
    }
    this.predmeti.forEach(rekurzivnoAzuriraj)
  }

  cisti() {}

  render() {}

  loop = (dt, t) => {
    this.proveriTipke(dt)
    this.update(dt, t)
    this.cisti()
    this.render(dt, t)
    this.ui.renderUI(t)
  }
}
