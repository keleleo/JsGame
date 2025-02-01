import { Engine } from '../../engine';
import { ObjectSolidColorOptions } from '../options/objectSolidColor.options';
import { Vector2 } from '../vector2';
import { ObjectBase } from './objectBase';

export class ObjectSolidColor extends ObjectBase {
  color: string = '';

  constructor(options: ObjectSolidColorOptions) {
    super(options);
    this.color = options.color
  }

  draw(position: Vector2): void {
    Engine.context.fillStyle = this.color
    Engine.context.fillRect(position.x, position.y, this.width, this.height)
  }
}