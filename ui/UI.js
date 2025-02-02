export default class UI {
  constructor(vlasnik) {
    this.hoceVan = false
    this.vlasnik = vlasnik
    this.upamcenUI = this.upamcenProzor = this.zavrsniTekst = ''
    this.elementUI = document.getElementById('ui')
    this.prozorElement = document.getElementById('prozor')
  }

  cisti() {
    this.elementUI.innerHTML = this.prozorElement.innerHTML = ''
  }

  izadjiProzor() {
    return /* html */`
      <div class="prozorce centar">
        <p>Napusti igru?</p>
        <button id="menu">Da</button><button id="cancel">Ne</button><button id="igraj-opet">Igraj opet</button>
      </div>
    `
  }

  zavrsniProzor() {
    return /* html */`
      <div class="prozorce centar">
        <p>${this.zavrsniTekst}</p>
        <button id="igraj-opet">Igraj opet</button><button id="menu">Glavni meni</button>
      </div>
    `
  }

  prozor() {
    if (this.hoceVan) return this.izadjiProzor()
    if (this.zavrsniTekst) return this.zavrsniProzor()
    return ''
  }

  renderUI(t) {
    if (this.upamcenUI !== this.vlasnik.sablon(t)) {
      this.elementUI.innerHTML = this.vlasnik.sablon(t)
      this.upamcenUI = this.vlasnik.sablon(t)
    }
    if (this.upamcenProzor !== this.prozor()) {
      this.prozorElement.innerHTML = this.prozor()
      this.upamcenProzor = this.prozor()
    }
  }
}