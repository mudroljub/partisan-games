import platno from '/core/io/platno.js'
import Scena from '/core/actor/Scena.js'
import { Avionce } from './Avionce.js'
import PokretnaPozadina from './PokretnaPozadina.js'
import Pokretno from './Pokretno.js'
import Oblak from './Oblak.js'
import Neprijatelj from './Neprijatelj.js'

const brojOblaka = 3
const brzina = 150

export default class Scena1944 extends Scena {
  init() {
    this.oblaci = Array.from({ length: brojOblaka }, () => new Oblak(brzina))
    this.ostrvo = new Pokretno('2d-odozgo/ostrvo.gif', { potisak: brzina, skalar: 2 })
    this.zdravlje = new Pokretno('zdravlje.png', { potisak: brzina, skalar: .66, faktorY: 10, senka: true })
    this.igrac = new Avionce()
    this.neprijatelji = [
      new Neprijatelj('2d-odozgo/nemci/avioni/avion-01.png', { potisak: brzina }),
      new Neprijatelj('2d-odozgo/nemci/avioni/avion-03.png', { potisak: brzina }),
      new Neprijatelj('2d-odozgo/nemci/avioni/avion-05.png', { potisak: brzina }),
      new Neprijatelj('2d-odozgo/nemci/avioni/Reggiane-Re-2005.png', { potisak: brzina }),
    ]
    this.igrac.ciljevi = this.neprijatelji
    this.neprijatelji.forEach(neprijatelj => neprijatelj.ciljevi.push(this.igrac))
    const pozadina = new PokretnaPozadina(brzina, platno.width)
    this.dodaj(pozadina, this.zdravlje, this.ostrvo, ...this.neprijatelji, this.igrac, ...this.oblaci)
  }

  proveriSudare() {
    if (!this.igrac.ziv) return

    if (this.igrac.sudara(this.zdravlje)) {
      this.zdravlje.reset()
      this.igrac.zivoti++
    }
    this.neprijatelji.forEach(neprijatelj => {
      if (neprijatelj.ziv && this.igrac.sudara(neprijatelj)) {
        neprijatelj.umri()
        this.igrac.umri()
      }
    })
  }

  update(dt, t) {
    super.update(dt, t)
    this.proveriSudare()
    if (!this.igrac.zivoti) this.zavrsi()
  }

  sablon() {
    return /* html */`
      <div class='komande bg-poluprovidno komande1'>
        Poeni: ${this.igrac.poeni}<br>
        Životi: ${this.igrac.zivoti}<br>
      </div>
    `
  }
}
