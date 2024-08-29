import { Engine } from '../../engine';
import { Vector2 } from '../vector2';
import { ObjectBase } from './objectBase';

export abstract class ObjectImage extends ObjectBase {
  image = new Image();
  imageScale = 1;

  constructor(position: Vector2, image: string, fixedOnScreen?: boolean, collider?: boolean) {
    super(position, 0, 0, fixedOnScreen, collider);
    this.image.onload = () => this.onLoad()
    this.image.src = image
  }

  private onLoad() {
    this.width = this.imageScale * this.image.width
    this.height = this.imageScale * this.image.height
  }

  draw(position: Vector2): void {
    if (!this.image.complete) return;

    Engine.context.drawImage(
      this.image,
      position.x,
      position.y,
      this.width,
      this.height
    )
  }
}