import { platno, podloga } from '../io/platno.js'

export default class Scena {

  constructor(ui) {
    this.predmeti = []
    this.platno = platno
    this.podloga = podloga
    this.nivoTla = this.visina
    this.loopID = null
    this.ui = ui
    this.ui.sablon = () => this.sablon() // očekuje da scene imaju UI šablon
    this.lastTime = performance.now()
    this.loop = this.loop.bind(this)
  }

  sablon() {
    return ''
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
    this.predmeti.map(predmet => 'update' in predmet && predmet.update())
  }

  render() {
    this.predmeti.map(predmet => 'render' in predmet && predmet.render())
    this.ui.render()
  }

  loop(timestamp) {
    this.loopID = requestAnimationFrame(this.loop)
    const dt = (timestamp - this.lastTime) / 1000 // sekunde
    this.lastTime = timestamp

    this.cisti()
    this.update(dt, timestamp)
    this.render()
  }

  start() {
    if (this.loopID) return
    requestAnimationFrame(this.loop)
  }

  stop() {
    if (!this.loopID) return
    cancelAnimationFrame(this.loopID)
    this.loopID = null
  }

  end() {
    this.stop()
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

  zavrsniProzor(poruka) {
    this.ui.zavrsniProzor(poruka, this.constructor.name)
  }
}
