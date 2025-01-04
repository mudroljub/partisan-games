// BUG: raketa ne leti lepo
// tenkovi, bunkeri, vojnici...

import platno, { crtaNeboZemlju } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import Zbun from '/src/2d-bocno/Zbun.js'
import Shuma from '/src/2d-bocno/Shuma.js'
import Planina from '/src/2d-bocno/Planina.js'
import Oblak from '/src/2d-bocno/Oblak.js'
import Tenk from './TenkPartizanski.js'

const BROJ_OBLAKA = 3
const BROJ_ZBUNOVA = 10
const PARALAX_1 = -160

export default class TenkicIde extends Scena {
  init() {
    this.nivoTla = platno.height * .75
    this.tenk = new Tenk(100, this.nivoTla)
    this.planina = new Planina(this.nivoTla, PARALAX_1)
    this.shumarak = new Shuma(this.nivoTla, PARALAX_1)
    this.zbunovi = Array.from({ length: BROJ_ZBUNOVA }, () => new Zbun(this.nivoTla, PARALAX_1))
    this.oblaci = Array.from({ length: BROJ_OBLAKA }, () => new Oblak(this.nivoTla, PARALAX_1))
  }

  azurirajZbunje(dt) {
    this.zbunovi.forEach(zbun => {
      zbun.update(dt)
      zbun.proveriGranice()
    })
  }

  azurirajOblake(dt) {
    this.oblaci.forEach(oblak => {
      oblak.update(dt)
      oblak.proveriGranice()
    })
  }

  cisti() {
    crtaNeboZemlju(this.nivoTla)
  }

  update(dt) {
    super.update(dt)
    this.planina.update(dt)
    this.shumarak.update(dt)
    this.shumarak.proveriGranice(platno.width / 2)
    this.planina.proveriGranice(platno.width + 200)
    this.azurirajOblake(dt)
    this.azurirajZbunje(dt)
    this.tenk.update(dt)
  }

  sablon() {
    return /* html */`
      <main class="komande bg-poluprovidno komande1">
        <b>Komande</b>
        <br> A - levo
        <br> D - desno
        <br> W - gore
        <br> S - dole
        <br> space - puca
        <div class="progress-wrapper">
          <progress value='${this.tenk.energija}' max='100'></progress>
          <div class="energija">${this.tenk.energija}</div>
        </div>
      </main>
    `
  }
}
