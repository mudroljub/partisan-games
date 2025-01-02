// nema ostrva?
// promeniti zvuk motora
// ubaciti jednog neprijatelja i jednu stvar za hvatanje (paketić)
// senku ispod aviona, kao u avion.png

import Scena from '/game-engine/core/Scena.js'
import { Avionce } from './Avionce.js'
import PokretnaPozadina from './PokretnaPozadina.js'
import { Ostrvo } from './Ostrvo.js'
import Oblak from './Oblak.js'
import platno from '/game-engine/io/platno.js'

const brojOblaka = 3
const brzinaPozadine = 10

export default class Scena1944 extends Scena {
  init() {
    this.poeni = 0
    this.zivoti = 3
    this.oblaci = []
    this.ostrvo = new Ostrvo(brzinaPozadine)
    this.igrac = new Avionce()
    const pozadina = new PokretnaPozadina(brzinaPozadine, platno.width)
    for (let i = 0; i < brojOblaka; i++) this.oblaci[i] = new Oblak(brzinaPozadine)
    this.dodaj(pozadina, this.ostrvo, this.igrac, ...this.oblaci)
  }

  proveriSudare() {
    if (this.igrac.sudara(this.ostrvo)) {
      this.ostrvo.reset()
      this.zivoti--
    }
    this.oblaci.forEach(oblak => {
      if (this.igrac.sudara(oblak)) {
        oblak.reset()
        this.poeni++
      }
    })
  }

  end() {
    super.end()
    this.igrac.zvukMotora.pause()
  }

  update() {
    super.update()
    this.proveriSudare()
  }

  sablon() {
    return `
      <main class='centar'>
        <h3>Avionče 1944</h3>
        <div class='tabela'>
          Poeni: ${this.poeni}<br>
          Životi: ${this.zivoti}<br>
          Meci: ${this.igrac.preostaloMetaka()}
        </div>
      </main>
    `
  }
}
