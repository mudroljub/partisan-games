import {KRUZNICA} from 'konstante'
import Predmet from 'core/Predmet'
import slikaTenk from 'slike/2d-odozgo/tenk-rdjavi.gif'
import zvukTenka from 'zvuci/zvuk-tenka.mp3'

const SILA = 1

export default class TenkOdozgo extends Predmet {
  constructor(x = 100, y = 200) {
    super(slikaTenk, 168, 70)
    this.x = x
    this.y = y
    this.zvuk = new Audio(zvukTenka)
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
