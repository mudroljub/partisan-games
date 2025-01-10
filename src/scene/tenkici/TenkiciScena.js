import { platno } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import { progresBar, komande } from '/game-ui/components.js'
import TenkLevo from './TenkLevo.js'
import TenkDesno from './TenkDesno.js'

const nivoTla = platno.height * 0.8

const callback = cilj => {
  cilj.dodajSilu(15, cilj.ugao + Math.PI)
  cilj.skiniEnergiju(Math.random() * 2)
}

export default class TenkiciScena extends Scena {
  init() {
    this.pozadina = new Pozadina('pozadine/razrusen-grad-savremen.jpg')
    this.tenk = new TenkLevo({ y: nivoTla, callback })
    this.tenk2 = new TenkDesno({ y: nivoTla, callback, cilj: this.tenk })
    this.tenk.cilj = this.tenk2
    this.predmeti = [this.tenk, this.tenk2]
  }

  handleClick = e => {
    super.handleClick(e)
    if (e.target.id == 'dva-igraca') this.tenk2.ai = !this.tenk2.ai
  }

  update(dt) {
    super.update(dt)
    if (this.tenk.mrtav || this.tenk2.mrtav) this.gotovo = true
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
        ${!this.tenk2.ai ? komande() : ''}
        <button id="dva-igraca" class="bg-avocado full">
          ${this.tenk2.ai ? 'Dodaj igrača' : 'Uključi<br> neprijatelja'}
        </button>
      </div>
    `
  }
}
