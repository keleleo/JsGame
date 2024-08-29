import { Engine } from '../../engine';
import { Vector2 } from '../vector2';
import { ObjectBase } from './objectBase';

export class ObjectSolidColor extends ObjectBase {
  color: string = '';

  constructor(position: Vector2, width: number, height: number, color: string, collider: boolean) {
    super(position, width, height, false, collider);
    this.color = color
  }

  draw(position: Vector2): void {
    Engine.context.fillStyle = this.color
    Engine.context.fillRect(position.x, position.y, this.width, this.height)
  }
}