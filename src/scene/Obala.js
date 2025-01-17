const canvas = document.getElementById('platno')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const lerp = (a, b, t) => a + (b - a) * t

const random = opsegSuma => Math.random() * opsegSuma * 2 - opsegSuma

export default class Obala {
  constructor() {
    this.noiseResolution = 75
    this.opsegSuma = 10
    this.sirinaReke = canvas.height - this.noiseResolution * .75
    this.noisePoints = Array.from({ length: canvas.width / this.noiseResolution + 2 }, () => random(this.opsegSuma))
    this.history = []
  }

  napred() {
    this.history.push([...this.noisePoints])
    this.noisePoints.shift()
    this.noisePoints.push(random(this.opsegSuma))
  }

  nazad() {
    if (this.history.length > 0)
      this.noisePoints = this.history.pop()
  }

  render() {
    for (let i = 0; i < canvas.width; i++) {
      const index = Math.floor(i / this.noiseResolution)
      const t = (i % this.noiseResolution) / this.noiseResolution
      const offset = lerp(this.noisePoints[index], this.noisePoints[index + 1], t)

      ctx.fillStyle = '#228B22'
      ctx.fillRect(i, 0, 1, canvas.height / 2 + offset - this.sirinaReke / 2)
      ctx.fillRect(i, canvas.height / 2 + offset + this.sirinaReke / 2, 1, canvas.height)
    }
  }
}
