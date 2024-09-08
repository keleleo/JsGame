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

    return this.verifyCollision(tObject, object, margin)
  }

  static hasCollision(object: ObjectBase, margin: number = 0) {
    return !!this.getObject().find(f => this.verifyCollision(f, object, margin))
  }
  
  static getCollisions(object: ObjectBase, margin: number = 0) {
    return this.getObject().filter(f => this.verifyCollision(f, object, margin))
  }

  static verifyCollision(object1: ObjectBase, object2: ObjectBase, margin: number) {
    const fx = object1.position.x
    const fy = object1.position.y
    const fw = object1.width
    const fh = object1.height

    const ox = object2.position.x
    const oy = object2.position.y
    const ow = object2.width
    const oh = object2.height

    return object1.code != object2.code
      && fx <= (ox + ow + margin) && (fx + fw) >= ox - margin
      && fy <= (oy + oh + margin) && (fy + fh) >= oy - margin
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