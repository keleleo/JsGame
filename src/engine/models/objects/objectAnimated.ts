import { Engine } from '../../engine';
import { Sprite } from '../sprite';
import { Vector2 } from '../vector2';
import { ObjectBase } from './objectBase';

export abstract class ObjectAnimated extends ObjectBase {
  readonly scale
  readonly animations = new Map<string, Sprite & { image: HTMLImageElement }>()
  readonly batata = new Map<string, Sprite & { image: HTMLImageElement }>()

  currentAnimation: string
  currentFrame = 0
  elapsedFrames = 0
  constructor(position: Vector2, width: number, height: number, scale: number, fixedOnScreen?: boolean, collider?: boolean) {
    super(position, width * scale, height * scale, fixedOnScreen, collider)
    this.scale = scale
    this.currentAnimation = ''

  }
  swapAnimation(name: string) {
    if (this.currentAnimation === name) return;
    this.currentAnimation = name
    this.currentFrame = 0
  }
  addAnimation(name: string, config: Sprite) {
    const image = new Image();
    image.onload = () => {
      this.animations.set(name, {
        image,
        frameRate: config.frameRate,
        frameBuffer: config.frameBuffer,
        src: config.src,
        loop: config.loop ?? true,
        autoPlay: config.autoPlay ?? true,
        columns: config.columns ?? 1,
        columnDirection: config.columnDirection ?? true,
        firstFrame: config.firstFrame ?? 0
      })
    }
    image.src = config.src
  }

  update() {
  }

  getCropPos(sprite: Sprite): Vector2 {
    let x = 0
    let y = 0
    const frame = this.currentFrame + (sprite.firstFrame || 0)

    if (sprite.columnDirection) {
      x = Math.floor(frame / (sprite.columns || 1))
      y = frame - (x * (sprite.columns || 1))
    } else {
      y = Math.floor(frame / (sprite.columns || 1))
      x = frame - (y * (sprite.columns || 1))
    }

    return new Vector2(x, y);
  }

  draw(position: Vector2): void {
    this.updateFrame()

    if (!this.currentAnimation || !this.animations.has(this.currentAnimation)) return
    const sprite = this.animations.get(this.currentAnimation)
    if (!sprite) return

    const cropPos = this.getCropPos(sprite);

    Engine.context.drawImage(
      sprite.image,
      cropPos.x * this.width / this.scale,
      cropPos.y * this.height / this.scale,
      this.width / this.scale,
      this.height / this.scale,
      position.x,
      position.y,
      this.width,
      this.height
    )
  }

  updateFrame() {
    this.elapsedFrames++
    this.elapsedFrames = this.elapsedFrames % 61 === 0 ? 1 : this.elapsedFrames

    if (!this.currentAnimation || !this.animations.has(this.currentAnimation)) return
    const sprite = this.animations.get(this.currentAnimation)
    if (!sprite || !sprite.autoPlay) return

    if (this.elapsedFrames % sprite.frameBuffer === 0)
      this.nextFrame()
  }

  nextFrame() {
    const sprite = this.animations.get(this.currentAnimation)
    if (!sprite) return

    if (this.currentFrame < sprite.frameRate - 1) this.currentFrame++
    else if (sprite.loop) this.currentFrame = 0
  }
}