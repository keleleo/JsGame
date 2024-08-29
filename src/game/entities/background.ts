import { ObjectImage } from '../../engine/models/objects/objectImage';
import { Vector2 } from '../../engine/models/vector2';

export class Background extends ObjectImage {
  imageScale = 3;

  constructor(position: Vector2, img: string) {
    super(position, img)
  }

  start(): void { }
  update(): void { }
}