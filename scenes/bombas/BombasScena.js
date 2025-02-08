import { slucajnePozicije, nadjiNajdaljeTacke } from '/core/utils.js'
import Scena2D from '/core/Scena2D.js'
import Pozadina from '/core/objects/Pozadina.js'
import Vreme from '/core/Vreme.js'
import Bombas from './Bombas.js'
import Bunker from './Bunker.js'
import Mina from './Mina.js'
import Mitraljezac from './Mitraljezac.js'

const ZADATO_VREME = 30
const BROJ_PREPREKA = 20

export default class BombasScena extends Scena2D {
  init() {
    this.vreme = new Vreme()
    this.pozadina = new Pozadina('textures/terrain/beton.gif')
    const pozicije = slucajnePozicije(BROJ_PREPREKA + 2, 100)
    const najdaljeTacke = nadjiNajdaljeTacke(pozicije)

    this.bombas = new Bombas(najdaljeTacke[0])
    this.bunker = new Bunker(najdaljeTacke[1])
    this.mitraljezac = new Mitraljezac(this.bunker.x + 60, this.bunker.y + 20, this.bombas)

    this.mine = pozicije
      .filter(p => !najdaljeTacke.some(tacka => tacka.x === p.x && tacka.y === p.y))
      .map(p => new Mina(p))
    this.dodaj(this.bunker, this.mitraljezac, this.bombas, ...this.mine)

    this.ui.uvodniTekst = 'Dovedi Žikicu Jovanovića Španca do nemačkog bunkera!'
  }

  proveriPobedu() {
    if (this.bombas.razmakDo(this.bunker) < this.bunker.sirina / 2) {
      this.bunker.umri()
      this.zavrsi('Neprijateljski bunker je uništen!')
    }
  }

  update(dt, t) {
    super.update(dt, t)
    this.mine.forEach(mina => mina.proveriSudar(this.bombas))

    if (this.bombas.mrtav) this.zavrsi('Slavno si pao.')
    if (t > ZADATO_VREME) this.zavrsi('Tvoje vreme je isteklo.')

    this.proveriPobedu()
  }

  /* UI */

  sablon(t) {
    const preostalo = ZADATO_VREME - Math.floor(t)
    return /* html */`
      <div class='komande bg-poluprovidno komande1'>
        Vreme: ${preostalo} <br>
      </div>
    `
  }
}
