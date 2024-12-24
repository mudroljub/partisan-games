import Predmet from 'core/Predmet'
import slikaBunker from 'slike/2d-bocno/kuca-bunker.png'
import slikaBunkerGori from 'slike/2d-bocno/kuca-bunker-gori.png'

export default class Bunker extends Predmet {

  constructor(sirina, visina) {
    super(slikaBunker, sirina, visina)
    this.brzina = 0
    this.polozaj(400, 100)
  }

  nemojPreko(predmet) {
    this.postaviRandomUredno()
    if (this.razmakDo(predmet) < 150) {
      this.nemojPreko(predmet)
    }
  }

  gori() {
    this.slika.src = slikaBunkerGori
  }

}
