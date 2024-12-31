import { ctx } from '/game-engine/io/platno.js'

let t = 0

export function drawFlag(dt, {
  zastavaX = -8, zastavaY = 300, sirina = 100, visina = 50, drskaX = 33, drskaY = 17
} = {}) {
  // drška
  ctx.fillStyle = '#704F32'
  ctx.fillRect(drskaX - 8 + zastavaX, drskaY + zastavaY, 8, visina + 100)

  // zastava
  ctx.beginPath()
  for (let y = 0; y <= visina; y++) {
    const wave = Math.sin((y / visina) * 2 * Math.PI + t) * 5
    const x = drskaX + wave + sirina + zastavaX
    if (y === 0) ctx.moveTo(drskaX + zastavaX, drskaY + y + zastavaY)
    ctx.lineTo(x, drskaY + y + zastavaY)
  }
  ctx.lineTo(drskaX + zastavaX, drskaY + visina + zastavaY)
  ctx.closePath()

  ctx.fillStyle = 'red'
  ctx.fill()

  t += 4 * dt
}
