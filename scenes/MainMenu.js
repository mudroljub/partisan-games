import Scena2D from '/core/Scena2D.js'
import { platno } from '/core/io/platno.js'

const items = {
  SavoScena: 'Savo Mitraljezac',
  RajlovacScena: 'Napad na aerodrom Rajlovac',
  RatweekScena: 'Operation Ratweek',
  SpomeniciScena: 'Spomenici',
  BeogradScena: 'Bitka za Beograd',
  TenkScena: 'Tenk',
  DrvarScena: 'Desant na Drvar',
  KrupanjScena: 'Battle of Krupanj',
  FranjoKluzScena: 'Franjo Kluz',
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

export default class MainMenu extends Scena2D {
  constructor(manager) {
    super(manager, { showControls: false })
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

  handleInput() {}

  handleVisibilityChange() {}

  sceneUI() {
    const izbornik = Object.entries(items).map(([kljuc, naziv]) =>
      `<button value='${kljuc}' class='js-start full'>${naziv}</button>`
    ).join('')

    return `
      <h1>Partisan Games ★</h1>
      ${izbornik}
    `
  }
}