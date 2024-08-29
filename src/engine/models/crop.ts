import { Vector2 } from './vector2'

export class Crop {
  x: number
  y: number
  width: number
  height: number

  constructor(x: number = 0, y: number = 0, width: number = 0, height: number = 0) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  get position() {
    return new Vector2(this.x, this.y)
  }

}