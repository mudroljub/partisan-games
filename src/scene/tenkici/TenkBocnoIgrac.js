// odvojiti Granatu
// srediti pojavljivanje granate
// napraviti niz granata, da puca zaredom
// srediti ugao granate
import { uRadijane } from '/game-engine/utils.js'
import Predmet from '/game-engine/core/Predmet.js'
import Igrac from '/game-engine/core/Igrac.js'
import platno from '/game-engine/io/platno.js'

class Granata extends Predmet {
  constructor() {
    super('/assets/slike/granata.gif', { skalar: .33 })
    this.sakrij()
  }

  praviGravitaciju(gravitacija = 0.3) {
    this.dodajSilu(gravitacija, uRadijane(90))
  }

  puca(cev, pravac) {
    this.skreni(cev.ugao - pravac)
    this.polozaj(cev.x, cev.y)
    this.brzina = 20
    this.pokazi()
  }
}

export default class TenkBocnoIgrac extends Igrac {
  constructor(src, jelNadesno, sirina, visina) {
    super(src, { sirina, visina })
    this.x = 100
    this.okrenutNadesno = jelNadesno
    this.energija = 100
    this.brzina = 0
    // if (this.okrenutNadesno) this.podesiTipke($.A, $.D, $.W, $.S, $.RAZMAK)
    // if (!this.okrenutNadesno) this.podesiTipke($.LEVO, $.DESNO, $.GORE, $.DOLE, $.M)
  }

  proveriGranice() {
    this.ogranici()
  }

  update() {
    this.cev.polozaj(this.x + 1, this.y - 9)
    this.cev.update()
    super.update()
    this.praviGravitaciju()
    this.granata.update()
  }

  postaviCev(cevSrc, sirina, visina) {
    this.cev = new Predmet(cevSrc, { sirina, visina })
    this.cev.brzina = 0
    this.podesiUgaoCevi()
    this.postaviGranatu()
    this.ograniciCev()
  }

  podesiUgaoCevi() {
    const ugaoCevi = this.okrenutNadesno ? -uRadijane(10) : uRadijane(10)
    this.cev.ugao = ugaoCevi
    this.pomerajCevi = this.okrenutNadesno ? -uRadijane(1) : uRadijane(1)
    const maxDonjiPomak = this.okrenutNadesno ? uRadijane(15) : uRadijane(10)
    const maxGornjiPomak = this.okrenutNadesno ? uRadijane(10) : uRadijane(15)
    this.donjiLimitCevi = ugaoCevi - maxDonjiPomak
    this.gornjiLimitCevi = ugaoCevi + maxGornjiPomak
  }

  postaviGranatu() {
    this.granata = new Granata()
  }

  praviGravitaciju() {
    this.granata.praviGravitaciju()
  }

  ograniciCev() {
    if (this.cev.ugao < this.donjiLimitCevi) this.cev.ugao = this.donjiLimitCevi
    if (this.cev.ugao > this.gornjiLimitCevi) this.cev.ugao = this.gornjiLimitCevi
  }

  nagore() {
    this.cev.ugao += this.pomerajCevi
  }

  nadole() {
    this.cev.ugao -= this.pomerajCevi
  }

  reset() {
    this.polozaj(Math.random() * 400, 450)
    this.energija = 100
  }

  mrdaNasumicno() {
    this.brzina = Math.random() * 10 - 5
    if (this.x >= 600) {
      this.brzina = Math.random() * 10 - 5
      this.skreni(Math.PI)
    }
    if (this.x >= platno.width - 10)
      this.x = platno.width - 10

    if (this.x <= 450) {
      this.brzina = Math.random() * 10 - 5
      this.skreni(0)
    }
  }

  puca() {
    const pravac = this.okrenutNadesno ? 0 : 180
    this.granata.puca(this.cev, pravac)
  }
}
