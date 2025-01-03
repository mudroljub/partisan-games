import platno from '/game-engine/io/platno.js'
import Vreme from '/game-engine/core/Vreme.js'
import TenkBocnoIgrac from './TenkBocnoIgrac.js'

const vremeGasa = new Vreme()
const vremeSmera = new Vreme()

const desno = platno.width * 0.9
const levo = platno.width / 2

export default class TenkNemacki extends TenkBocnoIgrac {
  constructor(x = platno.width - 150, y = 450) {
    super('/assets/slike/2d-bocno/nemacki-tenk-bez-cevi.png', false, 82, 32)
    this.postaviCev('/assets/slike/2d-bocno/nemacki-tenk-cev.png', 100, 7)
    this.polozaj(x, y)
    this.oznake.delete('igrac')
  }

  mrdaNasumicno() {
    this.brzina = Math.random() * 10 - 5
    if (this.x >= desno) {
      this.brzina = Math.random() * 10 - 5
      this.skreni(Math.PI)
    }

    if (this.x >= platno.width - 10)
      this.x = platno.width - 10

    if (this.x <= levo) {
      this.brzina = Math.random() * 10 - 5
      this.skreni(0)
    }
  }

  mrdajNasumicno() {
    const rand = Math.random()
    if (vremeGasa.proteklo > 70) {
      this.dodajSilu(rand * this.potisak)
      vremeGasa.reset()
    }
    if (vremeSmera.proteklo > 300) {
      this.ugao = rand > 0.55 ? this.nazad : this.napred
      vremeSmera.reset()
    }
    if (this.x > desno) this.ugao = this.napred
    if (this.x < levo) this.ugao = this.nazad
  }
}
