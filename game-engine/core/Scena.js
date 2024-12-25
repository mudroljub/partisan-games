import { platno, podloga } from '../io/platno'

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

  endScreen(poruka) {
    this.ui.endScreen(poruka, this.constructor.name)
  }

  /* CRTANJE (prebaciti na pozadinu?) */

  crtaNebo(nivoTla, bojaNeba = 'blue', bojaNebaPreliv = 'lightblue', pocetakPreliva = 0) {
    this.podloga.fillStyle = bojaNeba
    if (bojaNebaPreliv) {
      const preliv = this.podloga.createLinearGradient(0, pocetakPreliva, 0, nivoTla)
      preliv.addColorStop(0, bojaNeba)
      preliv.addColorStop(1, bojaNebaPreliv)
      this.podloga.fillStyle = preliv
    }
    this.podloga.fillRect(0, 0, this.platno.width, nivoTla)
  }

  crtaZemlju(nivoTla, bojaZemlje = '#00b011') {
    this.podloga.fillStyle = bojaZemlje
    this.podloga.fillRect(0, nivoTla, this.platno.width, this.platno.height)
  }

  crtaNeboZemlju(nivoTla, bojaNeba = 'lightblue', bojaZemlje = 'green', bojaNebaPreliv = 'blue') {
    this.crtaNebo(nivoTla, bojaNeba, bojaNebaPreliv)
    this.crtaZemlju(nivoTla, bojaZemlje)
  }
}
