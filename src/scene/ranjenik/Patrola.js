import { kruzi } from '/game-engine/akcije/granice.js'
import { nasumicnoOkruglo } from '/game-engine/utils.js'
import Predmet from '/game-engine/core/Predmet.js'
import Vreme from '/game-engine/core/Vreme.js'

const zvuciTraganje = [
  'eatdirtpig.wav',
  'killthepig.wav',
  'QuicklyQuickly.wav',
  'schnell.wav',
  'UpThere.wav',
  'whereishe.wav'
]
const zvuciNadjen = [
  'Stop.wav',
  'StopStayWhereYouAre.wav',
  'thereheis.wav'
]

const pauzaPricanja = 8000
let brojac = 0

export default class Patrola extends Predmet {

  constructor(src = '/assets/slike/2d-odozgo/nemci-patrola.gif') {
    super(src)
    this.vreme = new Vreme()
    this.zvuk = new Audio('/assets/zvuci/patrola/Stop.wav')
    this.brzina = 6
    this.granice = kruzi
  }

  update() {
    super.update()
    this.zuji()
    this.pricaj()
  }

  zuji() {
    if (this.brzina === 0) return
    if (Math.random() > 0.5) return
    const nasumicno = Math.random() * Math.PI / 2 - Math.PI / 4
    this.ugao += nasumicno
  }

  pustiNasumicno(zvuci) {
    const zvuk = zvuci[nasumicnoOkruglo(0, zvuci.length - 1)]
    this.zvuk.src = `${__dirname}assets/zvuci/patrola/${zvuk}`
    this.zvuk.play()
  }

  pricaj() {
    if (this.vreme.proteklo < pauzaPricanja) return
    this.pustiNasumicno(zvuciTraganje)
    this.vreme.reset()
  }

  vikniZaredom(brojPuta) {
    this.pustiNasumicno(zvuciNadjen)
    brojac++
    this.zvuk.onended = () => {
      if (brojac >= brojPuta) return
      this.vikniZaredom(brojPuta)
    }
  }

  stop() {
    this.brzina = 0
  }
}
