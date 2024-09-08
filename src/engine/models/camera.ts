import { Engine } from '../engine';
import { Vector2 } from './vector2';


export class Camera {
  static position: Vector2 = new Vector2(0, 0)
  private static w = 0
  private static h = 0
  static get width() { return this.w }
  static get height() { return this.h }


  static initSizeUpdate() {
    window.addEventListener("resize", () => this.#updateCameraSize())
    this.#updateCameraSize()
  }

  private static getCurrentWindowSize() {
    this.w = window.innerWidth
    this.h = window.innerHeight
  }

  static #updateCameraSize() {
    this.getCurrentWindowSize()
    
    Engine.canvas.width = this.width
    Engine.canvas.height = this.height
    
    Engine.context.imageSmoothingEnabled = false
  }

  static positionRelative(position: Vector2) {
    return new Vector2(
      position.x - this.position.x,
      position.y - this.position.y,
    )
  }

  static isOnScreen(position: Vector2, width: number, height: number) {
    
    return ((position.x + width) >= 0 && position.x <= ( this.width))
      && ((position.y + height) >= 0 && position.y <= (this.height))
  }
}