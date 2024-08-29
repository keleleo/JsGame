import { ColliderManager } from '../../engine/controllers/colliderManager';
import { Camera } from '../../engine/models/camera';
import { Keyboard } from '../../engine/models/Keyboard';
import { ObjectAnimated } from '../../engine/models/objects/objectAnimated';
import { Vector2 } from '../../engine/models/vector2';


export class Player extends ObjectAnimated {
  speed = 5
  directionX = 0
  directionY = 0

  constructor(position: Vector2) {
    super(position, 16, 16, 3, false, true)
    this.directionY = 0
    this.directionX = 0
    this.createAnimations()
    this.swapAnimation("idle_down")
  }

  createAnimations() {
    const idlePath = "/img/player/Idle.png"
    const walkPath = "/img/player/Walk.png"
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

    if (Keyboard.p) console.log("[Player] - position:", this.position)
    if (Keyboard.u) ColliderManager.show()
    if (Keyboard.y) ColliderManager.unShow()
    if (Keyboard.o) console.log(ColliderManager.getObject())
  }

  move() {
    const oldXDiretion = this.directionX == 0 ? 0 : this.directionX > 0 ? 1 : -1
    const oldYDiretion = this.directionY == 0 ? 0 : this.directionY > 0 ? 1 : -1


    this.directionX = (Keyboard.a || Keyboard.d) ? this.speed * (Keyboard.a ? -1 : 1) : 0
    this.directionY = (Keyboard.w || Keyboard.s) ? this.speed * (Keyboard.w ? -1 : 1) : 0

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