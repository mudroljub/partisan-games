// BUG: mrtav reaguje na pogodak
// da se u nekom trenutku okrene i pripuca
// da ih izlazi više
// dodati zavrsniEkran
import Scena from '/game-engine/core/Scena.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Okupator from '../2d-prvo-lice/Okupator.js'
import platno from '/game-engine/io/platno.js'
import mish from '/game-engine/io/mish.js'

export default class OtpisaniScena extends Scena {
  init() {
    this.pozadina = new Pozadina('/assets/slike/pozadine/rusevine-varsava.jpg')
    this.svabo = new Okupator()
    this.pesma = new Audio('/assets/zvuci/otpisani.mp3')
    this.pesma.play()
    mish.dodajNishan()
    this.proveriPogodak = this.svabo.proveriPogodak.bind(this.svabo)
    platno.addEventListener('click', this.proveriPogodak)
    this.dodaj(this.svabo)
  }

  end() {
    super.end()
    this.pesma.pause()
    mish.ukloniNishan()
    platno.removeEventListener('click', this.proveriPogodak)
  }

  update(dt) {
    super.update(dt)
    this.svabo.patroliraj()
  }

  sablon() {
    return /* html */`
      <main class='absolute full centar'>
        <h1>Ubij okupatora!</h1>
        <p>Oslobođenje se bliži</p>
      </main>
    `
  }
}
