// cilj da ubije tenk i sleti
// dodati startProzor (mozda i pauzu scene)
// dodati UI, prateća je enter

import * as $ from '/game-engine/konstante.js'
import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import AvionIgrac from './AvionIgrac.js'
import Hummel from './Hummel.js'
import Zgrada from './Zgrada.js'
import Oblak from '/src/2d-bocno/Oblak.js'
import Zbun from '/src/2d-bocno/Zbun.js'
import Shuma from '/src/2d-bocno/Shuma.js'

const BROJ_OBLAKA = 3
const BROJ_ZBUNOVA = 10
const BROJ_SHUME = 10
const PARALAX_1 = -5
const PARALAX_2 = -3
const PARALAX_3 = -1
const PARALAX_4 = -0.5
const POTISAK = 0.3
const MIN_BRZINA = 7
const MAX_BRZINA = 20
const DIZAJ = 10
const MAX_DIGNUTOST = 5555

export default class Avionce1942 extends Scena {
  constructor(...args) {
    super(...args)
    this.init()
  }

  init() {
    this.nivoTla = platno.height
    this.brzinaScene = 0
    this.dignutostScene = 0

    this.aerodrom = new Zgrada(this.nivoTla, '/assets/slike/2d-bocno/zgrade/aerodrom.png')
    this.ruina = new Zgrada(this.nivoTla, '/assets/slike/2d-bocno/zgrade/ruina.png')
    this.vozilo = new Hummel(this.nivoTla)
    this.igrac = new AvionIgrac(this.nivoTla)

    this.vozilo.neprijatelji.push(this.igrac)
    this.igrac.neprijatelji.push(this.vozilo)
    this.igrac.predmeti.push(this.vozilo, this.ruina)

    this.ruina.x = -this.ruina.sirina
    this.ruina.procenatVracanja = 0.01
    this.aerodrom.procenatVracanja = 0.001

    this.oblaci = Array.from({ length: BROJ_OBLAKA }, () => new Oblak())
    this.zbunovi = Array.from({ length: BROJ_ZBUNOVA }, () => new Zbun())
    this.shume = Array.from({ length: BROJ_SHUME }, () => new Shuma())

    this.dodaj(this.aerodrom, this.igrac, this.vozilo, this.ruina, ...this.oblaci, ...this.zbunovi, ...this.shume)
    this.pocniParalax()
  }

  update() {
    this.crtaNebo(this.nivoTla + this.dignutostScene, 'blue', 'lightblue', this.dignutostScene)
    super.update()
    this.proveriTipke()
    this.vozilo.patroliraj()
    this.proveriTlo()
    this.proveriSmrt()
  }

  proveriTipke() {
    if (!this.igrac.ziv) return

    if (keyboard.right && this.brzinaScene < MAX_BRZINA)
      this.ubrzavaPredmete($.KRUZNICA / 2, POTISAK)

    if (keyboard.left && this.brzinaScene >= MIN_BRZINA)
      this.ubrzavaPredmete($.KRUZNICA / 2, -POTISAK)

    if (keyboard.up && this.dignutostScene - DIZAJ < MAX_DIGNUTOST) {
      if (this.igrac.y < this.visina * 0.5) this.dizePredmete(DIZAJ)
      if (this.brzinaScene === 0) this.pocniParalax() // kada avion ponovo uzlece
    }

    if (keyboard.down && this.dignutostScene - DIZAJ >= 0)
      if (this.igrac.y > this.visina * 0.125) this.dizePredmete(-DIZAJ)
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

  get ostaliPredmeti() {
    return this.predmeti.filter(predmet => !predmet.oznake.has('igrac') && !predmet.oznake.has('raketa'))
  }

  zaustaviParalax() {
    this.ostaliPredmeti
      .filter(predmet => !predmet.oznake.has('neprijatelj'))
      .forEach(predmet => {
        predmet.dx *= 0.9
      })
    this.brzinaScene = 0
  }

  ubrzavaPredmete(ugao, pomak) {
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
      this.zavrsniProzor()
  }

  proveriTlo() {
    if (this.igrac.jePrizemljen() && this.dignutostScene === 0) this.zaustaviParalax()
  }
}
