import Metak from './Metak.js'

export default class Prateca extends Metak {
  constructor({ src = 'raketa.png', skalar = .55, ciljevi = [] } = {}) {
    super({ src, skalar })
    this.ciljevi = ciljevi
  }

  pucaCiljano(polozaj, ugao, potisak) {
    if (!this.ciljevi.some(cilj => cilj.ziv)) return

    this.postavi(polozaj, ugao)
    const meta = this.traziNajblizuMetu()
    if (!meta) return

    this.pali(polozaj, this.ugaoKa(meta), potisak)
  }

  traziNajblizuMetu() {
    let minRazmak
    let najblizaMeta
    this.ciljevi.forEach(cilj => {
      const razmak = this.razmakDo(cilj)
      if (!minRazmak) minRazmak = razmak
      if (!najblizaMeta) najblizaMeta = cilj
      if (razmak < minRazmak) minRazmak = razmak
    })
    return najblizaMeta
  }

  proveriSudare() {
    this.ciljevi.forEach(cilj => {
      if (this.sudara(cilj)) this.povredi(cilj)
    })
  }

  update(dt) {
    if (!this.vidljiv) return
    super.update(dt)
    this.proveriSudare()
  }
}
