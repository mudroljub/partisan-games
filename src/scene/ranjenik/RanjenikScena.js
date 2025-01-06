// prikazati prozore umesto log
// iskoristiti za Bekstvo iz Jasenovca i ranjenik paljba
// povecavati broj patrola
// u jasenovcu beton i trebalo bi ustase, a na sutjesci nemci, italijani, cetnici
import { izasaoDesno } from '/game-engine/utils/granice.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Ranjenik from './Ranjenik.js'
import Patrola from './Patrola.js'
import Strelica from './Strelica.js'

export default class RanjenikScena extends Scena {
  init() {
    this.scena = 0
    this.pozadina = new Pozadina('/assets/slike/2d-odozgo/shumarak-pozadina.png')
    this.ranjenik = new Ranjenik(this.sirina / 4, this.visina / 2)
    this.patrola = new Patrola('/assets/slike/2d-odozgo/nemci-patrola.gif', this.ranjenik)
    this.patrola.polozaj(this.sirina * 3 / 4, this.visina * 3 / 4)
    this.strelica = new Strelica()
    this.dodaj(this.pozadina, this.ranjenik, this.patrola, this.strelica)
  }

  proveriSudare() {
    if (!this.patrola.sudara(this.ranjenik)) return
    this.patrola.stani()
    this.patrola.vikniZaredom(2)
    console.log('Uhvaćen si...')
    this.end()
  }

  proveriPobedu() {
    if (izasaoDesno(this.ranjenik)) this.promeniScenu()
    if (this.scena < 4) return
    console.log('pobeda!')
    this.end()
  }

  promeniScenu() {
    const parna = this.scena % 2 === 0
    const pozadina = parna ? 'teksture/beton.gif' : '2d-odozgo/shumarak-pozadina.png'
    const patrola = parna ? '2d-odozgo/talijani-patrola.gif' : '2d-odozgo/nemci-patrola.gif'
    this.pozadina.zameniSliku(`/assets/slike/${pozadina}`)
    this.patrola.zameniSliku(`/assets/slike/${patrola}`)
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
       <b>Komande</b>
       <br> A - levo
       <br> D - desno
       <br> W - napred
       <br> S - nazad
     </div>
    `
  }
}
