import Predmet from 'core/Predmet'
import slikaKutija from 'slike/2d-bocno/stvari/kutija.png'

export default class Prepreka extends Predmet {

  constructor(nizPredmeta) {
    super(slikaKutija, 50, 50)
    this.nemojPreko (nizPredmeta)
  }

  nemojPreko(nizPredmeta) {
    this.postaviRandom()
    for (let i = 0; i < nizPredmeta.length; i++) {
      if (this.sudara(nizPredmeta[i])) this.nemojPreko(nizPredmeta)
    }
  }

}
