const putanje = {
  BombasScena: './scene/bombas/BombasScena.js',
  NemciIzRovova: './scene/rovovi/NemciIzRovova.js',
  Scena1942: './scene/avionce1942/Scena1942.js',
  CamacScena: './scene/CamacScena.js',
  OtpisaniScena: './scene/OtpisaniScena.js',
  Scena1944: './scene/avionce1944/Scena1944.js',
  TopScena: './scene/top/TopScena.js',
  TenkicIde: './scene/tenkic-ide/TenkicIde.js',
  TenkiciScena: './scene/tenkici/TenkiciScena.js',
  RanjenikScena: './scene/ranjenik/RanjenikScena.js',
  DrvarScena: './scene/drvar/DrvarScena.js',
  JasenovacScena: './scene/tenkovska/JasenovacScena.js',
  TenkOdozgoScena: './scene/tenkovska/TenkOdozgoScena.js',
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
    this.currentScene.start()
  }
}

export default SceneManager