import Igrac from '/game-engine/core/Igrac.js'
import Vreme from '/game-engine/core/Vreme.js'
import platno from '/game-engine/io/platno.js'
import Metak from './Metak.js'

const BROJ_METAKA = 999
const PAUZA_PALJBE = 0.1
const ugloviPucanja = [-13, 0, 13]

export class Avionce extends Igrac {
  constructor() {
    super('2d-odozgo/avionce.gif', { skalar: .75 })
    this.vreme = new Vreme()
    this.trenutniMetak = 0
    this.brzina = 0
    this.meci = Array.from({ length: BROJ_METAKA }, () => new Metak(this))
    this.predmeti = this.meci
    this.ugaoGore = this.ugao + Math.PI * 1.5
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

    const polozaj = { x: this.x, y: this.y - this.visina / 4 }

    ugloviPucanja.forEach((ugao, i) => {
      this.meci[this.trenutniMetak + i].puca(polozaj, this.ugaoGore + ugao)
    })

    this.trenutniMetak += ugloviPucanja.length
    this.vreme.reset()
  }

  preostaloMetaka() {
    return BROJ_METAKA - this.trenutniMetak
  }
}
