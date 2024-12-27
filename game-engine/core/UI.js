export default class UI {
  constructor(manager) {
    this.upamcen = ''
    this.element = document.getElementById('ui')
    this.prozor = document.getElementById('prozor')
    this.manager = manager
  }

  render() {
    if (!this.sablon) return
    if (this.upamcen !== this.sablon()) {
      this.element.innerHTML = this.sablon()
      this.upamcen = this.sablon()
    }
  }

  clear() {
    this.element.innerHTML = ''
  }

  pocetniProzor(text = 'Spremi se za borbu.', callback) {
    if (this.prozor.innerHTML) return

    const div = document.createElement('div')
    div.className = 'prozorce centar'

    const p = document.createElement('p')
    p.textContent = text
    div.appendChild(p)

    this.prozor.appendChild(div)

    const start = () => {
      this.prozor.innerHTML = ''
      callback()
    }

    const dodajDugme = txt => {
      const btn = document.createElement('button')
      btn.textContent = txt
      btn.addEventListener('click', start)
      div.appendChild(btn)
    }

    dodajDugme('Idemo')
  }

  zavrsniProzor(text = 'Igra je završena.', imeScene = '') {
    if (this.prozor.innerHTML) return

    const div = document.createElement('div')
    div.className = 'prozorce centar'

    const p = document.createElement('p')
    p.textContent = text
    div.appendChild(p)

    this.prozor.appendChild(div)

    const dodajDugme = (txt, callback) => {
      const btn = document.createElement('button')
      btn.textContent = txt
      btn.addEventListener('click', callback)
      div.appendChild(btn)
    }

    const start = scena => {
      this.prozor.innerHTML = ''
      this.manager.start(scena)
    }

    dodajDugme('Igraj opet', () => start(imeScene))
    dodajDugme('Glavni meni', () => start('MainMenu'))
  }
}
