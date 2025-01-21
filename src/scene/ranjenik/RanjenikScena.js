import { izasaoDesno } from '/game-engine/utils/granice.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Ranjenik from './Ranjenik.js'
import Patrola from './Patrola.js'
import Strelica from './Strelica.js'
import Vreme from '/game-engine/core/Vreme.js'
import Paljba from './Paljba.js'

const RITAM_PALJBE = 1500

export default class RanjenikScena extends Scena {
  init() {
    this.scena = 0
    this.pozadina = new Pozadina('2d-odozgo/shumarak-pozadina.png')
    this.ranjenik = new Ranjenik(this.sirina / 4, this.visina / 2)
    this.patrola = new Patrola('2d-odozgo/nemci-patrola.gif', this.ranjenik)
    this.patrola.polozaj = { x: this.sirina * 3 / 4, y: this.visina * 3 / 4 }
    this.strelica = new Strelica()
    this.vreme = new Vreme()
    this.pocetakPaljbe = 500
    this.dodaj(this.ranjenik, this.patrola, this.strelica)
  }

  proveriSudare() {
    if (!this.patrola.sudara(this.ranjenik)) return

    this.patrola.stani()
    this.patrola.pustiNadjen()
    this.zavrsi('Uhvaćen si. Tvoja sudbina je zapečaćena...')
  }

  proveriPobedu() {
    if (izasaoDesno(this.ranjenik)) this.promeniScenu()

    if (this.scena === 2) {
      this.patrola.nestani()
      this.pozadina.slika.src = '/assets/slike/2d-odozgo/shumarak-pozadina.png'
      this.predmeti = this.predmeti.filter(p => p.constructor.name !== 'Paljba')
      this.zavrsi('Pobeda! Uspeo si da pronađeš spas!')
    }
  }

  promeniScenu() {
    this.pozadina.slika.src = '/assets/slike/teksture/sprzena-zemlja.jpg' // teksture/beton.gif
    this.patrola.slika.src = '/assets/slike/2d-odozgo/talijani-patrola.gif'
    this.patrola.postaviRandom()
    this.ranjenik.x = 10
    this.scena++
  }

  pali() {
    if (this.vreme.proteklo < this.pocetakPaljbe) return

    const krater = new Paljba()
    this.predmeti.unshift(krater)
    this.pocetakPaljbe += RITAM_PALJBE

    if (this.ranjenik.sudara(krater))
      this.zavrsi('Hrabro si pao u pokušaju bega.')
  }

  update(dt, t) {
    if (this.zavrsniTekst) return
    super.update(dt, t)
    this.proveriSudare()
    this.proveriPobedu()
    if (this.scena === 1) this.pali()
  }

  sablon() {
    return /* html */`
      <div class='komande bg-poluprovidno komande1'>
        A - levo<br>
        D - desno<br>
        W - napred<br>
        S - nazad<br>
      </div>
    `
  }
}
