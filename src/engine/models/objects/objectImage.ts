import { Engine } from '../../engine';
import { ObjectImageOptions } from '../options/objectImage.options';
import { Vector2 } from '../vector2';
import { ObjectBase } from './objectBase';

export abstract class ObjectImage extends ObjectBase {
  image = new Image();
  imageScale = 1;

  constructor(options: ObjectImageOptions) {
    super(options);
    this.image.onload = () => this.onLoad()
    //whem path starts with / add "." to fix path error
    this.image.src = options.image.startsWith('/') ? '.' + options.image : options.image
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