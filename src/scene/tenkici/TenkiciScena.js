import { platno } from '/core/io/platno.js'
import Scena2D from '/core/actor/Scena2D.js'
import Pozadina from '/core/actor/Pozadina.js'
import { progresBar, komande, komande2 } from '/game-ui/components.js'
import TenkLevo from './TenkLevo.js'
import TenkDesno from './TenkDesno.js'

const nivoTla = platno.height * 0.8

export default class TenkiciScena extends Scena2D {
  init() {
    this.pozadina = new Pozadina('pozadine/razrusen-grad-savremen.jpg')
    this.tenk = new TenkLevo({ y: nivoTla })
    this.tenk2 = new TenkDesno({ y: nivoTla })
    this.tenk.ciljevi.push(this.tenk2)
    this.tenk2.ciljevi.push(this.tenk)
    this.predmeti = [this.tenk, this.tenk2]
  }

  handleClick = e => {
    super.handleClick(e)
    if (e.target.id == 'dva-igraca') this.tenk2.ai = !this.tenk2.ai
  }

  update(dt) {
    super.update(dt)
    if (this.tenk.mrtav || this.tenk2.mrtav) this.zavrsi()
  }

  zavrsniProzor() {
    return /* html*/`
      <div class="prozorce bg-black">
        <p class="valencia">${this.tenk.mrtav ? this.tenk.ime : this.tenk2.ime} je uništen.</p>
        <p class="avocado">${this.tenk.ziv ? this.tenk.ime : this.tenk2.ime} je pobedio ovu borbu.</p>
        <button id="igraj-opet">Igraj opet</button><button id="menu">Glavni meni</button>
      </div>
    `
  }

  sablon() {
    return /* html*/`
      <div class='komande bg-poluprovidno komande1'>
        <b>${this.tenk.ime}</b>
        ${progresBar(this.tenk.energija)}
        ${komande()}
      </div>

      <div class='komande bg-poluprovidno komande2'>
        <span class='bold'>${this.tenk2.ime}</span>
        ${progresBar(this.tenk2.energija)}
        ${!this.tenk2.ai ? komande2() : ''}
        <button id="dva-igraca" class="bg-avocado full">
          ${this.tenk2.ai ? 'Dodaj igrača' : 'Uključi<br> neprijatelja'}
        </button>
      </div>
    `
  }
}
