import Predmet from '/game-engine/core/Predmet.js'

export default class Bunker extends Predmet {

  constructor(sirina = 112, visina = 103) {
    super('/assets/slike/2d-bocno/kuca-bunker.png', sirina, visina)
    this.brzina = 0
    this.polozaj(400, 100)
  }

  nemojPreko(predmet) {
    this.postaviRandomUredno()
    if (this.razmakDo(predmet) < 150)
      this.nemojPreko(predmet)

  }

  gori() {
    this.slika.src = '/assets/slike/2d-bocno/kuca-bunker-gori.png'
  }
}
