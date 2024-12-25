// da se ubrzava
// zvuk rafala kad pripucaju
// promena slike na pogodak?

import mish from 'io/mish'
import Scena from 'core/Scena'
import Pozadina from 'core/Pozadina'
import Svabo from './Svabo'
import Vreme from 'core/Vreme'

const DALJI_Y = 150
const BLIZI_Y = 300

export default class NemciIzRovova extends Scena {
  constructor(...args) {
    super(...args)
    this.init()
  }

  init() {
    this.vreme = new Vreme()
    this.pogoci = 0
    this.rekord = 0
    this.energija = 100
    this.bliziRovovi = this.praviSvabe(10, BLIZI_Y, { sirina: 100, visina: 150, ucestalost: 0.03 })
    this.daljiRovovi = this.praviSvabe(12, DALJI_Y, { sirina: 50, visina: 75, ucestalost: 0.02 })
    this.ucitajRekord()
    mish.dodajNishan()
    this.pozadina = new Pozadina('/assets/slike/teksture/suva-trava.jpg')
    this.handleClick = this.handleClick.bind(this)
    document.addEventListener('click', this.handleClick)
  }

  praviSvabe(n, y, params) {
    const razmak = this.sirina / n
    const polaRazmaka = razmak / 2
    return Array.from({ length: n }, (_, i) => {
      const x = i * razmak + polaRazmaka    
      const rov = new Svabo(params.sirina, params.visina, params.ucestalost)
      rov.polozaj(x, y)
      return rov
    })
  }

  proveriPogotke(rovovi) {
    for (let i = 0; i < rovovi.length; i++)
      if (rovovi[i].jePogodjen()) {
        rovovi[i].padni()
        this.pogoci++
      }

  }

  azurirajSvabe(rovovi) {
    for (let i = 0; i < rovovi.length; i++) {
      if (rovovi[i].jeSpreman()) {
        rovovi[i].puca()
        this.energija = Math.max(0, this.energija - 5 * this.vreme.deltaSekundi)
      }
      rovovi[i].update()
    }
  }

  proveriKraj() {
    if (this.energija > 0) return
    this.stop()
    let poruka = 'Hrabro si pao. '
    if (this.pogoci > this.rekord) {
      poruka += `Ubio si ${this.pogoci} okupatora. To je novi rekord!`
      localStorage.setItem('svabeRekord', this.pogoci)
    }
    this.endScreen(poruka)
  }

  ucitajRekord() {
    this.rekord = parseInt(localStorage.getItem('svabeRekord'))
    if (!this.rekord) this.rekord = 0
  }

  handleClick() {
    const ciljaniRovovi = (mish.y <= DALJI_Y) ? this.daljiRovovi : this.bliziRovovi
    this.proveriPogotke(ciljaniRovovi)
  }

  update() {
    this.cisti()
    this.pozadina.update()
    this.azurirajSvabe([...this.bliziRovovi, ...this.daljiRovovi])
    this.proveriKraj()
    // ;[...this.bliziRovovi, ...this.daljiRovovi].forEach(svabo => {
    //   svabo.ucestalost += 0.01 * this.vreme.deltaSekundi
    // })
  }

  end() {
    super.end()
    document.removeEventListener('click', this.handleClick)
    mish.ukloniNishan()
  }

  sablon() {
    return `
    <div class="komande bg-poluprovidno komande1">
      Pogoci: ${this.pogoci} <br>
      Rekord: ${this.rekord} <br>
      Energija <br>
      <div class="komande bg-poluprovidno energija1">${Math.round(this.energija)}</div>
      <progress class="komande poluprovidno progres1" value="${this.energija}" max="100"></progress>
    </div>
    `
  }
}
