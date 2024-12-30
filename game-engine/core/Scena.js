import { platno, ctx } from '../io/platno.js'
import GameLoop from './GameLoop.js'

export default class Scena {
  constructor(ui) {
    this.predmeti = []
    this.platno = platno
    this.ctx = ctx
    this.nivoTla = this.visina
    this.ui = ui
    this.ui.sablon = () => this.sablon() // očekuje da scene imaju UI šablon
    this.lastTime = performance.now()
    this.pauza = false
    this.update = this.update.bind(this)
    this.gameLoop = new GameLoop(this.update, false)
    this.init()
  }

  init() {}

  dodaj(...premeti) {
    this.predmeti.push(...premeti)
  }

  /* VELIČINA */

  set sirina(sirina) {
    this.platno.width = sirina
  }

  get sirina() {
    return this.platno.width
  }

  set visina(visina) {
    this.platno.height = visina
  }

  get visina() {
    return this.platno.height
  }

  velicina(sirina, visina) {
    this.sirina = sirina
    this.visina = visina
  }

  /* POZADINA */

  set bojaPozadine(boja) {
    this.ctx.fillStyle = boja
    this.platno.style.backgroundColor = boja
  }

  get bojaPozadine() {
    return this.ctx.fillStyle
  }

  /* UI */

  pocetniProzor(text) {
    this.ui.pocetniProzor(text, () => this.pauza = false)
    this.pauza = true
  }

  zavrsniProzor(text) {
    this.ui.zavrsniProzor(text, this.constructor.name)
  }

  /* PETLJA */

  cisti() {
    this.ctx.clearRect(0, 0, this.sirina, this.visina)
  }

  // TODO: vratiti sablon sa UI ovde?
  sablon() {
    return ''
  }

  update(dt, proteklo) {
    this.cisti()
    const rekurzivnoAzuriraj = predmet => {
      if ('update' in predmet) predmet.update(dt, proteklo)
      if ('render' in predmet) predmet.render()
      if (predmet?.predmeti?.length) predmet.predmeti.forEach(rekurzivnoAzuriraj)
    }
    this.predmeti.forEach(rekurzivnoAzuriraj)
    this.ui.render()
  }

  start() {
    this.gameLoop.start()
  }

  end() {
    this.gameLoop.stop()
    this.predmeti = []
  }
}
