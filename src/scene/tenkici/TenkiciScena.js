import { platno } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Tenk from './Tenk.js'
import Tenk2 from './Tenk2.js'

const nivoTla = platno.height * 0.8
const skalar = window.innerWidth > 1280 ? 0.5 : 0.4
let dvaIgraca = false

export default class TenkiciScena extends Scena {
  constructor(...args) {
    super(...args)
    document.addEventListener('click', this.handleClick)
  }

  init() {
    this.pozadina = new Pozadina('/assets/slike/pozadine/razrusen-grad-savremen.jpg')
    this.tenk = new Tenk(undefined, skalar)
    this.tenk2 = new Tenk2(skalar)
    this.tenk.y = nivoTla
    this.tenk2.y = nivoTla
    this.gotovo = false
    this.predmeti = [this.tenk, this.tenk2]
  }

  handleClick = e => {
    if (e.target.id == 'dva-igraca') dvaIgraca = !dvaIgraca
    if (e.target.id == 'igraj-opet') this.init()
  }

  end() {
    super.end()
    document.removeEventListener('click', this.handleClick)
  }

  update(dt) {
    super.update(dt)
    if (!dvaIgraca) this.tenk2.automatuj(this.tenk)
    if (!this.gotovo) {
      this.tenk.proveriPogodak(this.tenk2)
      this.tenk2.proveriPogodak(this.tenk)
    }
    if (this.tenk.mrtav || this.tenk2.mrtav) this.gotovo = true
  }

  praviProzor() {
    if (!this.gotovo) return ''
    return /* html*/`
      <div class="prozorce bg-black">
        <p class="valencia">${this.tenk.mrtav ? this.tenk.ime : this.tenk2.ime} je uništen.</p>
        <p class="avocado">${this.tenk.ziv ? this.tenk.ime : this.tenk2.ime} je pobedio ovu borbu.</p>
        <h3><button id="igraj-opet" class="white">Igraj opet</button></h3>
      </div>
    `
  }

  sablon() {
    return /* html*/`
      <div class='komande bg-poluprovidno komande1'>
        <b>${this.tenk.ime}</b>
        <div class="progress-wrapper">
          <progress value='${this.tenk.energija}' max='100'></progress>
          <div class="energija">${this.tenk.energija}</div>
        </div>
          A - levo<br>
          D - desno<br>
          W - gore<br>
          S - dole<br>
          space - puca
      </div>

      <div class='komande bg-poluprovidno komande2'>
        <span class='bold'>${this.tenk2.ime}</span>
        <div class="progress-wrapper">
          <progress value='${this.tenk2.energija}' max='100'></progress>
          <div class="energija">${this.tenk2.energija}</div>
        </div>
        <div class="${dvaIgraca ? '' : 'hide'}">
          ← levo<br>
          → desno<br>
          ↑ gore<br>
          ↓ dole<br>
          enter - puca
        </div>
        <button id="dva-igraca" class="${dvaIgraca ? 'bg-avocado' : ''} full">
          ${dvaIgraca ? 'Uključi<br> neprijatelja' : 'Dodaj igrača'}
        </button>
      </div>
      ${this.praviProzor()}
    `
  }
}
