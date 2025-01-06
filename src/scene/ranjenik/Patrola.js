import { skaliranRazmak, nasumicnoOkruglo } from '/game-engine/utils.js'
import Predmet from '/game-engine/core/Predmet.js'
import Vreme from '/game-engine/core/Vreme.js'

const zvuciTraganje = ['eatdirtpig.wav', 'killthepig.wav', 'QuicklyQuickly.wav', 'schnell.wav', 'UpThere.wav', 'whereishe.wav']
const zvuciNadjen = ['Stop.wav', 'StopStayWhereYouAre.wav', 'thereheis.wav']

export default class Patrola extends Predmet {
  constructor(src = '/assets/slike/2d-odozgo/nemci-patrola.gif', target) {
    super(src)
    this.brzina = 90
    this.vremePricanja = new Vreme()
    this.vremeSkretanja = new Vreme()
    this.zvuk = new Audio('/assets/zvuci/patrola/Stop.wav')
    this.target = target // opciono, za jačinu zvuka
    this.brojac
  }

  proveriGranice() {
    this.kruzi()
  }

  skreci() {
    if (this.brzina === 0) return
    if (this.vremeSkretanja.proteklo < 300) return

    const nasumicno = Math.random() * Math.PI / 2 - Math.PI / 4
    this.skreni(nasumicno)
    this.vremeSkretanja.reset()
  }

  pustiNasumicno(zvuci) {
    const zvuk = zvuci[nasumicnoOkruglo(0, zvuci.length - 1)]
    this.zvuk.src = `/assets/zvuci/patrola/${zvuk}`
    this.zvuk.volume = this.target ? skaliranRazmak(this, this.target) : .5
    this.zvuk.play()
  }

  pricaj() {
    if (this.vremePricanja.proteklo < 8000) return
    this.pustiNasumicno(zvuciTraganje)
    this.vremePricanja.reset()
  }

  vikniZaredom(brojPuta) {
    this.pustiNasumicno(zvuciNadjen)
    this.brojac++
    this.zvuk.onended = () => {
      if (this.brojac >= brojPuta) return
      this.vikniZaredom(brojPuta)
    }
  }

  update(dt) {
    super.update(dt)
    this.skreci()
    this.pricaj()
  }
}
