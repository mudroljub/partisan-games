import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'
import Vreme from '/game-engine/core/Vreme.js'
import Predmet from '/game-engine/core/Predmet.js'
import Cev from './Cev.js'
import Granata from './Granata.js'
import { gravitacija } from './konstante.js'
import { randomInRange } from '/game-engine/utils.js'

const statickoTrenje = 0.3
const kinetickoTrenje = 0.1
const vremePunjenja = 1000
const vremePunjenjaAI = 1500

const defaultSkalar = window.innerWidth > 1280 ? 0.5 : 0.4

export default class Tenk extends Predmet {
  constructor({
    tenkDesno = false,
    src = tenkDesno ? '2d-bocno/nemacki-tenk-bez-cevi.png' : '2d-bocno/partizanski-tenk-bez-cevi.png',
    cevSlika = tenkDesno ? '2d-bocno/nemacki-tenk-cev.png' : '2d-bocno/partizanski-tenk-cev.png',
    skalar = defaultSkalar,
    callback,
    ...rest
  } = {}) {
    super(src, { zapaljiv: true, skalar, ...rest })
    this.tenkDesno = tenkDesno
    this.callback = callback
    this.x = tenkDesno
      ? randomInRange(platno.width * 0.7, platno.width) - 100
      : randomInRange(0, platno.width * 0.3)
    this.cev = new Cev(this, cevSlika, skalar)
    this.ime = tenkDesno ? 'Nemački tenk' : 'Partizanski tenk'
    this.vreme = new Vreme()
    this.potisak = 25
    this.granate = []
    this.predmeti = this.granate
    this.energija = 100
    this.zapaljivost = 20
    this.spremno = false
    if (tenkDesno) {
      this.ugao = Math.PI
      this.odrazX = this.odrazY = -1
    }
    // AI
    this.smer = this.ugao
    this.vremeGasa = new Vreme()
    this.vremeSmera = new Vreme()
    this.vremePucanja = new Vreme()
  }

  get zapaljen() {
    return this.energija <= this.zapaljivost
  }

  get polozajGranate() {
    const x = Math.cos(this.cev.ugao) * this.cev.dijagonala + this.cev.x
    const y = Math.sin(this.cev.ugao) * this.cev.dijagonala + this.cev.y
    return { x, y }
  }

  skiniEnergiju(steta) {
    this.energija = Math.max(this.energija - steta, 0)
  }

  proveriSmrt() {
    if (this.energija <= 0) this.umri()
  }

  proveriPogodak(cilj) {
    this.granate
      .filter(granata => granata.ispaljena)
      .forEach(granata => granata.proveriPogodak(cilj))
  }

  proveriPucanje() {
    const key = this.tenkDesno ? 'enter' : 'space'
    if (keyboard[key]) this.spremno = true
    if (this.spremno && !keyboard[key]) {
      this.pucaj()
      this.spremno = false
    }
  }

  novaGranata() {
    const granata = new Granata({ callback: this.callback })
    this.granate.push(granata)
    return granata
  }

  pucaj() {
    if (this.vreme.proteklo < vremePunjenja) return
    const granata = this.granate.find(g => !g.ispaljena) || this.novaGranata()

    granata.pucaj(this.polozajGranate, this.cev.ugao)
    this.trzaj()
    this.vreme.reset()
  }

  trzaj() {
    this.dodajSilu(this.potisak, this.ugao + Math.PI)
  }

  proveriGranice() {
    this.x = this.tenkDesno
      ? Math.min(Math.max(this.x, platno.width / 2), platno.width)
      : Math.min(Math.max(this.x, 0), platno.width / 2)
  }

  /* AI */

  nisani(predmet) {
    this.cev.ugao = Math.PI + this.razmakDo(predmet) / (gravitacija * gravitacija * 0.8)
  }

  mrdajNasumicno() {
    const random = Math.random()
    if (this.vremeGasa.proteklo > 70) {
      this.dodajSilu((random * this.potisak), this.smer)
      this.vremeGasa.reset()
    }
    if (this.vremeSmera.proteklo > 300) {
      this.smer = random > 0.55 ? Math.PI : 0
      this.vremeSmera.reset()
    }
    if (this.x > platno.width * 0.9) this.smer = 0
    if (this.x < platno.width / 2) this.smer = Math.PI
  }

  pucajNasumicno() {
    if (this.vremePucanja.proteklo < vremePunjenjaAI) return
    this.pucaj()
    this.vremePucanja.reset()
  }

  samohod(cilj) {
    if (this.mrtav) return
    this.mrdajNasumicno()
    if (cilj.mrtav) return
    this.nisani(cilj)
    this.pucajNasumicno()
  }

  /* LOOP */

  update(dt) {
    this.proveriPucanje()
    super.update(dt)
    this.cev.update(dt)
    this.trenje(this.brzina > 0.1 ? kinetickoTrenje : statickoTrenje)
    this.proveriSmrt()
  }

  render() {
    this.cev.render() // da cev ide iza plamena
    super.render()
  }
}
