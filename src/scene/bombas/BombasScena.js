import { slucajnePozicije, nadjiNajdaljeTacke } from '/game-engine/utils.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import { keyboard } from '/game-engine/io/Keyboard.js'
import Vreme from '/game-engine/core/Vreme.js'
import Bombas from './Bombas.js'
import Bunker from './Bunker.js'
import Mina from './Mina.js'

const ZADATO_VREME = 100
const BROJ_PREPREKA = 20

export default class BombasScena extends Scena {
  init() {
    this.vreme = new Vreme()
    this.pozadina = new Pozadina('/assets/slike/teksture/beton.gif')
    const pozicije = slucajnePozicije(BROJ_PREPREKA + 2, 100)
    const najdaljeTacke = nadjiNajdaljeTacke(pozicije)

    this.bombas = new Bombas(najdaljeTacke[0])
    this.bunker = new Bunker(najdaljeTacke[1])
    this.bunker.initRakete(this.bombas)

    this.mine = pozicije
      .filter(p => !najdaljeTacke.some(tacka => tacka.x === p.x && tacka.y === p.y))
      .map(p => new Mina(p))
    this.dodaj(this.bunker, this.bombas, ...this.mine)
  }

  proveriPobedu() {
    if (this.bombas.razmakDo(this.bunker) < this.bunker.sirina / 2) {
      this.bunker.umri()
      this.zavrsi('Neprijateljski bunker je uništen.')
    }
  }

  proveriVreme(t) {
    if (this.vreme.protekloSekundi > ZADATO_VREME)
      this.zavrsi('Tvoje vreme je isteklo. Izgubio si!')
  }

  update(dt, t) {
    super.update(dt, t)

    if (this.bombas.mrtav) this.zavrsi('Slavno si pao.')

    this.mine.forEach(mina => mina.proveriSudar(this.bombas))
    this.proveriVreme(t)
    this.proveriPobedu()
  }

  /* UI */

  sablon(t) {
    const preostalo = ZADATO_VREME - Math.floor(this.vreme.protekloSekundi)
    return /* html */`
      <main class='absolute full'>
        <h3 class="centar">Dovedi Žikicu Jovanovića Španca do nemačkog bunkera!</h3>
        <div class='komande bg-poluprovidno komande1'>
          Vreme: ${preostalo} <br>
          Prepreke: ${BROJ_PREPREKA}
        </div>
      </main>
    `
  }
}
