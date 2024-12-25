// da se ubrzava
// dodati indikator
// animirati švabu kako se dize i pada
// da se ne sudaraju?

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
    this.bliziRovovi = this.praviSvabe(10, BLIZI_Y, {sirina: 100, visina: 150, ucestalost: 0.03})
    this.daljiRovovi = this.praviSvabe(10, DALJI_Y, {sirina: 50, visina: 75, ucestalost: 0.02})
    this.ucitajRekord()
    mish.dodajNishan()
    this.pozadina = new Pozadina('/assets/slike/teksture/suva-trava.jpg')
    this.handleClick = this.handleClick.bind(this)
    document.addEventListener('click', this.handleClick)
  }

  sablon() {
    return `
      Pogoci: ${this.pogoci} <br>
      Energija: ${Math.round(this.energija)} <br>
      Rekord: ${this.rekord}
    `
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

  handleClick() {
    const ciljaniRovovi = (mish.y <= DALJI_Y) ? this.daljiRovovi : this.bliziRovovi
    this.proveriPogotke(ciljaniRovovi)
  }

  proveriPogotke(rovovi) {
    for (let i = 0; i < rovovi.length; i++) {
      if (rovovi[i].jePogodjen()) {
        rovovi[i].padni()
        this.pogoci++
      }
    }
  }  

  praviSvabe(num, y, params) {
    return Array.from({ length: num }, () => {
      const rov = new Svabo(params.sirina, params.visina, params.ucestalost)
      const randomX = Math.random() * this.sirina
      rov.polozaj(randomX, y)
      return rov
    })    
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
  
  end() {
    super.end()
    document.removeEventListener('click', this.handleClick)
    mish.ukloniNishan()
  }
}
