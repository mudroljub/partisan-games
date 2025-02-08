export default class UI {
  constructor(vlasnik) {
    this.hoceVan = false
    this.vlasnik = vlasnik
    this.upamcenUI = this.upamcenProzor = this.zavrsniTekst = this.uvodniTekst = ''
    this.elementUI = document.getElementById('ui')
    this.prozorElement = document.getElementById('prozor')
  }

  cisti() {
    this.elementUI.innerHTML = this.prozorElement.innerHTML = ''
  }

  uvodniProzor() {
    return /* html */`
      <div class="central-screen rpgui-container pointer">
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

  prozor() {
    if (this.hoceVan) return this.izadjiProzor()
    if (this.zavrsniTekst) return this.zavrsniProzor()
    if (this.vlasnik.uvodniProzor) return this.vlasnik.uvodniProzor()
    if (this.uvodniTekst) return this.uvodniProzor()
    return ''
  }

  renderProzor() {
    if (this.upamcenProzor !== this.prozor()) {
      this.prozorElement.innerHTML = this.prozor()
      this.upamcenProzor = this.prozor()
    }
  }

  renderGUI(t) {
    if (this.upamcenUI !== this.vlasnik.sablon(t)) {
      this.elementUI.innerHTML = this.vlasnik.sablon(t)
      this.upamcenUI = this.vlasnik.sablon(t)
    }
  }

  renderUI(t) {
    this.renderProzor()
    this.renderGUI(t)
  }
}