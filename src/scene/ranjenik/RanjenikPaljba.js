import Scena from '/game-engine/core/Scena.js'
import Vreme from '/game-engine/core/Vreme.js'
import Ranjenik from './Ranjenik.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Paljba from './Paljba.js'

const BROJ_PLOTUNA = 15
const RITAM_PALJBE = 1500
const ZADATO_VREME = 60

export default class RanjenikPaljba extends Scena {
  init() {
    this.pozadina = new Pozadina('teksture/beton.gif')
    this.ranjenik = new Ranjenik()
    this.vreme = new Vreme()
    this.dodaj(this.ranjenik)
    this.trenutnoPlotuna = 0
    this.pocetakPaljbe = 500
  }

  pali() {
    if (this.vreme.proteklo < this.pocetakPaljbe || this.trenutnoPlotuna >= BROJ_PLOTUNA) return

    const krater = new Paljba()
    this.predmeti.unshift(krater)
    this.pocetakPaljbe += RITAM_PALJBE
    this.trenutnoPlotuna++

    if (this.ranjenik.sudara(krater))
      this.ranjenik.umri()
      // game over
  }

  proveriKraj() {
    if (this.vreme.protekloSekundi > ZADATO_VREME)
      this.end()
      // game over
  }

  update(dt) {
    super.update(dt)
    this.pali()
    this.proveriKraj()
  }

  sablon() {
    return /* html */`
    <div class='komande bg-poluprovidno komande1'>
      Preostalo vreme: ${Math.floor(ZADATO_VREME - this.vreme.protekloSekundi)}
    </div>
    `
  }
}
