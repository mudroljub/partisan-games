export default class GameLoop {
  constructor(sceneLoop) {
    this.sceneLoop = sceneLoop
    this.lastTimestamp = 0
    this.time = 0
    this.loopId = null
    this.isPaused = this.timeStopped = false

    document.addEventListener('keypress', this.handleKeyPress)
  }

  get isRunning() {
    return Boolean(this.loopId)
  }

  /* METHODS */

  start() {
    if (this.isRunning) return

    this.isPaused = this.timeStopped = false
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

  stopTime() {
    this.timeStopped = true
  }

  /* EVENTS */

  handleKeyPress = event => {
    if (event.code === 'KeyP')
      if (this.isPaused) this.unpause()
      else this.pause()
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
    if (!this.timeStopped) this.time += deltaTime

    if (this.sceneLoop)
      this.sceneLoop(deltaTime * 0.001, this.time * 0.001) // to seconds

    requestAnimationFrame(this.mainLoop)
  }
}
