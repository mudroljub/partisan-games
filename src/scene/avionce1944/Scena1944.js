// BUG: pozadina preskače
// ubaciti jednog neprijatelja i jednu stvar za hvatanje (paketić)
// senku ispod aviona, kao u avion.png

import Scena from '/game-engine/core/Scena.js'
import { Avionce } from './Avionce.js'
import { Okean } from './Okean.js'
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
    const pozadina = new Okean(brzinaPozadine, platno.width)
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
      <h1>Avionče 1944</h1>
      Poeni: ${this.poeni}<br>
      Životi: ${this.zivoti}<br>
      Meci: ${this.igrac.preostaloMetaka()}
    `
  }
}
