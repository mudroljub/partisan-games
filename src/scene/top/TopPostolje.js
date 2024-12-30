import Slika from '/game-engine/core/Slika.js'

export default class TopPostolje extends Slika {
  constructor(x, y) {
    super('/assets/slike/2d-bocno/top-postolje.gif', { x, y, skalar: .75 })
  }
}
