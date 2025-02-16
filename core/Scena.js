import { keyboard } from './io/Keyboard.js'
import { platno } from './io/platno.js'
import GameLoop from './GameLoop.js'
import UI from '../ui/UI.js'
import Controls from '../ui/Controls.js'

export default class Scena {
  constructor(manager, {
    usePointerLock, controlKeys, intro, controlsWindowClass, reportText, blinkingMessage, showControls = true
  } = {}) {
    this.manager = manager
    this.usePointerLock = usePointerLock
    this.gameLoop = new GameLoop(this.loop)
    this.ui = new UI(this, { reportText, intro, blinkingMessage })
    this.predmeti = []
    if (showControls)
      this.controlsUI = new Controls({ controlKeys, containerClass: controlsWindowClass })

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

    if (e.target.id == 'continue')
      this.unpause()
  }

  handlePointerLockChange = () => {
    if (this.ui.outro) return
    if (!document.pointerLockElement)
      this.pause()
  }

  handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden')
      this.gameLoop.pause()
    else
      this.gameLoop.unpause()
  }

  /* LOOP */

  get paused() {
    return this.gameLoop.isPaused
  }

  start() {
    this.gameLoop.start()
    this.ui.clearIntro()
    if (this.usePointerLock) document.body.requestPointerLock()
  }

  end() {
    this.gameLoop.stop()
    this.predmeti = []
    this.clear()
    this.ui.clear()
    if (this.controlsUI) this.controlsUI.end()
    if (this.controls2UI) this.controls2UI.end()

    document.removeEventListener('click', this.handleClick)
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    document.removeEventListener('pointerlockchange', this.handlePointerLockChange)
  }

  handleInput(dt) {
    if (this.ui.outro) return

    if (keyboard.pressed.Escape) this.pause()

    this.predmeti.forEach(predmet => {
      if (predmet.ziv && predmet.handleInput) predmet.handleInput(dt)
    })
  }

  update(dt, t) {
    const rekurzivnoAzuriraj = predmet => {
      if (predmet.update) predmet.update(dt, t)
      if (predmet?.predmeti?.length) predmet.predmeti.forEach(rekurzivnoAzuriraj)
    }
    this.predmeti.forEach(rekurzivnoAzuriraj)
  }

  clear() {}

  render() {}

  loop = (dt, t) => {
    this.handleInput(dt)
    this.update(dt, t)
    this.clear()
    this.render()
    this.ui.render(t)
  }

  sceneUI() {
    return ''
  }

  pause() {
    this.gameLoop.pause()
  }

  unpause() {
    this.gameLoop.unpause()
    if (this.usePointerLock) document.body.requestPointerLock()
  }

  finish(text = 'The game is over.') {
    this.ui.outro = text
    this.gameLoop.stopTime()
    if (this.usePointerLock) document.exitPointerLock()
  }
}
