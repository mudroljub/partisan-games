import Igrac from '/game-engine/core/Igrac.js'
import Vreme from '/game-engine/core/Vreme.js'
import platno from '/game-engine/io/platno.js'
import Metak from '/game-engine/core/projektili/Metak.js'

const PAUZA_PALJBE = 100
const ugloviPucanja = [-13, 0, 13]

export class Avionce extends Igrac {
  constructor() {
    super('2d-odozgo/avionce.gif', { skalar: .75, zapaljiv: true })
    this.vreme = new Vreme()
    this.brzina = 0
    this.meci = []
    this.predmeti = this.meci
    this.ugaoNapred = this.ugao + Math.PI * 1.5
  }

  onload() {
    this.polozaj = { x: platno.width / 2, y: platno.height - this.visina }
  }

  proveriGranice() {
    this.ogranici()
  }

  novMetak() {
    const metak = new Metak()
    this.meci.push(metak)
    return metak
  }

  puca() {
    if (this.vreme.proteklo <= PAUZA_PALJBE) return
    const polozaj = { x: this.x, y: this.y - this.visina / 4 }

    ugloviPucanja.forEach(ugao => {
      const metak = this.meci.find(g => !g.vidljiv) || this.novMetak()
      metak.pali(polozaj, this.ugaoNapred + ugao)
    })

    this.vreme.reset()
  }

  proveriPucanje() {
    this.neprijatelji.forEach(neprijatelj => {
      if (!neprijatelj.vidljiv || neprijatelj.vanEkrana) return

      this.meci.forEach(metak => {
        if (!metak.vidljiv || metak.vanEkrana) return

        if (metak.sudara(neprijatelj)) {
          neprijatelj.umri()
          metak.reset()
          // this.poeni--
        }
      })
    })
  }

  update(dt) {
    super.update(dt)
    this.proveriPucanje()
  }
}
