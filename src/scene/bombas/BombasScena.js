import Scena from '/game-engine/core/Scena.js'
import Vreme from '/game-engine/core/Vreme.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import { slucajnePozicije, nadjiNajdaljeTacke } from '/game-engine/utils.js'
import Bombas from './Bombas.js'
import Bunker from './Bunker.js'
import Predmet from '/game-engine/core/Predmet.js'

const ZADATO_VREME = 10
const BROJ_PREPREKA = 20

export default class BombasScena extends Scena {
  init() {
    this.vreme = new Vreme()
    this.pozadina = new Pozadina('/assets/slike/teksture/beton.gif')
    const pozicije = slucajnePozicije(BROJ_PREPREKA + 2, 100)
    const najdaljeTacke = nadjiNajdaljeTacke(pozicije)
    console.log(najdaljeTacke[0])

    this.bombas = new Bombas(najdaljeTacke[0])
    this.bunker = new Bunker(najdaljeTacke[1])

    this.prepreke = pozicije
      .filter(p => !najdaljeTacke.some(r => r.x === p.x && r.y === p.y))
      .map(p => new Predmet('/assets/slike/2d-bocno/stvari/nagazna.png', { skalar: .75, ...p }))

    this.dodaj(...this.prepreke, this.bunker, this.bombas)
  }

  proveriPobedu() {
    if (this.bombas.razmakDo(this.bunker) < this.bunker.sirina / 2) {
      this.bunker.umri()
      this.zavrsi('Neprijateljski bunker je uništen.')
    }
  }

  proveriVreme() {
    if (this.vreme.protekloSekundi > ZADATO_VREME)
      this.zavrsi('Tvoje vreme je isteklo. Izgubio si!')
  }

  proveriPrepreke() {
    for (let i = 0; i < BROJ_PREPREKA; i++)
      if (this.bombas.sudara(this.prepreke[i]))
        this.zavrsi('Poginuo si. Igra je završena.')
  }

  update(dt) {
    super.update(dt)
    this.proveriVreme()
    this.proveriPobedu()
    this.proveriPrepreke(dt)
  }

  /* UI */

  sablon() {
    return /* html */`
      <main class='absolute full'>
        <h3 class="centar">Dovedi Žikicu Jovanovića Španca do nemačkog bunkera!</h3>
        <div class='komande bg-poluprovidno komande1'>
          Vreme: ${Math.floor(this.vreme.protekloSekundi)} <br>
          Prepreke: ${BROJ_PREPREKA}
        </div>
      </main>
    `
  }
}
