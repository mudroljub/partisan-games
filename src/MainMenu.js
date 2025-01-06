import Scena from '/game-engine/core/Scena.js'

const items = {
  BombasScena: 'Bombaš',
  NemciIzRovova: 'Nemci iz rovova',
  Scena1942: 'Avionče 1942',
  TopScena: 'Top',
  CamacScena: 'Čamac',
  OtpisaniScena: 'Ubij okupatora!',
  Scena1944: 'Avionče 1944',
  TenkicIde: 'Tenkić ide',
  TenkiciScena: 'Tenkići',
  RanjenikScena: 'Ranjenik',
  RanjenikPaljba: 'Ranjenik paljba',
  JasenovacScena: 'Bekstvo iz Jasenovca',
  TenkOdozgoScena: 'Tenk odozgo',
}

export default class MainMenu extends Scena {
  handleClick = e => {
    if (!e.target.classList.contains('js-start')) return

    this.manager.start(e.target.value)
  }

  napustiIgru() {
    return ''
  }

  sablon() {
    const izbornik = Object.entries(items).map(([kljuc, naziv]) =>
      `<button value='${kljuc}' class='js-start full'>${naziv}</button>`
    ).join('')

    return `
      <h1>Partisan Games ★</h1>
      ${izbornik}
    `
  }
}