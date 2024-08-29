import { ObjectBase } from '../models/objects/objectBase';
import { Vector2 } from '../models/vector2';

export class ColliderManager {
  private static readonly objects = new Map<string, ObjectBase>()
  private static showCollider$ = false

  static get showCollider() { return this.showCollider$ }

  static show() {
    if (this.showCollider$) return
    this.showCollider$ = true;
  }

  static unShow() {
    this.showCollider$ = false;
  }

  static addObject(object: ObjectBase) {
    if (!object.collider) return;
    this.objects.set(object.code, object)
  }

  static removeObject(object: ObjectBase | string) {
    if (object instanceof ObjectBase)
      return this.objects.delete(object.code)
    else
      return this.objects.delete(object)
  }
  static hasCollisionWith(object: ObjectBase, code: string, margin: number = 0) {
    const tObject = this.objects.get(code);
    if (!tObject) return false;

    const tx = tObject.position.x
    const ty = tObject.position.y
    const tw = tObject.width
    const th = tObject.height

    const ox = object.position.x
    const oy = object.position.y
    const ow = object.width
    const oh = object.height

    return tx <= (ox + ow + margin) && (tx + tw) >= ox - margin
      && ty <= (oy + oh + margin) && (ty + th) >= oy - margin

  }

  static hasCollision(object: ObjectBase, margin: number = 0) {
    return !!this.getObject().find(f => {
      const fx = f.position.x
      const fy = f.position.y
      const fw = f.width
      const fh = f.height

      const ox = object.position.x
      const oy = object.position.y
      const ow = object.width
      const oh = object.height

      return f.code != object.code
        && fx <= (ox + ow + margin) && (fx + fw) >= ox - margin
        && fy <= (oy + oh + margin) && (fy + fh) >= oy - margin
    })
  }

  static leftCollision(object: ObjectBase, p: Vector2) {
    return this.getObject()
      .find(f => f.code != object.code
        && p.x <= (f.position.x + f.width)
        && p.x >= f.position.x
        //---------
        && (p.y + object.height) > f.position.y
        && p.y < (f.position.y + f.height)
      )
  }

  static rightCollision(object: ObjectBase, p: Vector2) {
    return this.getObject()
      .find(f => f.code != object.code
        && (p.x + object.width) >= f.position.x
        && p.x <= f.position.x
        //---------
        && (p.y + object.height) > f.position.y
        && p.y < (f.position.y + f.height)
      )
  }
  static upCollision(object: ObjectBase, p: Vector2) {
    return this.getObject()
      .find(f => f.code != object.code
        && p.y <= (f.position.y + f.height)
        && p.y >= f.position.y
        //---------
        && (p.x + object.width) > f.position.x
        && p.x < (f.position.x + f.width)
      )
  }

  static bottomCollision(object: ObjectBase, p: Vector2) {
    return this.getObject()
      .find(f => f.code != object.code
        && (p.y + object.height) >= f.position.y
        && p.y <= f.position.y
        //---------
        && (p.x + object.width) > f.position.x
        && p.x < (f.position.x + f.width)
      )
  }

  static getObject() {
    return Array.from(this.objects.values())
  }
}