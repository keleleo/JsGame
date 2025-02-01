import { ObjectBase } from '../../engine/models/objects/objectBase';
import { Vector2 } from '../../engine/models/vector2';

export class ColliderObjects extends ObjectBase {
  constructor(position: Vector2, width: number, height: number,) {
    super({
      position: position,
      width: width,
      height: height,
      colider: true
    });
  }
  draw(position: Vector2): void {

  }

}