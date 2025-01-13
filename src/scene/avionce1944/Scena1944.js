import platno from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import { Avionce } from './Avionce.js'
import PokretnaPozadina from './PokretnaPozadina.js'
import Pokretno from './Pokretno.js'
import Oblak from './Oblak.js'
import Neprijatelj from './Neprijatelj.js'

const brojOblaka = 3
const brzina = 200

export default class Scena1944 extends Scena {
  init() {
    this.poeni = 0
    this.zivoti = 3
    this.oblaci = Array.from({ length: brojOblaka }, () => new Oblak(brzina))
    this.ostrvo = new Pokretno('2d-odozgo/ostrvo.gif', { potisak: brzina, skalar: 2 })
    this.zdravlje = new Pokretno('zdravlje.png', { potisak: brzina, skalar: .66, faktorY: 10 })
    this.igrac = new Avionce()
    this.neprijatelji = [
      new Neprijatelj('2d-odozgo/nemci/avioni/avion-01.png', { potisak: brzina, faktorY: 4 }),
      new Neprijatelj('2d-odozgo/nemci/avioni/avion-03.png', { potisak: brzina, faktorY: 3 }),
      new Neprijatelj('2d-odozgo/nemci/avioni/avion-05.png', { potisak: brzina, faktorY: 5 }),
      new Neprijatelj('2d-odozgo/nemci/avioni/Reggiane-Re-2005.png', { potisak: brzina, faktorY: 3 }),
    ]
    const pozadina = new PokretnaPozadina(brzina, platno.width)
    this.dodaj(pozadina, this.zdravlje, this.ostrvo, ...this.neprijatelji, this.igrac, ...this.oblaci)
  }

  proveriSudare() {
    if (this.igrac.sudara(this.zdravlje)) {
      this.zdravlje.reset()
      this.zivoti++
    }
    this.neprijatelji.forEach(neprijatelj => {
      if (this.igrac.sudara(neprijatelj)) {
        // neprijatelj.reset()
        this.igrac.umri()
        this.zivoti--
      }
    })
  }

  update(dt) {
    super.update(dt)
    this.proveriSudare()
  }

  sablon() {
    return /* html */`
      <div class='komande bg-poluprovidno komande1'>
        Poeni: ${this.poeni}<br>
        Životi: ${this.zivoti}<br>
      </div>
    `
  }
}
