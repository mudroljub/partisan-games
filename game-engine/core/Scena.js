import { platno, podloga } from '../io/platno.js'
import GameLoop from './GameLoop.js'

export default class Scena {
  constructor(ui) {
    this.predmeti = []
    this.platno = platno
    this.podloga = podloga
    this.nivoTla = this.visina
    this.ui = ui
    this.ui.sablon = () => this.sablon() // očekuje da scene imaju UI šablon
    this.lastTime = performance.now()
    this.pauza = false
    this.update = this.update.bind(this)
    this.gameLoop = new GameLoop(this.update, false)
  }

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

  /* PETLJA */

  update() {
    this.cisti()
    this.predmeti.map(predmet => 'update' in predmet && predmet.update())
    this.render()
  }

  render() {
    this.predmeti.map(predmet => 'render' in predmet && predmet.render())
    this.ui.render()
  }

  start() {
    this.gameLoop.start()
  }

  end() {
    this.gameLoop.stop()
    this.cisti()
    this.predmeti = []
  }

  /* POZADINA */

  set bojaPozadine(boja) {
    this.podloga.fillStyle = boja
    this.platno.style.backgroundColor = boja
  }

  get bojaPozadine() {
    return this.podloga.fillStyle
  }

  cisti() {
    this.podloga.clearRect(0, 0, this.sirina, this.visina)
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
}
