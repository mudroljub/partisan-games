import Pokretno from './Pokretno.js'
import { randomInRange } from '/game-engine/utils.js'

export default class Neprijatelj extends Pokretno {
  constructor(src, { potisak }) {
    super(src, {
      skalar: .66, odrazX: -1, potisak: potisak * randomInRange(1.1, 1.4), faktorY: randomInRange(3, 5),
    })
  }
}
