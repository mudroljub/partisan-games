import platno, { crtaNeboZemlju } from '/core/io/platno.js'
import Scena2D from '/core/Scena2D.js'
import { progresBar, komande } from '/ui/components.js'
import Zbun from '/core/objects/Zbun.js'
import Shuma from '/core/objects/Shuma.js'
import Planina from '/core/objects/Planina.js'
import Oblak from '/core/objects/Oblak.js'
import TenkLevo from '../tenkici/TenkLevo.js'
import Vracanje from '/core/objects/Vracanje.js'

const BROJ_OBLAKA = 3
const BROJ_ZBUNOVA = 10
const PARALAX_1 = -160
const nivoTla = platno.height * .75

export default class TenkicIde extends Scena2D {
  init() {
    this.tenk = new TenkLevo({ y: nivoTla, skalar: .4 })

    const planina = new Planina(nivoTla, PARALAX_1)
    const shumarak = new Shuma(nivoTla, PARALAX_1)
    const zbunovi = Array.from({ length: BROJ_ZBUNOVA }, () => new Zbun(nivoTla, PARALAX_1))
    const oblaci = Array.from({ length: BROJ_OBLAKA }, () => new Oblak(nivoTla - 100, PARALAX_1))

    const ciljevi = [
      new Vracanje({ src: 'buildings/kuca-bunker.png', tlo: nivoTla + 15, skalar: .33, zapaljiv: true, brzina: PARALAX_1 }),
      new Vracanje({ src: 'buildings/crkva-01.png', tlo: nivoTla + 5, skalar: .5, zapaljiv: true, brzina: PARALAX_1 }),
    ]
    this.dodaj(planina, shumarak, ...ciljevi, ...zbunovi, this.tenk, ...oblaci)
    this.tenk.ciljevi.push(...ciljevi)
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
