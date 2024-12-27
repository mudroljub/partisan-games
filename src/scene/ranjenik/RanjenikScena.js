// prikazati poruke umesto log (napraviti neko pomagalo)
// iskoristiti za Bekstvo iz Jasenovca i ranjenik paljba
// povecavati broj patrola
// u jasenovcu beton i trebalo bi ustase, a na sutjesci nemci, italijani, cetnici

import { izasaoDesno } from '/game-engine/akcije/granice.js'
import { platno, podloga } from '/game-engine/io/platno.js'
import { skaliranRazmak } from '/game-engine/utils.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Ranjenik from './Ranjenik.js'
import Patrola from './Patrola.js'
import Vreme from '/game-engine/core/Vreme.js'

const trajanjeStrelice = 500
const pauzaCrtanja = 3000

const crtajStrelicu = () => {
  podloga.lineWidth = 5
  podloga.strokeStyle = 'red'
  podloga.beginPath()
  podloga.moveTo(platno.width * 0.6, platno.height * 0.5)
  podloga.lineTo(platno.width * 0.9, platno.height * 0.5)
  podloga.moveTo(platno.width * 0.8, platno.height * 0.4)
  podloga.lineTo(platno.width * 0.9, platno.height * 0.5)
  podloga.lineTo(platno.width * 0.8, platno.height * 0.6)
  podloga.stroke()
}

export default class RanjenikScena extends Scena {
  constructor(...args) {
    super(...args)
    this.init()
  }

  init() {
    this.scena = 0
    this.strelicaVidljiva = false
    this.vreme = new Vreme()
    this.pozadina = new Pozadina('/assets/slike/2d-odozgo/shumarak-pozadina.png')
    this.ranjenik = new Ranjenik()
    this.patrola = new Patrola('/assets/slike/2d-odozgo/nemci-patrola.gif')
    this.patrola.polozaj(this.sirina * 3 / 4, this.visina * 3 / 4)
    this.ranjenik.polozaj(this.sirina / 4, this.visina / 2)
    this.dodaj(this.pozadina, this.ranjenik, this.patrola)
  }

  update() {
    super.update()
    this.patrola.zvuk.volume = skaliranRazmak(this.patrola, this.ranjenik)
    this.proveriSudare()
    this.proveriPobedu()
    this.smenjujStrelicu()
    if (this.strelicaVidljiva) crtajStrelicu()
  }

  smenjujStrelicu() {
    if (!this.strelicaVidljiva && this.vreme.proteklo < pauzaCrtanja) return
    if (this.strelicaVidljiva && this.vreme.proteklo < trajanjeStrelice) return
    this.strelicaVidljiva = !this.strelicaVidljiva
    this.vreme.reset()
  }

  proveriSudare() {
    if (this.patrola.sudara(this.ranjenik)) {
      this.patrola.stop()
      this.patrola.vikniZaredom(2)
      console.log('Uhvaćen si...')
      this.end()
    }
  }

  proveriPobedu() {
    if (izasaoDesno(this.ranjenik)) this.promeniScenu()
    if (this.scena < 4) return
    console.log('pobeda!')
    this.end()
  }

  promeniScenu() {
    const parna = this.scena % 2 === 0
    const slikaPozadine = parna ? '/assets/slike/teksture/beton.gif' : '/assets/slike/2d-odozgo/shumarak-pozadina.png'
    const slikaPatrole = parna ? '/assets/slike/2d-odozgo/talijani-patrola.gif' : '/assets/slike/2d-odozgo/nemci-patrola.gif'
    this.pozadina.zameniSliku(slikaPozadine)
    this.patrola.zameniSliku(slikaPatrole)
    this.patrola.postaviRandom()
    this.ranjenik.x = 10
    this.scena++
  }

  sablon() {
    return `
      <div class='komande bg-poluprovidno komande1'>
       <b>Komande</b>
       <br> A - levo
       <br> D - desno
       <br> W - napred
       <br> S - nazad
     </div>
    `
  }

  end() {
    super.end()
    this.patrola.zvuk.pause()
  }
}
