import Predmet from 'core/Predmet'
import Vreme from 'core/Vreme'
import mish from 'io/mish'

export default class Svabo extends Predmet {

  constructor(sirina = 100, visina = 150, ucestalost = 0.03) {
    super ('/assets/slike/2d-prvo-lice/rov-prazan.gif', sirina, visina)
    this.ucestalost = ucestalost
    this.init()
  }

  init() {
    this.stoji = false
    this.slikaGore = '/assets/slike/2d-prvo-lice/nemac-rov.gif'
    this.slikaDole = '/assets/slike/2d-prvo-lice/rov-prazan.gif'
    this.vremeNisanjenja = 2.5 // koliko sekundi stoji pre nego zapuca
    this.vreme = new Vreme()
  }

  update() {
    super.update()
    this.povremenoUstaje()
  }

  povremenoUstaje() {
    if (!this.stoji && Math.random() < this.ucestalost * this.vreme.deltaSekundi)
      this.ustani()
  }

  stav(bul) {
    this.stoji = bul
    const slika = bul ? this.slikaGore : this.slikaDole
    this.zameniSliku(slika)
    if (bul) this.vreme.reset()
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
    return this.vreme.protekloSekundi >= this.vremeNisanjenja
  }
}
