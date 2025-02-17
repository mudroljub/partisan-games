import platno from '/core/io/platno.js'
import Scena2D from '/core/Scena2D.js'
import { Avionce } from './Avionce.js'
import PokretnaPozadina from './PokretnaPozadina.js'
import Pokretno from './Pokretno.js'
import Oblak from './Oblak.js'
import Neprijatelj from './Neprijatelj.js'

const brojOblaka = 3
const brzina = 150

export default class Scena1944 extends Scena2D {
  init() {
    this.oblaci = Array.from({ length: brojOblaka }, () => new Oblak(brzina))
    this.ostrvo = new Pokretno('nature/ostrvo.gif', { potisak: brzina, skalar: 2 })
    this.zdravlje = new Pokretno('items/zdravlje.png', { potisak: brzina, skalar: .66, faktorY: 10, senka: true })
    this.player = new Avionce()
    this.neprijatelji = [
      new Neprijatelj('slicice/nemci/avioni/avion-odozgo-01.png', { potisak: brzina }),
      new Neprijatelj('slicice/nemci/avioni/avion-odozgo-03.png', { potisak: brzina }),
      new Neprijatelj('slicice/nemci/avioni/avion-odozgo-05.png', { potisak: brzina }),
      new Neprijatelj('slicice/nemci/avioni/Reggiane-Re-2005.png', { potisak: brzina }),
    ]
    this.player.ciljevi = this.neprijatelji
    this.neprijatelji.forEach(neprijatelj => neprijatelj.ciljevi.push(this.player))
    const pozadina = new PokretnaPozadina(brzina, platno.width)
    this.add(pozadina, this.zdravlje, this.ostrvo, ...this.neprijatelji, this.player, ...this.oblaci)
  }

  proveriSudare() {
    if (!this.player.ziv) return

    if (this.player.sudara(this.zdravlje)) {
      this.zdravlje.reset()
      this.player.zivoti++
    }
    this.neprijatelji.forEach(neprijatelj => {
      if (neprijatelj.ziv && this.player.sudara(neprijatelj)) {
        neprijatelj.umri()
        this.player.umri()
      }
    })
  }

  update(dt, t) {
    super.update(dt, t)
    this.proveriSudare()
    if (!this.player.zivoti) this.finish()
  }

  sceneUI() {
    return /* html */`
      <div class='top-left'>
        Poeni: ${this.player.poeni}<br>
        Životi: ${this.player.zivoti}<br>
      </div>
    `
  }
}
