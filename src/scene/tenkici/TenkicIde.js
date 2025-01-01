// zbunje
// predmeti ne kruze
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
  constructor(...args) {
    super(...args)
    this.init()
  }

  init() {
    this.nivoTla = platno.height - 100
    this.tenk = new TenkPartizanski(100, this.nivoTla)
    this.planina = new Planina(this.nivoTla)
    this.shumarak = new Shuma(this.nivoTla)

    this.shumarak.dx = PARALAX_1
    this.planina.dx = PARALAX_1

    this.zbunovi = []
    this.oblaci = []
    for (let i = 0; i < BROJ_ZBUNOVA; i++) {
      this.zbunovi[i] = new Zbun(this.nivoTla)
      this.zbunovi[i].dx = PARALAX_1
    }

    for (let i = 0; i < BROJ_OBLAKA; i++) {
      this.oblaci[i] = new Oblak(150, 100)
      this.oblaci[i].dx = PARALAX_1
    }
  }

  azurirajZbunje() {
    for (let i = 0; i < this.zbunovi.length; i++) {
      this.zbunovi[i].update()
      this.zbunovi[i].proveriGranice(10)
    }
  }

  azurirajOblake() {
    for (let i = 0; i < this.oblaci.length; i++) {
      this.oblaci[i].update()
      this.oblaci[i].proveriGranice()
    }
  }

  update() {
    crtaNeboZemlju(this.nivoTla, { linija: false })
    this.planina.update()
    this.shumarak.update()
    this.shumarak.proveriGranice(platno.width / 2)
    this.planina.proveriGranice(platno.width + 200)
    this.azurirajOblake()
    this.tenk.update()
    this.azurirajZbunje()
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
