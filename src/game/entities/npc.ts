import { LayerManager } from '../../engine/controllers/layerManager';
import { ObjectAnimated } from '../../engine/models/objects/objectAnimated';
import { Path } from '../../engine/models/Path';
import { Vector2 } from '../../engine/models/vector2';
import { DialogObject } from './DialogObject';

export class NPC extends ObjectAnimated {
  oldXDiretion!: number
  oldYDiretion!: number
  private readonly folderName: string
  path?: Path;
  private dialogTexts: string[] = [];
  private icon: HTMLImageElement;
  private dialogInfo?: ObjectAnimated;
  constructor(position: Vector2, width: number, height: number, scale: number, folderName: string) {
    super(position, width, height, scale, false, true)
    this.folderName = folderName

    this.createAnimations()
    this.swapAnimation("idle_down")
    this.icon = new Image()
    this.icon.src = `/img/npcs/${this.folderName}/Faceset.png`;
  }

  createAnimations() {
    const idlePath = `/img/npcs/${this.folderName}/Idle.png`
    const walkPath = `/img/npcs/${this.folderName}/Walk.png`

    this.addAnimation("idle_up", { frameRate: 1, frameBuffer: 20, src: idlePath, autoPlay: false, firstFrame: 1 })
    this.addAnimation("idle_down", { frameRate: 1, frameBuffer: 20, src: idlePath, autoPlay: false, firstFrame: 0 })
    this.addAnimation("idle_left", { frameRate: 1, frameBuffer: 20, src: idlePath, autoPlay: false, firstFrame: 2 })
    this.addAnimation("idle_right", { frameRate: 1, frameBuffer: 20, src: idlePath, autoPlay: false, firstFrame: 3 })

    this.addAnimation("walk_down", { frameRate: 4, frameBuffer: 10, src: walkPath, columnDirection: true, columns: 4, firstFrame: 0 })
    this.addAnimation("walk_up", { frameRate: 4, frameBuffer: 10, src: walkPath, columnDirection: true, columns: 4, firstFrame: 4 })
    this.addAnimation("walk_left", { frameRate: 4, frameBuffer: 10, src: walkPath, columnDirection: true, columns: 4, firstFrame: 2 * 4 })
    this.addAnimation("walk_right", { frameRate: 4, frameBuffer: 10, src: walkPath, columnDirection: true, columns: 4, firstFrame: 3 * 4 })
  }

  moveTo(position: Vector2, speed: number) {
    const moved = super.moveTo(position, speed)

    const oldXDiretion = moved.x == 0 ? 0 : moved.x > 0 ? 1 : -1
    const oldYDiretion = moved.y == 0 ? 0 : moved.y > 0 ? 1 : -1

    if (!moved.y && !moved.x) {
      this.swapAnimation("idle_down")
    } else {
      const down = moved.y > 0
      const right = moved.x > 0
      this.swapAnimation(moved.y != 0 ? (down ? "walk_down" : "walk_up") : (right ? "walk_right" : "walk_left"))
    }
    this.updateDialogInfoPosition()
    return moved
  }

  update(): void {
    this.path?.move(this)
  }
  updateDialogInfoPosition() {
    if (!this.dialogInfo) return;
    const x = this.position.x + this.dialogInfo.width / 2;
    const y = this.position.y - this.dialogInfo.height;

    this.dialogInfo.position = new Vector2(x, y)
  }

  setDialogText(...texts: string[]) {
    if (!this.dialogInfo) {

      this.dialogInfo = new ObjectAnimated(new Vector2(0, 0), 20, 16, 1.5)
      this.dialogInfo.currentAnimation = 'default'
      this.dialogInfo.addAnimation('default', { frameRate: 4, frameBuffer: 20, src: "/img/ui/DialogInfo.png", })
      this.updateDialogInfoPosition()

      LayerManager.addObejct("interations", this.dialogInfo)
    }
    this.dialogTexts.push(...texts)
  }

  interaction() {
    if(!this.dialogTexts.length) return;
    const text = this.dialogTexts[Math.floor(Math.random() * this.dialogTexts.length)]
    DialogObject.show(text, this.icon)
  }
}