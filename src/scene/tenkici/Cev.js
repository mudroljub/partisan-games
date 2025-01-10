import Predmet from '/game-engine/core/Predmet.js'

export default class Cev extends Predmet {
  constructor(vlasnik, src, skalar) {
    super(src, { skalar, ishodiste: 'GORE_LEVO' })
    this.vlasnik = vlasnik
    this.ugao = this.vlasnik.tenkDesno ? Math.PI * 1.1 : Math.PI * 1.9
  }
}
