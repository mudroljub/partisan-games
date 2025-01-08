import { keyboard } from '/game-engine/io/Keyboard.js'
import platno, { crtaNebo } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import AvionIgrac from './AvionIgrac.js'
import VoziloBocno from '/game-engine/core/VoziloBocno.js'
import Aerodrom from './Aerodrom.js'
import Ruina from './Ruina.js'
import Oblak from '/src/2d-bocno/Oblak.js'
import Zbun from '/src/2d-bocno/Zbun.js'
import Shuma from '/src/2d-bocno/Shuma.js'

const BROJ_OBLAKA = 3
const BROJ_ZBUNOVA = 10
const BROJ_SHUME = 10

const PARALAX_1 = -312
const PARALAX_2 = -187
const PARALAX_3 = -62
const PARALAX_4 = -32

const POTISAK = 5
const MIN_BRZINA = 200
const MAX_BRZINA = 600

const DIZAJ = 10
const MAX_DIGNUTOST = 5555

export default class Scena1942 extends Scena {
  init() {
    this.nivoTla = platno.height
    this.brzinaScene = 0
    this.dignutostScene = 0

    this.aerodrom = new Aerodrom(this.nivoTla)
    this.ruina = new Ruina(this.nivoTla)
    this.vozilo = new VoziloBocno('/assets/slike/2d-bocno/hummel.png', { x: 150, y: this.nivoTla, skalar: .75 })
    this.igrac = new AvionIgrac(this.nivoTla)

    this.vozilo.dodajCiljeve(this.igrac)
    this.igrac.raketa.dodajCiljeve(this.vozilo)
    this.igrac.cvrstaTela.push(this.vozilo, this.ruina)

    this.oblaci = Array.from({ length: BROJ_OBLAKA }, () => new Oblak())
    this.zbunovi = Array.from({ length: BROJ_ZBUNOVA }, () => new Zbun())
    this.shume = Array.from({ length: BROJ_SHUME }, () => new Shuma())

    this.dodaj(this.aerodrom, this.igrac, this.ruina, this.vozilo, ...this.oblaci, ...this.zbunovi, ...this.shume)
    this.pocniParalax()
  }

  get ostaliPredmeti() {
    return this.predmeti.filter(predmet => !predmet.oznake.has('igrac') && !predmet.oznake.has('raketa'))
  }

  pocniParalax() {
    this.zbunovi.forEach(zbun => {
      zbun.dx = PARALAX_1
    })
    this.ruina.dx = PARALAX_2
    this.aerodrom.dx = PARALAX_3
    this.shume.forEach(shuma => {
      shuma.dx = PARALAX_3
    })
    this.oblaci.forEach(oblak => {
      oblak.dx = PARALAX_4
    })
  }

  zaustaviParalax() {
    this.ostaliPredmeti
      .filter(predmet => !predmet.oznake.has('neprijatelj'))
      .forEach(predmet => {
        predmet.dx *= 0.9
      })
    this.brzinaScene = 0
  }

  ubrzavaOstale(ugao, pomak) {
    this.ostaliPredmeti.forEach(predmet => predmet.dodajSilu(pomak, ugao))
    this.brzinaScene += pomak
  }

  dizePredmete(pomak) {
    this.ostaliPredmeti.forEach(predmet => {
      predmet.y += pomak
    })
    this.dignutostScene += pomak
  }

  proveriSmrt() {
    this.ostaliPredmeti.forEach(predmet => {
      if (predmet.mrtav) predmet.dx = PARALAX_1 - this.brzinaScene
    })
    if (this.igrac.mrtav && this.dignutostScene > 0)
      this.dizePredmete(-DIZAJ)

    if (this.igrac.mrtav)
      this.zavrsi('Slavno si pao.')
  }

  proveriTlo() {
    if (this.igrac.jePrizemljen() && this.dignutostScene === 0) {
      this.zaustaviParalax()
      if (this.igrac.ziv && this.vozilo.mrtav) this.zavrsi('Misija je uspešno završena!')
    }
  }

  cisti() {
    crtaNebo(this.nivoTla + this.dignutostScene, 'blue', 'lightblue', this.dignutostScene)
  }

  proveriTipke() {
    super.proveriTipke()
    if (!this.igrac.ziv) return

    if (keyboard.right && this.brzinaScene < MAX_BRZINA)
      this.ubrzavaOstale(Math.PI, POTISAK)

    if (keyboard.left && this.brzinaScene >= MIN_BRZINA)
      this.ubrzavaOstale(Math.PI, -POTISAK)

    if (keyboard.up && this.dignutostScene - DIZAJ < MAX_DIGNUTOST) {
      if (this.igrac.y < this.visina * 0.5) this.dizePredmete(DIZAJ)
      if (this.brzinaScene === 0) this.pocniParalax() // kada avion ponovo uzlece
    }

    if (keyboard.down && this.dignutostScene - DIZAJ >= 0)
      if (this.igrac.y > this.visina * 0.125) this.dizePredmete(-DIZAJ)
  }

  update(dt, t) {
    super.update(dt, t)
    this.proveriTlo()
    this.proveriSmrt()
  }

  sablon() {
    return /* html */`
      <main class='absolute full'>
        <h3 class='centar'>Uništi nemački tenk i bezbedno sleti! </h3>
        <div class='komande bg-poluprovidno komande1'>
          AutoPucanje: Space <br>
          Prateća: Enter <br>
        </div>
      </main>
    `
  }
}
