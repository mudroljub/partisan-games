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
    this.loop = this.loop.bind(this)
    this.gameLoop = new GameLoop(this.loop, false)
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

  sablon() {
    return ''
  }

  renderSablon() {
    if (this.upamcenSablon !== this.sablon()) {
      this.elementUI.innerHTML = this.sablon()
      this.upamcenSablon = this.sablon()
    }
  }

  /* PETLJA */

  start() {
    this.gameLoop.start()
  }

  end() {
    this.gameLoop.stop()
    this.predmeti = []
    this.elementUI.innerHTML = ''
  }

  cisti() {
    if (this.pozadina)
      this.pozadina.render()
    else
      this.ctx.clearRect(0, 0, this.sirina, this.visina)
  }

  loop(dt, t) {
    this.cisti()
    const rekurzivnoAzuriraj = predmet => {
      if (predmet.update) predmet.update(dt, t)
      if (predmet?.predmeti?.length) predmet.predmeti.forEach(rekurzivnoAzuriraj)
    }
    this.predmeti.forEach(rekurzivnoAzuriraj)
    this.renderSablon()
  }
}
