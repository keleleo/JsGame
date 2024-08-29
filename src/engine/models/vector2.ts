export class Vector2 {
  x!: number
  y!: number

  constructor(x: number, y: number) {
    this.setPostion(x, y)
  }

  setPostion(x: number, y: number) {
    this.x = x
    this.y = y
  }

  minus(value: Vector2) {
    return new Vector2(this.x - value.x, this.y - value.y)
  }
  
  equals(value: Vector2): boolean {
    return this.x == value.x && this.y == value.y
  }
}