import { KRUZNICA } from '/game-engine/konstante.js'
import Predmet from '/game-engine/core/Predmet.js'
import Raketa from '../../src/scene/avionce1942/Raketa.js'

export default class VoziloBocno extends Predmet {
  constructor(nivoTla, src, sirina, visina, x = 100, y = nivoTla - visina / 2) {
    super(src, sirina, visina)
    this.dodajSilu(3)
    this.x = x
    this.y = y
    this.zapaljiv = true
    this.sansaPucnja = 0.01
    this.oznake.add('neprijatelj')
    this.neprijatelji = [] // treba raketi
    this.raketa = new Raketa(this)
    this.raketa.cilj = 'igrac'
  }

  patroliraj() {
    if (this.mrtav) return
    if (this.x <= 150) {
      this.ugao = 0
      this.skalarY = 1
      this.brzina = 3
    }
    if (this.x >= 600) {
      this.ugao = KRUZNICA / 2
      this.skalarY = -1
      this.brzina = 3
    }
  }

  pucaPratecu() {
    this.raketa.pucaPratecu()
  }

  povremenoPucaPratecu() {
    if (!this.ziv) return
    if (Math.random() < this.sansaPucnja) this.pucaPratecu()
  }

  update() {
    super.update()
    this.raketa.update()
  }
}
