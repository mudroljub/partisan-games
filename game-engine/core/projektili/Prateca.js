import Metak from './Metak.js'

export default class Prateca extends Metak {
  constructor({ src = 'raketa.png', potisak = 625, skalar = .55 } = {}) {
    super({ src, skalar, potisak })
    this.ciljevi = []
  }

  dodajCiljeve(...args) {
    this.ciljevi.push(...args)
  }

  pucaCiljano(polozaj, ugao) {
    if (!this.ciljevi.some(cilj => cilj.ziv)) return

    this.postavi(polozaj, ugao)
    const meta = this.traziNajblizuMetu()
    if (!meta) return

    this.pali(polozaj, this.ugaoKa(meta))
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
