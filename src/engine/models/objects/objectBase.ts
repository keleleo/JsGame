
import { ColliderManager } from '../../controllers/colliderManager';
import { randomCode } from '../../utils/randomCode';
import { Crop } from '../crop';
import { Layer } from '../layer';
import { Vector2 } from '../vector2';

export abstract class ObjectBase {
  protected pos: Vector2
  private layer!: Layer
  private visible$: boolean = true;
  readonly code: string
  readonly fixedOnScreen
  readonly collider: boolean
  protected readonly colliderData$ = new Crop();
  width: number
  height: number
  get visible() { return this.visible$ }
  get position(): Readonly<Vector2> { return this.pos }
  set position(pos:Vector2) { this.pos = pos}
  get colliderData() {
    const x = this.position.x + this.colliderData$.y
    const y = this.position.y + this.colliderData$.x

    return new Crop(x, y, this.colliderData$.width, this.colliderData$.height)
  }

  constructor(position: Vector2,
    width: number,
    height: number,
    fixedOnScreen: boolean = false,
    colider: boolean = false
  ) {
    this.pos = position
    this.width = width
    this.height = height
    this.fixedOnScreen = fixedOnScreen
    this.collider = colider
    this.code = randomCode()
    this.colliderData$.width = width
    this.colliderData$.height = height
    ColliderManager.addObject(this)
  }

  update(): void { }
  abstract draw(position: Vector2): void

  private moveX(x: number): number {
    if (!x) return 0;
    const obj = x < 0 ?
      ColliderManager.leftCollision(this, this.position) :
      ColliderManager.rightCollision(this, this.position)

    const distance = !obj ? x : x < 0 ?
      obj.position.x + obj.width - this.position.x :
      obj.position.x - (this.width + this.position.x);

    this.pos.x += distance
    return distance
  }

  private moveY(y: number): number {
    if (!y) return 0;
    const pos = new Vector2(this.position.x, this.position.y + y)
    const obj = y < 0 ?
      ColliderManager.upCollision(this, pos) :
      ColliderManager.bottomCollision(this, pos)

    const distance = !obj ? y : y < 0 ?
      obj.position.y + obj.height - this.position.y :
      obj.position.y - (this.height + this.position.y);

    this.pos.y += distance

    return distance
  }

  move(x: number, y: number) {
    this.moveX(x)
    this.moveY(y)
  }

  moveTo(position: Vector2, speed: number): Vector2 {
    const xD = this.position.x < position.x ? 1 : -1
    const yD = this.position.y < position.y ? 1 : -1
    let xS = Math.min(speed, Math.abs(position.x - this.position.x)) * xD
    let yS = Math.min(speed, Math.abs(position.y - this.position.y)) * yD

    const mX = this.moveX(xS)
    const mY = this.moveY(yS)
    return new Vector2(mX, mY)
  }

  removeLayer() {
    this.layer?.remove(this)
  }

  addLayer(layer: Layer) {
    this.removeLayer()
    this.layer = layer
  }

  isOnScreen(): boolean {
    return false
  }

  delete() {
    ColliderManager.removeObject(this)
    this.removeLayer();
  }

  toJSON() {
    return { ...this, layer: null }
  }
}