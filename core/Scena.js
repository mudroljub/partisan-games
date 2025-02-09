import { keyboard } from './io/Keyboard.js'
import { platno } from './io/platno.js'
import GameLoop from './GameLoop.js'
import UI from '../ui/UI.js'

export default class Scena {
  constructor(manager, { usePointerLock } = {}) {
    this.manager = manager
    this.usePointerLock = usePointerLock
    this.gameLoop = new GameLoop(this.loop)
    this.ui = new UI(this)
    this.predmeti = []
    this.start = this.start.bind(this)
    this.handleClick = this.handleClick.bind(this)
    document.addEventListener('click', this.handleClick)
    if (usePointerLock)
      document.addEventListener('pointerlockchange', this.handlePointerLockChange)
    else
      document.addEventListener('visibilitychange', this.handleVisibilityChange)
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

  /* EVENTS */

  handleClick(e) {
    if (e.target.id == 'start')
      this.start()

    if (e.target.id == 'igraj-opet')
      this.manager.restart(this.constructor.name)

    if (e.target.id == 'menu')
      this.manager.start('GlavniMeni')

    if (e.target.id == 'cancel')
      this.nastaviIgru()
  }

  handlePointerLockChange = () => {
    if (!document.pointerLockElement)
      this.pokaziProzor()
  }

  handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden')
      this.gameLoop.pause()
    else
      this.gameLoop.unpause()
  }

  /* LOOP */

  start() {
    this.gameLoop.start()
    this.ui.uvodniTekst = ''
    if (this.usePointerLock) document.body.requestPointerLock()
  }

  end() {
    this.gameLoop.stop()
    this.predmeti = []
    this.cisti()
    this.ui.cisti()
    document.removeEventListener('click', this.handleClick)
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    document.removeEventListener('pointerlockchange', this.handlePointerLockChange)
  }

  proveriTipke(dt) {
    if (this.ui.zavrsniTekst) return

    if (keyboard.pressed.Escape) this.pokaziProzor()

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
    this.render()
    this.ui.renderUI(t)
  }

  /* UI */

  // get uvodniTekst() {
  //   return this.ui.uvodniTekst
  // }

  // set uvodniTekst(val) {
  //   this.ui.uvodniTekst = val
  // }

  sablon() {
    return ''
  }

  pokaziProzor() {
    setTimeout(() => this.gameLoop.pause(), 1)
    this.ui.hoceVan = true
  }

  nastaviIgru() {
    this.gameLoop.unpause()
    this.ui.hoceVan = false
    if (this.usePointerLock) document.body.requestPointerLock()
  }

  zavrsi(text = 'Igra je završena.') {
    this.ui.zavrsniTekst = text
    this.gameLoop.stopTime()
  }
}
