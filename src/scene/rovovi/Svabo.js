import Predmet from 'core/Predmet'
import Vreme from 'core/Vreme'
import mish from 'io/mish'

export default class Svabo extends Predmet {

  constructor(sirina = 100, visina = 150, PROCENAT_POJAVLJIVANJA = 0.03) {
    super ('/assets/slike/2d-prvo-lice/rov-prazan.gif', sirina, visina)
    this.PROCENAT_POJAVLJIVANJA = PROCENAT_POJAVLJIVANJA
    this.init()
  }

  init() {
    this.stoji = false
    this.slikaGore = '/assets/slike/2d-prvo-lice/nemac-rov.gif'
    this.slikaDole = '/assets/slike/2d-prvo-lice/rov-prazan.gif'
    this.VREME_NISANJENJA = 3 // koliko sekundi stoji pre nego zapuca
    this.vreme = new Vreme()
  }

  update() {
    super.update()
    this.povremenoUstaje()
  }

  povremenoUstaje() {
    const delta = this.vreme.deltaSekundi
    
    if (!this.stoji && Math.random() < this.PROCENAT_POJAVLJIVANJA * delta) 
      this.ustani()
  }

  stav(bul) {
    this.stoji = bul
    const slika = bul ? this.slikaGore : this.slikaDole
    this.zameniSliku(slika)
    if (bul) this.vreme.reset() // startuje tajmer
  }

  ustani() {
    this.stav(true)
  }

  padni() {
    this.stav(false)
  }

  puca() {
    this.slika.src = '/assets/slike/2d-prvo-lice/nemac-rov-puca.gif'
  }

  jePogodjen() {
    return this.stoji && mish.iznad(this)
  }

  jeSpreman() {
    if (!this.stoji) return false
    const duzinaOstanka = this.vreme.protekloSekundi
    if (duzinaOstanka <= this.VREME_NISANJENJA / 2) return false
    if (duzinaOstanka > this.VREME_NISANJENJA) return true
  }
}
