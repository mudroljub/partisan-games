import Predmet from '/core/actor/Predmet.js'
import Vreme from '/core/actor/Vreme.js'
import mish from '/core/io/mish.js'

const rafal = new Audio('/assets/zvuci/rafal.mp3')

export default class Svabo extends Predmet {

  constructor({ skalar, ucestalost = 0.03, callback }) {
    super ('2d-prvo-lice/rov-prazan.gif', { skalar })
    this.ucestalost = ucestalost
    this.callback = callback
    this.init()
  }

  init() {
    this.stoji = false
    this.vreme = new Vreme()
    this.vremeNisanjenja = 2.5
    this.slikaGore = '/assets/slike/2d-prvo-lice/nemac-rov.gif'
    this.slikaDole = '/assets/slike/2d-prvo-lice/rov-prazan.gif'
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

  ubrzaj(n) {
    this.ucestalost *= n
  }

  update(dt) {
    super.update(dt)
    this.povremenoUstaje(dt)
    if (this.jeSpreman()) {
      this.puca()
      rafal.play()
      this.callback(10, dt)
    }
  }
}
