import Scena3D from '/core/Scena3D.js'
import { createGround } from '/core3d/ground.js'
import { sample } from '/core3d/helpers.js'
import { hemLight, lightningStrike } from '/core3d/light.js'
import FPSPlayer from '/core3d/actor/FPSPlayer.js'
import Maze from '/core3d/mazes/Maze.js'
import { truePrims } from '/core3d/mazes/algorithms.js'
import Report from '/core3d/io/Report.js'
import GUI, { fpsControls } from '/core3d/io/GUI.js'
import { GermanMachineGunnerAI } from '/core3d/actor/derived/ww2/GermanMachineGunner.js'
import { SSSoldierAI } from '/core3d/actor/derived/ww2/SSSoldier.js'
import { NaziOfficerAI } from '/core3d/actor/derived/ww2/NaziOfficer.js'
import { GermanFlameThrowerAI } from '/core3d/actor/derived/ww2/GermanFlameThrower.js'
import FirstAid from '/core3d/objects/FirstAid.js'

export default class SavoScena extends Scena3D {
  constructor(manager) {
    super(manager, { usePointerLock: true, toon: true })
  }

  init() {
    this.bojaPozadine = 0x070b34
    this.light = hemLight({ intensity: Math.PI * 1.5, scene: this.scene })
    this.dodajMesh(createGround({ file: 'terrain/ground.jpg' }))

    this.maze = new Maze(8, 8, truePrims, 5)
    const walls = this.maze.toTiledMesh({ texture: 'terrain/concrete.jpg' })
    this.dodajMesh(walls)

    const player = this.player = new FPSPlayer({ camera: this.camera, solids: walls })
    player.putInMaze(this.maze)
    this.dodaj(player)

    const coords = this.maze.getEmptyCoords(true)
    this.enemies = []
    const soldiers = [GermanMachineGunnerAI, SSSoldierAI, NaziOfficerAI, GermanFlameThrowerAI]
    for (let i = 0; i < 10; i++) {
      const EnemyClass = sample(soldiers)
      const enemy = new EnemyClass({ pos: coords.pop(), target: player.mesh, solids: walls })
      this.enemies.push(enemy)
      this.dodaj(enemy)
    }

    for (let i = 0; i < 2; i++) {
      const firstAid = new FirstAid({ pos: coords.pop() })
      this.dodajMesh(firstAid.mesh)
    }

    this.setupGUI()
    // this.report = new Report({ container: document.getElementById('central-screen'), text: 'After a successful sabotage mission you stayed behind enemy lines.\n\nFind the way out of the enemy base.' })
  }

  setupGUI() {
    this.gui = new GUI({ subtitle: 'Enemy left', total: this.enemies.length, controls: fpsControls, scoreClass: '', controlsWindowClass: 'white-window' })
  }

  startGame() {
    super.start()
    // this.report.stop()
    this.uvodniProzor = null
    document.body.requestPointerLock() // gameLoop starts
  }

  handleClick(e) {
    super.handleClick(e)
    if (e.target.id == 'start-game')
      this.startGame()
  }

  uvodniProzor() {
    return /* html */`
      <div class="central-screen rpgui-container" id="central-screen">
        <ul>
          <li>Find the way out</li>
          <li>Bonus: Kill all enemies</li>
        </ul>
        <button id="start-game" class="press-start">Press to START!</button>
        <div>
          Shoot: MOUSE<br>
          Move: WASD or ARROWS<br>
          Run: CAPSLOCK
        </div>
      </div>
    `
  }

  end() {
    super.end()
    this.player.end()
  }

  update(dt, t) {
    super.update(dt, t)

    const killed = this.enemies.filter(enemy => enemy.energy <= 0)
    const left = this.enemies.length - killed.length
    const won = this.player.position.distanceTo(this.maze.exitPosition) < 5

    if (won)
      this.gui.renderText(`Bravo!<br>You found a way out<br> and kill ${killed.length} of ${this.enemies.length} enemies`)

    const blinkingMessage = won ? '' : 'Find a way out!'
    this.gui.update({ time: t, points: killed.length, left, dead: this.player.dead, blinkingMessage })

    if (Math.random() > .998) lightningStrike(this.light, this.scene)
  }
}
