import platno from '/game-engine/io/platno.js'
import Tenk from './Tenk.js'

export default class Tenk2 extends Tenk {
  constructor(src, params) {
    super(src, params)
    this.x = platno.width - Math.random() * platno.width * 0.3 - 100
  }
}
