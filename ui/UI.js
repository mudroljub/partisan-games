import Report from './Report.js'

export default class UI {
  constructor(vlasnik, { reportText, intro = '', blinkingMessage = '' } = {}) {
    this.vlasnik = vlasnik
    this.intro = intro
    this.upamcenUI = this.upamcenProzor = this.outro = ''
    this.elementUI = document.getElementById('ui')
    this.modalElement = document.getElementById('modal')
    this.reportText = reportText
    this.blinkingMessage = blinkingMessage
  }

  clear() {
    this.elementUI.innerHTML = this.modalElement.innerHTML = ''
  }

  clearIntro() {
    this.intro = ''
    this.modalElement.innerHTML = ''
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
        <p>Napusti igru?</p>
        <button id="menu">Da</button><button id="cancel">Ne</button><button id="igraj-opet">Igraj opet</button>
      </div>
    `
  }

  endScreen() {
    return /* html */`
      <div class="central-screen simple-container">
        <p>${this.outro}</p>
        <button id="igraj-opet">Igraj opet</button><button id="menu">Glavni meni</button>
      </div>
    `
  }

  renderStartScreen() {
    this.modalElement.innerHTML = this.startScreen()
    if (this.reportText)
      this.report = new Report({ text: this.reportText, containerId: 'start-screen' })
  }

  get modal() {
    if (this.outro) return this.endScreen()
    if (this.vlasnik.paused) return this.escModal()
    if (this.intro) return this.startScreen()
    return ''
  }

  renderModal() {
    if (this.upamcenProzor !== this.modal) {
      this.modalElement.innerHTML = this.modal
      this.upamcenProzor = this.modal
    }
  }

  /* SCORE */

  renderSceneUI(t) {
    if (this.upamcenUI !== this.vlasnik.sceneUI(t)) {
      this.elementUI.innerHTML = this.vlasnik.sceneUI(t)
      this.upamcenUI = this.vlasnik.sceneUI(t)
    }
  }

  /* PORUKA */

  getPoruka(txt, className = '') {
    return /* html */`
      <div class="central-screen">
        <h3 class="${className}">${txt}</h3>
      </div>
    `
  }

  showMessage(txt) {
    this.modalElement.innerHTML = this.getPoruka(txt)
    setTimeout(() => {
      this.modalElement.innerHTML = ''
    }, 3000)
  }

  /* BLINKING */

  showBlinkingMessage(t, messageInterval = 20) {
    if (t > 0 && Math.ceil(t) % messageInterval == 0)
      this.renderMessage()
  }

  renderMessage() {
    this.modalElement.innerHTML = this.getPoruka(this.blinkingMessage, 'blink')
    setTimeout(() => {
      this.modalElement.innerHTML = ''
    }, 3000)
  }

  /* LOOP */

  render(t) {
    this.renderModal()
    this.renderSceneUI(t)
    if (this.blinkingMessage) this.showBlinkingMessage(t)
  }
}