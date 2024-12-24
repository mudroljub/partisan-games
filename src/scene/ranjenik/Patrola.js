import {kruzi} from 'akcije/granice'
import {nasumicnoOkruglo} from 'utils'
import Predmet from 'core/Predmet'
import Vreme from 'core/Vreme'
import slikaNemciPatrola from 'slike/2d-odozgo/nemci-patrola.gif'
import zvukStop from 'zvuci/patrola/Stop.wav'

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

  constructor(src = slikaNemciPatrola) {
    super(src)
    this.vreme = new Vreme()
    this.zvuk = new Audio(zvukStop)
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
    const nasumicno = Math.random() * Math.PI/2 - Math.PI/4
    this.ugao += nasumicno
  }

  pustiNasumicno(zvuci) {
    const zvuk = zvuci[nasumicnoOkruglo(0, zvuci.length-1)]
    this.zvuk.src = `${__dirname}game-assets/zvuci/patrola/${zvuk}`
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
