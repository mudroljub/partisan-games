import { izasaoDesno } from '/game-engine/utils/granice.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Ranjenik from './Ranjenik.js'
import Patrola from './Patrola.js'
import Strelica from './Strelica.js'
import { adws } from '/game-ui/components.js'

export default class RanjenikScena extends Scena {
  init() {
    this.scena = 0
    this.pozadina = new Pozadina('2d-odozgo/shumarak-pozadina.png')
    this.ranjenik = new Ranjenik(this.sirina / 4, this.visina / 2)
    this.patrola = new Patrola('2d-odozgo/nemci-patrola.gif', this.ranjenik)
    this.patrola.polozaj = { x: this.sirina * 3 / 4, y: this.visina * 3 / 4 }
    this.strelica = new Strelica()
    this.dodaj(this.pozadina, this.ranjenik, this.patrola, this.strelica)
  }

  proveriSudare() {
    if (!this.patrola.sudara(this.ranjenik)) return
    this.patrola.stani()
    this.patrola.vikniZaredom(2)
    this.zavrsi('Uhvaćen si...')
  }

  proveriPobedu() {
    if (izasaoDesno(this.ranjenik)) this.promeniScenu()
    if (this.scena < 4) return
    this.zavrsi('pobeda!')
  }

  promeniScenu() {
    const parna = this.scena % 2 === 0
    const pozadina = parna ? 'teksture/beton.gif' : '2d-odozgo/shumarak-pozadina.png'
    const patrola = parna ? '2d-odozgo/talijani-patrola.gif' : '2d-odozgo/nemci-patrola.gif'
    this.pozadina.zameniSliku(`${pozadina}`)
    this.patrola.zameniSliku(`${patrola}`)
    this.patrola.postaviRandom()
    this.ranjenik.x = 10
    this.scena++
  }

  end() {
    super.end()
    this.patrola.zvuk.pause()
  }

  update(dt, t) {
    super.update(dt, t)
    this.proveriSudare()
    this.proveriPobedu()
  }

  sablon() {
    return /* html */`
      <div class='komande bg-poluprovidno komande1'>
       ${adws()}
     </div>
    `
  }
}
