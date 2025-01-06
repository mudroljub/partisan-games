// ubaciti sliku minobacača i posadu
// bodovi, mozda pogoci prema pokušajima
// mozda dva igraca, odnosno jedan po jedan potezno
import Scena from '/game-engine/core/Scena.js'
import Kvadrat from '/game-engine/core/Kvadrat.js'
import Minobacac from './Minobacac.js'

export default class MinobacacScena extends Scena {
  init() {
    this.brdo = new Kvadrat(600, 0, 100, 250, 'black')
    this.tlo = new Kvadrat(0, 300, 600, 30, 'green')
    this.minobacac = new Minobacac(10, 280, 200, 20)
    this.dodaj(this.brdo, this.tlo, this.minobacac)
  }

  loop(dt) {
    super.loop(dt)
    this.proveriPogodak()
  }

  proveriPogodak() {
    if (this.minobacac.projektil.sudara(this.brdo))
      console.log('pogodak')
  }

  sablon() {
    return `
      <div class="komande">
        <progress value="${this.minobacac.sila}" max=1000></progress>
      </div>
    `
  }
}
