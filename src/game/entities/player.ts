import { ColliderManager } from '../../engine/controllers/colliderManager';
import { Camera } from '../../engine/models/camera';
import { Keyboard } from '../../engine/models/Keyboard';
import { ObjectAnimated } from '../../engine/models/objects/objectAnimated';
import { Vector2 } from '../../engine/models/vector2';
import { DialogObject } from './DialogObject';
import { NPC } from './npc';


export class Player extends ObjectAnimated {
  speed = 3
  directionX = 0
  directionY = 0

  lastKeyState = { 'p': false, 'e': false }


  constructor(position: Vector2) {
    super(position, 16, 16, 2.7, false, true)
    this.directionY = 0
    this.directionX = 0
    this.createAnimations()
    this.swapAnimation("idle_down")
  }

  createAnimations() {
    const idlePath = "img/player/Idle.png"
    const walkPath = "img/player/Walk.png"
    this.addAnimation("idle_up", { frameRate: 1, frameBuffer: 20, src: idlePath, autoPlay: false, firstFrame: 1 })
    this.addAnimation("idle_down", { frameRate: 1, frameBuffer: 20, src: idlePath, autoPlay: false, firstFrame: 0 })
    this.addAnimation("idle_left", { frameRate: 1, frameBuffer: 20, src: idlePath, autoPlay: false, firstFrame: 2 })
    this.addAnimation("idle_right", { frameRate: 1, frameBuffer: 20, src: idlePath, autoPlay: false, firstFrame: 3 })

    this.addAnimation("walk_down", { frameRate: 4, frameBuffer: 10, src: walkPath, columnDirection: true, columns: 4, firstFrame: 0 })
    this.addAnimation("walk_up", { frameRate: 4, frameBuffer: 10, src: walkPath, columnDirection: true, columns: 4, firstFrame: 4 })
    this.addAnimation("walk_left", { frameRate: 4, frameBuffer: 10, src: walkPath, columnDirection: true, columns: 4, firstFrame: 2 * 4 })
    this.addAnimation("walk_right", { frameRate: 4, frameBuffer: 10, src: walkPath, columnDirection: true, columns: 4, firstFrame: 3 * 4 })
  }

  update(): void {
    super.update();
    this.move()

    Camera.position.x = this.position.x - Camera.width / 2 + this.width / 2
    Camera.position.y = this.position.y - Camera.height / 2 + this.height / 2

    if (Keyboard.p && !this.lastKeyState.p) console.log("[Player] - position:", this.position.x, ",", this.position.y)
    if (Keyboard.u) ColliderManager.show()
    if (Keyboard.y) ColliderManager.unShow()

    if (Keyboard.e) this.interaction()
    this.lastKeyState.p = Keyboard.p
    this.lastKeyState.e = Keyboard.e
  }

  interaction() {
    if (DialogObject.isOpen) return;
    const npc = ColliderManager.getCollisions(this, 6)
      .find(f => f instanceof NPC)
    npc?.interaction()
  }

  move() {
    const oldXDiretion = this.directionX == 0 ? 0 : this.directionX > 0 ? 1 : -1
    const oldYDiretion = this.directionY == 0 ? 0 : this.directionY > 0 ? 1 : -1

    if (DialogObject.isOpen) {
      this.directionX = 0
      this.directionY = 0
    } else {
      this.directionX = (Keyboard.a || Keyboard.d) ? this.speed * (Keyboard.a ? -1 : 1) : 0
      this.directionY = (Keyboard.w || Keyboard.s) ? this.speed * (Keyboard.w ? -1 : 1) : 0

    }
    if (!this.directionX && !this.directionY) {

      if (oldXDiretion || oldYDiretion) {
        const down = oldYDiretion > 0
        const right = oldXDiretion > 0
        this.swapAnimation(oldYDiretion != 0 ? (down ? "idle_down" : "idle_up") : (right ? "idle_right" : "idle_left"))
      }
    } else {
      const down = this.directionY > 0
      const right = this.directionX > 0
      this.swapAnimation(this.directionY != 0 ? (down ? "walk_down" : "walk_up") : (right ? "walk_right" : "walk_left"))
    }
    super.move(this.directionX, this.directionY)

  }

}