import Report from './Report.js'

const elementUI = document.getElementById('ui')
const modalElement = document.getElementById('modal')

export default class UI {
  constructor(scene, { reportText, intro = '', blinkingMessage = '' } = {}) {
    this.scene = scene
    this.intro = intro
    this.reportText = reportText
    this.blinkingMessage = blinkingMessage
    this.cachedSceneUI = this.cachedModal = this.outro = ''
  }

  clear() {
    elementUI.innerHTML = modalElement.innerHTML = ''
  }

  clearIntro() {
    this.intro = ''
    modalElement.innerHTML = ''
    if (this.report) this.report.stop()
  }

  /* CENTRAL SCREEN */

  startScreen() {
    return /* html */`
      <div class="central-screen rpgui-container" id="start-screen">
        <p>${this.intro}</p>
        <button id="start" class="press-start">Press to START!</button>
      </div>
    `
  }

  escModal() {
    return /* html */`
      <div class="central-screen simple-container">
        <p>Leave game?</p>
        <button id="menu">Yes</button><button id="cancel">No</button><button id="igraj-opet">Play again</button>
      </div>
    `
  }

  endScreen() {
    return /* html */`
      <div class="central-screen simple-container">
        <p>${this.outro}</p>
        <button id="igraj-opet">Play again</button><button id="menu">Main menu</button>
      </div>
    `
  }

  renderStartScreen() {
    modalElement.innerHTML = this.startScreen()
    if (this.reportText)
      this.report = new Report({ text: this.reportText, containerId: 'start-screen' })
  }

  get modal() {
    if (this.outro) return this.endScreen()
    if (this.scene.paused) return this.escModal()
    if (this.intro) return this.startScreen()
    return ''
  }

  renderModal() {
    if (this.cachedModal === this.modal) return

    modalElement.innerHTML = this.modal
    this.cachedModal = this.modal
  }

  /* SCENE UI */

  renderSceneUI(t) {
    if (this.cachedSceneUI === this.scene.sceneUI(t)) return

    elementUI.innerHTML = this.scene.sceneUI(t)
    this.cachedSceneUI = this.scene.sceneUI(t)
  }

  /* MESSAGE */

  getMessage(txt, className = '') {
    return /* html */`
      <div class="central-screen">
        <h3 class="${className}">${txt}</h3>
      </div>
    `
  }

  showMessage(txt) {
    modalElement.innerHTML = this.getMessage(txt)
    setTimeout(() => {
      modalElement.innerHTML = ''
    }, 3000)
  }

  /* BLINKING */

  showBlinkingMessage(t, messageInterval = 20) {
    if (t > 0 && Math.ceil(t) % messageInterval == 0)
      this.renderMessage()
  }

  renderMessage() {
    modalElement.innerHTML = this.getMessage(this.blinkingMessage, 'blink')
    setTimeout(() => {
      modalElement.innerHTML = ''
    }, 3000)
  }

  /* LOOP */

  render(t) {
    this.renderModal()
    this.renderSceneUI(t)
    if (this.blinkingMessage) this.showBlinkingMessage(t)
  }
}