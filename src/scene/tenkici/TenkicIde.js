// BUG: raketa ne leti lepo
// BUG: ne radi šablon??
// tenkovi, bunkeri, vojnici...

import Scena from '/game-engine/core/Scena.js'
import TenkPartizanski from './TenkPartizanski.js'
import Zbun from '/src/2d-bocno/Zbun.js'
import Shuma from '/src/2d-bocno/Shuma.js'
import Planina from '/src/2d-bocno/Planina.js'
import Oblak from '/src/2d-bocno/Oblak.js'
import platno, { crtaNeboZemlju } from '/game-engine/io/platno.js'

const BROJ_OBLAKA = 3
const BROJ_ZBUNOVA = 10
const PARALAX_1 = -5

export default class TenkicIde extends Scena {
  init() {
    this.nivoTla = platno.height * .75
    this.tenk = new TenkPartizanski(100, this.nivoTla)
    this.planina = new Planina(this.nivoTla, PARALAX_1)
    this.shumarak = new Shuma(this.nivoTla, PARALAX_1)
    this.zbunovi = Array.from({ length: BROJ_ZBUNOVA }, () => new Zbun(this.nivoTla, PARALAX_1))
    this.oblaci = Array.from({ length: BROJ_OBLAKA }, () => new Oblak(this.nivoTla, PARALAX_1))
  }

  azurirajZbunje() {
    this.zbunovi.forEach(zbun => {
      zbun.update()
      zbun.proveriGranice()
    })
  }

  azurirajOblake() {
    this.oblaci.forEach(oblak => {
      oblak.update()
      oblak.proveriGranice()
    })
  }

  update() {
    crtaNeboZemlju(this.nivoTla)
    this.planina.update()
    this.shumarak.update()
    this.shumarak.proveriGranice(platno.width / 2)
    this.planina.proveriGranice(platno.width + 200)
    this.azurirajOblake()
    this.azurirajZbunje()
    this.tenk.update()
  }

  sablon() {
    return `
      <div class="komande bg-poluprovidno komande1">
       <b>Komande</b>
       <br> A - levo
       <br> D - desno
       <br> W - gore
       <br> S - dole
       <br> space - puca
       <div class="komande bg-poluprovidno energija1">${this.tenk.energija}</div>
       <progress class="komande poluprovidno progres1" value="${this.tenk.energija}" max="100"></progress>
     </div>
    `
  }
}
