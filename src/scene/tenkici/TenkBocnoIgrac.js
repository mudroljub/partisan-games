import { uRadijane } from '/game-engine/utils.js'
import Predmet from '/game-engine/core/Predmet.js'
import Igrac from '/game-engine/core/Igrac.js'
import Granata from './Granata.js'

export default class TenkBocnoIgrac extends Igrac {
  constructor(src, okrenutNadesno, sirina, visina) {
    super(src, { sirina, visina })
    this.x = 100
    this.okrenutNadesno = okrenutNadesno
    this.energija = 100
    this.brzina = 0
    this.potisak = 30
  }

  proveriGranice() {
    this.ogranici()
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

  puca() {
    const pravac = this.okrenutNadesno ? 0 : 180
    this.granata.puca(this.cev, pravac)
  }

  update() {
    super.update()
    this.cev.polozaj(this.x + 1, this.y - 9)
    this.cev.update()
    this.granata.update()
  }
}
