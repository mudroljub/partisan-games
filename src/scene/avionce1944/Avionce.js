import {KRUZNICA} from 'konstante'
import Igrac from 'core/Igrac'
import Vreme from 'core/Vreme'
import Metak from './Metak'
import platno from 'io/platno'
import {ogranici} from 'akcije/granice'
import slikaAvionce from 'slike/2d-odozgo/avionce.gif'
import zvukMotora from 'zvuci/engine.mp3'

const BROJ_METAKA = 999
const SIRINA_PALJBE = 13
const PAUZA_PALJBE = 0.1

export class Avionce extends Igrac {

  constructor() {
    super(slikaAvionce)
    this.prevelicaj(0.75)
    this.vreme = new Vreme()
    this.zvukMotora = new Audio(zvukMotora)
    this.meci = []
    this.trenutniMetak = 0
    this.brzina = 0
    this.ugao = KRUZNICA * 3/ 4
    this.polozaj(platno.width / 2, platno.height - this.visina)
    this.praviMetke()
    this.granice = ogranici
  }

  update() {
    super.update()
    this.proveriTipke()
    this.azurirajMetke()
  }

  nagore() {
    super.nagore()
    this.zvukMotora.play()
  }

  puca() {
    const protekloVreme = this.vreme.protekloSekundi
    const cevNijeSpremna = protekloVreme <= PAUZA_PALJBE
    const nemaMunicije = this.trenutniMetak >= BROJ_METAKA - 2
    if (cevNijeSpremna || nemaMunicije) return

    this.meci[this.trenutniMetak].puca(0)
    this.meci[this.trenutniMetak + 1].puca(-SIRINA_PALJBE)
    this.meci[this.trenutniMetak + 2].puca(SIRINA_PALJBE)
    this.trenutniMetak += 3
    this.vreme.reset()
  }

  praviMetke() {
    for (let i = 0; i < BROJ_METAKA; i++) {
      this.meci[i] = new Metak(this)
    }
  }

  azurirajMetke() {
    for (let i = 0; i < BROJ_METAKA; i++) {
      this.meci[i].update()
    }
  }

  preostaloMetaka() {
    return BROJ_METAKA - this.trenutniMetak
  }
}
