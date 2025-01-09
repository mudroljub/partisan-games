import { KRUZNICA } from '/game-engine/konstante.js'
import Igrac from '/game-engine/core/Igrac.js'
import Vreme from '/game-engine/core/Vreme.js'
import platno from '/game-engine/io/platno.js'
import Metak from './Metak.js'

const BROJ_METAKA = 999
const SIRINA_PALJBE = 13
const PAUZA_PALJBE = 0.1

export class Avionce extends Igrac {
  constructor() {
    super('2d-odozgo/avionce.gif', { skalar: .75 })
    this.vreme = new Vreme()
    this.trenutniMetak = 0
    this.brzina = 0
    this.ugao = KRUZNICA * 3 / 4
    this.meci = Array.from({ length: BROJ_METAKA }, () => new Metak(this))
    this.predmeti = this.meci
  }

  onload() {
    this.polozaj(platno.width / 2, platno.height - this.visina)
  }

  proveriGranice() {
    this.ogranici()
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

  preostaloMetaka() {
    return BROJ_METAKA - this.trenutniMetak
  }
}
