import { keyboard } from './io/Keyboard.js'
import { platno } from './io/platno.js'
import GameLoop from './GameLoop.js'
import UI from '../ui/UI.js'
import Controls from '../ui/Controls.js'

export default class Scena {
  constructor(manager, {
    usePointerLock, controlKeys, uvodniTekst, controlsWindowClass, reportText, blinkingMessage, showControls = true
  } = {}) {
    this.manager = manager
    this.usePointerLock = usePointerLock
    this.gameLoop = new GameLoop(this.loop)
    this.ui = new UI(this, { reportText, uvodniTekst, blinkingMessage })
    this.predmeti = []
    if (showControls)
      this.kontrole = new Controls({ controlKeys, containerClass: controlsWindowClass })

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
    if (this.ui.zavrsniTekst) return
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
    this.ui.cistiUvod()
    if (this.usePointerLock) document.body.requestPointerLock()
  }

  end() {
    this.gameLoop.stop()
    this.predmeti = []
    this.cisti()
    this.ui.cisti()
    if (this.kontrole) this.kontrole.end()

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

  sceneUI() {
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
    if (this.usePointerLock) document.exitPointerLock()
  }
}
