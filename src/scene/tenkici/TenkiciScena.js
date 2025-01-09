import { platno } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import { progresBar, komande } from '/game-ui/components.js'
import Tenk from './Tenk.js'
import Tenk2 from './Tenk2.js'

const nivoTla = platno.height * 0.8
const skalar = window.innerWidth > 1280 ? 0.5 : 0.4
let dvaIgraca = false

const callback = cilj => {
  cilj.dodajSilu(15, cilj.ugao + Math.PI)
  cilj.skiniEnergiju(Math.ceil(Math.random() * 2))
}

export default class TenkiciScena extends Scena {
  init() {
    this.pozadina = new Pozadina('/assets/slike/pozadine/razrusen-grad-savremen.jpg')

    this.tenk = new Tenk('/assets/slike/2d-bocno/partizanski-tenk-bez-cevi.png', {
      skalar, y: nivoTla, callback, cevSlika: '/assets/slike/2d-bocno/partizanski-tenk-cev.png',
    })
    this.tenk2 = new Tenk2('/assets/slike/2d-bocno/nemacki-tenk-bez-cevi.png', {
      skalar, y: nivoTla, callback, tenkDesno: true, cevSlika: '/assets/slike/2d-bocno/nemacki-tenk-cev.png'
    })

    this.predmeti = [this.tenk, this.tenk2]
  }

  handleClick = e => {
    super.handleClick(e)
    if (e.target.id == 'dva-igraca') dvaIgraca = !dvaIgraca
  }

  update(dt) {
    super.update(dt)
    if (!dvaIgraca) this.tenk2.samohod(this.tenk)
    this.tenk.proveriPogodak(this.tenk2)
    this.tenk2.proveriPogodak(this.tenk)
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
        <div class="${dvaIgraca ? '' : 'hide'}">
          ← levo<br>
          → desno<br>
          ↑ gore<br>
          ↓ dole<br>
          enter - puca
        </div>
        <button id="dva-igraca" class="${dvaIgraca ? 'bg-avocado' : ''} full">
          ${dvaIgraca ? 'Uključi<br> neprijatelja' : 'Dodaj igrača'}
        </button>
      </div>
    `
  }
}
