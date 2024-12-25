import Predmet from 'core/Predmet.js'

export default class Prepreka extends Predmet {

  constructor(nizPredmeta) {
    super('/assets/slike/2d-bocno/stvari/nagazna.png', 40, 30)
    this.nemojPreko (nizPredmeta)
  }

  nemojPreko(nizPredmeta) {
    this.postaviRandom()
    for (let i = 0; i < nizPredmeta.length; i++) {
      if (this.sudara(nizPredmeta[i])) this.nemojPreko(nizPredmeta)
    }
  }

}
