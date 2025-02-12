import Report from './Report.js'

export default class UI {
  constructor(vlasnik, { reportText, uvodniTekst = '', blinkingMessage = '' } = {}) {
    this.hoceVan = false
    this.vlasnik = vlasnik
    this.uvodniTekst = uvodniTekst
    this.upamcenUI = this.upamcenProzor = this.zavrsniTekst = ''
    this.elementUI = document.getElementById('ui')
    this.prozorElement = document.getElementById('prozor')
    this.reportText = reportText
    this.blinkingMessage = blinkingMessage
  }

  cisti() {
    this.elementUI.innerHTML = this.prozorElement.innerHTML = ''
  }

  cistiUvod() {
    this.uvodniTekst = ''
    this.prozorElement.innerHTML = ''
    if (this.report) this.report.stop()
  }

  uvodniProzor() {
    return /* html */`
      <div class="central-screen rpgui-container" id="uvodni-prozor">
        <p>${this.uvodniTekst}</p>
        <button id="start" class="press-start">Press to START!</button>
      </div>
    `
  }

  izadjiProzor() {
    return /* html */`
      <div class="central-screen simple-container">
        <p>Napusti igru?</p>
        <button id="menu">Da</button><button id="cancel">Ne</button><button id="igraj-opet">Igraj opet</button>
      </div>
    `
  }

  zavrsniProzor() {
    return /* html */`
      <div class="central-screen simple-container">
        <p>${this.zavrsniTekst}</p>
        <button id="igraj-opet">Igraj opet</button><button id="menu">Glavni meni</button>
      </div>
    `
  }

  blinkingProzor() {
    return /* html */`
      <div class="central-screen">
        <h3 class="blink">${this.blinkingMessage}</h3>
      </div>
    `
  }

  prozor() {
    if (this.hoceVan) return this.izadjiProzor()
    if (this.zavrsniTekst) return this.zavrsniProzor()
    if (this.uvodniTekst) return this.uvodniProzor()
    return ''
  }

  renderProzor() {
    if (this.upamcenProzor !== this.prozor()) {
      this.prozorElement.innerHTML = this.prozor()
      this.upamcenProzor = this.prozor()
    }
  }

  renderUvodniProzor() {
    this.prozorElement.innerHTML = this.uvodniProzor()
    if (this.reportText)
      this.report = new Report({ text: this.reportText, containerId: 'uvodni-prozor' })
  }

  renderGUI(t) {
    if (this.upamcenUI !== this.vlasnik.sablon(t)) {
      this.elementUI.innerHTML = this.vlasnik.sablon(t)
      this.upamcenUI = this.vlasnik.sablon(t)
    }
  }

  showBlinkingMessage(t, messageInterval = 20) {
    if (t > 0 && Math.ceil(t) % messageInterval == 0)
      this.renderMessage()
  }

  renderMessage() {
    this.prozorElement.innerHTML = this.blinkingProzor()
    setTimeout(() => {
      this.prozorElement.innerHTML = ''
    }, 3000)
  }

  renderUI(t) {
    this.renderProzor()
    this.renderGUI(t)
    if (this.blinkingMessage) this.showBlinkingMessage(t)
  }
}