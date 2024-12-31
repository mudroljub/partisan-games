import { ctx } from '/game-engine/io/platno.js'

let t = 0

export function drawFlag() {
  const flagWidth = 300
  const flagHeight = 150
  const poleX = 100
  const poleY = 50

  // crta drsku
  ctx.fillStyle = 'gray'
  ctx.fillRect(poleX - 10, poleY, 10, flagHeight + 100)

  // crta zastavu
  ctx.beginPath()
  for (let y = 0; y <= flagHeight; y++) {
    const wave = Math.sin((y / flagHeight) * 2 * Math.PI + t) * 10
    const x = poleX + wave + flagWidth
    if (y === 0) ctx.moveTo(poleX, poleY + y)
    ctx.lineTo(x, poleY + y)
  }
  ctx.lineTo(poleX, poleY + flagHeight)
  ctx.closePath()

  ctx.fillStyle = 'red'
  ctx.fill()

  t += 0.05
}
