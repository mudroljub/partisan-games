import Scena from '/game-engine/core/Scena.js'
import Vreme from '/game-engine/core/Vreme.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Bombas from './Bombas.js'
import Bunker from './Bunker.js'
import Prepreka from './Prepreka.js'

const ZADATO_VREME = 10
const BROJ_PREPREKA = 10

export default class BombasScena extends Scena {
  init() {
    this.vreme = new Vreme()
    this.pozadina = new Pozadina('/assets/slike/teksture/beton.gif')
    this.bombas = new Bombas()
    this.bunker = new Bunker()
    this.bunker.onload = () => this.bunker.nemojPreko(this.bombas)
    this.prepreke = Array.from({ length: BROJ_PREPREKA }, () => new Prepreka([this.bunker, this.bombas]))
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
