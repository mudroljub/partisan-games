import Scena2D from '/core/Scena2D.js'
import { platno } from '/core/io/platno.js'

const items = {
  RajlovacScena: 'Napad na aerodrom Rajlovac',
  SavoScena: 'Savo Mitraljezac',
  WarplaneScena: 'Warplane',
  SpomeniciScena: 'Spomenici',
  BeogradScena: 'Oslobođenje Beograda',
  TenkScena: 'Tenk',
  DrvarScena: 'Desant na Drvar',
  BombasScena: 'Bombaš',
  Scena1942: 'Avionče 1942',
  NemciIzRovova: 'Nemci iz rovova',
  TopScena: 'Top',
  Scena1944: 'Avionče 1944',
  CamacScena: 'Čamac',
  OtpisaniScena: 'Otpisani scena',
  TenkicIde: 'Tenkić ide',
  TenkiciScena: 'Tenkići',
  RanjenikScena: 'Ranjenik na Sutjesci',
  JasenovacScena: 'Bekstvo iz Jasenovca',
  TenkOdozgoScena: 'Tenk odozgo',
}

export default class GlavniMeni extends Scena2D {
  constructor(manager) {
    super(manager)
    this.start()
  }

  start() {
    super.start()
    platno.style.display = 'none'
  }

  handleClick(e) {
    if (e.target.classList.contains('js-start'))
      this.manager.start(e.target.value)
  }

  proveriTipke() {}

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