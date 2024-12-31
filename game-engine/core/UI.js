export default class UI {
  constructor(manager) {
    this.prozor = document.getElementById('prozor')
    this.manager = manager
  }

  praviProzor(text, btnText, callback, showMenu = true) {
    if (this.prozor.innerHTML) return

    const div = document.createElement('div')
    div.className = 'prozorce centar'

    const p = document.createElement('p')
    p.textContent = text
    div.appendChild(p)
    this.prozor.appendChild(div)

    const dodajDugme = (txt, action) => {
      const btn = document.createElement('button')
      btn.textContent = txt
      btn.addEventListener('click', () => {
        this.prozor.innerHTML = ''
        action()
      })
      div.appendChild(btn)
    }

    dodajDugme(btnText, callback)
    if (showMenu) dodajDugme('Glavni meni', () => this.manager.start('MainMenu'))
  }

  pocetniProzor(text = 'Spremi se za borbu.', callback) {
    this.praviProzor(text, 'Idemo', callback, false)
  }

  zavrsniProzor(text = 'Igra je završena.', imeScene) {
    this.praviProzor(text, 'Igraj opet', () => this.manager.start(imeScene))
  }
}
