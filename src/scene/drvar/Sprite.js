import * as THREE from 'three'
import { randSpread } from './utils.js'

export default class SpriteAnimator {
  constructor(imgSrc, frameCount, frameRate = 10) {
    this.frameCount = frameCount
    this.frameRate = frameRate
    this.currentFrame = 0
    this.timeAccumulator = 0
    const skalar = .25
    this.texture = new THREE.TextureLoader().load(imgSrc, texture => {
      const frameWidth = texture.image.width / frameCount
      this.sprite.scale.set(frameWidth * skalar, texture.image.height * skalar, 1)
      this.randPosition()
    })
    this.texture.wrapS = THREE.RepeatWrapping
    this.texture.wrapT = THREE.RepeatWrapping
    this.texture.repeat.set(1 / frameCount, 1)

    this.material = new THREE.SpriteMaterial({ map: this.texture })
    this.sprite = new THREE.Sprite(this.material)
  }

  randPosition() {
    const range = 10
    const x = randSpread(range)
    const z = randSpread(range)
    this.sprite.position.set(x, this.sprite.scale.y * .25, z)
  }

  update(dt) {
    this.timeAccumulator += dt
    const frameDuration = 1 / this.frameRate

    if (this.timeAccumulator >= frameDuration) {
      this.timeAccumulator -= frameDuration
      this.currentFrame = (this.currentFrame + 1) % this.frameCount
      this.texture.offset.x = this.currentFrame / this.frameCount
    }
  }
}
