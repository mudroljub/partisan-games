// BUG: mrtav reaguje na pogodak
import Scena from 'core/Scena'
import Pozadina from 'core/Pozadina'
import Okupator from '../2d-prvo-lice/Okupator'
import platno from 'io/platno'
import mish from 'io/mish'
import slikaPozadina from 'slike/pozadine/rusevine-varsava.jpg'
import zvukOtpisani from 'zvuci/otpisani.mp3'

export default class OtpisaniScena extends Scena {
  constructor(...args) {
    super(...args)
    this.pozadina = new Pozadina(slikaPozadina)
    this.strazar = new Okupator()
    mish.dodajNishan()
    this.zvuk = new Audio(zvukOtpisani)
    this.zvuk.play()
    platno.addEventListener('click', () => this.strazar.proveriPogodak())
  }

  update() {
    this.pozadina.update()
    this.strazar.patroliraj()
    this.strazar.update()
  }

  end() {
    super.end()
    mish.ukloniNishan()
    this.zvuk.pause()
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
