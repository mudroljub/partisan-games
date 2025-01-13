import Predmet from '/game-engine/core/Predmet.js'

export default class Ruina extends Predmet {
  constructor(nivoTla, src = '2d-bocno/zgrade/ruina.png') {
    super(src)
    this.x = -400
    this.onload = () => {
      this.tlo(nivoTla)
    }
  }

  proveriGranice() {
    this.vracaVodoravno(0.01)
  }
}
