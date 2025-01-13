import Predmet from '/game-engine/core/Predmet.js'

export default class Granata extends Predmet {
  constructor() {
    super('granata.gif', { skalar: .33 })
    this.sakrij()
  }

  praviGravitaciju(gravitacija = 4.5) {
    this.dodajSilu(gravitacija, Math.PI * .5)
  }

  puca(cev, pravac) {
    this.skreni(cev.ugao - pravac)
    this.polozaj = cev.polozaj
    this.brzina = 900
    this.pokazi()
  }

  update(dt) {
    super.update(dt)
    this.praviGravitaciju()
  }
}