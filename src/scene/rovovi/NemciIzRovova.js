import mish from '/game-engine/io/mish.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Svabo from './Svabo.js'

const DALJI_Y = 150
const BLIZI_Y = 300

export default class NemciIzRovova extends Scena {
  constructor(...args) {
    super(...args)
    this.init()
  }

  init() {
    this.pogoci = 0
    this.rekord = 0
    this.energija = 100
    this.ubrzano = false
    this.bliziRovovi = this.praviSvabe(10, BLIZI_Y, { sirina: 100, visina: 150, ucestalost: 0.03 })
    this.daljiRovovi = this.praviSvabe(12, DALJI_Y, { sirina: 50, visina: 75, ucestalost: 0.02 })
    this.sveSvabe = [...this.bliziRovovi, ...this.daljiRovovi]
    this.pozadina = new Pozadina('/assets/slike/teksture/suva-trava.jpg')

    this.ucitajRekord()
    mish.dodajNishan()
    this.handleClick = this.handleClick.bind(this)
    document.addEventListener('click', this.handleClick)
  }

  praviSvabe(n, y, params) {
    const razmak = this.sirina / n
    const polaRazmaka = razmak / 2
    return Array.from({ length: n }, (_, i) => {
      const x = i * razmak + polaRazmaka
      const svabo = new Svabo(params.sirina, params.visina, params.ucestalost)
      svabo.polozaj(x, y)
      return svabo
    })
  }

  proveriPogotke(rovovi) {
    for (let i = 0; i < rovovi.length; i++)
      if (rovovi[i].jePogodjen()) {
        rovovi[i].padni()
        this.pogoci++
      }
  }

  proveriKraj() {
    if (this.energija > 0) return
    this.end()
    let poruka = 'Hrabro si pao. '
    if (this.pogoci > this.rekord) {
      poruka += `Ubio si ${this.pogoci} okupatora. To je novi rekord!`
      localStorage.setItem('svabeRekord', this.pogoci)
    }
    this.zavrsniProzor(poruka)
  }

  ucitajRekord() {
    this.rekord = parseInt(localStorage.getItem('svabeRekord'))
    if (!this.rekord) this.rekord = 0
  }

  handleClick() {
    const ciljaniRovovi = (mish.y <= DALJI_Y) ? this.daljiRovovi : this.bliziRovovi
    this.proveriPogotke(ciljaniRovovi)
  }

  povrediMe = (damage, dt) => {
    this.energija = Math.max(0, this.energija - damage * dt)
  }

  update(dt, protekloSekundi) {
    this.pozadina.update()
    this.sveSvabe.forEach(svabo => svabo.update(dt, this.povrediMe))

    if (!this.ubrzano && protekloSekundi >= 30) {
      this.sveSvabe.forEach(svabo => svabo.ubrzaj(2))
      this.ubrzano = true
    }
    this.proveriKraj()
    this.ui.render()
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
