import Scena from '/game-engine/core/Scena.js'
import Vreme from '/game-engine/core/Vreme.js'
import UI from '/game-engine/core/UI.js'
import Ranjenik from './Ranjenik.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Paljba from './Paljba.js'

/** * KONFIG ***/

const BROJ_PLOTUNA = 15
const RITAM_PALJBE = 1500
const ZADATO_VREME = 60
const plotuni = []
let ovajPlotun = 0
let vremeIgre = 0
let protekleMilisekunde = 0
let pocetakPaljbe = 500

/** * INIT ***/

const pozadina = new Pozadina('/assets/slike/teksture/beton.gif')
const ranjenik = new Ranjenik()
const vreme = new Vreme()
const ui = new UI(sablon)

/** * FUNKCIJE ***/

function pali() {
  if (protekleMilisekunde < pocetakPaljbe || ovajPlotun >= BROJ_PLOTUNA) return
  plotuni.push(new Paljba())
  if (ranjenik.sudara(plotuni[ovajPlotun])) ranjenik.pogodjen += 1
  pocetakPaljbe += RITAM_PALJBE
  ovajPlotun++
}

function sablon() {
  return `
    Pogoci: ${ranjenik.pogodjen}
    Vreme: ${Math.floor(vremeIgre)}
  `
}

export default class RanjenikPaljba extends Scena {
  constructor(...args) {
    super(...args)
    this.dodaj(pozadina, ranjenik, ui)
  }

  update() {
    super.update()
    pali()
    plotuni.map(plotun => plotun.update())
    this.proveriVreme()
  }

  proveriVreme() {
    protekleMilisekunde = vreme.proteklo
    vremeIgre = vreme.protekloSekundi
    if (vremeIgre > ZADATO_VREME)
      this.stop()
      // javi game over

  }
}
