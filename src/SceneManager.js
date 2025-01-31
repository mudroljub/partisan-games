import { loadScene } from './scene.js'

export default class SceneManager {
  constructor() {
    if (SceneManager.instance) return SceneManager.instance
    this.currentScene = null
    SceneManager.instance = this
  }

  start(key) {
    if (this.currentScene)
      this.currentScene.end()

    loadScene(key).then(Scena => {
      this.currentScene = new Scena(this)
      this.currentScene.start()
    })
  }
}