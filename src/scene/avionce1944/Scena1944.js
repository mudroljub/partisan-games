// ubaciti jednog neprijatelja i jednu stvar za hvatanje (paketić)
// senku ispod aviona, kao u avion.png
// BUG: pozadina preskače

import Scena from 'core/Scena'
import {Avionce} from './Avionce'
import {Okean} from './Okean'
import {Ostrvo} from './Ostrvo'
import Oblak from './Oblak'
import platno from 'io/platno'

const brojOblaka = 3
const brzinaPozadine = 10

export default class Scena1944 extends Scena {
  constructor(...args) {
    super(...args)
    this.init()
  }

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

  update() {
    super.update()
    this.proveriSudare()
  }

  proveriSudare() {
    if (this.igrac.sudara(this.ostrvo)) {
      this.ostrvo.reset()
      this.zivoti--
    }
    this.oblaci.map(oblak => {
      if (this.igrac.sudara(oblak)) {
        oblak.reset()
        this.poeni++
      }
    })
  }

  sablon() {
    return `
      <h1>Avionče 1944</h1>
      Poeni: ${this.poeni}<br>
      Životi: ${this.zivoti}<br>
      Meci: ${this.igrac.preostaloMetaka()}
    `
  }

  end() {
    super.end()
    this.igrac.zvukMotora.pause()
  }
}
