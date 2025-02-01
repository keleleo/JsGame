import { ObjectImage } from '../../engine/models/objects/objectImage';
import { Vector2 } from '../../engine/models/vector2';

export class Background extends ObjectImage {
  imageScale = 3;

  constructor(position: Vector2, img: string) {
    super({
      image: img,
      position: position,
    })
  }

  start(): void { }
  update(): void { }
}