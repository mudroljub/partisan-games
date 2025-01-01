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
    this.strazar = new Okupator()
    mish.dodajNishan()
    this.zvuk = new Audio('/assets/zvuci/otpisani.mp3')
    this.zvuk.play()
    this.proveriPogodak = this.strazar.proveriPogodak.bind(this.strazar)
    platno.addEventListener('click', this.proveriPogodak)
  }

  end() {
    super.end()
    this.zvuk.pause()
    mish.ukloniNishan()
    platno.removeEventListener('click', this.proveriPogodak)
  }

  update(dt) {
    this.pozadina.render()
    this.strazar.patroliraj()
    this.strazar.update(dt)
  }

  sablon() {
    return `
      <main class='centar'>
        <h1>Ubij okupatora!</h1>
        <p>Oslobođenje se bliži</p>
      </main>
    `
  }
}
