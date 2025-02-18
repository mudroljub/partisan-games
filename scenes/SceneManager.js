import { Spinner } from '/core3d/loaders.js'

const paths = {
  SpomeniciScena: './spomenici/SpomeniciScena.js',
  BeogradScena: './beograd/BeogradScena.js',
  TenkScena: './tenk/TenkScena.js',
  RatweekScena: './warplane/RatweekScena.js',
  RajlovacScena: './rajlovac/RajlovacScena.js',
  SavoScena: './savo/SavoScena.js',
  BombasScena: './bombas/BombasScena.js',
  NemciIzRovova: './rovovi/NemciIzRovova.js',
  Scena1942: './avionce1942/Scena1942.js',
  CamacScena: './camac/CamacScena.js',
  OtpisaniScena: './OtpisaniScena.js',
  Scena1944: './avionce1944/Scena1944.js',
  TopScena: './top/TopScena.js',
  TenkicIde: './tenkic-ide/TenkicIde.js',
  TenkiciScena: './tenkici/TenkiciScena.js',
  RanjenikScena: './ranjenik/RanjenikScena.js',
  DrvarScena: './drvar/DrvarScena.js',
  JasenovacScena: './tenkovska/JasenovacScena.js',
  TenkOdozgoScena: './tenkovska/TenkOdozgoScena.js',
  MainMenu: './MainMenu.js'
}

class SceneManager {
  static instance = null

  constructor() {
    if (SceneManager.instance)
      return SceneManager.instance

    this.scene = null
    SceneManager.instance = this
    this.spinner = new Spinner()
  }

  handleIntro() {
    if (this.scene.ui.intro) {
      this.scene.clear()
      this.scene.ui.renderStartScreen()
      this.scene.render() // first draw, TODO: scene predmeti onload za 2D?
    } else this.scene.start()
  }

  async start(name, firstTime = true) {
    this.spinner.show()
    if (this.scene)
      this.scene.end()

    const SceneClass = firstTime
      ? (await import(paths[name])).default
      : this.scene.constructor
    this.scene = new SceneClass(this)
    this.scene.init()
    this.spinner.hide()

    if (firstTime) this.handleIntro()
  }

  async restart(name) {
    await this.start(name, false)
    this.scene.start()
  }
}

export default SceneManager