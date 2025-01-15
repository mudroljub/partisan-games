import Metak from './Metak.js'

export default class Prateca extends Metak {
  constructor({ src = 'raketa.png', skalar = .55 } = {}) {
    super({ src, skalar })
  }
}
