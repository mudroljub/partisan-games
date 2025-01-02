import Predmet from '/game-engine/core/Predmet.js'

export default class Ruina extends Predmet {
  constructor(nivoTla, src = '/assets/slike/2d-bocno/zgrade/ruina.png') {
    super(src)
    this.onload = () => {
      this.tlo(nivoTla)
      this.x = -this.sirina
    }
  }

  proveriGranice() {
    this.vracaVodoravno(0.01)
  }
}
