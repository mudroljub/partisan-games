import { keyboard } from '/game-engine/io/Keyboard.js'
import Slika from '/game-engine/core/Slika.js'
import Projektil from './Projektil.js'

export default class TopCev extends Slika {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/top-cev.gif', { x, y, skalar: .75 })
    this.ugao = -0.2
  }

  get vrhX() {
    return this.x + this.sirina * 0.5 * Math.cos(-this.ugao)
  }

  get vrhY() {
    return this.y - this.sirina * 0.5 * Math.sin(-this.ugao) + 8
  }

//   pripremi() {
//     this.projektil.x = this.vrhX
//     this.projektil.y = this.vrhY
//   }
}
