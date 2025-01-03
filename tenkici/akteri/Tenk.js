import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'
import Vreme from '/game-engine/core/Vreme.js'
import Predmet from '/game-engine/core/Predmet.js'
import Cev from './Cev.js'
import Granata from './Granata.js'

const statickoTrenje = 0.3
const kinetickoTrenje = 0.1
const vremePunjenja = 1000
const brojGranata = 100
let pripremi = false

export default class Tenk extends Predmet {

  constructor(src = '/assets/slike/2d-bocno/partizanski-tenk-bez-cevi.png', skalar) {
    super(src, { skalar })
    this.napred = 0
    this.nazad = Math.PI
    this.potisak = 30
    this.cev = new Cev(this, '/assets/slike/2d-bocno/partizanski-tenk-cev.png', skalar)
    this.vreme = new Vreme()
    this.ugaoSlike = this.napred
    this.ime = 'Levi tenk'
    this.init()
  }

  init() {
    this.x = Math.random() * platno.width * 0.3
    this.granate = []
    this.praviGranate()
    this.energija = 100
    this.ziv = true
  }

  update(dt) {
    this.trenje()
    super.update(dt)
    this.cev.update(dt)
    this.granate.map((granata, i) => {
      granata.update(dt)
      if (granata.nestala) this.granate.splice(i, 1)
    })
    this.proveriSmrt()
  }

  render() {
    this.granate.map(g => g.render())
    this.cev.render()
    super.render()
  }

  skiniEnergiju(steta) {
    this.energija -= steta
    if (this.energija <= 0) this.energija = 0
  }

  proveriSmrt() {
    if (this.energija <= 0) this.umri()
  }

  proveriPogodak(predmet) {
    this.granate
      .filter(granata => granata.ispaljena)
      .map(granata => granata.proveriPogodak(predmet))
  }

  praviGranate() {
    for (let i = brojGranata - 1; i >= 0; i--)
      this.granate[i] = new Granata(this.cev)

  }

  trenje() {
    const koeficijent = (this.brzina > 0.1) ? kinetickoTrenje : statickoTrenje
    super.trenje(koeficijent)
  }

  proveriTipke(dt) {
    if (this.mrtav) return
    this.ograniciPolozaj()

    if (keyboard.pressed.KeyA && this.x > 0) this.dodajSilu(this.potisak * 0.6 * dt, this.nazad)
    if (keyboard.pressed.KeyD && this.x < platno.width / 2) this.dodajSilu(this.potisak * dt, this.napred)
    if (keyboard.pressed.KeyW) this.cev.nagore()
    if (keyboard.pressed.KeyS) this.cev.nadole()

    // prebaciti nekako na tipke?
    if (keyboard.space) pripremi = true
    if (pripremi && !keyboard.space) {
      this.pucaj(dt)
      pripremi = false
    }
  }

  ograniciPolozaj() {
    if (this.x < 0) this.x = 0
    if (this.x > platno.width / 2) this.x = platno.width / 2
  }

  pucaj(dt) {
    if (this.vreme.proteklo < vremePunjenja || !this.granate.length) return
    let i = this.granate.length - 1
    while (this.granate[i].ispaljena && i > 0) i--  // trazi neispaljenu
    if (this.granate[i].ispaljena) return
    this.granate[i].pucaj()
    this.trzaj(dt)
    this.vreme.reset()
  }

  trzaj(dt) {
    this.dodajSilu(this.potisak * dt, this.nazad)
  }
}
