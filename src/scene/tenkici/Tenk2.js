import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'
import Tenk from './Tenk.js'
import Cev from './Cev.js'

export default class Tenk2 extends Tenk {
  constructor(params) {
    super('/assets/slike/2d-bocno/nemacki-tenk-bez-cevi.png', params)
    this.cev = new Cev(this, '/assets/slike/2d-bocno/nemacki-tenk-cev.png', params.skalar)
    this.x = platno.width - Math.random() * platno.width * 0.3 - 100
    this.ime = 'Nemački tenk'
    this.smer = this.ugao = Math.PI
    this.granate = this.praviGranate(10, params.callback)
    this.odrazX = this.odrazY = -1
    this.predmeti = [...this.granate]
  }
}
