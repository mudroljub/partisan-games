const putanje = {
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
  GlavniMeni: './GlavniMeni.js'
}

class SceneManager {
  static instance = null

  constructor() {
    if (SceneManager.instance)
      return SceneManager.instance

    this.currentScene = null
    SceneManager.instance = this
  }

  async loadScene(ime) {
    const sceneModule = await import(putanje[ime])
    return sceneModule.default
  }

  async start(ime) {
    if (this.currentScene)
      this.currentScene.end()

    const SceneClass = await this.loadScene(ime)
    this.currentScene = new SceneClass(this)
    this.currentScene.init()
  }
}

export default SceneManager