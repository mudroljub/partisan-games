// prikazati prozore umesto log
// BUG: ogranici ne radi za pomeri, samo za dodajSilu
// iskoristiti za Bekstvo iz Jasenovca i ranjenik paljba
// povecavati broj patrola
// u jasenovcu beton i trebalo bi ustase, a na sutjesci nemci, italijani, cetnici
import { izasaoDesno } from '/game-engine/utils/granice.js'
import { platno, ctx } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Ranjenik from './Ranjenik.js'
import Patrola from './Patrola.js'
import Vreme from '/game-engine/core/Vreme.js'

const trajanjeStrelice = 500
const pauzaCrtanja = 3000

const crtajStrelicu = () => {
  ctx.lineWidth = 5
  ctx.strokeStyle = 'red'
  ctx.beginPath()
  ctx.moveTo(platno.width * 0.6, platno.height * 0.5)
  ctx.lineTo(platno.width * 0.9, platno.height * 0.5)
  ctx.moveTo(platno.width * 0.8, platno.height * 0.4)
  ctx.lineTo(platno.width * 0.9, platno.height * 0.5)
  ctx.lineTo(platno.width * 0.8, platno.height * 0.6)
  ctx.stroke()
}

export default class RanjenikScena extends Scena {
  init() {
    this.scena = 0
    this.strelicaVidljiva = false
    this.vreme = new Vreme()
    this.pozadina = new Pozadina('/assets/slike/2d-odozgo/shumarak-pozadina.png')
    this.ranjenik = new Ranjenik(this.sirina / 4, this.visina / 2)
    this.patrola = new Patrola('/assets/slike/2d-odozgo/nemci-patrola.gif', this.ranjenik)
    this.patrola.polozaj(this.sirina * 3 / 4, this.visina * 3 / 4)
    this.dodaj(this.pozadina, this.ranjenik, this.patrola)
  }

  smenjujStrelicu() {
    if (!this.strelicaVidljiva && this.vreme.proteklo < pauzaCrtanja) return
    if (this.strelicaVidljiva && this.vreme.proteklo < trajanjeStrelice) return

    this.strelicaVidljiva = !this.strelicaVidljiva
    this.vreme.reset()
  }

  proveriSudare() {
    if (this.patrola.sudara(this.ranjenik)) {
      this.patrola.stani()
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
    const pozadina = parna ? 'teksture/beton.gif' : '2d-odozgo/shumarak-pozadina.png'
    const patrola = parna ? '2d-odozgo/talijani-patrola.gif' : '2d-odozgo/nemci-patrola.gif'
    this.pozadina.zameniSliku(`/assets/slike/${pozadina}`)
    this.patrola.zameniSliku(`/assets/slike/${patrola}`)
    this.patrola.postaviRandom()
    this.ranjenik.x = 10
    this.scena++
  }

  end() {
    super.end()
    this.patrola.zvuk.pause()
  }

  update(dt, t) {
    super.update(dt, t)
    this.proveriSudare()
    if (this.strelicaVidljiva) crtajStrelicu()
    this.smenjujStrelicu()
    this.proveriPobedu()
  }

  sablon() {
    return /* html */`
      <div class='komande bg-poluprovidno komande1'>
       <b>Komande</b>
       <br> A - levo
       <br> D - desno
       <br> W - napred
       <br> S - nazad
     </div>
    `
  }
}
