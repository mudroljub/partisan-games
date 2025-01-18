import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Okupator from '../2d-prvo-lice/Okupator.js'
import mish from '/game-engine/io/mish.js'
import { progresBar } from '/game-ui/components.js'
import { praviEnergiju } from '/game-engine/core/prosirenja/energija.js'

export default class OtpisaniScena extends Scena {
  init() {
    this.pozadina = new Pozadina('pozadine/rusevine-varsava.jpg')
    this.pesma = new Audio('/assets/zvuci/otpisani.mp3')
    Object.defineProperties(this, Object.getOwnPropertyDescriptors(praviEnergiju()))
    this.svabo = new Okupator({ callback: () => this.skiniEnergiju(1) })
    this.dodaj(this.svabo)
    mish.dodajNishan()
  }

  handleClick = e => {
    super.handleClick(e)
    this.svabo.proveriPogodak()
    this.pesma.play()
  }

  end() {
    super.end()
    this.pesma.pause()
    mish.ukloniNishan()
  }

  sablon() {
    return /* html */`
      <main class='absolute full centar'>
        <h1>Ubij okupatora!</h1>
        <p>Oslobođenje se bliži</p>
        <div class="komande komande1 bg-poluprovidno">
          Pogoci: ${0} <br>
          Energija 
          ${progresBar(this.energija)}
        </div>
      </main>
    `
  }
}
