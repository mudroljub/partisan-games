import Predmet from '/game-engine/core/Predmet.js'

export default class TopPostolje extends Predmet {
  constructor(x, y, skalar) {
    super('/assets/slike/2d-bocno/top-postolje.gif', { x, y, skalar })
  }
}
