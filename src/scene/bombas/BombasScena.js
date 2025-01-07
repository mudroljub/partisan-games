import { slucajnePozicije, nadjiNajdaljeTacke } from '/game-engine/utils.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Bombas from './Bombas.js'
import Bunker from './Bunker.js'
import Predmet from '/game-engine/core/Predmet.js'

const ZADATO_VREME = 10
const BROJ_PREPREKA = 20

export default class BombasScena extends Scena {
  init() {
    this.pozadina = new Pozadina('/assets/slike/teksture/beton.gif')
    const pozicije = slucajnePozicije(BROJ_PREPREKA + 2, 100)
    const najdaljeTacke = nadjiNajdaljeTacke(pozicije)

    this.bombas = new Bombas(najdaljeTacke[0])
    this.bunker = new Bunker(najdaljeTacke[1])
    this.prepreke = pozicije
      .filter(p => !najdaljeTacke.some(t => t.x === p.x && t.y === p.y))
      .map(p => new Predmet('/assets/slike/2d-bocno/stvari/nagazna.png', { skalar: .75, ...p }))

    this.dodaj(...this.prepreke, this.bunker, this.bombas)
  }

  proveriPobedu() {
    if (this.bombas.razmakDo(this.bunker) < this.bunker.sirina / 2) {
      this.bunker.umri()
      this.zavrsi('Neprijateljski bunker je uništen.')
    }
  }

  proveriVreme(t) {
    if (t > ZADATO_VREME)
      this.zavrsi('Tvoje vreme je isteklo. Izgubio si!')
  }

  proveriPrepreke() {
    for (let i = 0; i < BROJ_PREPREKA; i++)
      if (this.bombas.sudara(this.prepreke[i]))
        this.zavrsi('Poginuo si. Igra je završena.')
  }

  update(dt, t) {
    super.update(dt)
    this.proveriVreme(t)
    this.proveriPobedu()
    this.proveriPrepreke(dt)
  }

  /* UI */

  sablon(t) {
    const preostalo = Math.max(ZADATO_VREME - Math.floor(t), 0)
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
