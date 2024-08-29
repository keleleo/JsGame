import { ObjectBase } from './objects/objectBase'
import { Vector2 } from './vector2'

export class PathPoint {
  readonly position: Vector2
  readonly sleep: number
  readonly speed: number
  get sleedTime(): number { return this.sleep + Date.now() }
  constructor(position: Vector2, sleep: number, speed: number) {
    this.position = position
    this.sleep = sleep * 1000
    this.speed = speed
  }
}

export class Path {
  readonly points: PathPoint[]
  readonly loop: boolean;

  private direction: 1 | -1 = 1
  private targetPoint = 0;
  private waitDelay: number = -1;
  private blockedMovementDelay: number = -1;
  private ended: boolean = false;
  public blockedMovementWaitTime = 2 * 1000// 10 seconds

  constructor(points: PathPoint[], loop: boolean) {
    this.points = points
    this.loop = loop;
  }

  private hasNextPoint() {
    const next = this.targetPoint + this.direction
    return next >= 0 && next < this.points.length
  }

  private getPoint() {
    return this.points[this.targetPoint]
  }

  private nextPoint() {
    const point = this.getPoint()
    this.resetWaitDelay()
    if (point.sleep) this.waitDelay = point.sleedTime
    if (!this.hasNextPoint()) {
      if (!this.loop) {
        this.ended == true
        return;
      }
      this.swapDirection()
    }
    this.targetPoint += this.direction
  }

  private isOnPoint(object: ObjectBase, point: PathPoint) {
    return object.position.equals(point.position);
  }

  private swapDirection() {
    this.direction *= -1
  }

  private resetWaitDelay() {
    this.waitDelay = -1
  }

  private resetBlockedMovementDelay() {
    this.blockedMovementDelay = -1
  }

  private setBlockedMovementDelay() {
    this.blockedMovementDelay = Date.now() + this.blockedMovementWaitTime
  }

  move(object: ObjectBase) {
    if (this.ended || this.waitDelay > Date.now()) return;
    const point = this.getPoint()
    const moved = object.moveTo(point.position, point.speed)

    if (moved.x || moved.y) {
      this.resetBlockedMovementDelay()
      return
    };

    if (!this.isOnPoint(object, point) && this.blockedMovementDelay == -1) {
      this.setBlockedMovementDelay()
      return;
    }
    if (this.blockedMovementDelay > Date.now()) return;
    else if (this.blockedMovementDelay != -1) this.swapDirection()

    this.nextPoint()
    if (this.blockedMovementDelay != -1) this.resetWaitDelay()
  }
}