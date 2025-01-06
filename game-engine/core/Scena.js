import { keyboard } from '../io/Keyboard.js'
import { platno, ctx } from '../io/platno.js'
import GameLoop from './GameLoop.js'

export default class Scena {
  constructor(manager) {
    this.manager = manager
    this.predmeti = []
    this.gameLoop = new GameLoop(this.loop)
    // UI
    this.elementUI = document.getElementById('ui')
    this.upamcenUI = ''
    this.prozorElement = document.getElementById('prozor')
    this.upamcenProzor = ''
    this.zavrsniTekst = ''
    this.init()
  }

  init() {}

  dodaj(...predmeti) {
    this.predmeti.push(...predmeti)
  }

  /* VELIČINA */

  get sirina() {
    return platno.width
  }

  get visina() {
    return platno.height
  }

  /* POZADINA */

  set bojaPozadine(boja) {
    // ctx.fillStyle = boja
    platno.style.backgroundColor = boja
  }

  get bojaPozadine() {
    return ctx.fillStyle
  }

  /* UI */

  handleClick = e => {}

  onClick = e => {
    if (e.target.id == 'igraj-opet')
      this.manager.start(this.constructor.name)

    if (e.target.id == 'menu')
      this.manager.start('MainMenu')

    this.handleClick(e)
  }

  prozor() {
    if (!this.zavrsniTekst) return ''
    return /* html */`
      <div class="prozorce centar">
        <p>${this.zavrsniTekst}</p>
        <button id="igraj-opet">Igraj opet</button><button id="menu">Glavni meni</button>
      </div>
    `
  }

  zavrsi(text = 'Igra je završena.') {
    this.zavrsniTekst = text
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

  /* GLAVNA PETLJA */

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
    if (this.zavrsniTekst) return // onemogućuje tipke

    if (keyboard.pressed.Escape) {
      console.log('esc')
    }

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
      ctx.clearRect(0, 0, this.sirina, this.visina)
  }

  render(dt, t) {
    const rekurzivnoRender = predmet => {
      if (predmet.render) predmet.render(dt, t)
      if (predmet?.predmeti?.length) predmet.predmeti.forEach(rekurzivnoRender)
    }
    this.predmeti.forEach(rekurzivnoRender)
  }

  loop = (dt, t) => {
    this.proveriTipke(dt)
    this.update(dt, t)
    this.cisti()
    this.render(dt, t)
    this.#renderSablon()
  }
}
