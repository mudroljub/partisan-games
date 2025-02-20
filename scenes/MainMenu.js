import Scena2D from '/core/Scena2D.js'
import { platno } from '/core/io/platno.js'
import { scenes } from './scenes.js'

export default class MainMenu extends Scena2D {
  constructor(manager) {
    super(manager, { showControls: false })
    this.start()
  }

  start() {
    super.start()
    platno.style.display = 'none'
  }

  handleClick(e) {
    if (e.target.classList.contains('js-start'))
      this.manager.start(e.target.value)
  }

  handleInput() {}

  handleVisibilityChange() {}

  sceneUI() {
    const izbornik = Object.entries(scenes)
      .filter(([key]) => key != 'MainMenu')
      .map(([key, value]) =>
        `<button value='${key}' class='js-start full'>${value.name}</button>`
      ).join('')

    return `
      <h1>Partisan Games ★</h1>
      ${izbornik}
    `
  }
}