export default class GameLoop {
  constructor(loop, autostart = true, usePointerLock = false) {
    this.update = loop
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
    this.loopId = requestAnimationFrame(this.loop)
  }

  stop() {
    if (!this.isRunning) return

    cancelAnimationFrame(this.loopId)
    this.isPaused = false
    this.update = null
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
    this.loopId = requestAnimationFrame(this.loop)
  }

  /* EVENTS */

  handleKeyPress = event => {
    if (event.code === 'KeyP')
      if (this.isPaused) this.unpause()
      else this.pause()
  }

  handlePointerLockChange = () => {
    if (!this.isRunning)
      this.start(this.update)
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

  loop = timestamp => {
    if (!this.isRunning) return
    if (this.isPaused) {
      this.lastTimestamp = timestamp
      requestAnimationFrame(this.loop)
      return
    }

    const deltaTime = timestamp - this.lastTimestamp
    this.lastTimestamp = timestamp
    this.time += deltaTime

    if (this.update)
      this.update(deltaTime * 0.001, this.time * 0.001) // to seconds

    requestAnimationFrame(this.loop)
  }
}
