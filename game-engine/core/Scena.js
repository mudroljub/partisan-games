import { platno, ctx } from '../io/platno.js'
import GameLoop from './GameLoop.js'

export default class Scena {
  constructor(manager) {
    this.predmeti = []
    this.platno = platno
    this.ctx = ctx
    this.nivoTla = this.visina
    this.manager = manager
    this.lastTime = performance.now()
    this.pauza = false
    this.loop = this.loop.bind(this)
    this.gameLoop = new GameLoop(this.loop, false)
    this.elementUI = document.getElementById('ui')
    this.upamcenUI = ''
    this.prozorElement = document.getElementById('prozor')
    this.upamcenProzor = ''
    this.gotovo = false
    this.zavrsniTekst = 'Igra je završena.'
    this.init()
  }

  init() {}

  dodaj(...predmeti) {
    this.predmeti.push(...predmeti)
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

  handleClick = e => {}

  onClick = e => {
    if (e.target.id == 'play-again')
      this.manager.start(this.constructor.name)

    if (e.target.id == 'menu')
      this.manager.start('MainMenu')

    this.handleClick(e)
  }

  prozor() {
    if (!this.gotovo) return ''
    return /* html */`
        <div class="prozorce centar">
          <p>${this.zavrsniTekst}</p>
          <button id="play-again">Igraj opet</button><button id="menu">Glavni meni</button>
        </div>
      `
  }

  zavrsi(poruka = 'Igra je završena.') {
    this.gotovo = true // mozda ukinuti
    this.zavrsniTekst = poruka
  }

  pocetniProzor(text) {
    // this.ui.pocetniProzor(text, () => this.pauza = false)
    // this.pauza = true
  }

  sablon() {
    return ''
  }

  #renderSablon() {
    if (this.upamcenUI !== this.sablon()) {
      this.elementUI.innerHTML = this.sablon()
      this.upamcenUI = this.sablon()
    }
    if (this.upamcenProzor !== this.prozor()) {
      this.prozorElement.innerHTML = this.prozor()
      this.upamcenProzor = this.prozor()
    }
  }

  /* PETLJA */

  start() {
    this.gameLoop.start()
    document.addEventListener('click', this.onClick)
  }

  end() {
    this.gameLoop.stop()
    this.predmeti = []
    this.elementUI.innerHTML = this.prozorElement.innerHTML = ''
    document.removeEventListener('click', this.onClick)
  }

  proveriTipke(dt) {
    if (this.gotovo) return
    this.predmeti.forEach(predmet => {
      if (predmet.proveriTipke) predmet.proveriTipke(dt)
    })
  }

  update(dt, t) {
    const rekurzivnoAzuriraj = predmet => {
      if (predmet.update) predmet.update(dt, t)
      if (predmet?.predmeti?.length) predmet.predmeti.forEach(rekurzivnoAzuriraj)
    }
    this.predmeti.forEach(rekurzivnoAzuriraj)
  }

  cisti() {
    if (this.pozadina)
      this.pozadina.render()
    else
      this.ctx.clearRect(0, 0, this.sirina, this.visina)
  }

  render(dt, t) {
    const rekurzivnoRender = predmet => {
      if (predmet.render) predmet.render(dt, t)
      if (predmet?.predmeti?.length) predmet.predmeti.forEach(rekurzivnoRender)
    }
    this.predmeti.forEach(rekurzivnoRender)
  }

  loop(dt, t) {
    this.proveriTipke(dt)
    this.update(dt, t)
    this.cisti()
    this.render(dt, t)
    this.#renderSablon()
  }
}
