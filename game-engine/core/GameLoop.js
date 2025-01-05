export default class GameLoop {
  constructor(sceneLoop, autostart = true, usePointerLock = false) {
    this.sceneLoop = sceneLoop
    this.lastTimestamp = 0
    this.time = 0
    this.isPaused = false
    this.loopId = null

    document.addEventListener('keypress', this.handleKeyPress)

    if (usePointerLock)
      document.addEventListener('pointerlockchange', this.handlePointerLockChange)
    else
      document.addEventListener('visibilitychange', this.handleVisibilityChange)

    if (autostart) this.start()
  }

  get isRunning() {
    return Boolean(this.loopId)
  }

  /* METHODS */

  start() {
    if (this.isRunning) return

    this.isPaused = false
    this.lastTimestamp = performance.now()
    this.loopId = requestAnimationFrame(this.mainLoop)
  }

  stop() {
    if (!this.isRunning) return

    cancelAnimationFrame(this.loopId)
    this.isPaused = false
    this.sceneLoop = null
    this.lastTimestamp = 0
    this.time = 0

    document.removeEventListener('keypress', this.handleKeyPress)
    document.removeEventListener('visibilitychange', this.handleVisibilityChange)
    document.removeEventListener('pointerlockchange', this.handlePointerLockChange)
  }

  pause() {
    if (!this.isRunning || this.isPaused) return

    this.isPaused = true
  }

  unpause() {
    if (!this.isRunning || !this.isPaused) return

    this.isPaused = false
    this.lastTimestamp = performance.now()
    this.loopId = requestAnimationFrame(this.mainLoop)
  }

  /* EVENTS */

  handleKeyPress = event => {
    if (event.code === 'KeyP')
      if (this.isPaused) this.unpause()
      else this.pause()
  }

  handlePointerLockChange = () => {
    if (!this.isRunning)
      this.start(this.sceneLoop)
    else if (!document.pointerLockElement)
      this.pause()
    else
      this.unpause()
  }

  handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden')
      this.pause()
    else
      this.unpause()
  }

  /* LOOP */

  mainLoop = timestamp => {
    if (!this.isRunning) return
    if (this.isPaused) {
      this.lastTimestamp = timestamp
      requestAnimationFrame(this.mainLoop)
      return
    }

    const deltaTime = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp
    this.time += deltaTime

    if (this.sceneLoop)
      this.sceneLoop(deltaTime * 0.001, this.time * 0.001) // to seconds

    requestAnimationFrame(this.mainLoop)
  }
}
