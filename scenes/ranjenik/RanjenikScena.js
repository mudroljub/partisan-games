import { izasaoDesno } from '/core/utils/granice.js'
import Scena2D from '/core/Scena2D.js'
import Pozadina from '/core/objects/Pozadina.js'
import Ranjenik from './Ranjenik.js'
import Patrola from './Patrola.js'
import Strelica from './Strelica.js'
import Vreme from '/core/Vreme.js'
import Paljba from './Paljba.js'

const RITAM_PALJBE = 1500

export default class RanjenikScena extends Scena2D {
  init() {
    this.scena = 0
    this.pozadina = new Pozadina('slicice/shumarak-pozadina.png')
    this.ranjenik = new Ranjenik(this.sirina / 4, this.visina / 2)
    this.patrola = new Patrola('slicice/nemci-patrola.gif', this.ranjenik)
    this.patrola.postavi(this.sirina * 3 / 4, this.visina * 3 / 4)
    this.strelica = new Strelica()
    this.vreme = new Vreme()
    this.pocetakPaljbe = 500
    this.dodaj(this.ranjenik, this.patrola, this.strelica)
  }

  proveriSudare() {
    if (!this.patrola.sudara(this.ranjenik)) return

    this.patrola.stani()
    this.patrola.pustiNadjen()
    this.finish('Uhvaćen si. Sva nada je izgubljena...')
  }

  proveriPobedu() {
    if (izasaoDesno(this.ranjenik)) this.promeniScenu()

    if (this.scena === 2) {
      this.patrola.nestani()
      this.pozadina.slika.src = '/assets/images/shumarak-pozadina.png'
      this.predmeti = this.predmeti.filter(p => p.constructor.name !== 'Paljba')
      this.finish('Uspeo si da pronađeš spas!')
    }
  }

  promeniScenu() {
    this.pozadina.slika.src = '/assets/images/textures/sprzena-zemlja.jpg'
    this.patrola.slika.src = '/assets/images/slicice/talijani-patrola.gif'
    this.patrola.postavi(this.sirina * 3 / 4, this.visina * 3 / 4)
    this.ranjenik.x = 10
    this.scena++
  }

  pali() {
    if (this.vreme.proteklo < RITAM_PALJBE) return

    const krater = new Paljba()
    this.predmeti.unshift(krater)
    this.vreme.reset()

    if (this.ranjenik.sudara(krater))
      this.finish('Hrabro si pao u pokušaju bega.')
  }

  update(dt, t) {
    if (this.outro) return
    super.update(dt, t)
    this.proveriSudare()
    this.proveriPobedu()
    if (this.scena === 1) this.pali()
  }

  sceneUI() {
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
