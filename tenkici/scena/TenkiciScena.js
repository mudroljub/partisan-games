import { platno } from '/game-engine/io/platno.js'
import { keyboard } from '/game-engine/io/Keyboard.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import stanje from '../stanje.js'
import Tenk from '../akteri/Tenk.js'
import Tenk2 from '../akteri/Tenk2.js'
import Plamen from '../efekti/Plamen.js'

const nivoTla = platno.height * 0.8
const skalarTenka = window.innerWidth > 1280 ? 0.5 : 0.4
const zapaljivostTenka = 20
let brojac = 0
let gotovo = false

/** INIT **/

const pozadina = new Pozadina('/assets/slike/pozadine/razrusen-grad-savremen.jpg')
const tenk = new Tenk(undefined, skalarTenka)
const tenk2 = new Tenk2(skalarTenka)
const stanjeIgre = stanje  // mora u istom opsegu zbog sablona?
const plamen = new Plamen()
const plamen2 = new Plamen()

/** POMOCNO **/

const proveriPlamen = (tenk, plamen) => {
  if (tenk.energija > zapaljivostTenka) return
  plamen.x = tenk.x
  plamen.y = tenk.y
  plamen.update()
}

export default class TenkiciScena extends Scena {
  init() {
    tenk.init()
    tenk2.init()
    tenk.y = nivoTla
    tenk2.y = nivoTla
    gotovo = false
  }

  render() {
    if (brojac % 2 === 0) return
    pozadina.render()
    tenk.render()
    tenk2.render()
    if (tenk.energija < zapaljivostTenka) plamen.render()
    if (tenk2.energija < zapaljivostTenka) plamen2.render()
    this.renderSablon()
  }

  update(dt) {
    tenk.proveriTipke(dt)
    tenk2.proveriTipke(dt)
    if (!stanjeIgre.dvaIgraca) tenk2.automatuj(tenk)
    if (!gotovo) {
      tenk.proveriPogodak(tenk2)
      tenk2.proveriPogodak(tenk)
    }
    tenk.update(dt)
    tenk2.update(dt)
    proveriPlamen(tenk, plamen)
    proveriPlamen(tenk2, plamen2)
    if (tenk.mrtav || tenk2.mrtav) gotovo = true
    if (gotovo && keyboard.pressed.Enter) this.init()
    brojac++
    this.render()
  }

  sablon() {
    return `
      <div class='interfejs bg-poluprovidno komande1'>
        <b>${tenk.ime}</b>
        <div class="progress-wrapper">
          <progress class="progress" value='${tenk.energija}' max='100'></progress>
          <div class="energija">${tenk.energija}</div>
        </div>
          A - levo<br>
          D - desno<br>
          W - gore<br>
          S - dole<br>
          space - puca
      </div>

      <div class='interfejs bg-poluprovidno komande2'>
        <span class='bold'>${tenk2.ime}</span>
        <div class="progress-wrapper">
          <progress class="progress" value='${tenk2.energija}' max='100'></progress>
          <div class="energija">${tenk2.energija}</div>
        </div>
        <div class="${stanjeIgre.dvaIgraca ? '' : 'hide'}">
          ← levo<br>
          → desno<br>
          ↑ gore<br>
          ↓ dole<br>
          enter - puca
        </div>
        <button id="dva-igraca" class="${stanjeIgre.dvaIgraca ? 'bg-avocado' : ''} full">${stanjeIgre.dvaIgraca ? 'Uključi<br> neprijatelja' : 'Dodaj igrača'}</button>
      </div>

      <div class="${!gotovo ? 'hide' : ''} prozorce pointer bg-black">
        <p class="avocado">${tenk.mrtav ? tenk.ime : tenk2.ime} je uništen.</p>
        <p class="valencia">${tenk.ziv ? tenk.ime : tenk2.ime} je pobedio ovu borbu.</p>
        <h2><button id="igraj-opet" class="white">Igraj opet</button></h2>
      </div>
    `
  }
}

/** EVENTS **/

document.addEventListener('click', e => {
  if (e.target.id == 'dva-igraca') stanje.dvaIgraca = !stanje.dvaIgraca
  if (e.target.id == 'igraj-opet') TenkiciScena.init()
})
