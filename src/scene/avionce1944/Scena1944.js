// ubaciti jednog neprijatelja i jednu stvar za hvatanje (paketić)
// senku ispod aviona, kao u avion.png

import Scena from 'core/Scena'
import {Avionce} from './Avionce'
import {Okean} from './Okean'
import {Ostrvo} from './Ostrvo'
import Oblak from './Oblak'
import platno from 'io/platno'

let poeni = 0
let zivoti = 3
const oblaci = []
const brojOblaka = 3
const brzinaPozadine = 10

const ostrvo = new Ostrvo(brzinaPozadine)
const igrac = new Avionce()

export default class Scena1944 extends Scena {
  constructor(...args) {
    super(...args)
    const pozadina = new Okean(brzinaPozadine, platno.width)
    for (let i = 0; i < brojOblaka; i++) oblaci[i] = new Oblak(brzinaPozadine)
    this.dodaj(pozadina, ostrvo, igrac, ...oblaci)
  }

  update() {
    super.update()
    this.proveriSudare()
  }

  proveriSudare() {
    if (igrac.sudara(ostrvo)) {
      ostrvo.reset()
      zivoti--
    }
    oblaci.map(oblak => {
      if (igrac.sudara(oblak)) {
        oblak.reset()
        poeni++
      }
    })
  }

  sablon() {
    return `
      <h1>Avionče 1944</h1>
      Poeni: ${poeni}<br>
      Životi: ${zivoti}<br>
      Meci: ${igrac.preostaloMetaka()}
    `
  }

  end() {
    super.end()
    igrac.zvukMotora.pause()
  }
}
