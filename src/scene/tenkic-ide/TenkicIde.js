import platno, { crtaNeboZemlju } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import { progresBar, komande } from '/game-ui/components.js'
import Zbun from '/src/2d-bocno/Zbun.js'
import Shuma from '/src/2d-bocno/Shuma.js'
import Planina from '/src/2d-bocno/Planina.js'
import Oblak from '/src/2d-bocno/Oblak.js'
import TenkLevo from '../tenkici/TenkLevo.js'

const BROJ_OBLAKA = 3
const BROJ_ZBUNOVA = 10
const PARALAX_1 = -160
const nivoTla = platno.height * .75

export default class TenkicIde extends Scena {
  init() {
    this.tenk = new TenkLevo({ y: nivoTla, skalar: .4 })

    this.planina = new Planina(nivoTla, PARALAX_1)
    this.shumarak = new Shuma(nivoTla, PARALAX_1)
    this.zbunovi = Array.from({ length: BROJ_ZBUNOVA }, () => new Zbun(nivoTla, PARALAX_1))
    this.oblaci = Array.from({ length: BROJ_OBLAKA }, () => new Oblak(nivoTla, PARALAX_1))

    this.dodaj(this.planina, this.shumarak, ...this.zbunovi, this.tenk, ...this.oblaci)
  }

  cisti() {
    crtaNeboZemlju(nivoTla)
  }

  sablon() {
    return /* html */`
      <main class="komande bg-poluprovidno komande1">
        ${komande()}
        ${progresBar(this.tenk.energija)}
      </main>
    `
  }
}
