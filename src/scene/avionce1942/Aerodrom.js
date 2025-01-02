import Predmet from '/game-engine/core/Predmet.js'

export default class Aerodrom extends Predmet {
  constructor(nivoTla, src = '/assets/slike/2d-bocno/zgrade/aerodrom.png') {
    super(src)
    this.onload = () => this.tlo(nivoTla)
  }

  proveriGranice() {
    this.vracaVodoravno(0.001)
  }
}
