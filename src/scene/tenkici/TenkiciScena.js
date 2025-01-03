import { platno } from '/game-engine/io/platno.js'
import { keyboard } from '/game-engine/io/Keyboard.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Tenk from './Tenk.js'
import Tenk2 from './Tenk2.js'
import Plamen from './Plamen.js'

const nivoTla = platno.height * 0.8
const skalar = window.innerWidth > 1280 ? 0.5 : 0.4
const zapaljivostTenka = 20
let dvaIgraca = false

const proveriPlamen = (tenk, plamen) => {
  if (tenk.energija > zapaljivostTenka) return
  plamen.x = tenk.x
  plamen.y = tenk.y
  plamen.update()
}

export default class TenkiciScena extends Scena {
  init() {
    this.pozadina = new Pozadina('/assets/slike/pozadine/razrusen-grad-savremen.jpg')
    this.tenk = new Tenk(undefined, skalar)
    this.tenk2 = new Tenk2(skalar)
    this.plamen = new Plamen()
    this.plamen2 = new Plamen()
    this.tenk.y = nivoTla
    this.tenk2.y = nivoTla
    this.gotovo = false

    document.addEventListener('click', e => {
      if (e.target.id == 'dva-igraca')
        dvaIgraca = !dvaIgraca
      if (e.target.id == 'igraj-opet') this.init()
    })
  }

  render() {
    this.pozadina.render()
    this.tenk.render()
    this.tenk2.render()
    if (this.tenk.energija < zapaljivostTenka) this.plamen.render()
    if (this.tenk2.energija < zapaljivostTenka) this.plamen2.render()
    this.renderSablon()
  }

  update(dt) {
    this.tenk.proveriTipke()
    this.tenk2.proveriTipke()
    if (!dvaIgraca) this.tenk2.automatuj(this.tenk)
    if (!this.gotovo) {
      this.tenk.proveriPogodak(this.tenk2)
      this.tenk2.proveriPogodak(this.tenk)
    }
    this.tenk.update(dt)
    this.tenk2.update(dt)
    proveriPlamen(this.tenk, this.plamen)
    proveriPlamen(this.tenk2, this.plamen2)
    if (this.tenk.mrtav || this.tenk2.mrtav) this.gotovo = true
    if (this.gotovo && keyboard.pressed.Enter) this.init()
    this.render()
  }

  sablon() {
    return `
      <div class='interfejs bg-poluprovidno komande1'>
        <b>${this.tenk.ime}</b>
        <div class="progress-wrapper">
          <progress class="progress" value='${this.tenk.energija}' max='100'></progress>
          <div class="energija">${this.tenk.energija}</div>
        </div>
          A - levo<br>
          D - desno<br>
          W - gore<br>
          S - dole<br>
          space - puca
      </div>

      <div class='interfejs bg-poluprovidno komande2'>
        <span class='bold'>${this.tenk2.ime}</span>
        <div class="progress-wrapper">
          <progress class="progress" value='${this.tenk2.energija}' max='100'></progress>
          <div class="energija">${this.tenk2.energija}</div>
        </div>
        <div class="${dvaIgraca ? '' : 'hide'}">
          ← levo<br>
          → desno<br>
          ↑ gore<br>
          ↓ dole<br>
          enter - puca
        </div>
        <button id="dva-igraca" class="${dvaIgraca ? 'bg-avocado' : ''} full">${dvaIgraca ? 'Uključi<br> neprijatelja' : 'Dodaj igrača'}</button>
      </div>

      <div class="${!this.gotovo ? 'hide' : ''} prozorce bg-black">
        <p class="valencia">${this.tenk.mrtav ? this.tenk.ime : this.tenk2.ime} je uništen.</p>
        <p class="avocado">${this.tenk.ziv ? this.tenk.ime : this.tenk2.ime} je pobedio ovu borbu.</p>
        <h2><button id="igraj-opet" class="white">Igraj opet</button></h2>
      </div>
    `
  }
}
