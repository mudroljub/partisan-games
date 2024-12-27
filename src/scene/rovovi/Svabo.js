import Predmet from '/game-engine/core/Predmet.js'
import Vreme from '/game-engine/core/Vreme.js'
import mish from '/game-engine/io/mish.js'

export default class Svabo extends Predmet {

  constructor(sirina = 100, visina = 150, ucestalost = 0.03) {
    super ('/assets/slike/2d-prvo-lice/rov-prazan.gif', sirina, visina)
    this.ucestalost = ucestalost
    this.init()
  }

  init() {
    this.stoji = false
    this.vreme = new Vreme()
    this.vremeNisanjenja = 2.5
    this.slikaGore = '/assets/slike/2d-prvo-lice/nemac-rov.gif'
    this.slikaDole = '/assets/slike/2d-prvo-lice/rov-prazan.gif'
  }

  update(dt) {
    super.update()
    this.povremenoUstaje(dt)
  }

  povremenoUstaje(dt) {
    if (!this.stoji && Math.random() < this.ucestalost * dt)
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
