import { KRUZNICA } from 'konstante'
import Predmet from 'core/Predmet'

const SILA = 1

export default class TenkOdozgo extends Predmet {
  constructor(x = 100, y = 200) {
    super('/assets/slike/2d-odozgo/tenk-rdjavi.gif', 168, 70)
    this.x = x
    this.y = y
    this.zvuk = new Audio('/assets/zvuci/zvuk-tenka.mp3')
    this.dodajSilu(SILA, 0)
  }

  patroliraj() {
    if (this.x > 600) this.okreniLevo()
    if (this.x < 150) this.okreniDesno()
  }

  okreniLevo() {
    this.ugao = KRUZNICA / 2
  }

  okreniDesno() {
    this.ugao = 0
  }
}
