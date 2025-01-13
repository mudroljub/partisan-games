import Predmet from '/game-engine/core/Predmet.js'

export default class Metak extends Predmet {

  constructor({ src = 'granata.gif', skalar = .5, ...rest } = {}) {
    super(src, { skalar, ...rest })
    this.reset()
  }

  reset() {
    this.nestani()
    this.ispaljeno = false
  }

  postavi(polozaj, ugao) {
    this.polozaj = polozaj
    this.ugao = ugao
  }

  pali(polozaj, ugao, potisak = 1000) {
    this.postavi(polozaj, ugao)
    this.pokazi()
    this.dodajSilu(potisak)
    this.ispaljeno = true
  }

  proveriGranice() {
    this.nestaje()
  }
}
