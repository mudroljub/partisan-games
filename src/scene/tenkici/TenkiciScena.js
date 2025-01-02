// da neprijatelj bude AI
// potvrdi igraj ponovo kad pogine
// ubaciti zvuk i eksploziju
// ubaciti uništen tenk
// napraviti beskonačnu pozadinu sa preprekama i objektima koji nalecu
// napraviti verziju za minobacače

import platno from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import TenkPartizanski from './TenkPartizanski.js'
import TenkNemacki from './TenkNemacki.js'

export default class TenkiciScena extends Scena {
  init() {
    this.tenk1 = new TenkPartizanski(100, 450)
    this.tenk2 = new TenkNemacki(650, 450)
    const pozadina = new Pozadina('/assets/slike/pozadine/razrusen-grad-savremen.jpg')
    this.dodaj(pozadina)
  }

  proveriPogodak(granata, tenk, pomak) {
    if (granata.sudara(tenk)) {
      tenk.energija -= Math.round(Math.random() * 100)
      granata.nestani()
      tenk.x += pomak
      if (tenk.energija <= 0) {
        tenk.energija = 0
        this.reset()
      }
    }
  }

  reset() {
    const x1 = (Math.random() * platno.width / 2)
    const x2 = (Math.random() * platno.width / 2) + platno.width / 2
    this.tenk1.polozaj(x1, 450)
    this.tenk2.polozaj(x2, 450)
    this.tenk1.energija = this.tenk2.energija = 100
  }

  update() {
    super.update()
    this.tenk2.proveriTipke()
    this.tenk1.update()
    this.tenk2.update()
    this.proveriPogodak(this.tenk1.granata, this.tenk2, 2)
    this.proveriPogodak(this.tenk2.granata, this.tenk1, -2)
  }

  sablon() {
    return `
    <div class='komande bg-poluprovidno komande1'>
      <span class='bold'>Tenk 1</span>
      <br> A - levo
      <br> D - desno
      <br> W - gore
      <br> S - dole
      <br> space - puca
    </div>

    <div class='komande bg-poluprovidno komande2'>
      <span class='bold'>Tenk 2</span>
      <br> ← levo
      <br> → desno
      <br> ↑ gore
      <br> ↓ dole
      <br> M - puca
    </div>
    <div class='komande bg-poluprovidno energija1'>${this.tenk1.energija}</div>
    <div class='komande bg-poluprovidno energija2'>${this.tenk2.energija}</div>
    <progress class='komande poluprovidno progres1' value='${this.tenk1.energija}' max='100'></progress>
    <progress class='komande poluprovidno progres2' value='${this.tenk2.energija}' max='100'></progress>
  `
  }
}
