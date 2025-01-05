import Scena from '/game-engine/core/Scena.js'
import Vreme from '/game-engine/core/Vreme.js'
import Ranjenik from './Ranjenik.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Paljba from './Paljba.js'

const BROJ_PLOTUNA = 15
const RITAM_PALJBE = 1500
const ZADATO_VREME = 60

let ovajPlotun = 0
let pocetakPaljbe = 500

export default class RanjenikPaljba extends Scena {
  init() {
    this.pozadina = new Pozadina('/assets/slike/teksture/beton.gif')
    this.ranjenik = new Ranjenik()
    this.vreme = new Vreme()
    this.plotuni = []
    this.dodaj(this.pozadina, this.ranjenik)
  }

  pali() {
    if (this.vreme.proteklo < pocetakPaljbe || ovajPlotun >= BROJ_PLOTUNA) return
    this.plotuni.push(new Paljba())
    if (this.ranjenik.sudara(this.plotuni[ovajPlotun])) this.ranjenik.pogodjen += 1
    pocetakPaljbe += RITAM_PALJBE
    ovajPlotun++
  }

  proveriVreme() {
    if (this.vreme.protekloSekundi > ZADATO_VREME)
      this.end()
      // javi game over
  }

  update(dt) {
    super.update(dt)
    this.pali()
    this.plotuni.map(plotun => plotun.update(dt))
    this.proveriVreme()
  }

  sablon() {
    return `
    <div class='komande bg-poluprovidno komande1'>
      Pogoci: ${this.ranjenik.pogodjen}<br>
      Vreme: ${Math.floor(this.vreme.protekloSekundi)}
    </div>
    `
  }
}
