import { platno, ctx } from '../io/platno.js'
import GameLoop from './GameLoop.js'

export default class Scena {
  constructor(ui) {
    this.predmeti = []
    this.platno = platno
    this.ctx = ctx
    this.nivoTla = this.visina
    this.ui = ui
    this.lastTime = performance.now()
    this.pauza = false
    this.update = this.update.bind(this)
    this.gameLoop = new GameLoop(this.update, false)
    this.elementUI = document.getElementById('ui')
    this.upamcenSablon = ''
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

  start() {
    this.gameLoop.start()
  }

  end() {
    this.gameLoop.stop()
    this.predmeti = []
  }

  cisti() {
    this.ctx.clearRect(0, 0, this.sirina, this.visina)
  }

  sablon() {
    return ''
  }

  renderSablon() {
    if (!this.sablon) return
    if (this.upamcenSablon !== this.sablon()) {
      this.elementUI.innerHTML = this.sablon()
      this.upamcenSablon = this.sablon()
    }
  }

  update(dt, t) {
    this.cisti()
    const rekurzivnoAzuriraj = predmet => {
      if ('update' in predmet) predmet.update(dt, t)
      if (predmet?.predmeti?.length) predmet.predmeti.forEach(rekurzivnoAzuriraj)
    }
    this.predmeti.forEach(rekurzivnoAzuriraj)
    this.renderSablon()
  }
}
