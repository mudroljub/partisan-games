import mish from '/core/io/mish.js'
import Scena2D from '/core/Scena2D.js'
import Pozadina from '/core/objects/Pozadina.js'
import { progresBar } from '/ui/components.js'
import Svabo from './Svabo.js'

const DALJI_Y = 150
const BLIZI_Y = 300

export default class NemciIzRovova extends Scena2D {
  init() {
    this.pogoci = 0
    this.rekord = 0
    this.energija = 100
    this.ubrzano = false
    this.bliziRovovi = this.praviSvabe(10, BLIZI_Y, { skalar: 1, ucestalost: 0.03, callback: this.nanesiStetu.bind(this) })
    this.daljiRovovi = this.praviSvabe(12, DALJI_Y, { skalar: .5, ucestalost: 0.02, callback: this.nanesiStetu.bind(this) })
    this.sveSvabe = [...this.bliziRovovi, ...this.daljiRovovi]
    this.dodaj(...this.sveSvabe)
    this.pozadina = new Pozadina('textures/terrain/suva-trava.jpg')
    this.ucitajRekord()
    mish.dodajNishan()
  }

  praviSvabe(n, y, params) {
    const razmak = this.sirina / n
    const polaRazmaka = razmak / 2
    return Array.from({ length: n }, (_, i) => {
      const x = i * razmak + polaRazmaka
      const svabo = new Svabo(params)
      svabo.postavi(x, y)
      return svabo
    })
  }

  handleClick(e) {
    super.handleClick(e)
    const ciljaniRovovi = (mish.y <= DALJI_Y) ? this.daljiRovovi : this.bliziRovovi
    this.proveriPogotke(ciljaniRovovi)
  }

  nanesiStetu(damage, dt) {
    this.energija = Math.max(0, this.energija - damage * dt)
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

    let poruka = 'Hrabro si pao. '
    if (this.pogoci > this.rekord) {
      poruka += `Ubio si ${this.pogoci} okupatora. To je novi rekord!`
      localStorage.setItem('svabeRekord', this.pogoci)
    }
    this.zavrsi(poruka)
  }

  ucitajRekord() {
    this.rekord = parseInt(localStorage.getItem('svabeRekord'))
    if (!this.rekord) this.rekord = 0
  }

  end() {
    super.end()
    mish.ukloniNishan()
  }

  update(dt, t) {
    if (this.energija <= 0) return

    super.update(dt, t)
    if (!this.ubrzano && t >= 30) {
      this.sveSvabe.forEach(svabo => svabo.ubrzaj(2))
      this.ubrzano = true
    }
    this.proveriKraj()
  }

  sceneUI() {
    const energija = Math.round(this.energija)
    return /* html */`
    <div class="komande komande1 bg-poluprovidno">
      Pogoci: ${this.pogoci} <br>
      Rekord: ${this.rekord} <br>
      Energija 
      ${progresBar(energija)}
    </div>
    `
  }
}
