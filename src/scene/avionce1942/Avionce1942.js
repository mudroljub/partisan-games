// cilj da ubije tenk i sleti
// dodati UI, prateća je enter
// BUG: nekad ne učita zgrade
import * as $ from 'konstante'
import tipke from 'io/tipke'
import platno from 'io/platno'
import Scena from 'core/Scena'
import AvionIgrac from './AvionIgrac'
import Hummel from './Hummel'
import Zgrada from './Zgrada'
import Oblak from 'src/2d-bocno/Oblak'
import Zbun from 'src/2d-bocno/Zbun'
import Shuma from 'src/2d-bocno/Shuma'

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

    if (tipke.stisnute[$.D] && this.brzinaScene < MAX_BRZINA)
      this.ubrzavaPredmete($.KRUZNICA / 2, POTISAK)

    if (tipke.stisnute[$.A] && this.brzinaScene >= MIN_BRZINA)
      this.ubrzavaPredmete($.KRUZNICA / 2, -POTISAK)

    if (tipke.stisnute[$.W] && this.dignutostScene - DIZAJ < MAX_DIGNUTOST) {
      if (this.igrac.y < this.visina * 0.5) this.dizePredmete(DIZAJ)
      if (this.brzinaScene === 0) this.pocniParalax() // kada avion ponovo uzlece
    }

    if (tipke.stisnute[$.S] && this.dignutostScene - DIZAJ >= 0)
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
      this.endScreen()
  }

  proveriTlo() {
    if (this.igrac.jePrizemljen() && this.dignutostScene === 0) this.zaustaviParalax()
  }
}
