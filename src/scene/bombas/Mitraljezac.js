import Predmet from '/game-engine/core/Predmet.js'
import { praviPucanje } from '/game-engine/core/prosirenja/pucanje.js'

export default class Mitraljezac extends Predmet {
  constructor(x, y, cilj) {
    super('2d-bocno/nemci/mitraljezac-01.png', { x, y, ishodiste: 'DOLE_DESNO' })
    const autoPucanje = praviPucanje({
      stankaPucanja: 3, src: 'granata.gif', skalar: .4, potisakMetka: 600, y: -10,
    })
    Object.assign(this, autoPucanje)
    this.ciljevi.push(cilj)
  }

  update(dt, t) {
    super.update(dt, t)
    const cilj = this.traziNajblizuMetu()
    this.ugao = this.ugaoKa(cilj) + Math.PI
    this.rafalPovremenoCiljano(t)
    this.proveriPogotke()
  }
}
