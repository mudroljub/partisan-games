import * as THREE from 'three'

export default class SpriteAnimator {
  constructor(imgSrc, frameCount, frameRate = 10) {
    this.frameCount = frameCount
    this.frameRate = frameRate
    this.currentFrame = 0
    this.timeAccumulator = 0
    const skalar = .25

    this.texture = new THREE.TextureLoader().load(imgSrc, texture => {
      const frameWidth = texture.image.width / frameCount
      const frameHeight = texture.image.height
      this.sprite.scale.set(frameWidth * skalar, frameHeight * skalar, 1)
      this.sprite.position.set(0, texture.image.height * skalar * .25, 5)
    })

    this.texture.wrapS = THREE.RepeatWrapping
    this.texture.wrapT = THREE.RepeatWrapping
    this.texture.repeat.set(1 / frameCount, 1)

    this.material = new THREE.SpriteMaterial({ map: this.texture })
    this.sprite = new THREE.Sprite(this.material)

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

  getSprite() {
    return this.sprite
  }
}
